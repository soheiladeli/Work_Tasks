Select PERSON_NAME = p.name_full_formatted,
POS=uar_get_code_display(p.position_cd),
APP=dp.application_number,
nvp.pvc_name,
nvp.pvc_value
from detail_prefs dp, name_value_prefs nvp, prsnl p
where nvp.pvc_name = "INACTIVE_PLANS_LOOKBACK_DAYS"
and (cnvtint(trim(nvp.pvc_value)) not between 1 and 5
or cnvtint(trim(nvp.pvc_value)) != 30)
and nvp.parent_entity_name = "DETAIL_PREFS"
and dp.detail_prefs_id = nvp.parent_entity_id
and dp.active_ind = 1 and dp.prsnl_id > 0
and dp.comp_name = "ORDERPOE"
and dp.view_name = "ORDERPOE"
and dp.prsnl_id = p.person_id go
