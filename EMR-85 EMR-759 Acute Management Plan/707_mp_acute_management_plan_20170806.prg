/****************************************************************************************
*                      GENERATED MODIFICATION CONTROL LOG                               *
*****************************************************************************************
* Mod 	Date     	 Engineer    	   Comment								            *
* --- ----------- ------------------- --------------------------------------------------*
* 000 02/03/2016	Tony				Original version
* 001 20/06/2016	Tony				Add ITB Plan
* 002 14/07/2016	Tony				Change Respiratory Support to look at section, not form
* 003 08/12/2016	Tony				Add Kids GPS Management Plan
* 004 07/02/2017	Tony				Add neuro and seizure plans
* 005 02/03/2017	Tony				Need to use 'mdoc' class, not 'doc' (and not child docs), so prints properly in XR
* 006 15/06/2017	Tony				Add Pre School Wheeze Action Plan form
* 007 23/06/2017	Tony				Add asthma reducing medication plan
* 008 08/08/2017	Tony				Add anaesthetic management plans
*****************************************************************************************/
 
drop program 707_mp_acute_management_plan go
create program 707_mp_acute_management_plan
 
prompt
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
	, "person_ID" = ""
	, "pos_cd" = ""
 
with OUTDEV, person_ID, pos_cd
 
free record plans
record plans (
	1 admin_codes [1]
		2 admin_code = i4
	1 anaes_airway [1]					;008
 		2 anaw_event_id = f8
 		2 anaw_updt = vc
 		2 anaw_desc = vc
 		2 anaw_updt_by = vc
 	1 anaes_spec [1]					;008
 		2 ansp_event_id = f8
 		2 ansp_updt = vc
 		2 ansp_desc = vc
 		2 ansp_updt_by = vc
	1 and_plan	[1]
		2 and_activity_id = f8
		2 and_updt = vc
		2 and_desc = vc
		2 and_updt_by = vc
	1 ast_act_plan [1]
		2 ast_activity_id = f8
		2 ast_updt = vc
		2 ast_desc = vc
		2 ast_updt_by = vc
	1 ast_red_plan [1]				;007
		2 ast_red_activity_id = f8
		2 ast_red_updt = vc
		2 ast_red_desc = vc
		2 ast_red_updt_by = vc
	1 sev_ast_plan [1]
		2 sev_activity_id = f8
		2 sev_updt = vc
		2 sev_desc = vc
		2 sev_updt_by = vc
	1 wheeze_plan [1]				;006
		2 wheeze_activity_id = f8
		2 wheeze_updt = vc
		2 wheeze_desc = vc
		2 wheeze_updt_by = vc
	1 resp_support [1]
		2 resp_activity_id = f8
		2 resp_updt = vc
		2 resp_desc = vc
		2 resp_updt_by = vc
		2 ceased = i4
	1 adrenal_insuff [1]
		2 adr_activity_id = f8
		2 adr_updt = vc
		2 adr_desc = vc
		2 adr_updt_by = vc
	1 itb [1]				;001
		2 itb_event_id = f8
		2 itb_updt = vc
		2 itb_desc = vc
		2 itb_updt_by = vc
	1 cvad [1]
		2 cvad_activity_id = f8
		2 cvad_updt = vc
		2 cvad_desc = vc
		2 cvad_updt_by = vc
		2 cvad_event_id = f8
 	1 gps [1]					;003
 		2 gps_event_id = f8
 		2 gps_updt = vc
 		2 gps_desc = vc
 		2 gps_updt_by = vc
 	1 neuro_ed [1]					;004
 		2 neuro_ed_event_id = f8
 		2 neuro_ed_updt = vc
 		2 neuro_ed_desc = vc
 		2 neuro_ed_updt_by = vc
 	1 seizure_ed [1]
 		2 seizure_ed_event_id = f8
 		2 seizure_ed_updt = vc
 		2 seizure_ed_desc = vc
 		2 seizure_ed_updt_by = vc
 	1 seizure_inpt [1]
 		2 seizure_inpt_event_id = f8
 		2 seizure_inpt_updt = vc
 		2 seizure_inpt_desc = vc
 		2 seizure_inpt_updt_by = vc
)
 
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
declare sJSON = vc with protect,noconstant("")
declare AUTH_CD = f8 with Constant(uar_get_code_by("MEANING",8,"AUTH")),protect
declare MODIFIED_CD = f8 with Constant(uar_get_code_by("MEANING",8,"MODIFIED")),protect
declare ALTERED_CD = f8 with Constant(uar_get_code_by("MEANING",8,"ALTERED")),protect
declare CHILD_CD = f8 with Constant(uar_get_code_by("MEANING",24,"CHILD")),protect
;declare DOC_CD = f8 with Constant(uar_get_code_by("MEANING",53,"DOC")),protect     ;005
declare DOC_CD = f8 with Constant(uar_get_code_by("MEANING",53,"MDOC")),protect
declare life_cycle_active_status_cd = f8 with Constant(uar_get_code_by("MEANING",12030,"ACTIVE")),protect
declare confirmation_conf_cd = f8 with Constant(uar_get_code_by("MEANING",12031,"CONFIRMED")),protect
declare classification_alert_cd = f8 with Constant(uar_get_code_by("MEANING",12033,"ALERT")),protect
 
/**************************************************************
; DVDev Start Coding
**************************************************************/
 
SELECT INTO "nl:"
	d.person_id
	, d.description
  	, d.dcp_forms_activity_id
	, updated = format(d.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, d.updt_id
	, updated_by = trim(p.name_full_formatted, 3)
	, DF.PARENT_ENTITY_ID
	, C.EVENT_ID
 
FROM
	dcp_forms_activity   d
	, prsnl  p
	, DCP_FORMS_ACTIVITY_COMP   DF
	, CLINICAL_EVENT   C
 
plan d
where d.person_id = $person_ID
	and d.form_status_cd in (auth_cd, modified_cd, altered_cd)
	and d.active_ind = 1
	and d.description in ( "Allow A Natural Death Plan (AND)",
						   "Asthma Action Plan",
						   "Severe Asthma Management Plan",
						   "CVAD Insertion and Removal",
						   "Adrenal Insufficiency Management Plan",
						   "Pre School Wheeze Action Plan",    ;006
						   "Asthma Reducing Medication Plan")  ;007
 
join p
where d.updt_id = p.person_id
 
join DF
WHERE DF.DCP_FORMS_ACTIVITY_ID = d.DCP_FORMS_ACTIVITY_ID
 
JOIN C
WHERE C.EVENT_ID = DF.PARENT_ENTITY_ID
 
order by d.dcp_forms_activity_id
 
detail
	CASE (d.description)
   		OF "Allow A Natural Death Plan (AND)" :
   			plans->and_plan[1]->and_activity_id = d.dcp_forms_activity_id,
   			plans->and_plan[1]->and_updt = updated,
   			plans->and_plan[1]->and_desc = d.description,
   			plans->and_plan[1]->and_updt_by = updated_by
   		OF "Asthma Action Plan" :
   			plans->ast_act_plan [1]->ast_activity_id = d.dcp_forms_activity_id,
   			plans->ast_act_plan [1]->ast_updt = updated,
   			plans->ast_act_plan [1]->ast_desc = d.description,
   			plans->ast_act_plan [1]->ast_updt_by = updated_by
   		OF "Asthma Reducing Medication Plan" :														;007
   			plans->ast_red_plan [1]->ast_red_activity_id = d.dcp_forms_activity_id,
   			plans->ast_red_plan [1]->ast_red_updt = updated,
   			plans->ast_red_plan [1]->ast_red_desc = d.description,
   			plans->ast_red_plan [1]->ast_red_updt_by = updated_by
   		OF "Severe Asthma Management Plan" :
   			plans->sev_ast_plan[1]->sev_activity_id = d.dcp_forms_activity_id,
   			plans->sev_ast_plan[1]->sev_updt = updated,
   			plans->sev_ast_plan[1]->sev_desc = d.description,
   			plans->sev_ast_plan[1]->sev_updt_by = updated_by
   		OF "Adrenal Insufficiency Management Plan" :
   			plans->adrenal_insuff[1]->adr_activity_id = d.dcp_forms_activity_id,
   			plans->adrenal_insuff[1]->adr_updt = updated,
   			plans->adrenal_insuff[1]->adr_desc = d.description,
   			plans->adrenal_insuff[1]->adr_updt_by = updated_by
   		OF "CVAD Insertion and Removal" :
   			plans->cvad [1]->cvad_activity_id = d.dcp_forms_activity_id,
   			plans->cvad [1]->cvad_updt = updated,
   			plans->cvad [1]->cvad_desc = d.description,
   			plans->cvad [1]->cvad_updt_by = updated_by
   			plans->cvad [1]->cvad_event_id = df.parent_entity_id
   		OF "Pre School Wheeze Action Plan" :											;006
   			plans->wheeze_plan[1]->wheeze_activity_id = d.dcp_forms_activity_id,
   			plans->wheeze_plan[1]->wheeze_updt = updated,
   			plans->wheeze_plan[1]->wheeze_desc = d.description,
   			plans->wheeze_plan[1]->wheeze_updt_by = updated_by
 
	ENDCASE
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether ITB letter and alert are present  ;001
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl  prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Kids Rehab ITB Letter",
                     "Kids Rehab ITB Letter - Clin Note")
;and c.event_reltn_cd = child_cd     ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Kids Rehab ITB Letter",
						                       "Kids Rehab ITB Letter - Clin Note")
						  ;and c2.event_reltn_cd = child_cd    ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.annotated_display = "MANAGEMENT PLAN: Intrathecal Baclofen"
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00118"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Kids Rehab ITB Letter",
                     "Kids Rehab ITB Letter - Clin Note"))
     plans->itb [1]->itb_desc = "Intrathecal Baclofen Pump"
     plans->itb [1]->itb_event_id = c.event_id
     plans->itb [1]->itb_updt = updated
     plans->itb [1]->itb_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether Kids GPS Management Plan and alert are present  ;003
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Kids GPS Management Plan")
;and c.event_reltn_cd = child_cd     ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Kids GPS Management Plan")
						  ;and c2.event_reltn_cd = child_cd          ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
;and p.annotated_display = "Enrolled in Kids GPS"
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00109"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Kids GPS Management Plan"))
     plans->gps [1]->gps_desc = "Kids GPS Management Plan"
     plans->gps [1]->gps_event_id = c.event_id
     plans->gps [1]->gps_updt = updated
     plans->gps [1]->gps_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether Neuro Management Plan - ED document and alert are present  ;004
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Neurology Management Plan - ED")
;and c.event_reltn_cd = child_cd       ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)    ;(601, 607, 44341)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Neurology Management Plan - ED")
						  ;and c2.event_reltn_cd = child_cd    ;cv580      ;005
						  and c2.event_class_cd = doc_cd     ;cv523
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.life_cycle_status_cd = life_cycle_active_status_cd    ;cv1394
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd     ;cv1398
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00128"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Neurology Management Plan - ED"))
     plans->neuro_ed[1]->neuro_ed_desc = "Neurology Management Plan - ED"
     plans->neuro_ed[1]->neuro_ed_event_id = c.event_id
     plans->neuro_ed[1]->neuro_ed_updt = updated
     plans->neuro_ed[1]->neuro_ed_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether Seizure Management Plan - ED document and alert are present  ;004
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Seizure Management Plan - ED")
;and c.event_reltn_cd = child_cd         ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Seizure Management Plan - ED")
						  ;and c2.event_reltn_cd = child_cd        ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00129"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Seizure Management Plan - ED"))
     plans->seizure_ed[1]->seizure_ed_desc = "Seizure Management Plan - ED"
     plans->seizure_ed[1]->seizure_ed_event_id = c.event_id
     plans->seizure_ed[1]->seizure_ed_updt = updated
     plans->seizure_ed[1]->seizure_ed_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether Seizure management plan - inpt document and alert are present  ;004
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Seizure Management Plan - Inpatient")
; and c.event_reltn_cd = child_cd            ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Seizure Management Plan - Inpatient")
						 ; and c2.event_reltn_cd = child_cd          ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00130"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Seizure Management Plan - Inpatient"))
     plans->seizure_inpt[1]->seizure_inpt_desc = "Seizure Management Plan - Inpatient"
     plans->seizure_inpt[1]->seizure_inpt_event_id = c.event_id
     plans->seizure_inpt[1]->seizure_inpt_updt = updated
     plans->seizure_inpt[1]->seizure_inpt_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
 
; look up to see whether Anaesthetic airway management plan  document and alert are present  ;008
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Anaesthetic Mgmt Plan - Difficult Airway")
; and c.event_reltn_cd = child_cd            ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Anaesthetic Mgmt Plan - Difficult Airway")
						 ; and c2.event_reltn_cd = child_cd          ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00135"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Anaesthetic Mgmt Plan - Difficult Airway"))
     plans->anaes_airway[1]->anaw_desc = "Anaesthetic Management Plan - Difficult Airway"
     plans->anaes_airway[1]->anaw_event_id = c.event_id
     plans->anaes_airway[1]->anaw_updt = updated
     plans->anaes_airway[1]->anaw_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
; look up to see whether Anaesthetic special needs management plan  document and alert are present  ;008
 
SELECT INTO "nl:"
	c.person_id
	, c.event_id
	, updated = format(c.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, c.updt_id
	, updated_by = trim(prs.name_full_formatted, 3)
 
FROM
	clinical_event   c
	, problem   p
	, nomenclature   n
	, prsnl   prs
 
PLAN c
where c.person_id =  $person_ID
and c.event_tag in ( "Anaesthetic Mgmt Plan - Special Needs")
; and c.event_reltn_cd = child_cd            ;005
and c.event_class_cd = doc_cd
and c.result_status_cd in (auth_cd, altered_cd,modified_cd)
and c.valid_until_dt_tm > sysdate
and c.performed_dt_tm in (select max(c2.performed_dt_tm)
						 from clinical_event c2
						 where c2.person_id = c.person_id
						  and c2.event_tag in ( "Anaesthetic Mgmt Plan - Special Needs")
						 ; and c2.event_reltn_cd = child_cd          ;005
						  and c2.event_class_cd = doc_cd
						  and c2.result_status_cd in (auth_cd, altered_cd,modified_cd)
						  and c2.valid_until_dt_tm > sysdate)
join p
where p.person_id = c.person_id
and p.life_cycle_status_cd = life_cycle_active_status_cd
and p.end_effective_dt_tm > sysdate
and p.data_status_cd in (auth_cd, modified_cd, altered_cd)
and p.confirmation_status_cd = confirmation_conf_cd
join n
where n.nomenclature_id = p.nomenclature_id
and n.source_identifier = "AL00136"
and n.active_ind = 1
 
join prs
where c.updt_id = prs.person_id
 
ORDER BY
	c.person_id
	, c.performed_dt_tm
 
foot  c.person_id
 
if(c.event_tag in ( "Anaesthetic Mgmt Plan - Special Needs"))
     plans->anaes_spec[1]->ansp_desc = "Anaesthetic Management Plan - Special Needs"
     plans->anaes_spec[1]->ansp_event_id = c.event_id
     plans->anaes_spec[1]->ansp_updt = updated
     plans->anaes_spec[1]->ansp_updt_by = updated_by
   endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
 
; RESPIRATORY PRESSURE SUPPORT - looks for section, not form  ;002
SELECT
	D.PERSON_ID
	, D.ENCNTR_ID
	, D.DESCRIPTION
	, D.BEG_ACTIVITY_DT_TM
	, resp_updated = format(D.UPDT_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, D.UPDT_ID
	, D.DCP_FORMS_ACTIVITY_ID
	, form_title_text = C.EVENT_TITLE_TEXT
	, form_performed = format(C.PERFORMED_DT_TM, "dd/mm/yyyy hh:mm;;d")
	, section_title_text = CE.EVENT_TITLE_TEXT
	, field_title_text = CEL.EVENT_TITLE_TEXT
	, field_event_tag = CEL.EVENT_TAG
	, field_result = CEL.RESULT_VAL
	, CEL.EVENT_CD
	, resp_updated_by = P.NAME_FULL_FORMATTED
 
FROM
	DCP_FORMS_ACTIVITY   D
	, DCP_FORMS_ACTIVITY_COMP   DF
	, CLINICAL_EVENT   C
	, CLINICAL_EVENT   CE
	, CLINICAL_EVENT   CEL
	, PRSNL   P
 
PLAN D
WHERE D.DESCRIPTION = "Respiratory Support Service"
AND D.ACTIVE_IND = 1
AND D.FORM_STATUS_CD IN (auth_cd, altered_cd,modified_cd)  ;auth, modified, altered
AND D.PERSON_ID = $person_ID
 
JOIN DF
WHERE DF.DCP_FORMS_ACTIVITY_ID = D.DCP_FORMS_ACTIVITY_ID
 
JOIN C
WHERE C.EVENT_ID = DF.PARENT_ENTITY_ID ;join to form
AND C.PERSON_ID = D.PERSON_ID
AND C.ENCNTR_ID = D.ENCNTR_ID
and C.RESULT_STATUS_CD IN (auth_cd, altered_cd,modified_cd)  ;auth, modified, altered
and C.VALID_UNTIL_DT_TM > sysdate
 
JOIN CE
WHERE CE.PARENT_EVENT_ID = C.EVENT_ID  ;join to section
AND CE.EVENT_TITLE_TEXT = "Pressure Settings"   ;qualify on section name
and CE.RESULT_STATUS_CD in (auth_cd, altered_cd,modified_cd)  ;auth, modified, altered
and ce.VALID_UNTIL_DT_TM > sysdate
 
JOIN CEL
WHERE CEL.PARENT_EVENT_ID = CE.EVENT_ID ;join to field
and CEL.RESULT_STATUS_CD in (auth_cd, altered_cd,modified_cd)  ;auth, modified, altered
and CEL.VALID_UNTIL_DT_TM > sysdate
and CEL.EVENT_TITLE_TEXT IN ("Pressure support Type", "Resp support cease treatment" )
 
JOIN P
WHERE P.PERSON_ID = D.UPDT_ID
 
ORDER BY
	D.UPDT_DT_TM   ASC
	, field_title_text   ASC
 
head report
	cnt = 0
head D.updt_dt_tm
	cnt = 1
 
foot D.UPDT_DT_TM
	plans->resp_support [1]->resp_activity_id = d.dcp_forms_activity_id
	plans->resp_support [1]->resp_updt = resp_updated
 	;plans->resp_support [1]->resp_desc = "Respiratory Support Pressure Settings"
 	plans->resp_support [1]->resp_updt_by = resp_updated_by
	if (field_title_text = "Resp support cease treatment")
		plans->resp_support [1]->resp_desc = "Respiratory Support Pressure Settings - Treatment Ceased"
	else
		plans->resp_support [1]->resp_desc = "Respiratory Support Pressure Settings"
	endif
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
;check the position code is not admin
 
SELECT
	admin_code = CV1.CODE_VALUE
	, CV1.DISPLAY_KEY
 
FROM
	CODE_VALUE   CV1
 
WHERE
CV1.CODE_SET = 88
and CV1.DISPLAY_KEY IN (
"ADMINISTRATIONASSISTANT",
"ADMINISTRATIONASSISTANTPM",
"ALLIEDHEALTHSTUDENT",
"ALLIEDHEALTHSTUDENTV1",
"EDUCATORTEACHER",
"HICPROVIDER",
"ITSUPPORTSTAFF",
"MEDICALSTUDENT",
"MEDICALSTUDENTV1",
"MHADMIN",
"MISCVIEWONLY",
"MRDCLERICALSTAFF",
"MRDCODER",
"MRDMANAGER",
"MRDTYPIST",
"NURSEAIN",
"NURSESTUDENT",
"NURSESTUDENTV1",
"PATHNETADMIN",
"PHARMACYTECHNICIAN",
"PMBOOKINGSTAFF",
"PMMIDDLETONCLERK",
"PMPATIENTENQUIRYCLERK",
"PMSUPERVISOR",
"PMWARDCLERK",
"RADIOLOGYSCHEDULINGUSER",
"REHABILITATIONDEPTADMIN",
"RESEARCHER",
"RESEARCHERCLINICALREVIEW",
"RESEARCHERRESTRICTED",
"RESEARCHERV1",
"RESEARCHERCLINICALREVIEWV1",
"RESEARCHERRESTRICTEDV1",
"SCHEDULINGSUPERVISOR",
"SCHEDULINGUSER",
"SERVICEDEPARTMENTTECHNICIAN",
"SERVICEDEPARTMENTTECHNICIANV1",
"SWITCHCLERK",
"TECHNICIAN",
"TECHNICIANCLINICAL",
"TECHNICIANCLINICALV1")
and CV1.CODE_VALUE = $pos_cd
 
detail
if ($pos_cd = admin_code)
	plans->admin_codes [1]->admin_code = 1
else
	plans->admin_codes [1]->admin_code = 0
endif
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
 
 
 
;convert output to JSON
set sJSON = cnvtrectojson(plans)
call echo(sJSON)
 
;Set public memory variable equal to our XML string
set _Memory_Reply_String = sJSON
 
end
go
 
