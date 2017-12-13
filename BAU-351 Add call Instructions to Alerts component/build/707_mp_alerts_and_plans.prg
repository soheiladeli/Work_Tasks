/****************************************************************************************
*                      GENERATED MODIFICATION CONTROL LOG                               *
*****************************************************************************************
* Mod 	Date     	 Engineer    	   Comment								            *
* --- ----------- ------------------- --------------------------------------------------*
* 000  22/01/2016	Tony Fitzsions		Original version
* 001  10/11/2016   Michael Gong        T:8943737 remove encntr_id from parameters to make it working
*										from Dynamic Worklist at Org level
* 002  15/12/2016	Tony Fitzsimons		Restored Encounter_ID as a prompt, to feed to record structure only (use in javascript)
* 003  11/12/2017	Javad Adeli			Adding the Call Instructions to the non Clinical Alerts record structure
*****************************************************************************************/
 
drop program 707_mp_alerts_and_plans go
create program 707_mp_alerts_and_plans
 
prompt
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
	, "Person_ID" = 0
	, "Encounter ID" = 0
 
with OUTDEV, Person_ID, Encounter_ID
 
free record alerts
record alerts (
	1 alert[*]
		2 patient_id = f8
		2 encounter_id = f8      ;002
		2 source_id = vc
		2 desc = vc
		2 annotated = vc
		2 onset = vc
		2 updt_dt_tm = vc
		2 updt_prov = vc
		2 resp_prov = vc
		2 comments = vc
		2 patient_id_string = vc
 
	1 nonClinAlerts[1]
		2 deceased = vc
		2 dec_date = vc
		2 dec_est = vc
		2 pt_alert = vc
		2 social_alerts[*]
			3 social_alert = vc
			3 social_updt = vc
		2 ptcall_instruction = c100		;003
)
 
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
DECLARE EST_DEATH_DT = F8 with constant(uar_get_code_by("MEANING",356,"EST_DEATH_DT")),protect
DECLARE DECEASED_CD = F8 with constant(uar_get_code_by("MEANING",268,"YES")),protect
DECLARE LIFE_CYCLE_STATUS = F8 with Constant(uar_get_code_by("MEANING",12030,"ACTIVE")),protect
DECLARE ALERT_VOCAB = F8 with Constant(uar_get_code_by("MEANING",400,"ALERT")),protect
DECLARE RESP_PROV_CD = F8 with Constant(uar_get_code_by("MEANING",12038,"RESPONSIBLE")),protect
declare sJSON = vc with protect,noconstant("")
declare comment_info_type_cd = f8 with constant(uar_get_code_by("DISPLAY",355,"Comment"))		;003
 
/**************************************************************
; DVDev Start Coding
**************************************************************/
 
/*********** GET THE CLINICAL ALERTS ********************/
 
SELECT INTO "nl:"
	P.ANNOTATED_DISPLAY
	, N.SOURCE_STRING
	, N.SOURCE_IDENTIFIER
	, P_CLASSIFICATION_DISP = UAR_GET_CODE_DISPLAY(P.CLASSIFICATION_CD)
	, P_CONFIRMATION_STATUS_DISP = UAR_GET_CODE_DISPLAY(P.CONFIRMATION_STATUS_CD)
	, P.END_EFFECTIVE_DT_TM
	, P.NOMENCLATURE_ID
	, onset = format(P.ONSET_DT_TM, "dd/mm/yyyy;;d")
	, P.PERSON_ID
	, P.PROBLEM_ID
	, updt_dt = format(P.UPDT_DT_TM, "dd/mm/yyyy;;d")
	, P.UPDT_ID
	, P_LIFE_CYCLE_STATUS_DISP = UAR_GET_CODE_DISPLAY(P.LIFE_CYCLE_STATUS_CD)
	, PP.PROBLEM_RELTN_PRSNL_ID
	, PP_PROBLEM_RELTN_DISP = UAR_GET_CODE_DISPLAY(PP.PROBLEM_RELTN_CD)
	, PR.NAME_FULL_FORMATTED
	, PC.PROBLEM_COMMENT
	, PRS.NAME_FULL_FORMATTED
 
FROM
	PROBLEM   P
	, NOMENCLATURE   N
	, PROBLEM_PRSNL_R   PP
	, PRSNL   PR
	, PROBLEM_COMMENT   PC
	, PRSNL   PRS
 
PLAN P
WHERE P.PERSON_ID = $Person_ID
AND P.ACTIVE_IND = 1
AND P.LIFE_CYCLE_STATUS_CD = LIFE_CYCLE_STATUS  ;1394.00  ;active, codeset 12030
AND P.CLASSIFICATION_CD = 4254500
 
JOIN N
WHERE N.NOMENCLATURE_ID = P.NOMENCLATURE_ID
AND N.ACTIVE_IND = 1
;AND N.SOURCE_VOCABULARY_CD = ALERT_VOCAB   ;4254020.00   ;alert, codeset 400
 
JOIN PP
WHERE OUTERJOIN(P.PROBLEM_ID) = PP.PROBLEM_ID
AND PP.PROBLEM_RELTN_CD = OUTERJOIN(RESP_PROV_CD)      ;(1415)   ;codeset 12038, managing/RESPONSIBLE meaning
 
JOIN PR
WHERE OUTERJOIN(PP.PROBLEM_RELTN_PRSNL_ID) = PR.PERSON_ID
 
JOIN PC
WHERE OUTERJOIN(P.PROBLEM_ID) = PC.PROBLEM_ID
 
JOIN PRS
WHERE P.UPDT_ID = PRS.PERSON_ID
 
ORDER BY
	P.PROBLEM_ID
 
head report
	; initialise variables to count returned records
	lcnt = 0
 
; allocate memory to the record structure
	stat = ALTERLIST(alerts->alert, 10)
 
head P.PROBLEM_ID
 
	lcnt = lcnt + 1
	if (MOD(lcnt, 10) = 1 AND lcnt > 10)
		stat = ALTERLIST(alerts->alert, lcnt + 9)
	endif
 
detail
	alerts->alert[lcnt]->source_id = N.SOURCE_IDENTIFIER
	alerts->alert[lcnt]->desc = N.SOURCE_STRING
	alerts->alert[lcnt]->annotated = P.ANNOTATED_DISPLAY
	alerts->alert[lcnt]->onset = onset
	alerts->alert[lcnt]->resp_prov = PR.NAME_FULL_FORMATTED
	alerts->alert[lcnt]->updt_dt_tm = updt_dt
	alerts->alert[lcnt]->updt_prov = PRS.NAME_FULL_FORMATTED
	alerts->alert[lcnt]->comments = PC.PROBLEM_COMMENT
	alerts->alert[lcnt]->patient_id = P.PERSON_ID
	alerts->alert[lcnt]->patient_id_string = cnvtstring(P.PERSON_ID)
	alerts->alert[lcnt]->encounter_id = $Encounter_ID
 
foot report
	;set memory back to the size of the array
	stat = alterlist(alerts->alert, lcnt)
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
SET SIZE_ARRAY_ALERT = SIZE(alerts->alert,5)
 
 
/*********** GET THE NON-CLINICAL ALERTS ********************/
 
SELECT INTO "nl:"
	P.PERSON_ID
	, P_DECEASED_DISP = UAR_GET_CODE_DISPLAY(P.DECEASED_CD)   ;47080.00 = Yes
	, P.DECEASED_CD
	, deceased_dt = format(P.DECEASED_DT_TM, "dd/mm/yyyy;;d")
	, P.NAME_FIRST
	, P.NAME_LAST
	, pt_alert = UAR_GET_CODE_DISPLAY(P.VIP_CD)
	, est_deceased = UAR_GET_CODE_DISPLAY(PU.VALUE_CD)  ;Yes or No from codeset 329?
	, PU.VALUE_CD
	, PC.CODE_SET
	, PC.PERSON_CODE_VALUE_R_ID
	, social_alert = trim(UAR_GET_CODE_DISPLAY(PC.CODE_VALUE))
	, updated = format(PC.UPDT_DT_TM, "dd/mm/yyyy;;d")
	, ptcall_instruction = trim(lt.long_text, 3) ;003
 
FROM
	PERSON   P
	, PM_USER_DEFINED   PU
	, PERSON_CODE_VALUE_R   PC
	, person_info   pi 	;003
	, long_text   lt
 
;003
 
;001 PLAN E
;001 WHERE E.ENCNTR_ID = $Encounter_ID     ;53628152.00
;001 AND E.PERSON_ID = $Person_ID    ;48592124
 
;001 JOIN P
plan p
 
;001 WHERE E.PERSON_ID = P.PERSON_ID
where p.person_id = $Person_ID
 
 
JOIN PU
WHERE PU.PARENT_ENTITY_ID = OUTERJOIN(P.PERSON_ID)
AND PU.UDF_TYPE_CD = OUTERJOIN(30793754.00) ;Estimate Decease Date Flag, meaning = EST_DEATH_DT
 
JOIN PC
WHERE PC.PERSON_ID = OUTERJOIN(P.PERSON_ID)
AND PC.CODE_SET = OUTERJOIN(19350)  ;process alert
AND PC.ACTIVE_IND = OUTERJOIN(1)
AND PC.END_EFFECTIVE_DT_TM > OUTERJOIN(CNVTDATETIME(CURDATE, curtime3))
;003>>
join pi where pi.person_id = outerjoin(p.person_id)
		and pi.active_ind = outerjoin(1)
		and pi.beg_effective_dt_tm < outerjoin(cnvtdatetime ( curdate ,  curtime3))
		and pi.end_effective_dt_tm> outerjoin(cnvtdatetime ( curdate ,  curtime3 ))
		and pi.internal_seq= outerjoin(4)
		and pi.info_type_cd = outerjoin(68);outerjoin(comment_info_type_cd)
 
join lt where lt.long_text_id = outerjoin(pi.long_text_id)
		and lt.active_ind= outerjoin(1)
;<<003
 
ORDER BY
	P.PERSON_ID
	, PC.PERSON_CODE_VALUE_R_ID
 
head report
	; initialise variables to count returned records
	cnt = 0
	acnt = 0
 
; allocate memory to the record structure
 
	stat = ALTERLIST(alerts->nonClinAlerts->social_alerts, 5)
 
head P.PERSON_ID
	cnt = cnt + 1
 
	if (P.DECEASED_CD = DECEASED_CD)
		alerts->nonClinAlerts[1]->deceased = "This patient is deceased"
 
		if (deceased_dt > "")
			alerts->nonClinAlerts[1]->dec_date = deceased_dt
			if (est_deceased = "Yes")
				alerts->nonClinAlerts[1]->dec_est = "Note: the recorded date of death was estimated."
			else
				alerts->nonClinAlerts[1]->dec_est = "Note: the actual date of death was recorded."
			endif
		else
			alerts->nonClinAlerts[1]->dec_est = "Note: no date of death was recorded"
		endif
 
	else
		alerts->nonClinAlerts[1]->deceased = "No"
	endif
 
	alerts->nonClinAlerts[1]->pt_alert = pt_alert
	;003>>
 
	if(textlen(trim(ptcall_instruction,3))!=0)
		alerts->nonClinAlerts[cnt]->ptcall_instruction = ptcall_instruction
	else
		alerts->nonClinAlerts[cnt]->ptcall_instruction = ""
	endif
 
 
	;alerts->nonClinAlerts[1]->ptcall_instruction = trim(ptcall_instruction, 3)
	;<<003
	acnt = 0
 
head PC.PERSON_CODE_VALUE_R_ID
	acnt = acnt + 1
 	if (MOD(acnt, 5) = 1 AND acnt > 5)
		stat = ALTERLIST(alerts->nonClinAlerts[1]->social_alerts, acnt + 2)
	endif
 
detail
	alerts->nonClinAlerts[1]->social_alerts[acnt]->social_alert = social_alert
	alerts->nonClinAlerts[1]->social_alerts[acnt]->social_updt = updated
 
foot P.PERSON_ID
	;resize structure down to the number of positions that were used
	stat = alterlist(alerts->nonClinAlerts[1]->social_alerts, acnt)
 
WITH NOCOUNTER, SEPARATOR=" ", FORMAT
 
SET SIZE_ARRAY_NCA = SIZE(alerts->nonClinAlerts[1]->social_alerts,5)
 
;convert output to JSON
set sJSON = cnvtrectojson(alerts)
call echo(sJSON)
 
;Set public memory variable equal to our XML string
set _Memory_Reply_String = sJSON
 
end
go
 
