/* ----------------------------------------------------------------------------------

START OF CHW CUSTOM CODE
// 000 Tony                    			Outstanding orders deployment
// 001 Laxmisree Vanam         			SCHN IV Continuous Infusions deployment
// 002 Tony Fitzsimons					Enhance outstanding orders - 3day option, add accession to tooltip, set max height
// 003 Tony Fitzsimons		16/06/16	Add Alerts component, namespace schn.alerts2
// 004 Tony Fitzsimons		13/07/16	SCHN Incomplete Discharge Summaries and eHealth v3.0.2 code
// 005 Tony Fitzsimons		25/07/16	Add hyperlink for Respiratory support in alerts component (schn.alerts2)
// 006 Tony Fitzsimons		24/08/16 	SCHN Oncology Reference Documents component added (schn.clintrials)
// 007 Tony Fitzsimons		29/08/16	Add code for Waitlist (schn.wl_bookings) and Coded Admissions (schn.codedAdmissions)
// 008 Michael Gong 		29/08/16	Add code for Appointments (schn.appointments) 
// 009 Michael Gong         01/09/16    wording change for schn.appointments 
// 010 Tony Fitzsimons		01/09/16	Modified Coded Admissions subheader to include ICD-10-AM reference
// 011 Tony Fitzsimons		06/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 012 Tony Fitzsimons		09/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 013 Tony Fitzsimons		16/09/16	Add more document hyperlinks for Oncology schn.clintrials
// 014 Tony Fitzsimons		05/10/16	Add more document hyperlinks for Oncology schn.clintrials
// 015 Tony Fitzsimons		25/10/16	Add more document hyperlinks for Oncology schn.clintrials
// 016 Tony Fitzsimons		04/11/16	Add more document hyperlinks for Oncology schn.clintrials
// 017 Tony Fitzsimons		08/11/16	Add more document hyperlinks for Oncology schn.clintrials
// 018 Michael Gong         17/11/16    T:8834843 modify schn.alerts2 to be working from Org level Dynamic Worklist, to remove prompt encntr_id from 707_mp_alerts_and_plans, replace pat_personid with c_alert[i].PATIENT_ID in js
// 018.5 Tony Fitzsimons	09/12/16	Add more document hyperlinks for Oncology schn.clintrials
// 019 Michael Gong         09/12/16    T:8943737 modify schn.alerts2 to use qtip instead of tooltips for hover to retain hover data display format  
// 020 Michael Gong         09/12/16    T:8943737 modify schn.outorders to use qtip for hover to retain hover data display format, replace .attr with .prop for click and change functions, repalce $pat_personid$ with this.getProperty("personId") to make it working at org level from Dynamic Worklist
										hvrdata will work with highlighting any column of th erow not just the first order name column.
// 021 Michael Gong         09/12/16    T:8943737 modify schn.wl_bookings to use qtip for hover to retain hover data display format
// 022 Michael Gong         09/12/16    T:8943737 modify schn.appointments to use qtip for hover to retain hover data display format, modify 707_mp_pat_info_sum_get_appts2 to add list_name
// 023 Tony Fitzsimons		15/12/16	Add Kids GPS hyperlink to schn.alerts2 namespace
// 024 Michael Gong     	04/01/17	T:9022593 Add 2 more document (AALL0932,AREN0532) hyperlinks for Oncology schn.clintrials
// 025 Michael Gong     	09/01/17	Add 2 more document (AAML1531,Denosumab) hyperlinks for Oncology schn.clintrials
// 026 Tony Fitzsimons		31/01/17	Add more document hyperlinks for Oncology schn.clintrials
// 027 Tony Fitzsimons		03/02/17	Add more document hyperlinks for Oncology schn.clintrials
// 028 Michael Gong         10/02/17    Add more protocol document hyperlinks for Oncology schn.clintrials T:9197512
// 029 Michael Gong         17/02/17    Add more protocol document hyperlinks for Oncology schn.clintrials T:9232136
// 030 Tony Fitzsimons		28/02/17	Add Neuro and seizure hyperlinks to schn.alerts2
// 031 Michael Gong         28/02/17    Add more protocol document hyperlinks for Oncology schn.clintrials T:9282476
// 032 Michael Gong         24/03/17    Add more protocol document hyperlinks for Oncology schn.clintrials T:9377884
// 033 Matthew Huynh        15/03/17    T:8503782 add custom component Saved Documents 
// 034 Andy Roberts			31/03/17	Add more protocol document hyperlinks for Oncology schn.clintrials T:9411716
// 035 Tony Fitzsimons		03/05/17	Add namespace schn.oneview_connect
// 036 Michael Gong         09/05/17    clean up script being commented out, original is saved as G:\DATA\Millennium\PowerChart\MPages\MPages Development\Custom components\javascript\custom-components_PROD_20170502
//                                      cleaned up 4 namespaces are: schn.outorders, schn.alerts2, schn.wl_bookings, and schn.appointments                                                              
// 037 Michael Gong         10/05/17    move in eHealth MPage V3.1 codes, updated following CCLs under $custcomp:
//										855_mp_problem_alert, 855_mp_doc_launcher_mk2, 855_mp_patient_info, 855_mp_quality_informatics_prf, 855_mp_quality_informatics
// 038 Michael Gong         15/06/17    Add more protocol document hyperlinks for Oncology schn.clintrials T:9763426
// 039 Michael Gong         16/06/17    change applink to use $app_appname$ instead of powerchart.exe to make it working in firstnet/surginet
// 040 Tony Fitzsimons		17/07/17	add 2 new protocols to schn.clintrials. JIRA BAU-82
// 041 Tony Fitzsimons		08/08/17	Add anaesthetics management plan hyperlinks to schn.alerts2
// 042 Tony Fitzsimons		16/08/17	add kasper's to schn.clintrials
// 043 Javad Adeli 			13/09/17	(SCHN OUTSTANDING ORDER COMPONENT) passing position code to the CCL to apply Order Inquiry Privileges 
// 044 Tony Fitzsimons		23/10/17	Add ACNS0423 to schn.clintrials
// 045 Tony Fitzsimons		24/10/17	Update schn.alerts2 with hyperlink for AL00134
// 046 Tony Fitzsimons		25/10/17	Add ALLR3 to schn.clintrials
// 047 Andy Roberts			24/11/17	Add GS-US-313-1090 to schn.clintrials
// 048 Javad Adeli			29/11/2017	New developement and release of BTF Altered Calling Criteria (BTF ACC) custom MPage Component for Analytics MPage
// 049 Javad Adeli 			29/11/17	Enhanced the filters design and also the pop-up modal window in in complete discharge summeries componenet - dc_analytics
// 050 Andy Roberts			24/11/17	Add GCT_PEb_2004 to schn.clintrials
// 051 Javad Adeli 			12/12/2017	Add Call Instruction to Alerts (schn.alerts2) componenet (added to record structure in 707_mp_alerts_and_plans)
// 052 Andy Roberts			01/02/18	Add more protocol document hyperlinks for Oncology schn.clintrials:SJYC07 Protocol Amend 8, Fouladi 2009 Cancer, AGCT1531 
// 053 Andy Roberts			09/02/18	Add protocol document hyperlinks for Oncology schn.clintrials: Study 9 Australian Appendix
// 054 Andy Roberts			16/02/18	Add protocol document hyperlinks for Oncology schn.clintrials: ANBL1221
// 055 Javad Adeli			18/01/2018	New Developement and release of Oustanding Consults (schn.outconsults) custom MPage component for Analytics MPage
// 056 Javad Adeli 			5/2/2018	adding dynamic filters for facility for BTF ACC (schn.btf_acc) and Outastanding Consults (schn.outconsults) to accomodate multiple facilities

/********************************************************************************

048 - SCHN BTF Altered Caling Criteria (ACC)
Developer: Javad Adeli - 07/11/2017

/********************************************************************************/

/* Put name of component here */
MPage.namespace("schn.btf_acc");
schn.btf_acc = function() {};

schn.btf_acc.prototype = new MPage.Component();
schn.btf_acc.prototype.constructor = MPage.Component;
schn.btf_acc.prototype.base = MPage.Component.prototype;
schn.btf_acc.prototype.name = "schn.btf_acc";
schn.btf_acc.prototype.cclProgram =  "707_BTF_ACC_MP";
schn.btf_acc.prototype.cclParams = [];
schn.btf_acc.prototype.cclDataType = "JSON";
//possible values=> JSON, TEXT, XML

schn.btf_acc.prototype.init = function(options) {
    //code to perform before immediately rendering (usually updating params is needed)
    var component = this;
    component.cclParams.push("MINE");
    //CAN USE ANY OR ALL OF THE FOLLOWING IN ORDER AS NEEDED:
    //component.cclParams.push(this.getProperty("personId"));
    //component.cclParams.push(this.getProperty("encounterId"));
    //component.cclParams.push(this.getProperty("userId"));
    //component.cclParams.push(this.getProperty("PPRCode"));
    //component.cclParams.push(this.getProperty("positionCd"));
};

schn.btf_acc.prototype.addEventHandlers = function() {
    var component = this;
    var compId = component.getComponentUid();
    var target = component.getTarget();

    $("#" + compId + " .schn-filters-selector").change(function(event) {
        //alert("Changed a filter");
		if(event.target.id == 'schn-acc-amo'){
			$('#schn-ac-myOwn').removeAttr('checked');
		}
        $("#acc-hover").html("");
        component.updateFilters();
    });

    $("#" + compId + " .acc-check").change(function() {
        //alert("Changed checkbox");
        $('#schn-acc-amo option').prop('selected', function() {
            return this.defaultSelected;
        });
        $("#acc-hover").html("");
        component.updateFilters();
    });

    $("#" + compId + " .schn-close").click(function() {
        var modal = document.getElementById('schn-acc-modal');
        //X close modal window
        modal.style.display = "none";
    });

    $("#" + compId + " .schn-modal").click(function() {
        // close modal window
        this.style.display = "none";
    });

};

schn.btf_acc.prototype.getSubHeader = function(str) {
    //note that inline styles could be put in their own class and put as a second class for the div
    return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>", str, "</div>"].join("");
};

var faclook, wardLook, encntrLook, medLook, medLook_cd, amoLook, amoLook_cd = false;
var accsumm_copy = [];	//copy of JSON for global use
var accPieChart;		//to store place for pie chart, for global reference
var modal, close;		//to store references to modal windows, for global use

schn.btf_acc.prototype.render = function() {
    var component = this;
    var compId = component.getComponentUid();
    var target = component.getTarget();
    var targetHTML = [];
    var accrecord = component.data.ENC;
    var accsumm = accrecord.QUAL;
    //trim the ward and facility to allow string matching
    for (i = 0; i < accsumm.length; i++) {
        accsumm[i].WARD = accsumm[i].WARD.trim();
        accsumm[i].FACILITY = accsumm[i].FACILITY.trim();	//056
    }
    accsumm_copy = accsumm;		// copy to the global array

    //filter select option elements
	var accmed = accrecord.MEDSERVICEFILTER;
	var accamo = accrecord.AMOFILTER;
    var accward = accrecord.WARDFILTER;
    var accfacility = accrecord.FACILITYFILTER; //056
	var accencntrtype = accrecord.ENCNTRTYPEFILTER;

    facLook = 'All'; //056
    wardLook = 'All';
	encntrtypeLook = 'All';
    medLook = 'All';
    medLook_cd = 'All';
	amoLook = 'All';
	amoLook_cd = 'All';

    //set and create subheader (uncomment and update if needed)
    //targetHTML.push(component.getSubHeader("Use the filters to filter by Encntr and Specialty"));

    //set the title text if needed (uncomment and update if needed)
    //component.setProperty("headerTitle", "New Title");

    //set the subtitle text next to header if needed (uncomment and update if needed)
    //component.setProperty("headerSubTitle","(10)");

    //set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
    //component.setProperty("headerShowHideState",true);

    //do something here with the targetHTML (component.data will have data type defined by this.cclDataType)

	//JAVADELI>> - adding new div to show/hide filters
	targetHTML.push('<div class="schn-filters">');
	targetHTML.push('<input type="checkbox" id="show_filters-acc" role="button">');
	targetHTML.push('<label for="show_filters-acc" onclick=""><span>Change Filters &#9776;&#9662;</span><span style="font-weight: bold;">&#10005;</span></label>');
	targetHTML.push('<section>');
	//JAVADELI<<

	//Menue Filters
	//Facility filter
	// <<056
	targetHTML.push('<div class = "schn-filters-form"><form><fieldset>',
						'<div class="selection">',
							'<label for="schn-acc-facility">Facility: </label>',
							'<select name="facility" id="schn-acc-facility" size="1" class="schn-filters-selector">',
								'<option value="All"  selected="selected">All</option>');

								for (i = 0; i < accfacility.length; i++) {
									targetHTML.push('<option value="' + accfacility[i].FACILITY_CD + '">' + accfacility[i].FACILITY_NAME.trim() + '</option>');
								}
			targetHTML.push('</select>');					
	targetHTML.push('</div>'); // 056>>

	//Ward filter
	targetHTML.push('<div class="selection">',
							'<label for="schn-acc-wards">Ward: </label>',
							'<select name="wards" id="schn-acc-wards" size="1" class="schn-filters-selector">',
								'<option value="All" selected="selected">All</option>');

								for (i = 0; i < accward.length; i++) {
									targetHTML.push('<option value="' + accward[i].WARD_NAME.trim() + '">' + accward[i].WARD_NAME.trim() + '</option>');
								}
			targetHTML.push('</select>',
						'</div>');

	//Encounter Type filter
	targetHTML.push('<div class="selection">',
							'<label for="schn-acc-encntrtype">Encounter Type: </label>',
							'<select name="encntrtype" id="schn-acc-encntrtype" class="schn-filters-selector">',
								'<option value="All">All</option>');

								for (i = 0; i < accencntrtype.length; i++) {
									targetHTML.push('<option value="' + accencntrtype[i].ENCNTR_TYPE.trim() + '">' + accencntrtype[i].ENCNTR_TYPE.trim() + '</option>');
								}
			targetHTML.push('</select>');

	targetHTML.push('</div>');

	//Specialty filter
	targetHTML.push('<div class="selection">',
							'<label for="schn-acc-medserv">Specialty: </label>',
							'<select name="medserv" id="schn-acc-medserv" class="schn-filters-selector">',
								'<option value="All">All</option>');

								for (i = 0; i < accmed.length; i++) {
									targetHTML.push('<option value="' + accmed[i].MED_SERVICE_CODES + '">' + accmed[i].MED_SERVICE_NAME.trim() + '</option>');
								}
			targetHTML.push('</select>');

	targetHTML.push('</div>');
		
	//Attending Medical Officer filter
	targetHTML.push('<div class="selection">',
						'<label for="schn-acc-amo">Attending Medical Officer: </label>',
						'<select name="amo" id="schn-acc-amo" class="schn-filters-selector">',
							'<option value="All">All</option>');
							 
							 for (i=0; i< accamo.length; i++){
								targetHTML.push('<option value="' + accamo[i].AMO_NAME.trim() + '">' + accamo[i].AMO_NAME.trim() + '</option>');
							 } 
			targetHTML.push('</select>',
						'</div>');

    targetHTML.push('</fieldset></form></div></section></div>');

	//pie chart hover
	targetHTML.push('<div id="acc-hover"></div>');

	//pie chart display
    //targetHTML.push('<div id="acc-chart" class="acc-pie-chart" style="width:200px;height:200px; margin-top:30px; margin-bottom:20px;margin-left:auto; margin-right:auto;"></div>');
	if(accsumm.length == 0){
		//if no results qualified for the default Lookback Range 
    	targetHTML.push('<div id="acc-chart" class="acc-pie-chart" style="width:200px;height:200px; margin-top:30px; margin-bottom:20px;margin-left:auto; margin-right:auto;">No Results Found!</div>');
    
    } else {
    	targetHTML.push('<div id="acc-chart" class="acc-pie-chart" style="width:200px;height:200px; margin-top:30px; margin-bottom:20px;margin-left:auto; margin-right:auto;"></div>');
    };

    //modal pop up window for on-click event
	//buiding 2 modal pop up windows lists for 2 diffrent ACC Statuse ACC and OVERDUE lists
    targetHTML.push('<div id="schn-acc-modal" class="schn-modal">',
						'<div id="schn-acc-modal-content" class="schn-modal-content">',
							'<span class="schn-close" style="margin-bottom: 10px;">&#10006;</span>',
							'<div id="acc-list" class="schn-modal-list">',
							'</div>',
						'</div>',
					'</div>');
	targetHTML.push('<div id="schn-acc-modal2" class="schn-modal">',
						'<div id="schn-acc-modal-content" class="schn-modal-content">',
							'<span class="schn-close" style="margin-bottom: 10px;">&#10006;</span>',
							'<div id="acc-list2" class="schn-modal-list">',
							'</div>',
						'</div>',
					'</div>');

    target.innerHTML = targetHTML.join("");

    //placeholder for pie chart in global variable
	accPieChart = $("#" + compId + " .acc-pie-chart");

    //modal windows for all 3 ACC list in global variable
	acc_modal = document.getElementById('schn-acc-modal');
	acc_modal2 = document.getElementById('schn-acc-modal2');

    //modal window close button in global variable
	close = document.getElementsByClassName("schn-close")[0];

    //call pie chart rendering here
	component.countArray(accsumm);

	//this may or may not be needed - add last after HTML is rendered so JQuery can find them.
    component.addEventHandlers();
};
// end render

//pie chart and modal lists rendering
schn.btf_acc.prototype.countArray = function(summs) {
	var acc = 0
      , overdue = 0

	for (i = 0; i < summs.length; i++) {
        switch ((summs[i].ACC_STATUS).trim()) {
        case "ACC":
            acc++;
            break;
        case "OVERDUE":
            overdue++;
            break;
        }
    }

    //2 Modal window for ACC and OVERDUE lists
	var acc_list = document.getElementById('acc-list');
	var acc_list2 = document.getElementById('acc-list2');
    pieHTML = [];
	pieHTML2 = [];

	//Headers for 2 modal windows
	pieHTML.push("<h4 class='boldie'>BTF ACC Records for Facility: " + facLook + ", Specialty: " + medLook + ", Ward: " + wardLook + ", Encounter Type: " + encntrtypeLook + ", AMO: " + amoLook + "</h4>");
	pieHTML2.push("<h4 class='boldie'>BTF ACC Overdue Records for Facility: " + facLook + ", Specialty: " + medLook + ", Ward: " + wardLook + ", Encounter Type: " + encntrtypeLook + ", AMO: " + amoLook + "</h4>");
	if (summs.length > 0) {
		pieHTML.push('<table id= "incomplete-dc">');
		pieHTML.push('<tr><th>Patient Name</th><th>MRN</th><th>Ward</th><th>Next Review</th><th>Last Updated Dt</th><th>Attending Dr.</th><th>Last Signed Clinician</th><th>Specialty</th><th>ACC Comment</th><th>General Comment</th>');
        pieHTML.push('</tr>');
		pieHTML2.push('<table id= "incomplete-dc">');
		pieHTML2.push('<tr><th>Patient Name</th><th>MRN</th><th>Ward</th><th>Next Review</th><th>Last Updated Dt</th><th>Attending Dr.</th><th>Last Signed Clinician</th><th>Specialty</th><th>ACC Comment</th><th>General Comment</th>');
        pieHTML2.push('</tr>');

		//looping through all ACC records and push to 2 Modal lists
		for (j = 0; j < summs.length; j++) {
			if (summs[j].ACC_STATUS == "ACC"){
				pieHTML.push('<tr>');
                //pieHTML.push('<td><a class="schn-link" href="javascript:schn.openChart(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ');">' + summs[j].NAME + '</a></td>');
                pieHTML.push('<td><a class="schn-link" href="javascript:APPLINK(0,\'$APP_AppName$\',\'/PERSONID=' + summs[j].PERSON_ID + ' /ENCNTRID=' + summs[j].ENCNTR_ID 
                	+ ' /FIRSTTAB=^BTF Observation Chart^\')">' + summs[j].NAME + '</a></td>');
                pieHTML.push('<td>' + summs[j].MRN + '</td>',
							  '<td>' + summs[j].WARD.trim() + '</td>',
							  '<td>' + summs[j].NEXT_REVIEW + '</td>',
							  '<td>' + summs[j].LAST_UPDATED + '</td>',
							  '<td>' + summs[j].AMO + '</td>',
							  '<td>' + summs[j].LAST_SIGNED_CLINICIAN + '</td>',
							  '<td>' + summs[j].SPECIALTY + '</td>',
							  '<td>' + summs[j].ACC_COMMENT.trim() + '</td>',
							  '<td>' + summs[j].GENERAL_COMMENT.trim() + '</td>',
							  '</tr>');

			} else if (summs[j].ACC_STATUS == "OVERDUE"){
				pieHTML2.push('<tr>');
                //pieHTML2.push('<td><a class="schn-link" href="javascript:schn.openChart(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ');">' + summs[j].NAME + '</a></td>');
                pieHTML2.push('<td><a class="schn-link" href="javascript:APPLINK(0,\'$APP_AppName$\',\'/PERSONID=' + summs[j].PERSON_ID + ' /ENCNTRID=' + summs[j].ENCNTR_ID 
                	+ ' /FIRSTTAB=^BTF Observation Chart^\')">' + summs[j].NAME + '</a></td>');
                pieHTML2.push('<td>' + summs[j].MRN + '</td>',
							  '<td>' + summs[j].WARD.trim() + '</td>',
							  '<td>' + summs[j].NEXT_REVIEW + '</td>',
							  '<td>' + summs[j].LAST_UPDATED + '</td>',
							  '<td>' + summs[j].AMO + '</td>',
							  '<td>' + summs[j].LAST_SIGNED_CLINICIAN + '</td>',
							  '<td>' + summs[j].SPECIALTY + '</td>',
							  '<td>' + summs[j].ACC_COMMENT.trim() + '</td>',
							  '<td>' + summs[j].GENERAL_COMMENT.trim() + '</td>',
							  '</tr>');

			}
			// end if

		}
				pieHTML.push('</table>');
				pieHTML2.push('</table>');
	//if no ACC records
	} else {
		pieHTML.push("<p>No BTF ACC Documnts have been recorded for ward: <span class='boldie'>" + wardLook + "</span>, Encounter type: <span class='boldie'>" 
			+ encntrtypeLook + "</span>, Specialty: <span class='boldie'>" + medLook + "</span>, AMO: <span class='boldie'>" + amoLook+ "</span>.</p>");
	}
	// end if

    pieHTML = pieHTML.join("");
	pieHTML2 = pieHTML2.join("");

	//publishing 2 ACC lists
	acc_list.innerHTML = (pieHTML);
    acc_list2.innerHTML = (pieHTML2);

    //pie chart data and events
	var data = [{
        label: "ACC",
        data: acc,
        color: "#005CDE",
    }, {
        label: "OVERDUE",
        data: overdue,
        color: "#DE000F", //"#7D0096"
    }]

    $(function() {
        var options = {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 1 / 2,
                        formatter: function(label, series) {
                            return '<div style="font-size:8pt;padding:5px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        background: {
                            opacity: 0.0
                        },
                        threshold: 0.0
                    }
                }
            },
            legend: {
                show: false,
            },
            grid: {
                hoverable: true,
                clickable: true,
            }
        };

        renderPie(accPieChart, data, options);
    });

    function renderPie(place, data, opts) {
        $.plot(place, data, opts)
        place.bind("plotclick", pieClick);
        place.bind("plothover", pieHover);
    }

    function pieHover(event, pos, obj) {
        if (!obj) {
            return;
        }
        var acc_percent = Math.round(parseFloat(obj.series.percent));

        var accHover = [];
        accHover.push("<div style=\"float:left;width:250px;height:20px;color:", obj.series.color, "\">", "<span style=\"font-weight:bold;color:", obj.series.color, "\">", obj.series.label, ": ", obj.series.data[0][1], " (", acc_percent, "%)</span>", "</div>");
        $("#acc-hover").html(accHover.join(''));
        $("#acc-chart").css("cursor", "pointer");
    }

    function pieClick(event, pos, obj) {
		var component = this;
        //var accrecord = this.data.ENC;
		if (obj) {
            if (obj.series.label == "ACC") {
                acc_modal.style.display = "block";
            } else if (obj.series.label == "OVERDUE") {
                acc_modal2.style.display = "block";
            }
        }
    }
	//end pie chart data
};
// end countArray pie chart and modal lists rendering

// Update Filters
schn.btf_acc.prototype.updateFilters = function() {
    var component = this;
    var facility = document.getElementById("schn-acc-facility");
    var ward = document.getElementById("schn-acc-wards");
	var encntrtype = document.getElementById("schn-acc-encntrtype");
    var medsrv = document.getElementById("schn-acc-medserv");
	var attending = document.getElementById("schn-acc-amo");
    facLook = facility.options[facility.selectedIndex].text; //056
    facLook_cd = facility.options[facility.selectedIndex].value; //056
    wardLook = ward.options[ward.selectedIndex].value;
	encntrtypeLook = encntrtype.options[encntrtype.selectedIndex].value;
    medLook = medsrv.options[medsrv.selectedIndex].text;
    medLook_cd = medsrv.options[medsrv.selectedIndex].value;
	amoLook = attending.options[attending.selectedIndex].value;
	amoLook_cd = attending.options[attending.selectedIndex].value;
	
	var filterParams = true;

	//facility filter //056>>
	if (facLook_cd != 'All') {
		filterParams += ' && v.FACILITY === facLook';
    } //<<056

	//ward filter
	if (wardLook != 'All') {
		filterParams += ' && v.WARD === wardLook';
    }

	//encounter type filter
	if (encntrtypeLook != 'All') {
        filterParams += ' && v.ENCNTR_TYPE === encntrtypeLook';
    }

    //specialty filter
	if (medLook_cd != 'All') {
        filterParams += ' && v.SPECIALTY === medLook';
    }
	
	//amo filter
	if (amoLook != 'All'){
		filterParams += ' && v.AMO.trim() === amoLook';
	}

    //applying filters and creating new records array
	if (filterParams) {
        var filterRange = accsumm_copy.filter(function(v, i) {
            //alert(v.AMO.trim());
            return eval(filterParams);
        })
    }

	//no results after applying filter
	if (filterRange.length == 0) {
        $("#acc-chart").html("No results for facility: <span class='boldie'>" + facLook + "</span>, ward: <span class='boldie'>" + wardLook + "</span>, Encounter Type: <span class='boldie'>" + encntrtypeLook //056
        	+ "</span>, Specialty: <span class='boldie'>" + medLook + "</span>, AMO: <span class='boldie'>" + amoLook + "</span>");
        $("#acc-list").html("");
	} else {
		//call the pie chart render and render the new filtered chart
        $("#acc-chart").html("");
        component.countArray(filterRange);
    }

};		// end Update Filters

// end btf_acc namespace 048