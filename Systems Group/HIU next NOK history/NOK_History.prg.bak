SELECT
	MRN = PA.ALIAS
	, NAME = P.NAME_FULL_FORMATTED
	, RELATION_TYPE = UAR_GET_CODE_DISPLAY(PP.PERSON_RELTN_TYPE_CD)
	, RELATION = UAR_GET_CODE_DISPLAY(PP.PERSON_RELTN_CD)
	, RELATION_NAME = P2.name_full_formatted
	;, VISIT_ID = pa2.alias	
	, ACTIVE_IND = PP.active_ind
	, BEG_DT = PP.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, END_DT = PP.END_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, LAST_UPDATE_TM = PP.UPDT_DT_TM "@SHORTDATETIME"
	, LAST_UPDATER_NAME = PR.NAME_FULL_FORMATTED

FROM
	PERSON_PERSON_RELTN_HIST   PP
	, PERSON   P
	, PERSON   P2
	, PRSNL   PR
	, PERSON_ALIAS   PA
	;, PERSON_ALIAS   PA2

plan pp where pp.person_id = 49215518
join pa where pa.person_id = pp.person_id
		and pa.alias_pool_cd =  7047.00
join p where p.person_id = pp.person_id
;join pa2 where pa2.person_id = pp.person_id
		;and pa2.alias_pool_cd =  105586.00
join p2 where p2.person_id = pp.related_person_id
join pr where pr.person_id = pp.updt_id

ORDER BY
	PP.BEG_EFFECTIVE_DT_TM   DESC

WITH NOCOUNTER, SEPARATOR=" ", FORMAT


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
SELECT
	MRN = EA.ALIAS
	, NAME = P.NAME_FULL_FORMATTED
	, RELATION_TYPE = UAR_GET_CODE_DISPLAY(E.PERSON_RELTN_TYPE_CD)
	, RELATION = UAR_GET_CODE_DISPLAY(E.PERSON_RELTN_CD)
	, RELATION_NAME = P2.NAME_FULL_FORMATTED
	, VISIT_ID = ea2.alias
	, ACTIVE_IND = E.ACTIVE_IND
	, BEG_DT = E.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, END_DT = E.END_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, LAST_UPDATE_TM = E.UPDT_DT_TM "@SHORTDATETIME"
	, LAST_UPDATER_NAME = PR.NAME_FULL_FORMATTED

FROM
	ENCNTR_PERSON_RELTN_HIST   E
	, encounter en
	, PERSON   P
	, PERSON   P2
	, PRSNL   PR
	, ENCNTR_ALIAS   EA
	, ENCNTR_ALIAS   EA2 

plan E where e.encntr_id = 58594587
join ea where ea.encntr_id = e.encntr_id
		and ea.alias_pool_cd = 7047.00
join en where en.encntr_id = e.encntr_id
join p where p.person_id = en.person_id
join p2 where p2.person_id = e.related_person_id
join ea2 where ea2.encntr_id = e.encntr_id
		and ea2.alias_pool_cd = 105586.00
join pr where pr.person_id = e.updt_id

ORDER BY
	e.BEG_EFFECTIVE_DT_TM   DESC

WITH NOCOUNTER, SEPARATOR=" ", FORMAT

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
SELECT
	MRN = EA.ALIAS
	, NAME = P.NAME_FULL_FORMATTED
	, RELATION_TYPE = UAR_GET_CODE_DISPLAY(E.PERSON_RELTN_TYPE_CD)
	, RELATION = UAR_GET_CODE_DISPLAY(E.PERSON_RELTN_CD)
	, RELATION_NAME = P2.NAME_FULL_FORMATTED
	, VISIT_ID = ea2.alias
	, ACTIVE_IND = E.ACTIVE_IND
	, BEG_DT = E.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, END_DT = E.END_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, LAST_UPDATE_TM = E.UPDT_DT_TM "@SHORTDATETIME"
	, LAST_UPDATER_NAME = PR.NAME_FULL_FORMATTED

FROM
	ENCNTR_PERSON_RELTN_HIST   E
	, encounter en
	, PERSON   P
	, PERSON   P2
	, PRSNL   PR
	, ENCNTR_ALIAS   EA
	, ENCNTR_ALIAS   EA2 

plan E where e.encntr_id in (select encntr_id from encounter e
								where e.person_id = 49215518)
join ea where ea.encntr_id = e.encntr_id
		and ea.alias_pool_cd = 7047.00
join en where en.encntr_id = e.encntr_id
join p where p.person_id = en.person_id
join p2 where p2.person_id = e.related_person_id
join ea2 where ea2.encntr_id = e.encntr_id
		and ea2.alias_pool_cd = 105586.00
join pr where pr.person_id = e.updt_id

ORDER BY
	VISIT_ID DESC
	, e.BEG_EFFECTIVE_DT_TM   DESC

WITH NOCOUNTER, SEPARATOR=" ", FORMAT
