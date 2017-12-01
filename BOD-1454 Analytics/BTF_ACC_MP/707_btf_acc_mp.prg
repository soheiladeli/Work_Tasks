/*;**************************************************************************************
; **********************        MODIFICATION LOG  ***************************************
;****************************************************************************************
; No    Date            Programmer      Comment
; 000	09/11/2017	    Javad Adeli	  	Initial Release BTF Altered Calling Criteria JSON
;										output used for BTF ACC MPage custom Componenet
;										used in Analytics MPage.
;
;****************************************************************************************/
 
drop program 707_btf_acc_mp go
create program 707_btf_acc_mp
 
prompt
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
 
with OUTDEV
 
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
execute 707_schn_get_cv
;execute 707_schn_rpt_cflib
set cnt = 0
set num_fac = 0
;execute 707_schn_prompt_library "parser","fac",$fac_list, "0", "0"
;set num_ward = 0
 
;;***Record structure definition**
free record enc
record enc
(1 qual[*]
    2 encntr_id = f8
    2 person_id = f8
   	2 mrn =  vc
   	2 name = vc
   	2 encntr_type = vc
   	2 modified_vital_sign = vc
	2 next_review = vc
	2 last_updated = vc
	2 amo_id = f8
	2 amo = c100
	2 last_signed_clinician = vc
	2 ward = c100
	2 specialty_cd = f8
	2 specialty = vc
	2 acc_comment = vc
	2 general_comment = vc
	2 acc_flag = i2
	2 acc_overdue_flag = i2
	2 nrr_flag = i2
	2 acc_status = vc
;	2 dob  = vc
;	2 age = vc
;	2 gender = c8
;	2 admit_dt_tm = vc
;	2 disch_dt_tm = vc
;	2 edd = vc
;	2 medical_service = c100
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
 
;	2 eventid = f8
;	2 med_service_cd = f8
;	2 disdt_range  = i4
;	2 amo_person_id = f8
;	2 med_service_codes = f8
 
;1 amofilter[*]
;    2 amo_person_id = f8
;	2 amo_name = vc
 
1 medservicefilter[*]
    2 med_service_codes = f8
	2 med_service_name = vc
 
1 wardfilter[*]
	2 ward_name = vc
;
1 encntrtypefilter[*]
	2 encntr_type = vc
;
;1 user[1]
;	2 user_id = f8
)
 
select into value($1)
      name = trim(substring(1,25,pe.name_full_formatted),3)
	, mrn = substring(1,10,ea.alias)
	, encntr_type = trim(uar_get_code_display(e.encntr_type_cd),3)
	, modified_vital_sign = trim( c.modified_vital_name,3)
	, last_updated = format (c.updt_dt_tm, "dd/mm/yyyy hh:mm:SS")
	, next_review = format(c.next_review_dt_tm, "dd/mm/yyyy hh:mm")
	, amo = trim(substring(1,18,c.altered_prsnl_name),3)
	, last_signed_clinician = trim(substring(1,20,p.name_full_formatted),3)
	, ward =  trim(uar_get_code_display(e.loc_nurse_unit_cd),3)
	, speciality_cd = e.med_service_cd
	, speciality =  trim(substring(1,35,uar_get_code_display(e.med_service_cd)),3)
	, acc_comments = substring(1,15, c.info_char2)
	, general_comments = substring(1,15, c.modified_reason)
	, acc_flag = if(trim( c.modified_vital_name,3) != "NRR" and c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
							1 else 0
						 endif
	, acc_overdue_flag = if(trim( c.modified_vital_name,3) != "NRR" and c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
							1 else 0
						 endif
	, nrr_flag = if(trim( c.modified_vital_name,3)= "NRR")
							1 else 0
						 endif
	, acc_status = if(trim( c.modified_vital_name,3) != "NRR" and c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
						"ACC"
					elseif(trim( c.modified_vital_name,3) != "NRR" and c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
						"OVERDUE"
					elseif(trim( c.modified_vital_name,3)= "NRR")
						"NRR"
					endif
	, admit_dt_tm = e.beg_effective_dt_tm
	, disch_dt_tm = e.disch_dt_tm
    , altered_criteria_id = c.altered_criteria_id
    , altered_criteria_dt_tm = format (c.altered_criteria_dt_tm, "dd/mm/yyyy hh:mm:SS")
from
	  cust_mp_altered_criteria   c
	, prsnl   p
	, encounter   e
;	, code_value cv2
;	, code_value cv3
;	, code_value cv4
	, encntr_alias   ea
	, person   pe
 
plan c
where c.modified_vital_name != "RESET"
 and c.modified_vital_name  != "RESET_FREQ"
 and c.modified_vital_name  != "FREQREQ"
; and c.modified_vital_name  != "REVIEWED"
; and c.modified_vital_name  != "NRR"
and c.active_ind = 1
and c.info_number3 > 1
and c.altered_criteria_id in (select max( cmac.altered_criteria_id )
                             from cust_mp_altered_criteria cmac
                           ;  where c.modified_vital_name = cmac.modified_vital_name
                             where c.person_id = cmac.person_id
                             and cmac.modified_vital_name  != "RESET"
							 and cmac.modified_vital_name  != "RESET_FREQ"
							 and cmac.modified_vital_name  != "FREQREQ"
							 ;and cmac.modified_vital_name  != "NRR")
							 )
 
and c.nrr_flag = null
 
join p
where c.info_number3 = p.person_id
and p.active_ind = 1
 
join e
where c.encntr_id = e.encntr_id
and e.active_ind = 1
and e.encntr_type_cd in (inpatient, emergency)
;and expand(num_fac,1,fac_rec->fac_cnt,e.loc_facility_cd,fac_rec->qual[num_fac].fac_cd)
and e.disch_dt_tm = null
;and cvo.code_value(expand(num_ward,1,ward_rec->ward_cnt,e.loc_nurse_unit_cd,ward_rec->qual[num_ward].ward_cd) or
;     			 -1 = ward_rec->qual[1].ward_cd)
;JOIN cv2
;where cv2.code_value = e.loc_nurse_unit_cd
;and   cv2.display = $ward
;and   cv2.code_set = 220
;and   cv2.active_ind  = 1
;
;JOIN cv3
;where cv3.code_value = e.encntr_type_cd
;and   cv3.display = $enc_type
;and   cv3.code_set = 71
;and   cv3.active_ind  = 1
;
;JOIN cv4
;where cv4.code_value = e.med_service_cd
;and   cv4.display = $speciality
;and   cv4.code_set = 34
;and   cv4.active_ind = 1
 
join ea
where ea.encntr_id = e.encntr_id
and ea.encntr_alias_type_cd = MEDRECNO
and ea.alias_pool_cd = mrn_pool
and ea.active_ind = 1
and ea.beg_effective_dt_tm < cnvtdatetime ( curdate , curtime3)
and ea.end_effective_dt_tm > cnvtdatetime ( curdate , curtime3)
 
join pe
where pe.person_id = c.person_id
and  pe.active_ind = 1
 
;order by ward, c.next_review_dt_tm
order by ward
		, name
 
;/*
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
	;d = 1
 
	enc->qual[enc_cnt].name = name
	enc->qual[enc_cnt].mrn = mrn
	enc->qual[enc_cnt].encntr_type = encntr_type
	enc->qual[enc_cnt].modified_vital_sign = modified_vital_sign
	enc->qual[enc_cnt].last_updated = last_updated
	enc->qual[enc_cnt].next_review = next_review
	enc->qual[enc_cnt].amo = amo
	enc->qual[enc_cnt].last_signed_clinician = last_signed_clinician
	enc->qual[enc_cnt].ward = ward
	enc->qual[enc_cnt].specialty_cd = speciality_cd
	enc->qual[enc_cnt].specialty = speciality
	enc->qual[enc_cnt].acc_comment = acc_comments
	enc->qual[enc_cnt].general_comment = general_comments
	enc->qual[enc_cnt].acc_flag = acc_flag
	enc->qual[enc_cnt].acc_overdue_flag = acc_overdue_flag
	enc->qual[enc_cnt].nrr_flag = nrr_flag
	enc->qual[enc_cnt].acc_status = acc_status
	enc->qual[enc_cnt].encntr_id = e.encntr_id
    enc->qual[enc_cnt].person_id= e.person_id
;	enc->qual[enc_cnt].dob = format(p.birth_dt_tm ,"dd/mm/yyyy ;;d")
;	enc->qual[enc_cnt].gender = uar_get_code_display(p.sex_cd)
;	enc->qual[enc_cnt].age = cnvtage(p.birth_dt_tm)
;	enc->qual[enc_cnt].admit_dt_tm = format(e.reg_dt_tm, "dd/mm/yyyy hh:mm;;d")
;	enc->qual[enc_cnt].disch_dt_tm = format(e.disch_dt_tm, "dd/mm/yyyy hh:mm;;d")
;	enc->qual[enc_cnt].edd = format(e.est_depart_dt_tm,"dd/mm/yyyy;;d")
 
;	enc->qual[enc_cnt].medical_service = uar_get_code_display(e.med_service_cd)
 
;	enc->qual[enc_cnt].amo_id = prs1.person_id
;	enc->qual[enc_cnt].disch_dispo = uar_get_code_display(e.disch_disposition_cd)
; 	enc->qual[enc_cnt].disch_loc = uar_get_code_display(e.disch_to_loctn_cd)
; 	enc->qual[enc_cnt].med_service_cd = e.med_service_cd
;    enc->qual[enc_cnt].disdt_range = IF(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) <= 7)
;    									  7
;   										elseif((datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) >= 7 )
;   										AND(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1)<= 14 ) )
;   										  14
;   										elseif((datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) >= 14 )
;   										AND(datetimediff(cnvtdatetime(curdate, curtime3) , e.disch_dt_tm,1) <= 30 ) )
;   										  30
;    								 endif
 
foot report
         stat = alterlist(enc->qual,enc_cnt)
 
with nocounter, outerjoin = d2
 
;;***** get the unique wards ******
SELECT distinct into "nl:"
	QUAL_WARD = ENC->qual[D1.SEQ].ward
 
FROM
	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
 
PLAN D1
 
ORDER BY
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
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
SET size_array_wardfilter = SIZE(enc->wardfilter,5)
 
;;***** get the unique encntr types ******
SELECT distinct into "nl:"
	QUAL_ENCNTR_TYPE = ENC->qual[D1.SEQ].encntr_type
 
FROM
	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ENC->qual, 5)))
 
PLAN D1
 
ORDER BY
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
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
SET size_array_wardfilter = SIZE(enc->encntrtypefilter,5)
 
;;***** Get the unique specialty******
select distinct into "nl:"
     e.med_service_cd
 
from (dummyt d1 with seq = VALUE(SIZE(ENC->qual, 5)))
   	, code_value c
 
plan d1
 
join c
where  c.code_value = enc->qual[d1.seq].specialty_cd
and c.code_set = 34
and c.active_ind = 1
 
order by c.display, c.code_value
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(enc->medservicefilter, 5)
 
head c.code_value
;;;;enc->qual[d1.seq].med_service_codes  = c.code_value
 
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(enc->medservicefilter, cnt + 4)
	endif
	enc->medservicefilter[cnt]->med_service_codes = c.code_value
	enc->medservicefilter[cnt]->med_service_name = c.display
 
foot report
	stat = alterlist(enc->medservicefilter, cnt)
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
SET size_array_medservicefilter = SIZE(enc->medservicefilter,5)
 
;;testing record structure
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
;	, QUAL_LAST_SIGNED_CLINICIAN = ENC->qual[D1.SEQ].last_signed_clinician
;	, QUAL_SPECIALTY = ENC->qual[D1.SEQ].specialty
;	, QUAL_ACC_COMMENT = ENC->qual[D1.SEQ].acc_comment
;	, QUAL_GENERAL_COMMENT = ENC->qual[D1.SEQ].general_comment
;	, QUAL_ACC_FLAG = ENC->qual[D1.SEQ].acc_flag
;	, QUAL_ACC_OVERDUE_FLAG = ENC->qual[D1.SEQ].acc_overdue_flag
;	, QUAL_NRR_FLAG = ENC->qual[D1.SEQ].nrr_flag
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
;***Set public memory variable equal to our JSON string***
set _Memory_Reply_String = sJSON
 
end go
 
 
 
