drop program 707_schn_get_cv go
create program 707_schn_get_cv
 
;*************************************************************************
;This is a generic library program to hold all common prompts & parsers used by ccl reports
;***************************************************************************
;               MODIFICATION LOG
;***************************************************************************
;###  Ref Num     DATE       MODIFIED BY     COMMENTS
;***************************************************************************
;000    		  2032015   Laxmisree vanam  Inital Release.
;001              11042016  Gill Taylor      Modifed Ambulatory, Service Dept to use new method
;***************************************************************************
;              CCL REQUIRED VARIABLES
;All updates should be in form: declare INPATIENT = f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"INPATIENT")),persist
/**************************************************************
; DVDev DECLARED VARIABLES
**************************************************************/
 
;;;Codeset 71
declare INPATIENT = f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"INPATIENT")),persist
declare RECINPATIENT = f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"RECURRINGINPATIENT")),persist
declare EMERGENCY = f8 with Constant(uar_get_code_by("DISPLAYKEY",71,"EMERGENCY")),persist
declare OUTPATIENT = f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"OUTPATIENT")),persist
declare AMBULATORY = f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"AMBULATORYT")),persist
declare SERVICEDEPT = f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"SERVICEDEPT")),persist
declare BOARDER = F8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"BOARDER")),persist
declare BOOKED = F8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"BOOKED")),persist
declare WAITLIST = F8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",71,"WAITLIST")),persist
declare DIAG_REF = F8  with Constant(UAR_GET_CODE_BY("DISPLAY_KEY",71,"DIAGNOSTICREFERRAL")  ),persist
 
;; Codeset 73
declare fac_prompt = f8 with constant(uar_get_code_by("DISPLAYKEY",73,"FACILITYPROMPT"))
 
;; Codeset 89
declare CONTRIB_SYSTEM = f8 with Constant(uar_get_code_by("DISPLAYKEY",89,"POWERCHART")),persist
 
;;Codeset 319
declare MEDRECNO  = f8 with Constant(uar_get_code_by("MEANING",319,"MRN")),persist
declare VISITID_NUM =  f8 with Constant(UAR_GET_CODE_BY ("MEANING",319,"VISITID")),persist
declare EXTREFNBR = f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",319,"EXTREFNBR")),persist
 
 
/************************codes from the 707_get_cv.inc **a******************/
SET RECNT = 1.0
;;GET CODE SET 2 (ADMIT_SRC) VALUES
DECLARE ED_ADMITSC =  F8 WITH CONSTANT(UAR_GET_CODE_BY("DISPLAYKEY",2,"EMERGENCYDEPARTMENT")),persist
 
;;GET CODE SET 3 (Admit type) VALUES
DECLARE ED_ADMIT = F8 WITH CONSTANT(UAR_GET_CODE_BY ("DISPLAYKEY",3,"EMERGENCY")),persist
 
;GET CODE SET 4 (Person Alias Type) VALUES
DECLARE MRN_ALIAS = F8 with Constant(uar_get_code_by("MEANING",4,"MRN")),persist
DECLARE DVA_ALIAS = F8 with Constant(UAR_GET_CODE_BY ("MEANING",4,"MILITARYID")),persist
DECLARE SSN = f8 with Constant( UAR_GET_CODE_BY ("MEANING",4,"SSN")),persist
 
;get CODE SET 19 (DISCH_DISPOS) VALUES
;	DECLARE DIED_AUTOPSY = F8
	;DECLARE DIED_NO_AUTOPSY = F8
 
DECLARE DIED_AUTOPSY = F8 WITH CONSTANT(UAR_GET_CODE_BY ("DISPLAYKEY",19,"DIEDWITHAUTOPSYPERFORMED")),persist
DECLARE DIED_NO_AUTOPSY = F8 WITH CONSTANT(UAR_GET_CODE_BY ("DISPLAYKEY",19,"DIEDWITHNOAUTOPSYPERFORMED")),persist
DECLARE DEAD_ON_ARIV = F8
DECLARE DIED_IN_ED = F8
SET DEAD_ON_ARIV = 0 ;UAR_GET_CODE_BY ("DISPLAYKEY",19,"DEADONARRIVAL")
SET DIED_IN_ED = 0 ;UAR_GET_CODE_BY ("DISPLAYKEY",19,"ADMDIEDINED")
 
;;GET CODE SET 24(Event Relation) VALUES  ;;006
DECLARE ROOT_CD  = F8 WITH CONSTANT(UAR_GET_CODE_BY ("MEANING",24,"ROOT")),persist
DECLARE CHILD_CD = F8 WITH CONSTANT(UAR_GET_CODE_BY ("MEANING",24,"CHILD")),persist
 
;;GET CODE SET 36 (LANGUAGE) VALUES
        DECLARE L_ARABIC = F8
        DECLARE L_ASSYRIAN = F8
        DECLARE L_VIETNAMESE = F8
        SET L_ARABIC = UAR_GET_CODE_BY ("DISPLAYKEY",36,"ARABICINCLUDINGLEBANESE")
        SET L_ASSYRIAN = UAR_GET_CODE_BY ("DISPLAYKEY",36,"ASSYRIANINCLUDINGARAMAIC")
        SET L_VIETNAMESE = UAR_GET_CODE_BY ("DISPLAYKEY",36,"VIETNAMESE")
 
;GET CODE SET 43 (PHONE_TYPE) VALUES
DECLARE HOME_PHONE =  f8 with Constant(UAR_GET_CODE_BY ("MEANING",43,"HOME")),persist
    ;    DECLARE HOME_PHONE = F8
	DECLARE BUS_PHONE = F8
	DECLARE PAGE_PERS = F8
	DECLARE ALT_PHONE = F8
        DECLARE MOB_PHONE = F8
     ;   SET HOME_PHONE = UAR_GET_CODE_BY ("MEANING",43,"HOME")
        SET BUS_PHONE = UAR_GET_CODE_BY ("MEANING",43,"BUSINESS")
	SET PAGE_PERS = UAR_GET_CODE_BY ("MEANING",43,"PAGER PERS")
	SET ALT_PHONE = UAR_GET_CODE_BY ("MEANING",43,"ALTERNATE")
        SET MOB_PHONE = UAR_GET_CODE_BY ("MEANING",43,"PAGER PERS")
 
;GET CODE SET 48 (REC_STS) VALUES
        DECLARE DELETED_ENC = F8
;        DECLARE ACTIVE_REC = F8
        DECLARE COMBINED = F8
        DECLARE COMBINED_HIST = F8
        SET DELETED_ENC = UAR_GET_CODE_BY ("MEANING",48,"DELETED")
;        SET ACTIVE_REC = UAR_GET_CODE_BY ("MEANING",48,"ACTIVE")
        SET COMBINED = UAR_GET_CODE_BY ("MEANING",48,"COMBINED")
        SET COMBINED_HIST = UAR_GET_CODE_BY ("MEANING",48,"COMBINEHIST")
        declare active_rec = f8 with Constant(uar_get_code_by("MEANING",48, "ACTIVE")),persist
 
;GET CODE SET 49 (Religion) VALUES
	DECLARE ANGLICAN_CH = F8
	SET ANGLICAN_CH = UAR_GET_CODE_BY ("DISPLAYKEY",49,"ANGLICAN")
 
 
;get CODE SET 72 (EVENT_CODE) VALUES
 
    DECLARE DCP_GENERIC_CD = F8
    DECLARE HEIGHT_CD = F8
    DECLARE WEIGHT_CD = F8
    SET DCP_GENERIC_CD = UAR_GET_CODE_BY("MEANING",72,"DCPGENERIC")  ;008
    set height_cd =  uar_get_code_by("meaning",72,"HEIGHT")    ;008
    set weight_cd =  uar_get_code_by("meaning",72,"WEIGHT")    ;008
 
;GET CODE SET 73 (Contributor Source) VALUES
;        DECLARE ESO = F8
DECLARE REPORTOUT = f8 with Constant(uar_get_code_by("DISPLAYKEY",73,"REPORTOUT")),persist
;	DECLARE REPORTOUT = F8
	DECLARE WLOUT = F8
	DECLARE HIE2005 = F8
;        SET ESO = UAR_GET_CODE_BY ("DISPLAYKEY",73,"ESOPAS")
    DECLARE ESO = f8 with Constant(UAR_GET_CODE_BY ("DISPLAYKEY",73,"ESOPAS")),persist
     ;   SET REPORTOUT = UAR_GET_CODE_BY ("DISPLAYKEY",73,"REPORTOUT")
	SET WLOUT = UAR_GET_CODE_BY ("DISPLAYKEY",73,"WLOUT")
	SET HIE2005 = UAR_GET_CODE_BY ("DISPLAYKEY",73,"HIE2005")
 
;GET CODE SET 212 (Address Type) VALUES
;	DECLARE HOME_ADDRESS = F8
    DECLARE BUS_ADDRESS = F8
    DECLARE MAIL_ADDRESS = F8   ;;006
    DECLARE TEMP_ADDRESS = F8   ;;007
    DECLARE EMAIL_CD = F8 ;;009
;	SET HOME_ADDRESS = UAR_GET_CODE_BY ("MEANING",212,"HOME")
    DECLARE HOME_ADDRESS  = f8 with Constant(uar_get_code_by("MEANING",212,"HOME")),persist
    SET BUS_ADDRESS = UAR_GET_CODE_BY ("MEANING",212,"BUSINESS")
    SET MAIL_ADDRESS = UAR_GET_CODE_BY ("MEANING",212,"MAILING")  ;;006
    SET TEMP_ADDRESS = UAR_GET_CODE_BY ("MEANING",212,"TEMPORARY")  ;;007
    SET EMAIL_CD = UAR_GET_CODE_BY ("MEANING",212,"EMAIL") ;;009
 
;GET CODE SET 213 (name type) VALUES
	DECLARE CURRENT_NAME = F8
	SET CURRENT_NAME = UAR_GET_CODE_BY ("MEANING",213,"CURRENT")
 
;get CODE SET 220 (Location) VALUES
        DECLARE RAHC_FAC = F8
;;012 Start
;;        SET RAHC_FAC = UAR_GET_CODE_BY ("DISPLAYKEY",220,"CHW")
;; get the correct facility code for CHW
;; pathnet millenium upgrade added two other code values with display key CHW
select into "nl:"
     cv.code_value
from code_value cv
plan cv
where cv.code_set=220
and cv.display_key="CHW"
and cv.cdf_meaning="FACILITY"
and cv.active_ind=1
detail
   RAHC_FAC=cv.code_value
with nocounter
;;012 end
 
;GET CODE SET 220  VALUES
    ;DECLARE OTC_CD = F8
    ;SET OTC_CD = uar_get_code_by("DISPLAYKEY",220,"ONCOLOGYTREAT")
DECLARE OTC_CD = f8 with Constant(uar_get_code_by("DISPLAYKEY",220,"ONCOLOGYTREAT")),persist
DECLARE EMERGENCYDEPARTMENT_CD = f8 with Constant(uar_get_code_by("DISPLAYKEY",220,"EMERGENCYDEPARTMENT")),persist
;GET CODE SET 222 (Location Type) VALUES
	DECLARE BUILDING_CD = F8
	DECLARE FACILITY_CD = F8
        SET BUILDING_CD = UAR_GET_CODE_BY ("MEANING",222,"BUILDING")
        SET FACILITY_CD = UAR_GET_CODE_BY ("MEANING",222,"FACILITY")
 
;GET CODE SET 261 (Admit Status) VALUES
        DECLARE DISCHARGED_ENC = F8
        DECLARE ACTIVE_ENC = F8
        SET DISCHARGED_ENC = UAR_GET_CODE_BY ("MEANING",261,"DISCHARGED")
	SET ACTIVE_ENC = UAR_GET_CODE_BY ("MEANING",261,"ACTIVE")
 
;get CODE SET 263 (Alias Pool) VALUES
	DECLARE EPISODENBR = F8
	DECLARE MEDICARE = F8
        DECLARE RAHC_INSUR = F8
 
  ;;removed      DECLARE MRN_POOL = F8
        ;DECLARE VISIT_POOL = F8
    	SET EPISODENBR = UAR_GET_CODE_BY ("DISPLAYKEY",263,"EPISODENUMBER")
        SET MEDICARE = UAR_GET_CODE_BY  ("DISPLAYKEY",263,"MEDICARENUMBERSOCIALSECURITYNUMBER")
        SET RAHC_INSUR = UAR_GET_CODE_BY ("DISPLAYKEY",263,"HEALTHINSURANCEORGANISATION")
       ; SET VISIT_POOL = UAR_GET_CODE_BY("DISPLAYKEY",263,"VISITID")
DECLARE VISIT_POOL  = f8 with Constant(UAR_GET_CODE_BY("DISPLAYKEY",263,"VISITID")),persist
DECLARE MRN_POOL  = f8 with Constant(uar_get_code_by("DISPLAYKEY",263,"PATIENTMASTERINDEX")),persist
declare SESI_VISIT_POOL = f8 with Constant(uar_get_code_by("DISPLAYKEY",263,"SESIVISITID")),persist
;GET CODE SET 268 (Deceased) VALUES
DECLARE DECEASED = F8 with Constant(UAR_GET_CODE_BY ("MEANING",268,"YES")),persist
 
;GET CODE SET 282 (RACE) VALUES
	DECLARE ABORIGINAL = F8
	DECLARE TS_ISLANDER = F8
	DECLARE ABOR_TS_ISLAND = F8
	SET ABORIGINAL = UAR_GET_CODE_BY ("DISPLAYKEY",282,"ABORIGINALNOTTORRESSTRAITISLANDER")
	SET TS_ISLANDER = UAR_GET_CODE_BY ("DISPLAYKEY",282,"TORRESSTRAITISLANDERNOTABORIGINAL")
	SET ABOR_TS_ISLAND = UAR_GET_CODE_BY ("DISPLAYKEY",282,"ABORIGINALANDTORRESSTRAITISLANDER")
 
;get CODE SET 319 (Encounter Alias Type) VALUES
     ;   DECLARE MEDRECNO = F8
	;DECLARE VISITID_NUM = F8
      ;  SET MEDRECNO = UAR_GET_CODE_BY ("MEANING",319,"MRN")
      ;  SET VISITID_NUM = UAR_GET_CODE_BY ("MEANING",319,"VISITID")
 
;GET CODE SET 320 (Personnel Alias Type) VALUES
	DECLARE ORGANISATION_DR = F8
	DECLARE LICENSENBR = F8
        SET ORGANISATION_DR = UAR_GET_CODE_BY ("MEANING",320,"DOCNBR")
        SET LICENSENBR = UAR_GET_CODE_BY ("MEANING",320,"LICENSENBR")
 
;GET CODE SET 329 (Interpreter Required) VALUES
	DECLARE INTERPRETER_REQ = F8
        SET INTERPRETER_REQ = UAR_GET_CODE_BY ("DISPLAYKEY",329,"YES")
 
;;******GET CODE SET 333 (Encounter/Personnel Relation) VALUES*********
declare ADMITDR = F8 with constant(uar_get_code_by("MEANING",333,"ADMITDOC")),persist
declare ATTENDDR = F8 with constant(uar_get_code_by("MEANING",333,"ATTENDDOC")),persist
DECLARE ENCOUNTER_GP = f8 with Constant(uar_get_code_by("DISPLAY_KEY",333,"ENCOUNTERGP")),persist
 
;GET CODE SET 331 (Person/Personnel Relation) VALUES
        DECLARE GP_DR = F8
        SET GP_DR = UAR_GET_CODE_BY ("MEANING",331,"FAMILYDOC")
 
    DECLARE PED = f8 with Constant(uar_get_code_by("MEANING",331,"PEDIATRICIAN")),persist
;GET CODE SET 338 (Person/Organization Relation) VALUES
	DECLARE EMPLOYER = F8
        SET EMPLOYER = UAR_GET_CODE_BY ("MEANING",338,"EMPLOYER")
 
;GET CODE SET 339 (Encounter Domain Type) VALUES
	DECLARE CENSUS_D = F8
	SET CENSUS_D = UAR_GET_CODE_BY ("MEANING",339,"CENSUS")
 
;GET CODE SET 351 (Person Relationship Type) VALUES
        DECLARE DEFAULT_GUARANTOR = F8
        DECLARE NOK_CD = F8   ;;006
        SET DEFAULT_GUARANTOR = UAR_GET_CODE_BY ("MEANING",351,"DEFGUAR")
        SET NOK_CD = UAR_GET_CODE_BY ("MEANING",351,"NOK")  ;;006
 
;get CODE SET 355 (info_type_cd) VALUES
     ;   DECLARE USER_DEFINED = F8
      ;  DECLARE COMMENT = F8
    ;    SET USER_DEFINED = UAR_GET_CODE_BY ("MEANING",355,"USERDEFINED")
     ;   SET COMMENT = UAR_GET_CODE_BY ("MEANING",355,"COMMENT")
declare USER_DEFINED   =  f8 with Constant(UAR_GET_CODE_BY ("MEANING",355,"USERDEFINED")),persist
declare COMMENT        =  f8 with Constant(UAR_GET_CODE_BY ("MEANING",355,"COMMENT")),persist
;GET CODE SET 356 (info_sub_type_cd) VALUES
        DECLARE ACC_EXP = F8
        DECLARE ACC_ISSUE = F8
	DECLARE REFERRED_TO = F8
        DECLARE IPC = F8
        DECLARE HEALTH_F_CLAIM = F8
        SET ACC_EXP = UAR_GET_CODE_BY ("DISPLAYKEY",356,"ACCEXPIRYDATE")
        SET ACC_ISSUE = UAR_GET_CODE_BY ("DISPLAYKEY",356,"ACCISSUEDATE")
	SET REFERRED_TO = UAR_GET_CODE_BY ("DISPLAYKEY",356,"REFERREDTOFACILITY")
        SET IPC = UAR_GET_CODE_BY ("DISPLAYKEY",356,"IPC")
        SET HEALTH_F_CLAIM = UAR_GET_CODE_BY ("DISPLAYKEY",356,"MAKINGHEALTHFUNDCLAIM")
        declare NDISPARTICIPANT_VAR = f8 with Constant(uar_get_code_by("MEANING",356,"NDIS_PARTICI")),persist
        declare NDIS_NUM_CD = f8 with Constant(uar_get_code_by("MEANING",356,"NDIS_NUM")),persist
 
;GET CODE SET 357 (PRSNL_GROUP_TYPE_CD) VALUES
        DECLARE ADM_RIGHTS = F8
        SET ADM_RIGHTS = UAR_GET_CODE_BY ("DISPLAYKEY",357,"ADMITTINGRIGHTS")
 
;GET CODE SET 14233 (Scheduling States) VALUES
	DECLARE CHECKED_IN = F8
	DECLARE CHECKED_OUT = F8
	DECLARE CONFIRMED = F8
        DECLARE NOSHOW =  F8
        DECLARE RESCHEDULED = F8
        SET CHECKED_IN = UAR_GET_CODE_BY ("MEANING",14233,"CHECKED IN")
        SET CHECKED_OUT = UAR_GET_CODE_BY ("MEANING",14233,"CHECKED OUT")
        SET CONFIRMED = UAR_GET_CODE_BY ("MEANING",14233,"CONFIRMED")
        SET NOSHOW = UAR_GET_CODE_BY ("MEANING",14233,"NOSHOW")
        SET RESCHEDULED = UAR_GET_CODE_BY ("MEANING",14233,"RESCHEDULED")
 
;GET CODE SET 14772 (Delay status) VALUES
	DECLARE NOT_DELAYED = F8
	SET NOT_DELAYED = UAR_GET_CODE_BY ("DISPLAYKEY",14772,"NOTDELAYED")
 
;GET CODE SET 14775 (Reasons for removal) VALUES
	DECLARE PAT_ADM_PLAN_PROC = F8
	DECLARE ADM_PLAN_PROC = F8
	DECLARE ADM_EMER_PLAN_PROC = F8
	DECLARE ADM_AS_EMER = F8
	DECLARE PAT_UNCONTACTABLE = F8
	DECLARE PAT_TRANS = F8
	DECLARE PAT_TREAT_ELSEWARE = F8
	DECLARE CANCEL_BY_DR = F8
	DECLARE DR_CANCEL_THEATRE = F8
	DECLARE PAT_NOT_PRESENT = F8
	DECLARE PAT_DECLINED = F8
	DECLARE PAT_DECEASED = F8
	DECLARE ADM_OTHER_PUBLIC = F8
	DECLARE ADM_OTHER_PRIV = F8
	DECLARE DATA_ERROR = F8
	DECLARE NOT_REMOVED = F8
	DECLARE SUR_NOT_REQUIRED = F8
	DECLARE DUP_BOOKING = F8
	SET PAT_ADM_PLAN_PROC = 0  ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"PATIENTADMITTEDFORPLANNEDPROCEDURE")
	SET ADM_PLAN_PROC = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"ADMITTEDFORPLANNEDPROCEDURE")
	SET ADM_EMER_PLAN_PROC = 0  ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"ADMFOREMERGPROCALSOPLANPROC")
	SET ADM_AS_EMER = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"ADMITTEDASEMERGENCYFORPLANNEDPROC")
	SET PAT_UNCONTACTABLE = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"UNABLETOCONTACT")
	SET PAT_TRANS = 0  ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"PATIENTTRANSFERRED")
	SET PAT_TREAT_ELSEWARE = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"TREATEDELSEWHEREINANOTHERHOSPITAL")
	SET CANCEL_BY_DR = 0    ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"BOOKINGCANCELLEDBYDOCTOR")
	SET DR_CANCEL_THEATRE = 0     ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"THEATRELISTCANCELLEDBYDOCTOR")
	SET PAT_NOT_PRESENT = 0    ;UAR_GET_CODE_BY ("DISPLAYKEY",14775,"PATIENTDIDNOTPRESENTFORADMISSION")
 	SET PAT_DECLINED = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"SURGERYNOTREQUIREDPATIENTDECLINED")
 	SET PAT_DECEASED = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"PATIENTDECEASED")
	SET ADM_OTHER_PUBLIC = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"ADMCONTRACTEDTOANOTHERPUBLICHOSP")
	SET ADM_OTHER_PRIV = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"ADMCONTRACTEDTOPVTEHOSPDAYPROCCNT")
	SET DATA_ERROR = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"CLERICALERROR")
	SET NOT_REMOVED = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"NOTREMOVED")
	SET SUR_NOT_REQUIRED = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"SURGERYNOTREQUIREDPTRECOVERED")
	SET DUP_BOOKING = UAR_GET_CODE_BY ("DISPLAYKEY",14775,"DUPLICATEBOOKING")
 
;004 replace below
;GET CODE SET 14776 (Urgency) VALUES
;	DECLARE NOT_READY = F8
;	DECLARE URGENT = F8
;	DECLARE HIGH = F8
;	DECLARE WITHIN_90_DAYS = F8
;	DECLARE STANDARD_LISTING = F8
;	SET NOT_READY = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"9NOTREADYFORCARESTAGEDDEFERRED")
;	SET URGENT = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"1URGENTWITHIN7DAYS")
;	SET HIGH = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"2HIGHPRIORITY7DAYS30DAYS")
;	SET WITHIN_90_DAYS = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"7REQUIRINGADMISSIONWITHIN90DAYS")
;	SET STANDARD_LISTING = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"8STANDARDLISTING90DAYSEXPD6M")
;with below
;GET CODE SET 14776 (Urgency) VALUES
        DECLARE NOT_READY = F8
        DECLARE WITHIN_30_DAYS = F8
        DECLARE WITHIN_90_DAYS = F8
        DECLARE WITHIN_365_DAYS = F8
        SET NOT_READY =
             UAR_GET_CODE_BY
                  ("DISPLAYKEY",14776,"DNOTREADYFORCARESTAGEDDEFERRED")
        SET WITHIN_30_DAYS = UAR_GET_CODE_BY ("DISPLAYKEY",14776,"AWITHIN30DAYS")
        SET WITHIN_90_DAYS =
                     UAR_GET_CODE_BY ("DISPLAYKEY",14776,"BWITHIN90DAYS")
        SET WITHIN_365_DAYS =
                     UAR_GET_CODE_BY("DISPLAYKEY",14776,"CWITHIN365DAYS")
 
;GET CODE SET 18529 (Planned Procedure) VALUES
	DECLARE PERIT_DIALYSIS = F8
	DECLARE HAEMODIALYSIS = F8
        SET PERIT_DIALYSIS = UAR_GET_CODE_BY ("DISPLAYKEY",18529,"PERITONEALDIALYSIS")
        SET HAEMODIALYSIS = UAR_GET_CODE_BY ("DISPLAYKEY",18529,"HAEMODIALYSIS")
 
;GET CODE SET 19189 (Personnel Group Class) VALUES
 	DECLARE PROVIDER_GRP = F8
        DECLARE CARE_TEAM = F8
        SET PROVIDER_GRP = UAR_GET_CODE_BY ("MEANING",19189,"DCPTEAM")
        SET CARE_TEAM = UAR_GET_CODE_BY ("MEANING",19189,"CARETEAM")
 
;GET CODE SET 27000 (WL LETTER TYPE)
        DECLARE B2_LETTER_CD = F8
        DECLARE C1_LETTER_CD = F8
        SET B2_LETTER_CD = UAR_GET_CODE_BY("DISPLAYKEY",27000,"B2")
        SET C1_LETTER_CD = UAR_GET_CODE_BY("DISPLAYKEY",27000,"C1")
 
;GET CODE SET 28100 (Mental Health Status) VALUES
        DECLARE NO_ACT = F8
	DECLARE NOT_KNOWN = F8
        SET NO_ACT = UAR_GET_CODE_BY ("DISPLAYKEY",28100,"NOACTAPPLIES")
        SET NOT_KNOWN = UAR_GET_CODE_BY ("DISPLAYKEY",28100,"NOTKNOWNNOTSTATED")
 
;get CODE SET 29520 (ENTRY MODE CODE) VALUES
;        DECLARE POWERFORMS_CD = F8
;        SET POWERFORMS_CD = UAR_GET_CODE_BY ("DISPLAY_KEY", 29520, "POWERFORMS")  ;008
        DECLARE POWERFORMS_CD = f8 with Constant(uar_get_code_by("DISPLAYKEY",29520,"POWERFORMS")),persist
 
;get code set 4002009 (Diagnosis Onset Type)
		declare poa_cd = f8
 		set poa_cd = uar_get_code_by("MEANING",4002009,"POA")
 
; Get code values for order requisitions
declare CURRENT_CLINOTES_CD = f8 with Constant(uar_get_code_by("MEANING",14,"CLINHIST")),persist
declare GEN_CLINOTES_CD = f8 with Constant(uar_get_code_by("MEANING",14,"GENCLINHIST")),persist
 
;;;****CODESET 6004*****
declare FUTURE_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"FUTURE")),persist
declare ORDERED_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"ORDERED")),persist
declare CANCEL_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"CANCELED")),persist
declare COMPLETE_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"COMPLETED")),persist
declare DISCONTINUED_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"DISCONTINUED")),persist
declare CANCELLED_CODE = f8 with Constant(uar_get_code_by("DISPLAYKEY",6004,"CANCELLED")),persist
declare DELETED_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"DELETED")),persist
declare VOIDEDWITHRESULTS_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"VOIDEDWRSLT")),persist
declare TRANSCANCEL_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"TRANS/CANCEL")),persist
declare DISCONTINUED_VAR = f8 with Constant(uar_get_code_by("MEANING",6004,"DISCONTINUED")),persist
declare CANCELLED_VAR = f8 with Constant(uar_get_code_by("DISPLAYKEY",6004,"CANCELLED")),persist
declare INPROCESS_CODE = f8 with Constant(uar_get_code_by("MEANING",6004,"INPROCESS")),persist
; Get provider_number
declare PROVIDER_NUM_CD = f8 with Constant(uar_get_code_by("MEANING",320,"DOCUPIN")),persist
/********************************end of 707_get_cv.inc*************************************/
 
 
;Get code values for 281
declare DEFAULT_FORMAT_CD = f8 with Constant(uar_get_code_by("MEANING",281,"DEFAULT")),persist
 
;;;declare MRN_cd = f8 with Constant(uar_get_code_by("MEANING",4,"MRN")),persist
declare auth_cd     = f8 with constant(uar_get_code_by("MEANING",8,"AUTH")),persist
declare ALTERED_CD  = f8 with constant(uar_get_code_by("MEANING",8,"ALTERED")),persist
declare modified_cd = f8 with constant(uar_get_code_by("MEANING",8,"MODIFIED")),persist
declare ERROR_CD    = f8 with constant(uar_get_code_by("MEANING",8,"INERROR")),persist
 
;;;*****eMM related variables******
declare PHARMACY_CAT_TYPE_CD = f8 with Constant(uar_get_code_by("MEANING",6000,"PHARMACY")),persist
declare PHARMACY_ACT_TYPE_CD = f8 with Constant(uar_get_code_by("MEANING",106,"PHARMACY")),persist
declare order_action_typ = f8 with constant(uar_get_code_by("DISPLAYKEY",6003,"ORDER")),persist
 
 
;;;****CODESET 29520******
declare medadmin_entry = f8 with constant(uar_get_code_by("MEANING",29520,"MEDADMIN")),persist
declare UNDEFINED_CD = f8 with constant(uar_get_code_by("MEANING",29520,"UNDEFINED")),persist
declare dyn_doc_cd = f8 with constant(uar_get_code_by("MEANING",29520,"DYNDOC")),persist
 
;;;****CODESET 53******
declare med_class = f8 with constant(uar_get_code_by("MEANING",53,"MED")),persist
declare placeholder = F8 with constant(uar_get_code_by("meaning",53,"PLACEHOLDER")),persist
declare MDOC = F8 with constant(uar_get_code_by("MEANING",53,"MDOC")),persist
declare doc_cd = f8 with Constant(uar_get_code_by("MEANING",53,"DOC")),persist
 
;;;*****CODESET 72*****
;;declare dosing_weight= f8 with constant(uar_get_code_by("displaykey",72,"WEIGHTDOSING")) replaced with weightdosing
declare WEIGHTDOSING_CD = f8 with constant(uar_get_code_by("displaykey",72,"WEIGHTDOSING")),persist
declare BSA = f8 with constant(uar_get_code_by("displaykey",72,"BSA")),persist
declare chemo_dosing_weight= f8 with constant(uar_get_code_by("displaykey",72,"CHEMOTHERAPYDOSINGWEIGHT")),persist
declare chemo_BSA = f8 with constant(uar_get_code_by("displaykey",72,"CHEMOTHERAPYBSA")),persist
 
;;;*****CODESET 120*****
declare ocfcomp_cd = F8 with constant(uar_get_code_by("meaning",120 ,"OCFCOMP")),persist
 
declare ELIGIBLEAUSTRESIDENT_VAR = f8 with Constant(uar_get_code_by("DISPLAYKEY",14650,"ELIGIBLEAUSTRESIDENT")),persist
 
declare IV_VAR = f8 with Constant(uar_get_code_by("DISPLAYKEY",18309 ,"IV")),persist
 
;;; ***** CODESET 12020****
declare DRUG_VAR = f8 with Constant(uar_get_code_by("MEANING",12020,"DRUG")),persist
 
;;; ***** CODESET 12025****
declare ACTIVE_VAR = f8 with Constant(uar_get_code_by("MEANING",12025,"ACTIVE")),persist
 
;;; ***** CODESET 12030****
declare life_cycle_active_status_cd = f8 with Constant(uar_get_code_by("MEANING",12030,"ACTIVE")),persist
 
;;; ***** CODESET 12031***
declare confirmation_conf_cd = f8 with Constant(uar_get_code_by("MEANING",12031,"CONFIRMED")),persist
 
;;; ***** CODESET 12033
declare classification_alert_cd = f8 with Constant(uar_get_code_by("MEANING",12033,"ALERT")),persist
 
;;; *****  CODESET 100082 *** NDIS Participant
 
declare ndis_waiting_approv_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",100082,"YESAWAITINGAPPROVAL")),persist
declare ndis_active_package_cd = f8 with Constant(uar_get_code_by("DISPLAYKEY",100082,"YESACTIVEPACKAGE")),persist
 
; select into $OUTDEV
; from dummyt d
; where d.seq > 0
; with nocounter
 
/**************************************************************
; DVDev DEFINED SUBROUTINES
**************************************************************/
 
end
go
 
