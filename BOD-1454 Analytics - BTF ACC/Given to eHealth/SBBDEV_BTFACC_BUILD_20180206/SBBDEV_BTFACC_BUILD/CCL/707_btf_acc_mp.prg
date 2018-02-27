/*;********************************************************************************************************
;*******************************************  MODIFICATION LOG  *******************************************
;**********************************************************************************************************
; No    Date            JIRA Ticket#	Programmer      Comment
; 001	09/11/2017	    BOD-1454		Javad Adeli	  	Initial Release. BTF Altered Calling Criteria JSON
;														output used in BTF ACC MPage custom Componenet
;														in Analytics MPage.
; 002	5/2/2018						Javad Adeli		adding facilities to the recorde structured to be
;														used dynamically in the MPage component filters,
;														also declaring variables locally to eliminate need
;														need for the extra CCL (707_schn_get_cv)
;
;**********************************************************************************************************/
 
drop program 707_btf_acc_mp go
create program 707_btf_acc_mp
 
prompt
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
 
with OUTDEV
 
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
;execute 707_schn_get_cv ;002
declare inpatient_cd 	= f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"INPATIENT"))
declare emerg_cd 		= f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"EMERGENCY"))
declare oupat_cd 		= f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"OUTPATIENT"))
declare mrn_cd  		= f8 with Constant(uar_get_code_by("MEANING",319,"MRN"))
declare mrn_pool_cd  	= f8 with Constant(uar_get_code_by("DISPLAYKEY",263,"PATIENTMASTERINDEX"))
 
;**Record structure definition**
free record enc
record enc
(1 qual[*]
    2 encntr_id 			= f8
    2 person_id 			= f8
   	2 mrn 					=  vc
   	2 name 					= vc
   	2 encntr_type 			= vc
   	2 modified_vital_sign 	= vc
	2 next_review 			= vc
	2 last_updated 			= vc
	2 amo_id 				= f8
	2 amo 					= c100
	2 last_signed_clinician = vc
	2 ward_cd 				= f8	;002
	2 ward 					= c100	;002
	2 facility_cd 			= f8	;002
	2 facility 				= c100	;002
	2 specialty_cd 			= f8
	2 specialty 			= vc
	2 acc_comment 			= vc
	2 general_comment 		= vc
	2 acc_flag 				= i2
	2 acc_overdue_flag 		= i2
	2 acc_status 			= vc
;	2 dob  = vc
;	2 age = vc
;	2 gender = c8
;	2 admit_dt_tm = vc
;	2 disch_dt_tm = vc
;	2 edd = vc
;   2 summary_status =  c100
; 	2 summary_date = c100
; 	2 author_id = f8
; 	2 author = c100
; 	2 updated_id = f8
; 	2 updated_by = c100
; 	2 updated_date = vc
; 	2 performed_dt_tm = vc
;   2 entry_mode = vc
;	2 disch_dispo = c100
;	2 disch_loc = c100
;	2 disdt_range  = i4
 
1 amofilter[*]
    2 amo_person_id 		= f8
	2 amo_name 				= vc
 
1 medservicefilter[*]
    2 med_service_codes 	= f8
	2 med_service_name 		= vc
 
1 facilityfilter[*]	;002
	2 facility_cd 			= f8	;002
	2 facility_name 		= vc	;002
 
1 wardfilter[*]
	2 ward_cd 				= f8	;002
	2 ward_name 			= vc
 
1 encntrtypefilter[*]
	2 encntr_type 			= vc
 
1 user[1]
	2 user_id 				= f8
)
 
;****** main query to get ACC details ******
select into "nl:"
      name 					= trim(substring(1,25,pe.name_full_formatted),3)
	, mrn 					= substring(1,10,ea.alias)
	, encntr_type 			= trim(uar_get_code_display(e.encntr_type_cd),3)
	, modified_vital_sign 	= trim( c.modified_vital_name,3)
	, last_updated 			= format (c.updt_dt_tm, "dd/mm/yyyy hh:mm:SS")
	, next_review 			= format(c.next_review_dt_tm, "dd/mm/yyyy hh:mm")
	, amo 					= trim(substring(1,18,c.altered_prsnl_name),3)
	, last_signed_clinician = trim(substring(1,20,p.name_full_formatted),3)
	, ward_cd 				= e.loc_nurse_unit_cd ;002
	, ward 					= trim(uar_get_code_display(e.loc_nurse_unit_cd),3)
	, facility_cd 			= e.loc_facility_cd ;002
	, facility 				= trim(uar_get_code_display(e.loc_facility_cd), 3) ;002
	, speciality_cd 		= e.med_service_cd
	, speciality 			= trim(substring(1,35,uar_get_code_display(e.med_service_cd)),3)
	, acc_comments 			= substring(1,15, c.info_char2)
	, general_comments 		= substring(1,15, c.modified_reason)
	, acc_flag 				= if(c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
								1 else 0
						 	  endif
	, acc_overdue_flag 		= if(c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
								1 else 0
						 	  endif
	, acc_status 			= if(c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
								"ACC"
							  elseif(c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
								"OVERDUE"
							  endif
	, admit_dt_tm 			= e.beg_effective_dt_tm
	, disch_dt_tm 			= e.disch_dt_tm
    , altered_criteria_id 	= c.altered_criteria_id
    , altered_criteria_dt_tm = format (c.altered_criteria_dt_tm, "dd/mm/yyyy hh:mm:SS")
from
	  cust_mp_altered_criteria   c
	, prsnl   p
	, encounter   e
	, encntr_alias   ea
	, person   pe
 
plan c where c.modified_vital_name != "RESET"
 	and c.modified_vital_name  != "RESET_FREQ"
 	and c.modified_vital_name  != "FREQREQ"
; 	and c.modified_vital_name  != "REVIEWED"
; 	and c.modified_vital_name  != "NRR"
	and c.active_ind = 1
	and c.info_number3 > 1
	and c.altered_criteria_id in (select max( cmac.altered_criteria_id )
                             		from cust_mp_altered_criteria cmac
                           	 		;where c.modified_vital_name = cmac.modified_vital_name
                             		where c.person_id = cmac.person_id
                             			and cmac.modified_vital_name  != "RESET"
							 			and cmac.modified_vital_name  != "RESET_FREQ"
							 			and cmac.modified_vital_name  != "FREQREQ"
							 			;and cmac.modified_vital_name  != "REVIEWED"
							 			;and cmac.modified_vital_name  != "NRR")
							 		)
 
	and c.next_review_dt_tm != null
 
join p where c.info_number3 = p.person_id
	and p.active_ind = 1
 
join e where c.encntr_id = e.encntr_id
	and e.active_ind = 1
	and e.encntr_type_cd in (inpatient_cd, emerg_cd)
	and e.disch_dt_tm = null
 
join ea where ea.encntr_id = e.encntr_id
	and ea.encntr_alias_type_cd = mrn_cd
	;and ea.alias_pool_cd = mrn_pool_cd
	and ea.active_ind = 1
	and ea.beg_effective_dt_tm < cnvtdatetime ( curdate , curtime3)
	and ea.end_effective_dt_tm > cnvtdatetime ( curdate , curtime3)
 
join pe where pe.person_id = c.person_id
	and  pe.active_ind = 1
 
order by ward
		, name
		, e.encntr_id
 
head report
   enc_cnt = 0
   stat = alterlist(enc->qual,1000)
 
head ward
	d=0
 
head e.encntr_id
	enc_cnt = enc_cnt + 1
	if (mod(enc_cnt,1000) = 1 and enc_cnt != 1)
		stat = alterlist(enc->qual,enc_cnt + 999)
	endif
 
foot e.encntr_id
 
	enc->qual[enc_cnt].name 					= name
	enc->qual[enc_cnt].mrn 						= mrn
	enc->qual[enc_cnt].encntr_type 				= encntr_type
	enc->qual[enc_cnt].modified_vital_sign 		= modified_vital_sign
	enc->qual[enc_cnt].last_updated 			= last_updated
	enc->qual[enc_cnt].next_review 				= next_review
	enc->qual[enc_cnt].amo 						= amo
	;enc->qual[enc_cnt].amo_id 					= 0 ;cust_mp_altered_criteria table does ot hold amo person_id
	enc->qual[enc_cnt].last_signed_clinician 	= last_signed_clinician
	enc->qual[enc_cnt].ward_cd 					= ward_cd ;002
	enc->qual[enc_cnt].ward 					= ward
	enc->qual[enc_cnt].facility_cd 				= facility_cd ;002
	enc->qual[enc_cnt].facility 				= facility ;002
	enc->qual[enc_cnt].specialty_cd 			= speciality_cd
	enc->qual[enc_cnt].specialty 				= speciality
	enc->qual[enc_cnt].acc_comment 				= acc_comments
	enc->qual[enc_cnt].general_comment 			= general_comments
	enc->qual[enc_cnt].acc_flag 				= acc_flag
	enc->qual[enc_cnt].acc_overdue_flag 		= acc_overdue_flag
	enc->qual[enc_cnt].acc_status 				= acc_status
	enc->qual[enc_cnt].encntr_id 				= e.encntr_id
    enc->qual[enc_cnt].person_id 				= e.person_id
;	enc->qual[enc_cnt].dob 						= format(p.birth_dt_tm ,"dd/mm/yyyy ;;d")
;	enc->qual[enc_cnt].gender 					= uar_get_code_display(p.sex_cd)
;	enc->qual[enc_cnt].age 						= cnvtage(p.birth_dt_tm)
;	enc->qual[enc_cnt].admit_dt_tm 				= format(e.reg_dt_tm, "dd/mm/yyyy hh:mm;;d")
;	enc->qual[enc_cnt].disch_dt_tm 				= format(e.disch_dt_tm, "dd/mm/yyyy hh:mm;;d")
;	enc->qual[enc_cnt].edd 						= format(e.est_depart_dt_tm,"dd/mm/yyyy;;d")
;	enc->qual[enc_cnt].disch_dispo 				= uar_get_code_display(e.disch_disposition_cd)
; 	enc->qual[enc_cnt].disch_loc 				= uar_get_code_display(e.disch_to_loctn_cd)
; 	enc->qual[enc_cnt].med_service_cd 			= e.med_service_cd
;   enc->qual[enc_cnt].disdt_range 				= IF(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) <= 7)
;    								 				7
;   								 			elseif((datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) >= 7 )
;   												AND(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1)<= 14 ) )
;   												14
;   								 			elseif((datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) >= 14 )
;   												AND(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) <= 30 ) )
;   												30
;    								 			endif
 
foot report
         stat = alterlist(enc->qual,enc_cnt)
 
with nocounter
 
/**************************************************
 *	Get the unique facility names from the main query ******
 **************************************************/
select distinct into "nl:"
	QUAL_FACILITY_CD 	= ENC->qual[D1.SEQ].facility_cd
	, QUAL_FACILITY 	= ENC->qual[D1.SEQ].facility
 
from
	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
 
plan D1
 
order by
	QUAL_FACILITY
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->facilityfilter, 5)
 
head QUAL_FACILITY
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->facilityfilter, cnt + 4)
	endif
	;enc->facilityfilter[cnt].facility_cd = QUAL_FACILITY_CD
	enc->facilityfilter[cnt].facility_name = QUAL_FACILITY
 
foot report
	stat = alterlist(enc->facilityfilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique ward names from the main query
 **************************************************/
select distinct into "nl:"
	QUAL_WARD 	= ENC->qual[D1.SEQ].ward
 
from
	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
 
plan D1
 
order by
	QUAL_WARD
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->wardfilter, 5)
 
head QUAL_WARD
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->wardfilter, cnt + 4)
	endif
	enc->wardfilter[cnt].ward_name = QUAL_WARD
 
foot report
	stat = alterlist(enc->wardfilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique encntr types from the main query
 **************************************************/
select distinct into "nl:"
	QUAL_ENCNTR_TYPE = ENC->qual[D1.SEQ].encntr_type
 
from
	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
 
plan D1
 
order by
	QUAL_ENCNTR_TYPE
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->encntrtypefilter, 5)
 
head QUAL_ENCNTR_TYPE
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->encntrtypefilter, cnt + 4)
	endif
	enc->encntrtypefilter [cnt].encntr_type = QUAL_ENCNTR_TYPE
 
foot report
	stat = alterlist(enc->encntrtypefilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique specialties from the main query
 **************************************************/
select distinct into "nl:"
     med_service_cd = enc->qual[d1.seq].specialty_cd
 
from (dummyt d1 with seq = VALUE(SIZE(ENC->qual, 5)))
   	, code_value c
 
plan d1
 
join c
where  c.code_value = enc->qual[d1.seq].specialty_cd
and c.code_set = 34
and c.active_ind = 1
 
order by c.display
		 , c.code_value
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->medservicefilter, 5)
 
head c.code_value
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->medservicefilter, cnt + 4)
	endif
	enc->medservicefilter[cnt]->med_service_codes = c.code_value
	enc->medservicefilter[cnt]->med_service_name = c.display
 
foot report
	stat = alterlist(enc->medservicefilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique amo names from the main query
 **************************************************/
select distinct into "nl:"
     amo = ENC->qual[d1.seq].amo
     ;prs.person_id
from (dummyt d1 with seq = VALUE(SIZE(ENC->qual, 5)))
   ;, prsnl prs
 
plan d1
 
;join prs
;where trim(prs.name_full_formatted, 3) = enc->qual[d1.seq].amo
;and prs.active_ind = 1
 
order by amo
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->amofilter, 5)
 
head amo
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->amofilter, cnt + 4)
	endif
	;enc->amofilter[cnt]->amo_person_id = prs.person_id
	enc->amofilter[cnt]->amo_name = amo
 
foot report
	stat = alterlist(enc->amofilter, cnt)
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
/**************************************************
 *	Get the user ID
 **************************************************/
select into "nl:"
 
from prsnl p
 
where p.person_id = REQINFO->UPDT_ID
 
detail
  if (p.person_id > 0)
  	enc->user[1]->user_id = p.person_id
  else
  	enc->user[1]->user_id = 0
  endif
 
with nocounter
 
;******testing record structure loading************
;SELECT into $outdev ;"nl:";
;
;	QUAL_PATIENTNAME = ENC->qual[D1.SEQ].name
;	, QUAL_MRN = ENC->qual[D1.SEQ].mrn
;	, QUAL_ENCNTR_TYPE = ENC->qual[D1.SEQ].encntr_type
;	, QUAL_MODIFIED_VITAL_SIGN = ENC->qual[D1.SEQ].modified_vital_sign
;	, QUAL_NEXT_REVIEW = ENC->qual[D1.SEQ].next_review
;	, QUAL_AMO = ENC->qual[D1.SEQ].amo
;	, QUAL_LAST_UPDATED = ENC->qual[D1.SEQ].last_updated
;	, QUAL_WARD = ENC->qual[D1.SEQ].ward
;	, QUAL_FACILITY = ENC->qual[D1.SEQ].facility
;	, QUAL_LAST_SIGNED_CLINICIAN = ENC->qual[D1.SEQ].last_signed_clinician
;	, QUAL_SPECIALTY = ENC->qual[D1.SEQ].specialty
;	, QUAL_ACC_COMMENT = ENC->qual[D1.SEQ].acc_comment
;	, QUAL_GENERAL_COMMENT = ENC->qual[D1.SEQ].general_comment
;	, QUAL_ACC_FLAG = ENC->qual[D1.SEQ].acc_flag
;	, QUAL_ACC_OVERDUE_FLAG = ENC->qual[D1.SEQ].acc_overdue_flag
;	, QUAL_ACC_STATUS = ENC->qual[D1.SEQ].acc_status
;	, QUAL_ENCNTR_ID = ENC->qual[D1.SEQ].encntr_id
;	, QUAL_PERSONID = ENC->qual[D1.SEQ].person_id
;
;FROM
;	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
;
;PLAN D1
;
;WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
/*************************************************************
 JASON OUTPUT
;************************************************************/
 
set sJSON = cnvtrectojson(enc)
call echo(sJSON)
 
;***Set public memory variable equal to the JSON string***
set _Memory_Reply_String = sJSON
 
end go
