;To inactivate dupplicate rows for COOMUNITY DR NBR alias in prsnl_alias table after HIC upload

drop program hic_upload_dupplicate_update go
create program hic_upload_dupplicate_update

update into PRSNL_ALIAS PA
set pa.active_ind = 0
, pa.end_effective_dt_tm = sysdate
, pa.updt_dt_tm = sysdate
, pa.updt_id = 1800684 
, pa.active_status_cd = 1626       ;;Inactive
, pa.active_status_prsnl_id = 1800684
, pa.active_status_dt_tm= sysdate
where pa.prsnl_alias_id in (
SELECT pa3.prsnl_alias_id  ;;keep the latest
FROM PRSNL_ALIAS PA1,PRSNL_ALIAS PA2,PRSNL_ALIAS PA3
where pa1.active_ind = 1                                             
and pa1.end_effective_dt_tm > sysdate
and pa1.prsnl_alias_type_cd = 98 ;DOCUPIN
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

end
go

