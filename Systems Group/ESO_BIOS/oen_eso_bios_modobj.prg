drop program oen_eso_bios_modobj:DBA go
create program oen_eso_bios_modobj:DBA
/*
 *  Script Name:  oen_eso_bios_modobj
 *  Type:  Open Engine Modify Object Script
 *
 *  Author:  Josh Hankin
 *  Domain:  PBUILD
 *  Creation Date:  16/01/2018 15:00:00
 *  ---------------------------------------------------------------------------------------------
 *  Modifications:
 *  
 *
 */
 
 
/**************************************************************
; DECLARED SUBROUTINES
**************************************************************/
declare get_double_value(double_meaning=vc) = f8
 
set contributor_source_cd = UAR_GET_CODE_BY("DISPLAYKEY",73,"BIOS")
 
/**************************************************************
;   DEFINE BIO-SURVEILLIANCE RECORD STRUCTURE
**************************************************************/
 
record bio (
  1 MSH
    2 send_application = vc
    2 send_facility = vc
    2 recv_application = vc
    2 recv_facility = vc
    2 mesg_dt = vc
    2 mesg_type
      3 type = vc
      3 event = vc
    2 mesg_control_id = vc
  1 EVN
    2 mesg_type_event = vc
    2 event_dt = vc
  1 PID
    2 mrn = vc
    2 sex = vc
    2 address = vc
  1 PV1
    2 visit_id = vc
    2 admit_dt = vc
  1 DG1 [*]
    2 set_id = vc
    2 diagnosis = vc
  1 ZV1
    2 visit_type = vc
    2 triage_cat = vc
    2 age = vc
    2 birth_country = vc
    2 residence_country = vc
    2 mesg_dt_tm = vc
    2 disposition = vc
    2 mode_of_arrival = vc
  1 TXA
    2 act_dt_tm = vc
    2 doc_num = vc
  1 OBX1
    2 procedure_desc = vc
    2 observation_val = vc
  1 OBX2
    2 procedure_desc = vc
    2 observation_val = vc
)
 
Free record bio_segments
record bio_segments (
  1 MSH = vc
  1 EVN = vc
  1 PID = vc
  1 PV1 = vc
  1 DG1 = vc
  1 ZV1 = vc
  1 TXA = vc
  1 OBX1 = vc
  1 OBX2 = vc
  1 dg1_ind = i1
  1 zv1_ind = i1
  1 txa_ind = i1
  1 obx1_ind = i1
  1 obx2_ind = i1
) with persist
 
set bio_segments->dg1_ind = 0
set bio_segments->zv1_ind = 0
set bio_segments->txa_ind = 0
set bio_segments->obx1_ind = 0
set bio_segments->obx2_ind = 0
 
declare check_for_dg1= i1
set check_for_dg1 = 0
 
declare populate_zv1 = i1
set populate_zv1 = 0
 
declare populate_mdm = i1
set populate_mdm = 0
 
 
; Define persistant ZV1 record structure
Free record zv1
record zv1
(
  1 ZV11 = vc
  1 ZV12 = vc
  1 ZV13 = vc
  1 ZV13temp = vc
  1 ZV14 = vc
  1 ZV15 = vc
  1 ZV16 = vc
  1 ZV17 = vc
  1 ZV18 = vc
  1 ZV19 = vc
  1 ZV110 = vc
  1 ZV111 = vc
  1 ZV112 = vc
  1 ZV1encntr = f8
  1 age = vc
  1 obx_temp = vc
  1 obx = vc
  1 segment = vc
  1 obx_rtf = vc
  1 txa = vc
) with persist
 
;>>>>>>>>>> TA6187, 16Sep09, Change the facility codes for SH and SEH <<<<<<<<<<
Declare fac_cd = c4
;IF(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->facility_id->name_id = "A233")
;   IF(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->nurse_unit = "SH/CAS")
;      Set fac_cd = "A216"
;   ELSEIF(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->nurse_unit = "SEH/CAS")
;      Set fac_cd = "A231"
;   ELSE
;      Set fac_cd = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->facility_id->name_id
;   ENDIF
;ELSE
;   Set fac_cd = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->facility_id->name_id
;ENDIF
Set fac_cd = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->assigned_pat_loc->facility_id->name_id
 
set control_id_size = size(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1)
set control_id_t = findstring("T",oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1)
set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
    substring(control_id_t,control_id_size-control_id_t+1,
    oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1)
 
Set oen_reply->CONTROL_GROUP [1]->MSH [1]->accept_ack_type = "NE"
Set oen_reply->CONTROL_GROUP [1]->MSH [1]->application_ack_type = "NE"
Set oen_reply->CONTROL_GROUP [1]->MSH [1]->char_set [1]->char_set = "ASCII"
Set oen_reply->CONTROL_GROUP [1]->MSH [1]->receiving_application->name_id = "PHREDSS"
Set oen_reply->CONTROL_GROUP [1]->MSH [1]->processing_id->proc_id = "P"
 
 
set single_encounter_flipped = 0
if( oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->patient_class != "E" )
	set single_encounter_flipped = 1
	set oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->patient_class = "E"
endif
Set oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id =
    concat(fac_cd, oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id )
 
case (oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_type)
 
of "ADT":	; Initial ADT message
	/* No need for A35 logic at SCHN
    if(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A35")
        case (oen_request_data->split_index )
        of 1: ;Generate A11
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
              concat(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 , "X1")
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A11"
            Set oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id =
              concat(fac_cd, oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->MRG [1]->prior_visit_nbr->id)
 
        of 2: ;Generate A04
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
              concat(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 , "X2")
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A04"
 
        of 3: ;Generate MDM
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
              concat(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 , "X3")
            set populate_mdm = 1
 
        endcase
 
    else*/
		declare encntr_id = f8 with noconstant(0.0)
		; If enccounter has been flipped to Inpatient
		if( single_encounter_flipped = 1 )
 
			; Retrieve ED visit number
			declare ed_fin_alias = vc with noconstant("")
			set encntr_id = get_double_value ("encntr_id")
			select	into "NL:"
			from	encntr_alias ea
			where	ea.encntr_id = encntr_id
					and ea.encntr_alias_type_cd = value(uar_get_code_by("MEANING", 319, "VISITID"))
					and ea.active_ind = 1
			detail
				if( ea.end_effective_dt_tm < SYSDATE)
					ed_fin_alias = ea.alias
				endif
			with nocounter
			; set PV1-19
			if( ed_fin_alias != "" )
				set oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr->id =  concat(fac_cd, ed_fin_alias)
			endif
		endif
 
        if(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A23")
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A11"
        elseif(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A06")
            Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A03"
        elseif(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A07")
			set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A13"
		endif
		if (oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger in ("A03","A08"))
            ;Message type in A03, A08 - attempt to generate ZV1 & DG1
            set check_for_dg1 = 1
            set populate_zv1 = 1
            set bio_segments->zv1_ind = 1
        endif
    ;endif
 
    Set oen_reply->CONTROL_GROUP [1]->EVN [1]->event_type_cd =
        oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger
 
 
of "ORU":	; Triage forms
 
    set zv1->ZV1encntr = oen_reply->cerner->person_info->person [1]->encntr_id
 
    case (oen_request_data->split_index )
 
    of 1:  	;Convert to ADT message
       set check_for_dg1 = 1
       set populate_zv1 = 1
       set bio_segments->zv1_ind = 1
       Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_type = "ADT"
       Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A08"
       Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
            concat(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 , "X1")
		; If enccounter has been flipped to Inpatient
		if( single_encounter_flipped = 1 )
 
			; Retrieve ED visit number
			declare ed_fin_alias = vc with noconstant("")
			set encntr_id = get_double_value ("encntr_id")
			select	into "NL:"
			from	encntr_alias ea
			where	ea.encntr_id = encntr_id
					and ea.encntr_alias_type_cd = value(uar_get_code_by("MEANING", 319, "VISITID"))
					and ea.active_ind = 1
			detail
				if( ea.end_effective_dt_tm < SYSDATE)
					ed_fin_alias = ea.alias
				endif
			with nocounter
			; set PV1-19
			if( ed_fin_alias != "" )
				set oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr->id = concat(fac_cd, ed_fin_alias)
			endif
		endif
 
    of 2:	;Convert to MDM message
      set populate_mdm = 1
      Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 =
            concat(oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1 , "X2")
 
    endcase
 
endcase
 
/**************************************************************
    POPULATE BIO-SURVEILLIANCE RECORD STRUCTURE
**************************************************************/
 
; Populate the DG1 segment if required
if (check_for_dg1 = 1)
 
        declare dg1_counter = i2
        set dg1_counter = 0
 
        SELECT INTO "NL:"
	       N.CONCEPT_CKI,
	       N.SOURCE_STRING,
	       N.SOURCE_VOCABULARY_CD
        FROM
           DIAGNOSIS  D,
	       NOMENCLATURE  N
        PLAN  D WHERE D.ENCNTR_ID = oen_reply->cerner->person_info->person [1]->encntr_id
	and d.active_ind = 1
        JOIN  N WHERE N.NOMENCLATURE_ID = D.NOMENCLATURE_ID
        DETAIL
            dg1_counter = dg1_counter + 1
            bio_segments->dg1_ind = 1
            stat = alterlist(bio->DG1,dg1_counter)
            bio->DG1 [dg1_counter]->set_id = cnvtstring(dg1_counter)
            bio->DG1 [dg1_counter]->diagnosis = build(
            replace(n.concept_cki,"SNOMED!","",0),"^",n.source_string,"^",UAR_GET_CODE_DISPLAY( N.SOURCE_VOCABULARY_CD ))
        WITH  NOCOUNTER
 
        if(dg1_counter != 0)
            for (x = 1 to dg1_counter)
 
            set bio_segments->DG1 =
            build(bio_segments->DG1,"DG1",
            "|",bio->DG1 [x]->set_id,
            "|",
            "|",bio->DG1 [x]->diagnosis,
            "|||F",char(13)
           )
            endfor
        endif
endif
 
;Populate the ZV1 segment if required
if (populate_zv1 = 1)
	declare dob = vc
	set modify cnvtage(7,4,12)
	;Determine age
	if (oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->date_of_birth  = "")
		set bio->zv1->age = "999"
	elseif (oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->date_of_birth  = "18000101")
		set bio->zv1->age = "999"
	else
		set dob = cnvtage(CNVTDATE2(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->date_of_birth,"YYYYMMDD"),0000)
		if (findstring("Years", dob) != 0)
			set bio->zv1->age = trim(substring(0,3,dob),2)
		else
			set bio->zv1->age = "0"
		endif
	endif
 
	;Determine Nationality
	select into "nl:"
		p.nationality_cd, cvo.alias
	from person p, code_value_outbound cvo
	plan p where p.person_id = oen_reply->cerner->person_info->person [1]->person_id
	join cvo where cvo.code_value = p.nationality_cd
		and cvo.code_set = 14652
		and cvo.contributor_source_cd = contributor_source_cd
	DETAIL
		bio->zv1->birth_country = build(cvo.alias,"^",UAR_GET_CODE_DISPLAY( p.nationality_cd))
	with nocounter
 
	;Determine disposition
	; Check encntr_info first
	; else encntr table
	select into "nl:"
		uar_get_code_display(ei.value_cd), cvo.alias
	from encntr_info ei, code_value_outbound cvo
	plan ei where ei.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
			and ei.info_sub_type_cd=value(uar_get_code_by("MEANING", 356, "ED_TF_DISPOS"))
	join cvo where cvo.code_value = outerjoin(ei.value_cd)
		and cvo.code_set = outerjoin(19)
		and cvo.contributor_source_cd = outerjoin(contributor_source_cd)
	DETAIL
		if( ei.value_cd!=0 )
			bio->zv1->disposition = build(cvo.alias,"^",UAR_GET_CODE_DISPLAY(ei.value_cd))
		endif
	with nocounter
 
	if( bio->zv1->disposition="" )
		select into "nl:"
			e.disch_disposition_cd, cvo.alias
		from encounter e, code_value_outbound cvo
		plan e where e.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		join cvo where cvo.code_value = outerjoin(e.disch_disposition_cd)
			and cvo.code_set = outerjoin(19)
			and cvo.contributor_source_cd = outerjoin(contributor_source_cd)
		DETAIL
			bio->zv1->disposition = build(cvo.alias,"^",UAR_GET_CODE_DISPLAY(e.disch_disposition_cd ))
		with nocounter
	endif
 
	;Determine Country or Residence
	set country = trim(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [1]->country)
	select into "nl:"
		cv.display
	from  code_value cv, code_value_outbound cvo
	plan cvo where cvo.alias = country
		and cvo.code_set = 15
		and cvo.contributor_source_cd = contributor_source_cd
	join cv where cv.code_value = cvo.code_value
 
	DETAIL
		bio->zv1->residence_country=build(country,"^",cv.display)
	with nocounter
 
	;Set significant time
	set bio->zv1->mesg_dt_tm = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_time_stamp
 
	;Determine Type of visit
	select into "nl:"
		cvo.alias, ea.accident_cd
	from encntr_accident ea, code_value_outbound cvo
	plan EA where ea.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	join cvo where cvo.code_value = ea.accident_cd
		and cvo.code_set = 1
		and cvo.contributor_source_cd = contributor_source_cd
	DETAIL
		bio->zv1->visit_type =build(cvo.alias,"^",uar_get_code_display(ea.accident_cd))
	with nocounter
 
	;Determine admit mode
	select into "nl:"
		e.admit_mode_cd, cvo.alias
	from encounter e, code_value_outbound cvo
	Plan e where e.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	join cvo where cvo.code_value = e.admit_mode_cd
		and cvo.code_set = 68
		and cvo.contributor_source_cd = contributor_source_cd
	DETAIL
		bio->zv1->mode_of_arrival = build(cvo.alias,"^",UAR_GET_CODE_DISPLAY( e.admit_mode_cd ))
	with nocounter
 
	;Determine triage catagory
	select  into "nl:"
		c.event_cd
	from 		clinical_event c
	plan c 	where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and c.view_level = 1
		and c.publish_flag = 1
		and substring(1,15, c.event_title_text) in ("Triage Category", "Re-Triage Score")  ; equals triage category
		and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	order c.valid_from_dt_tm, c.event_cd
	DETAIL
		bio->zv1->triage_cat =  build(c.result_val,"^",c.result_val)
	with nocounter
 
endif
 
;Populate the MDM segment if required
if (populate_mdm = 1)
 
/*	declare temp_axilla_cd  =  F8
	set temp_axilla_cd  =  uar_get_code_by ("DISPLAY", 72, "Temperature, Axilla")
 
	declare temp_intravascular_cd  =  F8
	set temp_intravascular_cd  =  uar_get_code_by ("DISPLAY", 72, "Temperature, Intravascular")
 
	declare temp_oesophageal_cd  =  F8
	set temp_oesophageal_cd  =  uar_get_code_by ("DISPLAY", 72, "Temperature, Oesophageal")
 
	declare temp_oral_cd  =  F8
	set temp_oral_cd  =  uar_get_code_by ("DISPLAY", 72 , "Temperature, Oral")
 
	declare temp_rectal_cd  =  F8
	set temp_rectal_cd  =  uar_get_code_by ("DISPLAY", 72 , "Temperature, Rectal")
 
	declare temp_tympanic_cd  =  F8
	set temp_tympanic_cd  =  uar_get_code_by ("DISPLAY" , 72 , "Temperature, Tympanic")
 
	declare temp_indwelling_cd  =  F8
	set temp_indwelling_cd  =  uar_get_code_by ("DISPLAY" , 72 , "Temperature, Indwelling Catheter")
 
	declare heart_rate_cd  =  F8
	set heart_rate_cd  =  uar_get_code_by ("DISPLAY", 72, "Heart Rate")
 
	declare heart_rhythm_cd  =  F8
	set heart_rhythm_cd  =  uar_get_code_by ("DISPLAY", 72, "Heart Rhythm")
 
	declare heart_rate_reg_cd  =  F8
	set heart_rate_reg_cd  =  uar_get_code_by ("DISPLAY", 72, "Heart Rate Regularity")
 
	declare pulse_rate_cd  =  F8
	set pulse_rate_cd  =  uar_get_code_by ("DISPLAY", 72, "Pulse Rate")
 
	declare pulse_character_cd  =  F8
	set pulse_character_cd  =  uar_get_code_by ("DISPLAY", 72 , "Pulse Character")
 
	declare systolic_bp_cd  =  F8
	set systolic_bp_cd  =  uar_get_code_by ("DISPLAY", 72, "Systolic Blood Pressure")
 
	declare diastolic_bp_cd  =  F8
	set diastolic_bp_cd  =  uar_get_code_by ("DISPLAY", 72, "Diastolic Blood Pressure")
 
	declare mean_arterial_bp_cd  =  F8
	set mean_arterial_bp_cd  =  uar_get_code_by ("DISPLAY", 72, "Mean Arterial Pressure")
 
	declare systolic_bp_inv_cd  =  F8
	set systolic_bp_inv_cd  =  uar_get_code_by ("DISPLAY", 72, "Systolic Blood Pressure, Invasive")
 
	declare diastolic_bp_inv_cd  =  F8
	set diastolic_bp_inv_cd  =  uar_get_code_by ("DISPLAY", 72 , "Diastolic Blood Pressure, Invasive")
 
	declare mean_arterial_bp_inv_cd  =  F8
	set mean_arterial_bp_inv_cd  =  uar_get_code_by ("DISPLAY", 72, "Mean Arterial Pressure, Invasive")
 
	declare resp_rate_cd  =  F8
	set resp_rate_cd  =  uar_get_code_by ("DISPLAY", 72, "Respiratory Rate")
 
	declare resp_desc_cd  =  F8
	set resp_desc_cd  =  uar_get_code_by ("DISPLAY", 72, "Respirations Description")
 
	declare  o2_sat_cd  =  F8
	set o2_sat_cd  =  uar_get_code_by ("DISPLAY", 72, "Oxygen Saturation")
 
	declare  fio2_cd  =  F8
	set fio2_cd  =  uar_get_code_by ("DISPLAY", 72, "FiO2")
 
	declare gcscore_cd  =  F8
	set gcscore_cd  =  uar_get_code_by ("DISPLAY", 72, "Glasw Coma Score")
 
	declare gcscale_cd  =  F8
	set gcscale_cd  =  uar_get_code_by ("DISPLAY", 72, "Glasw Coma Scale")
 
	declare  paed_gcs_cd  =  F8
	set paed_gcs_cd  =  uar_get_code_by ("DISPLAY", 72, "Paediatric Coma Score")
 
	declare  pain_score_cd  =  F8
	set pain_score_cd  =  uar_get_code_by ("DISPLAY", 72, "Pain Score")
 
	declare ex_cause_cd  =  F8
	set ex_cause_cd  =  uar_get_code_by ("DISPLAY",  72,  "External Cause")
 
	declare nurse_assess_cd1  =  F8
	set nurse_assess_cd1  =  uar_get_code_by ("DISPLAY",  72,  "Triage Presenting Information")
 
	declare nurse_assess_cd2  =  F8
	set nurse_assess_cd2  =  uar_get_code_by ("DISPLAY",  72,  "Triage Additional Presenting Information")*/
	
	declare temp_weight_cd  =  F8
	set temp_weight_cd  =  uar_get_code_by ("DISPLAY", 72, "Weight")
	declare temp_specialty_cd  =  F8
	set temp_specialty_cd  =  uar_get_code_by ("DISPLAY", 72, "Triage Specialty")
	declare temp_temperature_cd  =  F8
	set temp_temperature_cd  =  uar_get_code_by ("DISPLAY", 72, "Temperature")
	declare temp_triage_dttm_cd  =  F8
	set temp_triage_dttm_cd  =  uar_get_code_by ("DISPLAY", 72, "Triage Date/Time")
	declare temp_retriage_dttm_cd  =  F8
	set temp_retriage_dttm_cd  =  uar_get_code_by ("DISPLAY", 72, "Re-Triage Date & Time")
	declare temp_category_cd  =  F8
	set temp_category_cd  =  uar_get_code_by ("DISPLAY", 72, "Triage Category")
	declare temp_recategory_cd  =  F8
	set temp_recategory_cd  =  uar_get_code_by ("DISPLAY", 72, "Re-Triage Category")
	declare temp_ox_sat_cd  =  F8
	set temp_ox_sat_cd  =  uar_get_code_by ("DISPLAY", 72, "Oxygen Saturation")
	declare temp_resp_rate_cd  =  F8
	set temp_resp_rate_cd  =  uar_get_code_by ("DISPLAY", 72, "Respiratory Rate")
	declare temp_resp_dist_cd  =  F8
	set temp_resp_dist_cd  =  uar_get_code_by ("DISPLAY", 72, "Respiratory Distress")
	declare temp_visit_reason_cd  =  F8
	set temp_visit_reason_cd  =  uar_get_code_by ("DISPLAY", 72, "Triage Visit Reason")
	;declare temp_pain_cd  =  F8
	;set temp_pain_cd  =  uar_get_code_by ("DISPLAY", 72, "Pain - Pain (0-10)")
	declare temp_pain_cd  =  F8
	set temp_pain_mov_cd  =  uar_get_code_by ("DISPLAY", 72, "Pain (0-10) - Movement")
	declare temp_pain_rest_cd  =  F8
	set temp_pain_rest_cd  =  uar_get_code_by ("DISPLAY", 72, "Pain (0-10) - Rest")
	declare nurse_assess_cd1  =  F8
	set nurse_assess_cd1  =  uar_get_code_by ("DISPLAY", 72, "Triage Presenting Information")
	declare nurse_assess_cd2  =  F8
	set nurse_assess_cd2  =  uar_get_code_by ("DISPLAY", 72, "Triage Additional Presenting Information")
	declare nurse_assess_cd3 =  F8
	set nurse_assess_cd3 =  uar_get_code_by ("DISPLAY", 72, "Additional Presenting Information")
	declare temp_art_pres_cd  =  F8
	set temp_art_pres_cd  =  uar_get_code_by ("DISPLAY", 72, "Mean Arterial Pressure")
	declare temp_heart_rate_reg_cd  =  F8
	set temp_heart_rate_reg_cd  =  uar_get_code_by ("DISPLAY", 72, "Heart Rate Regularity")
	declare temp_heart_rate_cd  =  F8
	set temp_heart_rate_cd  =  uar_get_code_by ("DISPLAY", 72, "Heart Rate")
	declare temp_gcs_comment1_cd  =  F8
	set temp_gcs_comment1_cd  =  uar_get_code_by ("DISPLAY", 72, "Non-Neuro Reason for 1 Rating GCS")
	declare temp_glasgow_cd  =  F8
	set temp_glasgow_cd  =  uar_get_code_by ("DISPLAY", 72, "Glasgow Coma Score")
	declare temp_gcs_comment2_cd  =  F8
	set temp_gcs_comment2_cd  =  uar_get_code_by ("DISPLAY", 72, "GCS Non-Neuro Reason Comment")
	declare temp_fi02_cd  =  F8
	set temp_fi02_cd  =  uar_get_code_by ("DISPLAY", 72, "FiO2")
	declare temp_dbp_cd  =  F8
	set temp_dbp_cd  =  uar_get_code_by ("DISPLAY", 72, "Diastolic Blood Pressure")
	declare temp_bglt_cd  =  F8
	set temp_bglt_cd  =  uar_get_code_by ("DISPLAY", 72, "Blood Glucose Level Type")
	declare temp_bglb_cd  =  F8
	set temp_bglb_cd  =  uar_get_code_by ("DISPLAY", 72, "Blood Glucose Level, Bedside")
 
	Set old_triage_flag = 0
 
	;Enable TXA segment
	set bio_segments->txa_ind = 1
 
	;set zv1->obx_rtf = oen_reply->RES_ORU_GROUP [1]->OBX_GROUP [1]->OBX->observation_value [1]->value_1
 
	Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_type = "MDM"
	Set oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "T02"
 
	Set oen_reply->CONTROL_GROUP [1]->EVN [1]->event_type_cd =
		oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger
	Set oen_reply->CONTROL_GROUP [1]->EVN [1]->event_dt_tm = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_time_stamp

/******VISIT REASON*************************/
    select into "nl:"
          c.clinical_event_id, c.event_cd, c.event_end_dt_tm ;cve.field_value
     from 	clinical_event c,
     	;code_value_extension cve,
   	code_value_outbound cvo
     plan c where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
        and c.view_level = 1
         and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
         and substring(1,19, c.event_title_text) = "Triage Visit Reason"
        join cvo where cvo.code_value = c.event_cd
        and cvo.contributor_source_cd = contributor_source_cd
     order c.clinical_event_id desc
   HEAD c.event_cd
           bio_segments->obx1_ind = 1
           bio->OBX1->observation_val = build(c.result_val)
       with nocounter
/******END VISIT REASON*********************/

/******PRESENTING INFO**********************/
	select into "nl:"
	c.result_val
	from
	clinical_event c
	plan c
	where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	and c.view_level = 1
	and c.event_cd = nurse_assess_cd1
	and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	detail
		zv1->obx = trim(c.result_val)
		zv1->obx = trim(replace(zv1->obx,char(10)," ",0))
		zv1->obx = trim(replace(zv1->obx,char(13)," ",0))
		bio_segments->obx2_ind = 1
	with nocounter
/******END PRESENTING INFO*******************/

/******ADDITIONAL INFO - ASSESSMENT*********/	   
	declare blob_out = c32768
	declare nortf = c32768
	set bsize = 0
 
	declare OCF_COMP_CD    = f8
	set OCF_COMP_CD = uar_get_code_BY("MEANING", 120, "OCFCOMP")
	Declare b_cont = vc
 
	select into "nl:"
	from clinical_event c,
		ce_blob ce
	plan c
	where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and c.view_level = 1
		;and c.publish_flag = 1
		and c.event_cd = nurse_assess_cd2
		and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	join ce
	where c.event_id = ce.event_id and ce.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	order c.clinical_event_id DESC
	HEAD c.event_cd
		b_cont = ce.blob_contents
		if (ce.compression_cd = ocf_comp_cd)
			stat = uar_ocf_uncompress(b_cont,size(trim(b_cont,3)), blob_out, SIZE( blob_out ), 32768)
			stat = UAR_RTF2(blob_out, size(blob_out),nortf,size(nortf),bsize,0)
		else
			stat = UAR_RTF(b_cont, size(trim(b_cont,3)),nortf,size(nortf),bsize,0)
		endif
		ocf_blob_loc = findstring("ocf_blob",nortf,1,0)
		if (ocf_blob_loc)
			nortf = substring(1,ocf_blob_loc-1,nortf)
		endif
		bio_segments->obx2_ind = 1
		;zv1->obx = replace(concat(trim(nortf)," ",zv1->obx),char(10)," ",0)
		;zv1->obx = replace(zv1->obx,char(13)," ",0)
		nortf = trim(replace(nortf,char(10)," ",0))
		nortf = trim(replace(nortf,char(13)," ",0))
		zv1->obx = build(zv1->obx,"_",nortf)
	with nocounter
/******END ADDITIONAL INFO - ASSESSMENT*****/

/******ADDITIONAL INFO - RETRIAGE***********/	   
	declare blob_out = c32768
	declare nortf = c32768
	set bsize = 0
 
	declare OCF_COMP_CD    = f8
	set OCF_COMP_CD = uar_get_code_BY("MEANING", 120, "OCFCOMP")
	Declare b_cont = vc
 
	select into "nl:"
	from clinical_event c,
		ce_blob ce
	plan c
	where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and c.view_level = 1
		;and c.publish_flag = 1
		and c.event_cd = nurse_assess_cd3
		and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	join ce
	where c.event_id = ce.event_id and ce.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	order c.clinical_event_id DESC
	HEAD c.event_cd
		b_cont = ce.blob_contents
		if (ce.compression_cd = ocf_comp_cd)
			stat = uar_ocf_uncompress(b_cont,size(trim(b_cont,3)), blob_out, SIZE( blob_out ), 32768)
			stat = UAR_RTF2(blob_out, size(blob_out),nortf,size(nortf),bsize,0)
		else
			stat = UAR_RTF(b_cont, size(trim(b_cont,3)),nortf,size(nortf),bsize,0)
		endif
		ocf_blob_loc = findstring("ocf_blob",nortf,1,0)
		if (ocf_blob_loc)
			nortf = substring(1,ocf_blob_loc-1,nortf)
		endif
		bio_segments->obx2_ind = 1
		;zv1->obx = replace(concat(trim(nortf)," ",zv1->obx),char(10)," ",0)
		;zv1->obx = replace(zv1->obx,char(13)," ",0)
		nortf = trim(replace(nortf,char(10)," ",0))
		nortf = trim(replace(nortf,char(13)," ",0))
		zv1->obx = build(zv1->obx,"_",nortf)
	with nocounter
/******END ADDITIONAL INFO - RETRIAGE*******/

/******TRIAGE DATE TIME*********************/
	;retriage dt tm
	declare retriage = vc
	set retriage = "N"
	select into "nl:"
	cedr.result_dt_tm
	from
	clinical_event ce
	,code_value cv
	,ce_date_result cedr
	plan ce
	where ce.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	and ce.event_title_text = "Re-Triage Date & Time"
	and ce.valid_until_dt_tm = cnvtdatetime("31-DEC-2100 00:00:00")
	and ce.view_level = 1
	join cv
	where cv.code_value = ce.result_status_cd
	and cv.display_key != "INERROR"
	join cedr
	where cedr.event_id = ce.event_id
	and cedr.valid_until_dt_tm = cnvtdatetime("31-DEC-2100 00:00:00")
	detail
		bio_segments->obx2_ind = 1
		zv1->obx = build(zv1->obx,"_{TDTTM=",format(cedr.result_dt_tm,"YYYYMMDD;;D"),format(cedr.result_dt_tm,"HHMMSS;;M"),"}")
		retriage = "Y"
	with nocounter
	
	if (retriage = "N")
	;triage dt tm if retriage not populated
		select into "nl:"
		cedr.result_dt_tm
		from
		clinical_event ce
		,code_value cv
		,ce_date_result cedr
		plan ce
		where ce.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and ce.event_title_text = "Triage Date/Time - TRACKING"
		and ce.valid_until_dt_tm = cnvtdatetime("31-DEC-2100 00:00:00")
		and ce.view_level = 1
		join cv
		where cv.code_value = ce.result_status_cd
		and cv.display_key != "INERROR"
		join cedr
		where cedr.event_id = ce.event_id
		and cedr.valid_until_dt_tm = cnvtdatetime("31-DEC-2100 00:00:00")
		detail
			bio_segments->obx2_ind = 1
			zv1->obx = build(zv1->obx,"_{TDTTM=",format(cedr.result_dt_tm,"YYYYMMDD;;D"),format(cedr.result_dt_tm,"HHMMSS;;M"),"}")
		with nocounter
	endif
/******END TRIAGE DATE TIME*****************/

/******TRIAGE CATEGORY**********************/
	set retriage = "N"
	select into "nl:"
	c.clinical_event_id, c.event_cd, c.event_end_dt_tm 
	from clinical_event c,
	code_value_outbound cvo
	plan c where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	and c.view_level = 1
	;and c.publish_flag = 1
	and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
	and c.event_cd = temp_recategory_cd
	join cvo where cvo.code_value = c.event_cd
	and cvo.contributor_source_cd = contributor_source_cd
	order c.event_cd, c.event_end_dt_tm DESC
	HEAD c.event_cd
		retriage = "Y"
		bio_segments->obx2_ind = 1
		zv1->obx = build(zv1->obx,"_{",cvo.alias,"=",c.result_val,"}")
	with nocounter
	
	if (retriage = "N")
		select into "nl:"
		c.clinical_event_id, c.event_cd, c.event_end_dt_tm 
		from clinical_event c,
		code_value_outbound cvo
		plan c where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and c.view_level = 1
		;and c.publish_flag = 1
		and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
		and c.event_cd = temp_category_cd
		join cvo where cvo.code_value = c.event_cd
		and cvo.contributor_source_cd = contributor_source_cd
		order c.event_cd, c.event_end_dt_tm DESC
		HEAD c.event_cd
			bio_segments->obx2_ind = 1
			zv1->obx = build(zv1->obx,"_{",cvo.alias,"=",c.result_val,"}")
		with nocounter
	endif
/******END TRIAGE CATEGORY******************/

/******OBSERVATIONS*************************/
	select into "nl:"
		  c.clinical_event_id, c.event_cd, c.event_end_dt_tm ;cve.field_value
	from 	clinical_event c,
		;code_value_extension cve,
		code_value_outbound cvo
	plan c where c.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
		and c.view_level = 1
		;and c.publish_flag = 1
		and c.valid_until_dt_tm = cnvtdatetime("31-DEC-2100,00:00:00")
		;and (c.event_cd in (temp_axilla_cd, temp_intravascular_cd, temp_oesophageal_cd, temp_rectal_cd, temp_tympanic_cd)
		;or c.event_cd in (temp_oral_cd, heart_rate_cd, heart_rhythm_cd, pulse_rate_cd, pulse_character_cd)
		;or c.event_cd in (temp_indwelling_cd, mean_arterial_bp_cd, mean_arterial_bp_inv_cd)
		;or c.event_cd in (heart_rate_reg_cd, resp_rate_cd, resp_desc_cd, o2_sat_cd, fio2_cd)
		;or c.event_cd in (gcscore_cd, gcscale_cd, paed_gcs_cd, pain_score_cd)
		;or c.event_cd in (systolic_bp_cd, diastolic_bp_cd, ex_cause_cd)
		;or c.event_cd in (systolic_bp_inv_cd, diastolic_bp_inv_cd))
		and (c.event_cd in (temp_weight_cd,temp_specialty_cd,temp_temperature_cd)
		;or c.event_cd in (temp_retriage_dttm_cd,temp_category_cd,temp_recategory_cd,temp_ox_sat_cd)
		or c.event_cd in (temp_ox_sat_cd)
		or c.event_cd in (temp_resp_rate_cd,temp_resp_dist_cd,temp_visit_reason_cd,temp_pain_mov_cd,temp_pain_rest_cd)
		or c.event_cd in (temp_art_pres_cd,temp_heart_rate_reg_cd)
		or c.event_cd in (temp_heart_rate_cd,temp_gcs_comment1_cd,temp_glasgow_cd,temp_gcs_comment2_cd)
		or c.event_cd in (temp_fi02_cd,temp_dbp_cd,temp_bglt_cd,temp_bglb_cd))
	join cvo where cvo.code_value = c.event_cd
		and cvo.contributor_source_cd = contributor_source_cd
 
     order c.event_cd, c.event_end_dt_tm DESC ;cve.field_value
 
     HEAD c.event_cd
           bio_segments->obx2_ind = 1
           zv1->obx = build(zv1->obx,"_{",cvo.alias,"=",c.result_val,"}")
       with nocounter
/******END OBSERVATIONS*********************/
 
	set zv1->txa = build("TXA|1|ED|AP|",oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->admit_dt_tm,
	   "||||||||",oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id,"|||||AU")
	set bio->TXA->act_dt_tm = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->admit_dt_tm
	set bio->TXA->doc_num = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id
 
	set bio->OBX1->procedure_desc = "PP"
	set bio->OBX2->procedure_desc = "NA"
	set bio->OBX2->observation_val = zv1->obx
 
endif
 
set bio->MSH->send_application = oen_reply->CONTROL_GROUP [1]->MSH [1]->sending_application->name_id
set bio->MSH->send_facility = fac_cd
set bio->MSH->recv_application = oen_reply->CONTROL_GROUP [1]->MSH [1]->receiving_application->name_id
set bio->MSH->recv_facility = fac_cd
set bio->MSH->mesg_dt = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_time_stamp
set bio->MSH->mesg_type->type = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_type
set bio->MSH->mesg_type->event = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger
set bio->MSH->mesg_control_id = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_ctrl_id->ctrl_id1
 
set bio->EVN->mesg_type_event = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger
set bio->EVN->event_dt = oen_reply->CONTROL_GROUP [1]->MSH [1]->message_time_stamp
 

set pid3_size = size(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_int, 5)
IF(pid3_size > 0)
   FOR(x = 1 to pid3_size)
      ;IF(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_int [x]->assign_auth->name_id = "X630")
	  IF(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_int [x]->assign_auth->name_id = "A207")
         set bio->PID->mrn = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_int [x]->id
      ENDIF
   ENDFOR
ENDIF

;Set bio->PID->mrn = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_id_ext->id
 
set bio->PID->sex = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->sex
;-- DISABLED -- Author: Cerner
/*
set bio->PID->address =
  build("^^",oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [1]->city,
           "^",oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [1]->state_prov,
           "^",oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [1]->zip_code
         )
*/
;-- DISABLED -- Author: Cerner
;-- Modified Above Code - Author: Satish Athreya 26/05/2015
DECLARE total_addr=I4 WITH NOCONSTANT(0)
DECLARE addr_pos=I4 WITH NOCONSTANT(1)
DECLARE addr_index=I4 WITH NOCONSTANT(1),PUBLIC
DECLARE addr_string_type=VC WITH NOCONSTANT("")
SET total_addr = SIZE(oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address ,5  )
 
IF ( total_addr > 1)
  ;-- CRITICAL --
  ;; JGO comment per Meg Instruction - SET total_addr = total_addr +1
  /*
    SELECT INTO "nl:" cv1.Code_Value
    FROM Code_Value cv1, Code_Value_Set c
    PLAN c WHERE CNVTLOWER(c.Display)="address type"
    JOIN cv1 WHERE cv1.Code_Set = c.Code_Set AND CNVTLOWER( cv1.Definition )="home"
     DETAIL cv1.Code_Value
     CD:756
     addr_string_type = BUILD("CD:"cv1.Code_Value )
     WITH NOCOUNTER
  */
	SET addr_string_type = BUILD("CD:","756")
	SET addr_pos = LOCATEVAL(
				   addr_index ,1, total_addr,
				   addr_string_type,
				   oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [ addr_index ]->types   )
	IF (addr_pos = 0 )
		;If not found then return the first address instance
		SET addr_pos = 1
	ENDIF
  ;-- CRITICAL --
ELSE
	;If not found then return the first address instance
	SET addr_pos = 1
ENDIF
 
;SET bio->PID->address = ""
SET bio->PID->address = BUILD (bio->PID->address, "^")
;Append city
SET bio->PID->address =
		BUILD(bio->PID->address,"^",
			oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [ addr_pos ]->city)
;Append address state
SET bio->PID->address =
		BUILD(bio->PID->address,"^",
			oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [ addr_pos ]->state_prov)
;Append post code
SET bio->PID->address =
		BUILD(bio->PID->address,"^",
			oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PID [1]->patient_address [ addr_pos ]->zip_code)
 
;-- Modified Above Code - Author: Satish Athreya 26/05/2015
 
set bio->PV1->visit_id = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->visit_nbr [1]->id
set bio->PV1->admit_dt = oen_reply->PERSON_GROUP [1]->PAT_GROUP [1]->PV1 [1]->admit_dt_tm
 
 
/**************************************************************
    GENERATE BIO-SURVEILLIANCE SEGMENTS
**************************************************************/
set bio_segments->MSH =
	build("MSH",
		"|^~\&",
		"|",bio->MSH->send_application,
		"|",bio->MSH->send_facility,
		"|",bio->MSH->recv_application,
		"|",bio->MSH->recv_facility,
		"|",bio->MSH->mesg_dt,
		"|",
		"|",bio->MSH->mesg_type->type,"^",bio->MSH->mesg_type->event,
		"|",bio->MSH->mesg_control_id,
		"|T|2.3|||NE|NE||ASCII||"
	   )
 
set bio_segments->EVN =
	build("EVN",
		"|",bio->EVN->mesg_type_event,
		"|",bio->EVN->event_dt
	   )
 
set bio_segments->PID =
	build("PID",
		"|1|",
		"|",bio->PID->mrn,
		"||||",
		"|",bio->PID->sex,
		"||",
		"|",bio->PID->address
	   )
 
set bio_segments->PV1 =
	build("PV1",
		"|1|E||||||||||||||||",
		"|",bio->PV1->visit_id,
		"||||||||||||||||||||||||",
		"|",bio->PV1->admit_dt
		)
 
set bio_segments->ZV1 =
	build("ZV1|1|",
		"|",bio->ZV1->visit_type,
		"|",bio->ZV1->triage_cat,
		"|",bio->ZV1->age,
		"|||",bio->ZV1->birth_country,
		"|",bio->ZV1->residence_country,
		"|",bio->ZV1->mesg_dt_tm,
		"|",bio->ZV1->disposition,
		"|",bio->ZV1->mode_of_arrival
		)
 
set bio_segments->TXA =
	build("TXA|1|ED|AP",
		"|",bio->TXA->act_dt_tm,
		"|||||||",
		"|",bio->TXA->doc_num,
		"|||||AU"
		)
 
set bio_segments->OBX1 =
	build("OBX|1|TX",
		"|",bio->OBX1->procedure_desc,
		"|",
		"|",bio->OBX1->observation_val
		)
 
set bio_segments->OBX2 =
	build("OBX|2|TX",
		"|",bio->OBX2->procedure_desc,
		"|",
		"|",bio->OBX2->observation_val
		)
 
# EXIT_SCRIPT
 
/**************************************************************
; DVDev DEFINED SUBROUTINES
**************************************************************/
 
 
;*********************************
;** GET_DOUBLE_VALUE subroutine **
;** 004 - MCA Logic             **
;*********************************
subroutine get_double_value(double_meaning)
	declare eso_idx = i4 with noconstant(0)
	declare list_size = i4 with noconstant(0)
	declare charstat = c100
 
	set charstat = (validate(oen_reply->cerner, "0"))
	if (charstat = "0")
		return(-1)
	else
		set eso_idx = 0
		set list_size = 0
		set list_size = size(oen_reply->cerner->doubleList,5)
 
		if( list_size > 0 )
			set eso_x = 1
			for ( eso_x = eso_x to list_size )
				if(oen_reply->cerner->doubleList[eso_x]->strMeaning = double_meaning)
					set eso_idx = eso_x
				endif
			endfor
		endif
 
		if( eso_idx > 0 )
			return( oen_reply->cerner->doubleList[eso_idx]->dval )
		else
			execute oencpm_msglog(build("inside return 0->", eso_idx, char(0)))
			return(0)
		endif
	endif
end ; // get_double_value
 
end ; // oen_eso_bios_modobj
go
 