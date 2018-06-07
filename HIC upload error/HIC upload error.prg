SELECT
	Docupin = PAR.ALIAS
	, p.ALIAS
	, PA.ALIAS
	, p.PERSON_ID
	, P_PRSNL_ALIAS_TYPE_DISP = UAR_GET_CODE_DISPLAY(P.PRSNL_ALIAS_TYPE_CD)
	, p.BEG_EFFECTIVE_DT_TM
	, p.END_EFFECTIVE_DT_TM
	, p.UPDT_DT_TM  "@SHORTDATETIME"
	, PA.BEG_EFFECTIVE_DT_TM
	, PA.END_EFFECTIVE_DT_TM
	, PA.UPDT_DT_TM "@SHORTDATETIME"

FROM
	prsnl_alias   p
	, PRSNL_ALIAS   PA
	, PRSNL_ALIAS   PAR

plan p
where p.updt_dt_tm >= sysdate -10;cnvtdatetime("01-JAN-2017 00:00")
and p.active_ind = 1
and p.prsnl_alias_type_cd = 96   ;;comm doc number
join par
where par.person_id = p.person_id
and par.active_ind = 1
and par.prsnl_alias_type_cd = 98   ;;docupin
join pa
where pa.person_id = p.person_id
and pa.active_ind = 1
and pa.prsnl_alias_type_cd = 96   ;;comm doc number
and pa.prsnl_alias_id != p.prsnl_alias_id
and p.alias != pa.alias

ORDER BY
	Docupin
	, PA.UPDT_DT_TM   DESC
