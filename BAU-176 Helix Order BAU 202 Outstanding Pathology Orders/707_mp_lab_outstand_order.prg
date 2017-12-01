/****************************************************************************************
*                      GENERATED MODIFICATION CONTROL LOG                               *
*****************************************************************************************
* Mod 	Date     	 Engineer    	   Comment								            *
* --- ----------- ------------------- --------------------------------------------------*
* 000 26 Nov 2014  Tony Fitzsimons	  Original Version in BUILD							*
* 001 16/12/14     Michael Gong       add order status of In Process, getr order name 	*
*									  from order_catalog.primary_mnemonic 				*
* 002 28/01/15	   Tony Fitzsimons	  altered order detail to pull back clinical display *
*									  line rather than order details line, so it shows  *
*									  future order fuzzy dates on mpage hover		    *
* 003 24/07/15     Michael Gong       change not to print parent order of future recurring orders*
* 004 13/09/2017   Javad Adeli		 Add position code prompt and add logic to apply
									 Order Inquiry privileges at Position and Personel levels to the orders
*****************************************************************************************/
 
drop program 707_mp_lab_outstand_order:dba go
create program 707_mp_lab_outstand_order:dba
 
 
prompt 
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
	, "Enter Person ID:" = 0.0
	, "Look Back Date Range" = "7 D"
	, "Enter Position Code:" = 0.0 

with OUTDEV, personid, lkbRange, position_cd
 
%i 707_get_cv.inc
 
declare INPROCESS_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"INPROCESS")),protect ;001
 
free record orders
record orders (
	1 ord[*]
		2 ord_id = f8
		2 ord_name = vc
 
		2 ord_dt_tm = vc
		2 ord_st_dt_tm = vc
		2 ord_detail = vc
		2 ord_status = vc
		2 dept_status = vc
		2 ord_by = vc
		2 ord_comments = vc
		2 future_flag = i4
)
 
declare sJSON = vc with protect,noconstant("")
declare LAB_ORD_CODE = f8 with Constant(uar_get_code_by("MEANING",6000,"GENERAL LAB")),protect
declare ORDERED_STS_CODE = f8 with Constant(uar_get_code_by("MEANING",6003,"ORDER")),protect
declare FUTURE_ORD_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"FUTURE")),protect
declare ORD_COMMENT_CODE = f8 with Constant(uar_get_code_by("MEANING",14,"ORD COMMENT")),protect
 
declare contrib_system = f8
set contrib_system = uar_get_code_by("displaykey",89,"POWERCHART")
 
declare order_sets = f8
set order_sets = uar_get_code_by("displaykey",106,"ORDERSETS")
 
declare protocols = f8
set protocols = uar_get_code_by("displaykey", 106, "PROTOCOL")
 
declare case_integration = f8
set case_integration = uar_get_code_by("displaykey", 106, "CASEINTEGRATION")
 
declare anatomic_pathology = f8
set anatomic_pathology = uar_get_code_by("displaykey", 106, "ANATOMICPATHOLOGY")
 
 
/**************************************************
 *     Get the Order details associated to the person *
 **************************************************/
 
 
SELECT INTO "nl:"
	o.order_id
 
FROM
	orders   o
	, order_action   oa
	, prsnl   p
 	, order_catalog oc ;001
 
plan o
   where o.person_id = $personid
   and   o.active_ind = 1
;001   and   o.order_status_cd in(FUTURE_CODE, ORDERED_CODE)
   and   o.order_status_cd in(FUTURE_CODE, ORDERED_CODE, INPROCESS_CODE) ;001
 
   and   o.catalog_type_cd = LAB_ORD_CODE
   and   o.orig_order_dt_tm >= cnvtlookbehind($lkbRange,cnvtdatetime(curdate,curtime3))
   ;exclude order sets, helix protocols, helix case integrations, anatomic pathology
   and o.activity_type_cd NOT IN (order_sets, protocols, case_integration, anatomic_pathology) ;7066.00
   ;exclude helix order sets
   and o.orderable_type_flag NOT IN (6) ;order set
   and o.synonym_id > 0
   and o.contributor_system_cd = contrib_system ;16042.00  (powerchart)
   and o.template_order_flag != 7  ;003
;004<< Exclude Order Inquiry privilege exceptions
	and o.catalog_cd not in (
		SELECT
			O.CATALOG_CD
 
		FROM
			ORDER_CATALOG   O
			, PRIVILEGE_EXCEPTION   P
;			, PRIV_GROUP_RELTN   PG
;			, LOGICAL_GROUPING   L
			, PRIVILEGE   PR
			, PRIV_LOC_RELTN   PL
 
		where o.active_ind = 1
		and p.exception_id = o.catalog_cd
				and p.active_ind = 1
;		and pg.privilege_id = p.privilege_id
;				and pg.log_grouping_cd = 64755123 ;Helix Protocols
;		and l.log_grouping_cd = pg.log_grouping_cd
		and pr.privilege_id = p.privilege_id
				and pr.privilege_cd	=  3593 ;Order inquiry
				and pr.active_ind = 1
		and pl.priv_loc_reltn_id = pr.priv_loc_reltn_id
				and pl.position_cd = $position_cd ;80379355 Senior Medical Officer v1
				;and pl.person_id = $prsnl_id ;49828000 javad adeli
		)
;>>004
join oa
where oa.order_id = o.order_id
and oa.action_type_cd = ORDERED_STS_CODE
 
join p
where p.person_id = oa.action_personnel_id
 
;001->
join oc
where oc.active_ind=1
and oc.catalog_cd = o.catalog_cd
;001<-
 
ORDER BY
	o.current_start_dt_tm   DESC
	, o.order_mnemonic
	, o.order_id
 
head report
   cnt = 0
 
head o.order_id
   cnt = cnt+1
   stat = alterlist(orders->ord, cnt)
 
	orders->ord[cnt]->ord_id = o.order_id
;001	orders->ord[cnt]->ord_name = uar_get_code_description(o.catalog_cd)
	orders->ord[cnt]->ord_name = oc.primary_mnemonic ;001
 
	orders->ord[cnt]->ord_dt_tm = format(o.orig_order_dt_tm,"dd/mm/yyyy hh:mm;;q")
	orders->ord[cnt]->ord_st_dt_tm = format(o.current_start_dt_tm,"dd/mm/yyyy hh:mm;;q")
	orders->ord[cnt]->ord_detail = o.clinical_display_line ;order_detail_display_line  002
	orders->ord[cnt]->ord_status = uar_get_code_display(o.order_status_cd)
	orders->ord[cnt]->dept_status = uar_get_code_display(o.dept_status_cd)
	orders->ord[cnt]->ord_by = p.name_full_formatted
;;	orders->ord[cnt]->ord_comments = "Testing comments"
	if(o.order_status_cd=FUTURE_ORD_CODE)
	  orders->ord[cnt]->future_flag = 1
	else
	  orders->ord[cnt]->future_flag = 0
	endif
 
foot report
    stat = alterlist(orders->ord, cnt)
 
WITH nocounter
 
set size_ord= size(orders->ord,5)
 
SELECT INTO "NL:"
	long_text = replace(replace(trim(l.long_text),char(10)," "),char(13)," ")
 
FROM
	(dummyt   d1  with seq = value(size_ord))
	, order_comment   oc
	, long_text   l
 
plan d1
where size_ord>0
 
join oc
where oc.order_id = orders->ord[d1.seq]->ord_id
and oc.comment_type_cd = ORD_COMMENT_CODE
 
join l
where l.long_text_id = oc.long_text_id
and l.active_ind = 1
 
ORDER BY
	oc.order_id
	, l.updt_dt_tm   DESC
 
head oc.order_id
  orders->ord[d1.seq]->ord_comments = trim(long_text)
 
WITH nocounter
 
set sJSON = cnvtrectojson(orders)
call echo(sJSON)
 
;Set public memory variable equal to our XML string
set _Memory_Reply_String = sJSON
 
end
go
 
;;707_MP_LAB_OUTSTAND_ORDER "MINE",35578594,"3 M" go
;;707_MP_LAB_OUTSTAND_ORDER "MINE",40608675.0,"7 D" go
