;removing associated form linked to an order
update into order_catalog o
set o.form_id = 0
where o.catalog_cd = 82767924.00

update into order_catalog o
set o.form_id = 0
where o.catalog_cd in (81578616.00,
   81578620.00,
   81578481.00,
   81578485.00,
   81578568.00,
   81578572.00,
   81578581.00,
   81578585.00,
   81577730.00,
   81577734.00,
       7740.00,
       7820.00,
   81578527.00,
   81578531.00,
   81578541.00,
   81578545.00,
   81578554.00,
   81578558.00,
   81578716.00,
   81578720.00,
   81578592.00,
   81578596.00)

+++++++++++++++++++++++++++++++++++++
update into order_catalog o
set o.form_id = 0
where o.catalog_cd in (79069308.00)