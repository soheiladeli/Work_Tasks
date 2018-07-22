;;Query to get visits with Current Ward as COU	
	
SELECT DISTINCT	
	EPISODE_Num = concat("00",ea1.alias)
	, MRN = if (textlen(ea.alias) < 7)  concat("0",ea.alias)
		else ea.alias endif
	, Reg_Dt = e.reg_dt_tm "@SHORTDATETIME"
	, Disch_Dt = e.disch_dt_tm "@SHORTDATETIME"
	, encounter_type = uar_get_code_display(e.encntr_type_cd)
	, ward = uar_get_code_display(e.loc_nurse_unit_cd)
	
FROM	
	 encounter   e
	, encntr_alias   ea
	, encntr_alias   ea1
	
where e.reg_dt_tm between cnvtdatetime("01-JUNE-2018 00:00")
and cnvtdatetime(curdate, curtime)	
and e.active_ind = 1	
;and e.encntr_type_cd = 7043.00 ;;Inpatient
and e.loc_nurse_unit_cd = 86792497.00 ;;Close Observation Unit
	
and ea.encntr_id = e.encntr_id	
and ea.active_ind = 1	
and ea.alias_pool_cd = 7047.00 ;;CHW MRN
and ea1.encntr_id = e.encntr_id	
and ea1.active_ind = 1	
and ea1.alias_pool_cd = 7048.00	;;EPISODE NUMBER
order by e.reg_dt_tm	
