Select distinct
ca.category_mean,
ca.category_name,
ca.br_datamart_category_id  ,
rp.report_name,f.filter_display,v.br_datamart_value_id,
event_set=uar_get_code_display(v.parent_entity_id),
v.freetext_desc,updt_dt = format(v.updt_dt_tm,"mm/dd/yyyy hh:mm:ss;;q")
from br_datamart_report_filter_r r,
    br_datamart_report rp,
    br_datamart_category ca,
    br_datamart_filter f,
    br_datamart_value v,
    v500_event_set_canon c
plan ca
join rp where ca.br_datamart_category_id = rp.br_datamart_category_id
and rp.report_name != "Care*"
and ca.category_mean != "MP_ED_LAUNCH"
and ca.category_mean != "EQC*"
and ca.category_mean != "MUS*"
join r where rp.br_datamart_report_id = r.br_datamart_report_id
join f where r.br_datamart_filter_id = f.br_datamart_filter_id
and f.filter_category_mean = "EVENT_SET"
join v where f.br_datamart_filter_id = v.br_datamart_filter_id
join c where v.parent_entity_id = c.parent_event_set_cd
and exists (select "x" from br_datamart_value v1
where c.event_set_cd = v1.parent_entity_id
and v.br_datamart_filter_id = v1.br_datamart_filter_id
and v.br_datamart_flex_id = v1.br_datamart_flex_id)
order by ca.category_name,rp.report_name,v.br_datamart_value_id
go
