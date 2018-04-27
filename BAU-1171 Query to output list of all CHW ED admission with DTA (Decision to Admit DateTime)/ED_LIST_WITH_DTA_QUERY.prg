;query to output all ED addmissions DTA (Decision to Admit DateTime)							
							
SELECT
	VISIT_NUMBER = EA2.ALIAS
	, MRN = EA.ALIAS
	, ARRIVE_TIME = E.REG_DT_TM "@SHORTDATETIME"
	, E.DISCH_DT_TM "@SHORTDATETIME"
	, ADMIT_LOC = UAR_GET_CODE_DISPLAY(EL.LOC_NURSE_UNIT_CD)
	, DISCHARGED_LOC = UAR_GET_CODE_DISPLAY(E.LOC_NURSE_UNIT_CD)
	, ED_ACTIVITY_DT_TM = EL.ACTIVITY_DT_TM "@SHORTDATETIME"
	, FIRST_INPAT_LOC = UAR_GET_CODE_DISPLAY(ELT.LOC_NURSE_UNIT_CD)
	, BEG_EFFECTIVE_DT_TM = ELT.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"
	, TRANSACTION_DT_TM = ELT.TRANSACTION_DT_TM "@SHORTDATETIME"
	, INP_ACTIVITY_DT_TM = ELT.ACTIVITY_DT_TM "@SHORTDATETIME"

FROM
	ENCOUNTER   E
	, ENCNTR_ALIAS   EA
	, ENCNTR_ALIAS   EA2
	, ENCNTR_LOC_HIST   EL
	, ENCNTR_LOC_HIST   ELT
	, dummyt   d1

plan e where e.reg_dt_tm between CNVTDATETIME(CNVTDATE( 070116 ), 0) 							
							and CNVTDATETIME(CNVTDATE( 033118 ), 235959)
		and e.encntr_type_cd in (3078689.00, 7043.00, 7044.00) ;Emergency, Inpatient, Outpatient					
							
join EA where ea.encntr_id = e.encntr_id							
		and ea.alias_pool_cd in (7047);Patient Master Index					
							
join EA2 where ea2.encntr_id = e.encntr_id							
		and ea2.alias_pool_cd in (105586) ; Visist ID					
							
join el where el.encntr_id = e.encntr_id							
		and el.loc_nurse_unit_cd in (16087.00, 23216650.00, 16082.00)
;Emergency Department,Emergency Medical Unit,Emergency Cubes					
							
							
							
							
		and el.active_ind = 1					
		and el.encntr_loc_hist_id = (select min (el1.encntr_loc_hist_id)from ENCNTR_LOC_HIST   EL1					
		where el.encntr_id = el1.encntr_id and el1.active_ind = 1)					
							
join d1							
							
join elt where elt.encntr_id = e.encntr_id							
		and elt.active_ind = 1					
		and elt.encntr_loc_hist_id = (select min (elt1.encntr_loc_hist_id)from ENCNTR_LOC_HIST   ELT1					
		where elt.encntr_id = elT1.encntr_id and elt1.active_ind = 1 					
		and elt1.loc_nurse_unit_cd not in (16087.00, 23216650.00, 16082.00))					
;Emergency Department,Emergency Medical Unit,Emergency Cubes

ORDER BY
	E.REG_DT_TM
	, EL.BEG_EFFECTIVE_DT_TM

WITH NOCOUNTER, SEPARATOR=" ", FORMAT, outerjoin = d1
