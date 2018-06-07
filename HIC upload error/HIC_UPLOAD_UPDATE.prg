update into PRSNL_ALIAS PA
set pa.active_ind = 0
where pa.prsnl_alias_id in (
SELECT pa2.prsnl_alias_id
FROM PRSNL_ALIAS PA1, PRSNL_ALIAS PA2, PRSNL_ALIAS PA3
where pa1.active_ind = 1
and pa1.prsnl_alias_type_cd = 98
and pa2.person_id = pa1.person_id
and pa2.updt_dt_tm > sysdate - 100
and pa2.active_ind = 1
and pa2.prsnl_alias_type_cd = 96
and pa2.prsnl_alias_id not in(
select max (p.prsnl_alias_id) from PRSNL_ALIAS p
where p.person_id = pa2.person_id
and p.active_ind = 1)		
and pa3.person_id = pa2.person_id
and pa3.active_ind = 1
and pa3.prsnl_alias_type_cd = 96
and pa3.alias != pa2.alias
and pa3.prsnl_alias_id != pa2.prsnl_alias_id) go

;;;;;
update into PRSNL_ALIAS PA
set pa.active_ind = 1
where pa.prsnl_alias_id in (
15817322.00, 15277120.00
) go

