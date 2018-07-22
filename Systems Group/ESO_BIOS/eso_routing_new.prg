/*
ESO routing script - original version written by Mark Birrell August 2003

Modification Log:

markb 24 Aug 2006.
Adusted the scripting for specific ADT messages to be sent to SUPI
Also added logic to send pathnet encounters if qualified (fin no > 40000000

mod: 003 markb 7 Jan 2013
Adjusted the scripting to elimiate the non-CHW messages from going to other systems.
Also adjusted the A34 merge messages to not go if the merge involved a non-CHW patient.
The update was required for the PathNet classic external clients feed in preparation of the migration
classic pathnet to millennium

mod 004  Mark Birrell 11/1/13
limit the MRN's to CHW MRN's only due to external client load into millennium

mod: 005 markb Oct 2013
adjusted to not send our diagnostic referral encounters from PathNet

mod 006 markb  9 Dec 2013
adjusted for SCH ATD messages to go to DI.

mod 007 markb 28th Aug 2014
Need to change the HL7 A34 merge messages sent from Powerchart so that the MRG segment contains more than 1 MRN
when the "minor" patient record had more that 1 MRN.

mod 008 MariaN2 4th Sept 2014
Added new document imaging conversation to enable adding of SCH MRNs - needs to be excluded from outbound feeds

mod 009 Lwalia 08 Sept 2014
Introduced logic for ESO_pharm, ORM and RDS

mod 010 kevinThai 15 Sept 2016
Introduced logic for ESO_ONEVIEW, ATD and SIU

mod 012 Bharati Parasu 8 May 2017 - added Dyndoc XR PDF HL7 outbound - Discharge Summaries

mod 015 Josh Hankin 29-01-2018
Cleanup of route script, introducing parameters for com point process id 
and standardising indentation and capitalisation where possible
Also - introduction of Bio-surveillance interface

mod 016 Josh Hankin 08-03-2017
Add ESO_MSAU_ED into route for specific ED messages
Add ESO_PAS_ED_ATDs into route script for ED messages
Rewrite ADT outbound route scripting

mod 017 Josh Hankin 22-05-2018
Add ESO_EAV, which will feed ministry systems PFP and EAV with I/O/ED and triage details
*/

; initialize open engine process ids
set ESO_PAS_ATDs = 1052
set ESO_SUPI = 1063
set ESO_SCH_ATDs = 1100
set ESO_ONEVIEW = 1113
set dump_to_disk = 1047
set ESO_PHARM = 1109
set ESO_RPA_REFLAB = 1076
set ESO_Siemens_RIS = 1060
set ESO_HNA306_1 = 1020
set ESO_CCIS_ORU_ZCP = 1079
set ESO_SW_ORU = 1075
set ESO_BIOS = 1114
set ESO_Discharge_Summary_CDA = 1115
set ESO_MSAU_ED = 1116
set ESO_PAS_ED_ATDs = 1117
set ESO_EAV = 1118

set MSG_TYPE = OENOBJ->CONTROL_GROUP[1]->MSH[1]->MESSAGE_TYPE->MESSG_TYPE
declare cqm_class = vc
set cqm_class = get_stringlist_value("cqm_class")
declare cqm_type = vc
set cqm_type = get_stringlist_value("cqm_type")
declare cqm_subtype = vc
set cqm_subtype = get_stringlist_value("cqm_subtype")
declare cont_sys_cd = f8
set cont_sys_cd = get_double_value("contributor_system_cd")

declare inpat = f8
declare op = f8
declare ed = f8
declare serv_dept = f8
declare diagnostic_ref = f8
declare di_encntr = f8
declare hec_cont_sys_cd = f8
set inpat = uar_get_code_by ("MEANING",71,"INPATIENT")
set op = uar_get_code_by ("MEANING",71,"OUTPATIENT")
set ed = uar_get_code_by ("MEANING",71,"EMERGENCY")
set serv_dept = uar_get_code_by ("MEANING",71,"SERVICE DEPT")
set diagnostic_ref = uar_get_code_by ("MEANING",71,"DIAGREF")
set di_encntr = uar_get_code_by ("MEANING",71,"POSTVISIT")
set hec_cont_sys_cd = uar_get_code_by ("DISPLAY",89,"CATS")
set pat_type = 0
set pat_type = cnvtint(substring(9,8,OENOBJ->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->patient_type))

case (MSG_TYPE)
of "ADT":
	set msg_trigger = OENOBJ->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger
	set SCHN_pat = "N"
	set location_facility =
	substring(9,8,OENOBJ->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->facility_id->name_id )
	set alias_type = oenobj->person_info->person [1]->alias [1]->alias_type_cd
	set PID_MRNS = 0
	set PID_MRNS = size(oenobj->PERSON_GROUP->PAT_GROUP->PID->patient_id_int,5)
	if (PID_MRNS > 0)
		for (x=1 to PID_MRNS)
			if (oenobj->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_int [x]->assign_auth->name_id in
			( "##CVA##,7047",  "##CVA##,34239074" ))
				set SCHN_pat = "Y"
			endif
		endfor
	endif
	if (SCHN_pat = "Y")
		if (msg_trigger in ("A28","A31"))
			if (alias_type > 0)
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 5)
				set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
				set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
				set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_SCH_ATDs
				set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_ONEVIEW
				set OENROUTE->ROUTE_LIST[5]->R_PID = ESO_EAV
				set OENSTATUS->STATUS = 1
			else
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
				set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
				set OENSTATUS->STATUS = 1
			endif
		elseif (msg_trigger = "A34")
			set MRG_MRNS= 0
			set MRG_MRNS = size(oenobj->PERSON_GROUP [1]->PAT_GROUP [1]->MRG [1]->prior_pat_id_int,5)
			if (MRG_MRNS > 0)
				set from_CHW = "N"
				set from_SCH = "N"
				for (x=1 to MRG_MRNS)
					set from_facility_cd = 0
					set from_facility_cd=
					cnvtint(substring(9,8,oenobj->PERSON_GROUP [1]->PAT_GROUP [1]->MRG [1]->prior_pat_id_int [x]->assign_auth->name_id))
					if (from_facility_cd = 7047)
						set from_CHW = "Y"
					elseif (from_facility_cd = 34239074)
						set from_SCH = "Y"
					endif
				endfor
				if ((from_CHW = "Y") and (from_SCH = "N"))
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 5)
					set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
					set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
					set OENROUTE->ROUTE_LIST[3]->R_PID = dump_to_disk
					set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_ONEVIEW
					set OENROUTE->ROUTE_LIST[5]->R_PID = ESO_EAV
					set OENSTATUS->STATUS = 1
				elseif ((from_CHW = "N") and (from_SCH = "Y"))
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 2)
					set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_SCH_ATDs
					set OENROUTE->ROUTE_LIST[2]->R_PID = dump_to_disk
					set OENSTATUS->STATUS = 1
				elseif ((from_CHW = "Y") and (from_SCH = "Y"))
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 6)
					set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
					set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
					set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_SCH_ATDs
					set OENROUTE->ROUTE_LIST[4]->R_PID = dump_to_disk
					set OENROUTE->ROUTE_LIST[5]->R_PID = ESO_ONEVIEW
					set OENROUTE->ROUTE_LIST[6]->R_PID = ESO_EAV
					set OENSTATUS->STATUS = 1
				else
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
					set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
					set OENSTATUS->STATUS = 1
				endif
			endif
		elseif (msg_trigger = "   ")  ;2007.19 code is sending a blank ADT for cancel leaves
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
			set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
			set OENSTATUS->STATUS = 1
		;mod 15/16 start
		elseif (msg_trigger in ("A01","A02","A03","A04","A06","A08","A11","A12","A13","A17","A21","A22","A23")) ;visit messages
			if (location_facility = "34169036")  ;SCH visit
				if (pat_type in (inpat,op,ed,serv_dept))
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
					set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_SCH_ATDs
					set OENSTATUS->STATUS = 1
				else
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
					set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
					set OENSTATUS->STATUS = 1
				endif
			elseif (location_facility = "7051")  ;CHW visit
				if (pat_type = ed)
					if ((msg_trigger in ("A01","A03","A04","A08","A11","A13","A23")) and (cont_sys_cd = hec_cont_sys_cd))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_SUPI
						;set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_BIOS
						;set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_MSAU_ED
						;set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_PAS_ED_ATDs
						set OENSTATUS->STATUS = 1
					elseif (msg_trigger in ("A03","A04","A08","A11","A13","A23"))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 5)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ED_ATDs
						set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
						set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_BIOS
						set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_MSAU_ED
						set OENROUTE->ROUTE_LIST[5]->R_PID = ESO_EAV
						set OENSTATUS->STATUS = 1
					else
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
						set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
						set OENSTATUS->STATUS = 1
					endif
				elseif (pat_type in (inpat,op,serv_dept))
					if ((pat_type = inpat) and (msg_trigger = "A06"))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 5)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
						set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
						set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_BIOS
						set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_ONEVIEW
						set OENROUTE->ROUTE_LIST[5]->R_PID = ESO_EAV
						set OENSTATUS->STATUS = 1
					elseif ((pat_type in (inpat,op)) and (msg_trigger in ("A01","A02","A03","A04","A08","A11","A12","A13")))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 4)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
						set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SUPI
						set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_ONEVIEW
						set OENROUTE->ROUTE_LIST[4]->R_PID = ESO_EAV
						set OENSTATUS->STATUS = 1
					elseif ((pat_type in (inpat,op)) and (msg_trigger in ("A17","A21","A22")))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 3)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
						set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_ONEVIEW
						set OENROUTE->ROUTE_LIST[3]->R_PID = ESO_EAV
						set OENSTATUS->STATUS = 1
					elseif ((pat_type = serv_dept) and (msg_trigger in ("A01","A02","A03","A04","A08","A11","A12","A13")))
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
						set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_SUPI
						set OENSTATUS->STATUS = 1
					else
						set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
						set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
						set OENSTATUS->STATUS = 1
					endif
				else
					set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
					set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
					set OENSTATUS->STATUS = 1
				endif
			else
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
				set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
				set OENSTATUS->STATUS = 1
			endif
		else
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
			set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
			set OENSTATUS->STATUS = 1
		endif
	else
		set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
		set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
		set OENSTATUS->STATUS = 1
	endif
	;mod 15/16 end
of "ORM":
	set orderid = get_double_value("order_id")
	declare v_catalog_type = vc
	declare v_catalog_cd = f8
	select into "nl:"
	from orders o
	plan o where o.order_id = cnvtint(oenobj->ORDER_GROUP [1]->OBR_GROUP [1]->OBR[1]->placer_ord_nbr[1]->entity_id)
	and o.active_ind = 1
	detail
	v_catalog_type = uar_get_code_meaning(o.catalog_type_cd)
	v_catalog_cd = o.catalog_cd
	with counter
	case (v_catalog_type)
	of"PHARMACY":
		declare cancel1_cd = f8
		set stat = UAR_GET_MEANING_BY_CODESET(6003, "CANCEL", 1, cancel1_cd )
		declare cancel2_cd = f8
		set stat = UAR_GET_MEANING_BY_CODESET(6003, "CANCEL DC", 1, cancel2_cd )
		declare cancel3_cd = f8
		set stat = UAR_GET_MEANING_BY_CODESET(6003, "CANCEL REORD", 1, cancel3_cd )
		declare cancel4_cd = f8
		set stat = UAR_GET_MEANING_BY_CODESET(6003, "DISCONTINUE", 1, cancel4_cd )
		declare cancel5_cd = f8
		set stat = UAR_GET_MEANING_BY_CODESET(6003, "DELETE", 1, cancel5_cd )
		declare cancel6_cd = f8
		set cancel6_cd = UAR_GET_CODE_BY("DISPLAYKEY", 6003, "DELETE")
		declare ord_action_cd = f8
		set ord_action_cd = cnvtreal(replace(oenobj->ORDER_GROUP [1]->ORC [1]->order_ctrl ,"##CVA##,","",1))
		set stat = alterlist(oenroute->route_list, 1)
		set runid = get_double_value("run_id")
		;;Allow PowerChart cancel orders only to go to i.Pharmacy
		if (ord_action_cd in (cancel1_cd, cancel2_cd, cancel3_cd, cancel4_cd, cancel5_cd, cancel6_cd))
			set oenroute->route_list[1]->r_pid = ESO_PHARM
			select into "nl:"
			from fill_print_ord_hx f where
			f.order_id = orderid and
			f.order_id > 0 and
			(f.run_id = runid or runid = 0.00) and
			f.run_id > 0 and
			f.dispense_id > 0 and
			f.item_id > 0
			order by f.dispense_id desc, f.run_id desc, f.item_id, f.order_row_seq desc
			head report
			trans_cnt = 0
			end_flag = 0
			head f.dispense_id
			row +0
			head f.run_id
			row +0
			head f.item_id
			if (end_flag = 0)
				trans_cnt = trans_cnt + 1
			endif
			foot f.item_id
			row +0
			foot f.run_id
			end_flag = 1
			foot f.dispense_id
			row +0
			foot report
			oenroute->route_list[1]->split_cnt = trans_cnt
			with nocounter
			set oenstatus->status = 1
		else
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
			set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
			set OENSTATUS->STATUS = 1
		endif
	else
		if (cqm_type = "PKL") ; Reference Lab
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
			set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_RPA_REFLAB
			set OENSTATUS->STATUS = 1
		else
			set diagnosis = substring(9,7,OENOBJ->ORDER_GROUP [1]->OBR_GROUP [1]->OBR->diag_serv_sec_id)
			if (diagnosis in ("5073","46920"))    ;medical imaging values from code set 106
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
				set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_Siemens_RIS
				set OENSTATUS->STATUS = 1
			else
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
				set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
				set OENSTATUS->STATUS = 1
			endif
		endif
	endcase
of "SIU":
	set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,2)
	set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_ONEVIEW
	set OENROUTE->ROUTE_LIST[2]->R_PID = dump_to_disk
	set OENSTATUS->STATUS = 1
of "PPR":
	set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,2)
	set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_PAS_ATDs
	set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_ONEVIEW
	set OENSTATUS->STATUS = 1
of "ORU":
	if ((cqm_class = "CE" AND cqm_subtype = "GRP") OR   ;;GL discrete
		(cqm_type = "MDOC" AND cqm_subtype = "UR") OR   ;;Helix discrete
		(cqm_class = "CE" AND cqm_subtype = "MICRO") OR ;;Micro discrete
		(cqm_class = "CHART" AND cqm_type = "AP"))     ;;AP display
		set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,1)
		set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_CCIS_ORU_ZCP
		if (cqm_type = "MDOC" AND cqm_subtype = "UR")   ;;Helix discrete
			set accid = 0.00
			set acc_class_cd = 0.00
			set filed1_cnt = size(oenobj->RES_ORU_GROUP [1]->OBR [1]->filler_field1, 5)
			for (x = 1 to filed1_cnt)
				if(oenobj->RES_ORU_GROUP [1]->OBR [1]->filler_field1 [x]->field_type = "HNA_ACCNID")
					set accid = cnvtreal(oenobj->RES_ORU_GROUP [1]->OBR [1]->filler_field1 [x]->value )
				endif
			endfor
			if (accid > 0.00)
				Select into "nl:"
				From accession a where
				a.accession_id = accid
				Detail
				acc_class_cd = a.accession_class_cd
				With nocounter
			endif
			case (cnvtupper(UAR_GET_CODE_DISPLAY(acc_class_cd)))
			of "MOLECULAR GENETICS":
			of "CYTOGENETICS":
				set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,2)
				set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_SW_ORU
			endcase
		endif
		set OENSTATUS->STATUS = 1
	;mod 15 start
	elseif (cqm_class = "CE" AND cqm_subtype = "POWERFORMS" and pat_type = ed)
		set orc_cnt = size(oenobj->RES_ORU_GROUP, 5)
		set triage_doc_ind = 0
		for (x = 1 to orc_cnt)
			if (oenobj->RES_ORU_GROUP [x]->ORC [1]->ORDER_CTRL = "PA")
				if (oenobj->RES_ORU_GROUP [x]->OBR [1]->UNIV_SERVICE_ID [1]->TEXT in 
					("Triage SCHN - FORM","Rapid Triage - FORM","Re-Triage Assessment - FORM"))
					set triage_doc_ind = 1
				endif
			endif
		endfor
		if (triage_doc_ind = 1)
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,2)
			set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_BIOS
			set oenroute->route_list[1]->split_cnt = 2
			set OENROUTE->ROUTE_LIST[2]->R_PID = ESO_EAV
			set oenstatus->status = 1
		else
			set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
			set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
			set OENSTATUS->STATUS = 1
		endif
		;mod 15 end
		;mod 12 start
	elseif (cqm_class = "CHART" AND cqm_type = "MDOC" AND cqm_subtype = "SUCCESSFUL")
		set STAT = ALTERLIST(OENROUTE->ROUTE_LIST,1)
		set OENROUTE->ROUTE_LIST[1]->R_PID = ESO_Discharge_Summary_CDA
		set oenstatus->status = 1
		;mod 12 end
	else
		set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
		set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
		set OENSTATUS->STATUS = 1
	endif
of "RDS":
	set stat = alterlist(oenroute->route_list, 1)
	set oenroute->route_list[1]->r_pid = ESO_PHARM
	set oenroute->route_list[1]->split_cnt = size(oenobj->RDE_GROUP [1]->RXE_GROUP, 5)
	set oenstatus->status = 1
else
	set STAT = ALTERLIST(OENROUTE->ROUTE_LIST, 1)
	set OENROUTE->ROUTE_LIST[1]->R_PID = dump_to_disk
	set OENSTATUS->STATUS = 1
endcase

;>>>>>>>>>> TA6187, 15Feb13 <<<<<<<<<<
declare get_stringlist_value(string_meaning) = vc
subroutine get_stringlist_value(string_meaning)
declare stringlist_val = vc
set stringlist_val = ""
set stringlist_size = size(oenobj->cerner->stringlist,5)
if (stringlist_size > 0)
	for (x = 1 to stringlist_size)
		if (oenobj->cerner->stringlist[x]->strMeaning = string_meaning)
			set stringlist_val = trim(oenobj->cerner->stringlist[x]->strval)
		endif
	endfor
endif
return(stringlist_val)
end ;;get_stringlist_value(string_meaning)

declare get_double_value(double_meaning) = f8
subroutine get_double_value(double_meaning)
set doublelist_val = 0.00
set doublelist_size = size(oenobj->cerner->doubleList,5)
if (doublelist_size > 0)
	for (x = 1 to doublelist_size)
		if (oenobj->cerner->doubleList[x]->strMeaning = double_meaning)
			set doublelist_val = oenobj->cerner->doubleList[x]->dval
		endif
	endfor
endif
return(doublelist_val)
end ;;get_double_value(double_meaning)
;; end of scripting