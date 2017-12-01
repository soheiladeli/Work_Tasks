SELECT DISTINCT
	oc.DESCRIPTION
	, oc.PRIMARY_MNEMONIC
	, oe.OE_FORMAT_NAME
	, oe.OE_FORMAT_ID
	, oef.DESCRIPTION
	, oef.OE_FIELD_ID
	, off.ACCEPT_FLAG

FROM
	order_catalog   oc
	, order_entry_format   oe
	, oe_format_fields   off
	, order_entry_fields   oef

plan oc where oc.active_ind = 1
join oe where oe.oe_format_id = oc.oe_format_id
join off where off.oe_format_id = oe.oe_format_id
		and off.accept_flag != 2
join oef where oef.oe_field_id = off.oe_field_id
		and oef.description = "Examination"

ORDER BY
	oc.DESCRIPTION

WITH NOCOUNTER, SEPARATOR=" ", FORMAT
