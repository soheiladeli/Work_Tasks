;To audit dupplicate rows for COOMUNITY DR NBR alias in prsnl_alias table after HIC upload

drop program hic_upload_dupplicate_audit go
create program hic_upload_dupplicate_audit

SELECT
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

end
go
