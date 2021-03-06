SELECT
	O_CATALOG_TYPE_DISP = UAR_GET_CODE_DISPLAY(O.CATALOG_TYPE_CD)
	, O.CATALOG_CD
	, O.PRIMARY_MNEMONIC
	, P.EXCEPTION_ID
	, P_EXCEPTION_TYPE_DISP = UAR_GET_CODE_DISPLAY(P.EXCEPTION_TYPE_CD)
	, PR_PRIVILEGE_DISP = UAR_GET_CODE_DISPLAY(PR.PRIVILEGE_CD)
	, PR_PRIV_VALUE_DISP = UAR_GET_CODE_DISPLAY(PR.PRIV_VALUE_CD)
	, PL_POSITION_DISP = UAR_GET_CODE_DISPLAY(PL.POSITION_CD)
;	, PG.LOG_GROUPING_CD
;	, L.LOGICAL_GROUP_DESC
;	, L.LOG_GROUPING_CD

FROM
	ORDER_CATALOG   O
	, PRIVILEGE_EXCEPTION   P
	, PRIVILEGE   PR
	, PRIV_LOC_RELTN   PL
;	, PRIV_GROUP_RELTN   PG
;	, LOGICAL_GROUPING   L
Plan o where o.active_ind = 1		
join p where p.exception_id = o.catalog_cd		
		and p.active_ind = 1	
join pr where pr.privilege_id = p.privilege_id
		and pr.privilege_cd	=  3593 ;Order inquiry	
		and pr.active_ind = 1
join pl where pl.priv_loc_reltn_id = pr.priv_loc_reltn_id
		and pl.position_cd = 80379355 ;Senior Medical Officer v1 80378138 ;DBA v1 ;
		;and pl.person_id = 49828000);Javad Adeli
;join pg where pg.privilege_id = p.privilege_id		
;		and pg.log_grouping_cd = 64755123 ;Helix Protocols
;join l where l.log_grouping_cd = pg.log_grouping_cd

ORDER BY
	O.PRIMARY_MNEMONIC

WITH NOCOUNTER, SEPARATOR=" ", FORMAT
