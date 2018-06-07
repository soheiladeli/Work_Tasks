/************************************************************************************
 *                  GENERATED MODIFICATION CONTROL LOG                 				*
 ************************************************************************************
 *                                                                    				*
 *Mod 	Date       Engineer             Comment                          			*
 *--- 	--------   -------------------- ---------------------------------			*
 *000	25/05/18	Javad Adeli			To inactivate duplicate records from 		*
 *										PRSNL_ALIAS table for community_dr_nbr	  	*
 *										alias type after new HIC upload.			*
 *001																				*
 *																					*
 *																					*
 ************************************************************************************
 
 
 ******************  END OF ALL MODCONTROL BLOCKS  **********************************/
drop program 707_hic_load_cleanup go
create program 707_hic_load_cleanup
 
prompt 
	"Output to File/Printer/MINE" = "MINE"   ;* Enter or select the printer or file name to send this report to.
	, "Action: 1-Audit   2-Update" = "" 

with OUTDEV, action

SET  USERID  =  REQINFO -> UPDT_ID
 
;=========================================
if($action = "A");audit duplicates
;=========================================
;audit prsnl_alais table for duplicate records
select into $outdev

SELECT into $outdev
                DOCUPIN = PA1.ALIAS
                , PERSON_ID = PA1.PERSON_ID
                , pa2.prsnl_alias_id                         
                , COMMUNITY_DR_NBR_1 = PA2.ALIAS
                , BEG_EFFECTIVE_DT_TM_1 = PA2.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"
                , UPDT_DT_TM_1 = PA2.UPDT_DT_TM "@SHORTDATETIME"     
                , pa3.prsnl_alias_id         
                , COMMUNITY_DR_NBR_2 = PA3.ALIAS                                
                , BEG_EFFECTIVE_DT_TM_2 = PA3.BEG_EFFECTIVE_DT_TM "@SHORTDATETIME"                            
                , UPDT_DT_TM_2 = PA3.UPDT_DT_TM "@SHORTDATETIME"

FROM
                PRSNL_ALIAS   PA1
                , PRSNL_ALIAS   PA2
                , PRSNL_ALIAS   PA3

Plan pa1 where pa1.active_ind = 1                                           
                                                and pa1.end_effective_dt_tm > sysdate
                                                and pa1.prsnl_alias_type_cd = 98 ;DOCUPIN
                                                ;and pa1.person_id =    1113716.00
                                                
join pa2 where pa2.person_id = pa1.person_id                                 
                                                and pa2.active_ind = 1
                                                and pa2.end_effective_dt_tm > sysdate
                                                and pa2.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
                                                and pa2.prsnl_alias_id in(
                                                select max(p.prsnl_alias_id) from PRSNL_ALIAS p
                                                where p.person_id = pa2.person_id
                                                and p.end_effective_dt_tm > sysdate
                                                and p.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
                                                and p.active_ind = 1
                                                )
                                                
join pa3 where pa3.person_id = pa2.person_id                                 
                                                and pa3.active_ind = 1
                                                and pa3.end_effective_dt_tm > sysdate
                                                and pa3.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
                                                and pa3.prsnl_alias_id != pa2.prsnl_alias_id
                                                and pa3.prsnl_alias_id < pa2.prsnl_alias_id

ORDER BY
                DOCUPIN
                , pa2.prsnl_alias_id   DESC
                , BEG_EFFECTIVE_DT_TM_1   DESC
                
with nocounter, separator=" ", format
;======================================                
endif
;======================================
if($action = "U");update to inactivate
;======================================
;inactivating duplicate records from prsnl_alias table
update into PRSNL_ALIAS PA
set pa.active_ind = 0
	, pa.end_effective_dt_tm = sysdate
	, pa.updt_dt_tm = sysdate
	, pa.updt_id = userid 
	, pa.active_status_cd = 1626       ;;Inactive
	, pa.active_status_prsnl_id = userid
	, pa.active_status_dt_tm= sysdate
where pa.prsnl_alias_id in (
	SELECT pa3.prsnl_alias_id  ;;keep the latest
	FROM PRSNL_ALIAS PA1,PRSNL_ALIAS PA2,PRSNL_ALIAS PA3
	where pa1.active_ind = 1                                             
		and pa1.end_effective_dt_tm > sysdate
		and pa1.prsnl_alias_type_cd = 98 ;DOCUPIN
		;and pa1.person_id =    1113716.00
		and pa2.person_id = pa1.person_id                                        
		and pa2.active_ind = 1
		and pa2.end_effective_dt_tm > sysdate
		and pa2.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
		and pa2.prsnl_alias_id in(
			select max(p.prsnl_alias_id) from PRSNL_ALIAS p
			where p.person_id = pa2.person_id
				and p.end_effective_dt_tm > sysdate
				and p.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
				and p.active_ind = 1)
		and pa3.person_id = pa2.person_id                                        
		and pa3.active_ind = 1
		and pa3.end_effective_dt_tm > sysdate
		and pa3.prsnl_alias_type_cd = 96 ;COMMUNITY DR NBR
		and pa3.prsnl_alias_id != pa2.prsnl_alias_id
		and pa3.prsnl_alias_id < pa2.prsnl_alias_id)
;======================================
endif
;======================================
end
go
 
