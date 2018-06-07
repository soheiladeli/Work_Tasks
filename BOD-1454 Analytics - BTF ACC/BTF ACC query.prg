
select ;into "nl:"
      name 						= trim(substring(1,25,pe.name_full_formatted),3)
	, mrn 						= substring(1,10,ea.alias)
	, encntr_type 				= trim(uar_get_code_display(e.encntr_type_cd),3)
	, modified_vital_sign 		= trim( c.modified_vital_name,3)
	, last_updated 				= format (c.updt_dt_tm, "dd/mm/yyyy hh:mm:SS")
	, next_review 				= format(c.next_review_dt_tm, "dd/mm/yyyy hh:mm")
	, amo 						= trim(substring(1,40,c.altered_prsnl_name),3)
	, last_signed_clinician 	= trim(substring(1,40,p.name_full_formatted),3)
	, ward_cd 					= e.loc_nurse_unit_cd ;002
	, ward 						= trim(uar_get_code_display(e.loc_nurse_unit_cd),3)
	, facility_cd 				= e.loc_facility_cd ;002
	, facility 					= trim(uar_get_code_display(e.loc_facility_cd), 3) ;002
	, speciality_cd 			= e.med_service_cd
	, speciality 				= trim(substring(1,35,uar_get_code_display(e.med_service_cd)),3)
	, acc_comments 				= substring(1,100, c.info_char2)
	, general_comments 			= substring(1,100, c.modified_reason)
	, acc_flag 					= if(c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
									1 else 0
						 	  	  endif
	, acc_overdue_flag 			= if(c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
									1 else 0
						 	  	  endif
	, acc_status 				= if(c.next_review_dt_tm > CNVTDATETIME(CURDATE, curtime3) )
									"ACC"
							  	  elseif(c.next_review_dt_tm < CNVTDATETIME(CURDATE, curtime3))
									"OVERDUE"
							  	  endif
	, admit_dt_tm 				= e.beg_effective_dt_tm
	, disch_dt_tm 				= e.disch_dt_tm
    , altered_criteria_id 		= c.altered_criteria_id
    , altered_criteria_dt_tm 	= format (c.altered_criteria_dt_tm, "dd/mm/yyyy hh:mm:SS")
from
	  cust_mp_altered_criteria   c
	, prsnl   p
	, encounter   e
	, encntr_alias   ea
	, person   pe
 
plan c where c.modified_vital_name != "RESET"
		and c.modified_vital_name  != "RESET_FREQ"
 		and c.modified_vital_name  != "FREQREQ"
; 		and c.modified_vital_name  != "REVIEWED"
; 		and c.modified_vital_name  != "NRR"
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
		and e.encntr_type_cd in (7043.00, 7044.00, 3078689.00) ;(inpatient_cd, emergency_cd)
		and e.disch_dt_tm = null ;///
 
join ea where ea.encntr_id = e.encntr_id
		and ea.encntr_alias_type_cd = 93 ;mrn_cd
		;and ea.alias_pool_cd = mrn_pool_cd ;002
		and ea.active_ind = 1
		and ea.beg_effective_dt_tm < cnvtdatetime ( curdate , curtime3)
		and ea.end_effective_dt_tm > cnvtdatetime ( curdate , curtime3)
 
join pe where pe.person_id = c.person_id
		and  pe.active_ind = 1
 
order by ward
		, name
		, e.encntr_id
