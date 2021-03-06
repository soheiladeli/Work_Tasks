/************************************************************************************
 *                  GENERATED MODIFICATION CONTROL LOG                 				*
 ************************************************************************************
 *                                                                    				*
 *Mod 	Date       Engineer             Comment                          			*
 *--- 	--------   -------------------- ---------------------------------			*
 *000	1/11/17		Javad Adeli			To audit the parent_event_id of documents   *
 *										that needto be hidden and then update the 	*
 *										clinical_event table to hide them.			*
 *																					*
 *																					*
 *																					*
 ************************************************************************************
 
 
 ******************  END OF ALL MODCONTROL BLOCKS  **********************************/
drop program 707_hide_clin_docs go
create program 707_hide_clin_docs
 
prompt 
	"Output to File/Printer/MINE" = "MINE"                          ;* Enter or select the printer or file name to send this repor
	, "Enter Person ID" = 0
	, "Select Audit Start Date" = "CURDATE"
	, "Selct Audit End Date" = "CURDATE"
	, "Action: 1-Audit   2-Update" = "1"
	, "Enter Parent Event ID from Audit (Comma Seperated):" = "0" 

with OUTDEV, person_id, s_date, e_date, action, parent_event_id
 
;record structure to hold entered parent_event_ids
free record documents
record documents ;array of enetered parent_event_ids
	( 1 list [*]
     	2 parent_event_id       = f8
	)

;extracting the comma seperated parent_evenr ids and load them to the record structure
set comma = 0
set length = textlen(trim($parent_event_id))
set start =  1
set  recordno =0
 
while (start < length)
 
   set comma = findstring(',', $parent_event_id, start)
 
   IF (comma = 0)  ; there are no more commas
       set comma = length + 1
   ENDIF
 
   set str_len = comma - start
 
   set recordno = recordno +1
   set stat = alterlist(documents->list,recordno)
 
   set documents->list[recordno]->parent_event_id =
;        cnvtupper(cnvtalphanum(substring(start,str_len,$parent_event_id)))
        cnvtreal(substring(start,str_len,$parent_event_id))
 
   set start = comma + 1
 
endwhile

;testing record structure population
;select into $outdev
;"test",
;documents->list[d.seq].parent_event_id
;from
;(dummyt d with seq=size(documents->list,5))
;with format, nullreport

;============================
if($action = "1")
;============================
;audit recorded documents for the selected date range
select into $outdev
	c.person_id
	, patient_name = p.name_full_formatted
	, c.clinical_event_id
	, c.event_id
	, c.parent_event_id
	, c.encntr_id
	, documentation_time = c.event_end_dt_tm "@SHORTDATETIME"
	, update_time = c.updt_dt_tm "@SHORTDATETIME"
	, document_name = uar_get_code_display(c.event_cd)
	, result_name = c.event_tag
	, event_class = uar_get_code_display(c.event_class_cd)
	, record_status = uar_get_code_display(c.record_status_cd)
	, result_status = uar_get_code_display(c.result_status_cd)
	, c.valid_until_dt_tm "@SHORTDATETIME"
	, c.updt_id
	, c.view_level
 
from
	clinical_event   c
	, person   p
 
plan c where c.event_end_dt_tm between cnvtdatetime(cnvtdate2( $s_date,"dd-mmm-yyyy" ), 0)
								and cnvtdatetime(cnvtdate2( $e_date,"dd-mmm-yyyy" ), 235959)
 
		and c.person_id = $person_id
		and c.event_class_cd in (523, 528) ;DOC, mdoc
		and c.record_status_cd not in(1625) ;deleted
		and c.result_status_cd not in (44343) ;INERRNOVIEW
		
join p where p.person_id = c.person_id
 
order by
	c.event_end_dt_tm   desc,
	c.parent_event_id desc,
	c.event_id desc,
	c.clinical_event_id desc
 
with nocounter, separator=" ", format
endif
 
;============================
if($action = "2")
;============================
;updating the rows in clinical_event table to hide the documents from front end based on entered parent_event_ids
update into 
clinical_event c
,(dummyt d with seq=size(documents->list,5) )
set c.view_level = 0,
c.result_status_cd = 44343, ;INERRNOVIEW
c.record_status_cd = 1625, ;deleted
c.updt_dt_tm = cnvtdatetime(curdate, curtime3)
 
  
;where c.parent_event_id in ($parent_event_id) ;(237940929)
plan d
join c
where c.parent_event_id = documents->list[d.seq].parent_event_id
 
select into $outdev
	c.person_id
	, patient_name = p.name_full_formatted
	, c.clinical_event_id
	, c.event_id
	, c.parent_event_id
	, c.encntr_id
	, documentation_time = c.event_end_dt_tm "@SHORTDATETIME"
	, update_time = c.updt_dt_tm "@SHORTDATETIME"
	, document_name = uar_get_code_display(c.event_cd)
	, result_name = c.event_tag
	, event_class = uar_get_code_display(c.event_class_cd)
	, record_status = uar_get_code_display(c.record_status_cd)
	, result_status = uar_get_code_display(c.result_status_cd)
	, c.valid_until_dt_tm "@SHORTDATETIME"
	, c.updt_id
	, c.view_level
 
from
	clinical_event   c
	, person   p
	, (dummyt d with seq=size(documents->list,5) )
 
plan d
join c where c.parent_event_id = documents->list[d.seq].parent_event_id
join p where p.person_id = c.person_id
 
order by
	c.event_end_dt_tm   desc
	
with nocounter, separator=" ", format 
 
endif
;*/
 
end
go
 
