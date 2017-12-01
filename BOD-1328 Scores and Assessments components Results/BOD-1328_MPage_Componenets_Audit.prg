;Name:				MPage Componenets Audity
;Developed by:		Javad Adeli
;Comments:			Uncommnet query to filter as required

SELECT
	mPage_name = BDC.CATEGORY_NAME
	, Component_Name = B.REPORT_NAME
	, Filter_name = BDF.FILTER_DISPLAY
	, FILTER_TYPE = build(BDF.FILTER_CATEGORY_MEAN, " CODE")
	, Value_Display = if (cv1.display = null)
    if (bdv.freetext_desc not = " ")
        if (bdv.freetext_desc = "0")  "No"
        elseif (bdv.freetext_desc = "1")  "Yes"
        else bdv.freetext_desc
        endif
    elseif (bdv.freetext_desc = " ") 
      build(bdv.mpage_param_mean , " -- " ,bdv.mpage_param_value)
    endif
     else 
       cv1.display
     endif
;//uncomment below to display if is default or position setting      
;	, Default_or_Position = if ( BDFR.BR_DATAMART_FLEX_ID = 0) "Default Build"
;elseif (BDFR.BR_DATAMART_FLEX_ID != 0)
;  if (cv2.active_ind = 0)  
;  BUILD("INACTIVE - ", cv2.display)  
;  elseif (cv2.active_ind = 1) CV2.DISPLAY
;  endif
;endif

FROM
	BR_DATAMART_CATEGORY   BDC
	, BR_DATAMART_REPORT   B
	, BR_DATAMART_REPORT_FILTER_R   BD
	, BR_DATAMART_VALUE   BDV
	, CODE_VALUE   CV1
	, BR_DATAMART_FILTER   BDF
	, BR_DATAMART_FLEX   BDFR
	, CODE_VALUE   CV2

plan bdc ; where bdc.category_name = "Assessment" ;//uncomment to filter by MPage

join  b WHERE b.br_datamart_category_id = bdc.br_datamart_category_id
		and b.report_name = "Patient Assessment" ;//Filter by componenet name
join bd where BD.BR_DATAMART_REPORT_ID = B.BR_DATAMART_REPORT_ID
join bdv where BDV.BR_DATAMART_FILTER_ID= bd.br_datamart_filter_id

join cv1 where CV1.CODE_VALUE = BDV.PARENT_ENTITY_ID
;and cv1.code_value in (55019734,55019736) ;// uncomment to filter by event codes

join bdf where BDF.BR_DATAMART_FILTER_ID = BDV.BR_DATAMART_FILTER_ID
		and bdf.filter_category_mean = "EVENT" ;//Filter by event code type filters only

join bdfr where BDFR.BR_DATAMART_FLEX_ID =BDV.BR_DATAMART_FLEX_ID
join cv2 where outerjoin(BDFR.PARENT_ENTITY_ID) = CV2.CODE_VALUE
and cv2.active_ind = outerjoin(1)

ORDER BY
	mPage_name
	, Component_Name
	, bdf.filter_seq
	, value_display
	, BDF.FILTER_DISPLAY

WITH OUTERJOIN = bdfr
