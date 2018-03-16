/*;********************************************************************************************************
;*******************************************  MODIFICATION LOG  *******************************************
;**********************************************************************************************************
; No    Date            JIRA Ticket#	Programmer      Comment
; 000	09/11/2017	    BAU-485			Javad Adeli	  	Initial Release. Oustanding consults orders to be
;														used in Outstanding Consults MPage custom Component
;														in Analytics MPage.
;
;**********************************************************************************************************/
 
drop program 707_mp_out_consults go
create program 707_mp_out_consults
 
prompt
	"Output to File/Printer/MINE" = "MINE"
 
with OUTDEV
 
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
execute 707_schn_get_cv
declare compltd_order_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",6004,"COMPLETED"))
declare future_order_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",6004,"FUTURE"))
declare referral_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",6000,"REFERRAL"))
declare active_encntr_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",261,"ACTIVE"))
 
;**Record structure definition**
free record orders
record orders
	(1 qual[*]
		2 ord_id 			= f8
		2 ord_status 		= vc
		2 ord_name 			= vc
		2 ord_dt_tm 		= vc
		2 ord_st_dt_tm 		= vc
		2 encntr_type 		= vc
		2 person_id 		= f8
		2 encntr_id 		= f8
		2 disch_dt_tm 		= vc
    	2 mrn 				= vc
    	2 name 				= vc
    	2 ward_cd 			= f8
    	2 ward 				= c100
    	2 facility_cd 		= f8
		2 facility 			= c100
    	2 specialty 		= vc
    	2 specialty_cd 		= f8
    	2 amo 				= c100
   		2 amo_id 			= f8
   		2 ord_by 			= vc
		2 compltd_flag 		= i2
		2 outstd_flag 		= i2
		2 conslt_status 	= vc
		2 lookback_range	= i4
 
 
	1 amofilter[*]
	    2 amo_person_id 	= f8
		2 amo_name 			= vc
 
	1 medservicefilter[*]
	    2 med_service_codes = f8
		2 med_service_name 	= vc
 
	1 facilityfilter[*]
		2 facility_cd 		= f8
		2 facility_name 	= vc
 
	1 wardfilter[*]
		2 ward_name 		= vc
		2 ward_cd			= f8
 
	1 encntrtypefilter[*]
		2 encntr_type 		= vc
 
	1 user[1]
		2 user_id 			= f8
	)
 
/**************************************************
 *	Main query to get the Order details
 **************************************************/
SELECT
	ord_id 				= ord.order_id
	, ord_status 		= uar_get_code_display(ord.order_status_cd)
	, ord_name 			= ord.ordered_as_mnemonic
	, ord_dt_tm 		= ord.orig_order_dt_tm
	, ord_st_dt_tm		= ord.current_start_dt_tm
	, encntr_type 		= uar_get_code_display(e.encntr_type_cd)
	, encntr_id 		= ord.encntr_id
	, disch_dt_tm		= e.disch_dt_tm
	, person_id			= ord.person_id
	, mrn				= ea.alias
	, name 				= p.name_full_formatted
	, ward_cd 			= e.loc_nurse_unit_cd
	, ward 				= uar_get_code_display(e.loc_nurse_unit_cd)
	, facility_cd 		= e.loc_facility_cd
	, facility 			= uar_get_code_display(e.loc_facility_cd)
	, specialty 		= uar_get_code_display(e.med_service_cd)
	, specialty_cd 		= e.med_service_cd
	, amo 				= pr.name_full_formatted
	, amo_id 			= pr.person_id
	, ordered_by 		= pr2.name_full_formatted
	, lookback_range	= if(datetimediff(cnvtdatetime(curdate, curtime3) , ord.current_start_dt_tm,1) <= 7)
    						7
   						 elseif((datetimediff(cnvtdatetime(curdate, curtime3) , ord.current_start_dt_tm,1) > 7 )
   							and(datetimediff(cnvtdatetime(curdate, curtime3) , ord.current_start_dt_tm,1)<= 14 ) )
   							14
   						 elseif((datetimediff(cnvtdatetime(curdate, curtime3) , ord.current_start_dt_tm,1) > 14 )
   							AND(datetimediff(cnvtdatetime(curdate, curtime3) , ord.current_start_dt_tm,1) <= 30 ) )
   							30
    					 endif
	, compltd_flag 		= if(ord.order_status_cd = compltd_order_cd)	;completed order Status
							1 else 0
						 endif
	, outstd_flag 		= if(ord.order_status_cd != compltd_order_cd)	;not completed order status
							1 else 0
						 endif
	, conslt_status 	= if(ord.order_status_cd = compltd_order_cd)	;completed order Status
							"COMPLETED"
						else
							"OUTSTANDING"
						endif
 
FROM
	orders   ord
	, encounter   e
	, person   p
	, encntr_prsnl_reltn   epr
	, prsnl pr
	, order_action oa
	, prsnl pr2
	, encntr_alias ea
 
plan ord where ord.active_ind = 1
		and  ord.current_start_dt_tm between cnvtlookbehind("30,D") and cnvtdatetime(curdate,curtime3)
		and ord.order_status_cd not in (future_order_cd) ;future order status
		and ord.catalog_type_cd =  referral_cd ;referral catalog type
join e where e.encntr_id = ord.encntr_id
		and e.active_ind = 1
		;and e.encntr_status_cd = active_encntr_cd ; include both Active and Discharged encounters
		and e.encntr_type_cd in (INPATIENT, EMERGENCY) ;inpatient, emergency encounter types
join p where p.person_id = ord.person_id
		and p.active_ind = 1
join epr where epr.encntr_id = e.encntr_id
		and     epr.end_effective_dt_tm > sysdate
		and     epr.active_ind = 1
		and     epr.encntr_prsnl_r_cd = ATTENDDR ;attending Doctor
join pr where pr.person_id = epr.prsnl_person_id
join oa where oa.order_id = ord.order_id
join pr2 where pr2.person_id =oa.action_personnel_id
join ea where ea.encntr_id =e.encntr_id
		and ea.encntr_alias_type_cd = MEDRECNO
		;and ea.alias_pool_cd = mrn_pool ;to accomodate multiple facilities
		and ea.active_ind = 1
		and ea.beg_effective_dt_tm < cnvtdatetime ( curdate , curtime3)
		and ea.end_effective_dt_tm > cnvtdatetime ( curdate , curtime3)
 
ORDER BY
	ord_st_dt_tm desc
	, ord_id
 
head report
   cnt = 0	;initialise variables to count returned records
   stat = alterlist(orders->qual,1000)	;allocate memory to the record structure
 
head ord_st_dt_tm
	d=0
 
head ord_id
	cnt = cnt+1
	if (mod(cnt,1000) = 1 and cnt != 1)
         stat = alterlist(orders->qual, cnt + 999)
    endif
 
	orders->qual[cnt].ord_id 			= ord_id
	orders->qual[cnt].ord_status 		= ord_status
	orders->qual[cnt].ord_name 			= trim(ord_name,3)
	orders->qual[cnt].ord_dt_tm 		= format(ord_dt_tm,"dd/mm/yyyy hh:mm;;q")
	orders->qual[cnt].ord_st_dt_tm 		= format(ord_st_dt_tm,"dd/mm/yyyy hh:mm;;q")
	orders->qual[cnt].encntr_type 		= trim(encntr_type,3)
	orders->qual[cnt].encntr_id 		= encntr_id
	orders->qual[cnt].disch_dt_tm 		= if (disch_dt_tm = null)
											"Current Patient" else format(disch_dt_tm, "dd/mm/yyyy hh:mm;;d")
									  	  endif
	orders->qual[cnt].person_id 		= person_id
	orders->qual[cnt].mrn 				= substring(1,10,mrn)
	orders->qual[cnt].name 				= trim(name,3)
	orders->qual[cnt].ward_cd 			= ward_cd
	orders->qual[cnt].ward 				= trim(ward,3)
	orders->qual[cnt].facility_cd 		= facility_cd ;002
	orders->qual[cnt].facility 			= facility ;002
	orders->qual[cnt].specialty 		= trim(uar_get_code_display(specialty_cd),3)
	orders->qual[cnt].specialty_cd 		= specialty_cd
	orders->qual[cnt].amo 				= trim(amo,3)
	orders->qual[cnt].amo_id 			= amo_id
	orders->qual[cnt].ord_by 			= trim(ordered_by,3)
	orders->qual[cnt].compltd_flag		= compltd_flag
	orders->qual[cnt].outstd_flag		= outstd_flag
	orders->qual[cnt].conslt_status		= conslt_status
	orders->qual[cnt].lookback_range	= lookback_range
 
 
foot report
         stat = alterlist(orders->qual,cnt)
 
with nocounter
 
/**************************************************
 *	Get the unique amo names from the main query
 **************************************************/
select distinct into "nl:"
	amo = orders->qual[d1.seq].amo
	, amo_id = orders->qual[d1.seq].amo_id
 
from
	(dummyt   d1  with seq = value(size(orders->qual, 5)))
 
plan d1
 
order by amo
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(orders->amofilter, 10)
 
head amo
;;;; enc->qual[d1.seq].amo_person_id = prs.person_id
	cnt = cnt + 1
	if (mod(cnt, 10) = 1)
		stat = alterlist(orders->amofilter, cnt + 9)
	endif
	orders->amofilter[cnt]->amo_person_id = amo_id
	orders->amofilter[cnt]->amo_name = amo
 
foot report
	stat = alterlist(orders->amofilter, cnt)
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
/**************************************************
 *	Get the unique specialties from the main query
 **************************************************/
select distinct into "nl:"
     med_service_cd = orders->qual[d1.seq].specialty_cd
 
from (dummyt d1 with seq = value(size(orders->qual, 5)))
 
plan d1
 
order by med_service_cd
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(orders->medservicefilter, 10)
 
head med_service_cd
	cnt = cnt + 1
	if (mod(cnt, 10) = 1)
		stat = alterlist(orders->medservicefilter, cnt + 9)
	endif
	orders->medservicefilter[cnt]->med_service_codes = med_service_cd
	orders->medservicefilter[cnt]->med_service_name = trim(uar_get_code_display(med_service_cd),3)
 
foot report
	stat = alterlist(orders->medservicefilter, cnt)
 
with nocounter;, separator=" ", format
 
/**************************************************
 *	Get the unique facility names from the main query
 **************************************************/
select distinct into "nl:"
	facility = orders->qual[d1.seq].facility
	, facility_cd = orders->qual[d1.seq].facility_cd
 
from
	(dummyt   d1  with seq = value(size(orders->qual, 5)))
 
plan D1
 
order by facility
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(orders->facilityfilter, 10)
 
head facility
	cnt = cnt + 1
	if (mod(cnt, 10) = 1)
		stat = alterlist(orders->facilityfilter, cnt + 9)
	endif
	orders->facilityfilter[cnt].facility_name = facility
	orders->facilityfilter[cnt].facility_cd = orders->qual[d1.seq].facility_cd
 
foot report
	stat = alterlist(orders->facilityfilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique ward names from the main query
 **************************************************/
select distinct into "nl:"
	ward = orders->qual[d1.seq].ward
	, ward_cd = orders->qual[d1.seq].ward_cd
 
from
	(dummyt   d1  with seq = value(size(orders->qual, 5)))
 
plan D1
 
order by ward
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(orders->wardfilter, 10)
 
head ward
	cnt = cnt + 1
	if (mod(cnt, 10) = 1)
		stat = alterlist(orders->wardfilter, cnt + 9)
	endif
	orders->wardfilter[cnt].ward_name = ward
	orders->wardfilter[cnt].ward_cd = ward_cd
 
foot report
	stat = alterlist(orders->wardfilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the unique encntr types from the main query
 **************************************************/
select distinct into "nl:"
	encntr_type = orders->qual[d1.seq].encntr_type
 
from
	(dummyt   d1  with seq = value(size(orders->qual, 5)))
 
plan d1
 
order by
	encntr_type
 
head report
	; initialise variables to count returned records
	cnt = 0
	; allocate memory to the record structure
	stat = alterlist(orders->encntrtypefilter, 5)
 
head encntr_type
	cnt = cnt + 1
	if (mod(cnt, 5) = 1)
		stat = alterlist(orders->encntrtypefilter, cnt + 4)
	endif
	orders->encntrtypefilter [cnt].encntr_type = encntr_type
 
foot report
	stat = alterlist(orders->encntrtypefilter, cnt)
 
with nocounter, separator=" ", format
 
/**************************************************
 *	Get the user ID
 **************************************************/
select into "nl:"
 
from prsnl p
 
where p.person_id = REQINFO->UPDT_ID
 
detail
	if (p.person_id > 0)
		orders->user[1]->user_id = p.person_id
	else
		orders->user[1]->user_id = 0
	endif
 
with nocounter
 
;******testing record structure loading************
;SELECT INTO $outdev ;"nl:";
;	QUAL_ORD_ID = ORDERS->qual[D1.SEQ].ord_id
;	, QUAL_ORD_STATUS = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].ord_status)
;	, QUAL_ORD_NAME = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].ord_name)
;	, QUAL_ORD_DT_TM = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].ord_dt_tm)
;	, QUAL_ORD_ST_DT_TM = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].ord_st_dt_tm)
;	, QUAL_ENCNTR_TYPE = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].encntr_type)
;	, QUAL_PERSON_ID = ORDERS->qual[D1.SEQ].person_id
;	, QUAL_ENCNTR_ID = ORDERS->qual[D1.SEQ].encntr_id
;	, QUAL_DISCH_DT_TM = ORDERS->qual[D1.SEQ].disch_dt_tm
;	, QUAL_MRN = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].mrn)
;	, QUAL_NAME = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].name)
;	, QUAL_WARD = ORDERS->qual[D1.SEQ].ward
;	, QUAL_WARD_CD = ORDERS->qual[D1.SEQ].ward_cd
;	, QUAL_FACILITY = ORDERS->qual[D1.SEQ].facility
;	, QUAL_SPECIALTY = SUBSTRING(1, 50, ORDERS->qual[D1.SEQ].specialty)
;	, QUAL_SPECIALTY_CD = ORDERS->qual[D1.SEQ].specialty_cd
;	, QUAL_AMO = ORDERS->qual[D1.SEQ].amo
;	, QUAL_AMO_ID = ORDERS->qual[D1.SEQ].amo_id
;	, QUAL_ORD_BY = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].ord_by)
;	, QUAL_COMPLTD_FLAG = ORDERS->qual[D1.SEQ].compltd_flag
;	, QUAL_OUTSTD_FLAG = ORDERS->qual[D1.SEQ].outstd_flag
;	, QUAL_CONSLT_STATUS = SUBSTRING(1, 30, ORDERS->qual[D1.SEQ].conslt_status)
;	, QUAL_LOOKBACK_RANGE = ORDERS->qual[D1.SEQ].lookback_range
;
;FROM
;	(DUMMYT   D1  WITH SEQ = VALUE(SIZE(ORDERS->qual, 5)))
;
;PLAN D1
;
;WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
/*************************************************************
 JASON OUTPUT
;************************************************************/
 
set sJSON = cnvtrectojson(orders)
;call echo(sJSON)
 
;***Set public memory variable equal to the JSON string***
set _Memory_Reply_String = sJSON
 
end go
