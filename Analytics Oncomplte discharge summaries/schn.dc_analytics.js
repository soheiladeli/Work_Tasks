// 042 Javad Adeli 			13/09/2017	(SCHN OUTSTANDING ORDER COMPONENT) passing position code to the CCL to apply Order Inquiry Privileges 
// 043 Tony Fitzsimons		23/10/17	Add ACNS0423 to schn.clintrials
// 044 Javad Adeli			16/11/2017	New developement and release of BTF Altered Calling Criteria (BTF ACC) custom MPage Component for Analytics MPage
// 045 Andy Roberts			24/11/17	Add GS-US-313-1090 to schn.clintrials
// 046 Javad Adeli			12/12/2017	Add Call Instruction to Alerts (schn.alerts2) componenet (added to record structure in 707_mp_alerts_and_plans)
// 047 Javad Adeli			18/01/2018	New Developement and release of Oustanding Consults (schn.outconsults) custom MPage component for Analytics MPage
// 048 Javad Adeli 			5/2/2018	adding dynamic filters for facility for BTF ACC (schn.btf_acc) to accomodate multiple facilities
// 049 Javad Adeli 			5/2/2018	adding dynamic filters for facility for Outastanding Consults (schn.outconsults) to accomodate multiple facilities

/********************************************************************************

SCHN INCOMPLETE DISCHARGE SUMMARIES

/********************************************************************************/


/* Put name of component here */
MPage.namespace("schn.dc_analytics");
schn.dc_analytics = function(){};

schn.dc_analytics.prototype = new MPage.Component();
schn.dc_analytics.prototype.constructor = MPage.Component;
schn.dc_analytics.prototype.base = MPage.Component.prototype;
schn.dc_analytics.prototype.name = "schn.dc_analytics";
schn.dc_analytics.prototype.cclProgram = "707_MP_DYNDOC_EXTRACT";
schn.dc_analytics.prototype.cclParams = [];
schn.dc_analytics.prototype.cclDataType = "JSON"; //possible values=> JSON, TEXT, XML

schn.dc_analytics.prototype.init = function(options) {
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

schn.dc_analytics.prototype.addEventHandlers = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	
	$("#"+compId+" .schn-filters-selector").change(function(event){
		//alert("Changed a filter");
		if(event.target.id == 'schn-dc-amo'){
			$('#schn-dc-myOwn').removeAttr('checked');
		}
		$("#dc-hover").html("");
		component.updateFilters();
	});
	
	$("#"+compId+" .dc-check").change(function(){
		//alert("Changed checkbox");
		$('#schn-dc-amo option').prop('selected', function(){
			return this.defaultSelected;
		});
		$("#dc-hover").html("");
		component.updateFilters();
	});
	
	$("#"+compId+" .schn-close").click(function(){
		var modal = document.getElementById('schn-dc-modal');			//X close modal window
		modal.style.display = "none";
	});
	
	$("#"+compId+" .schn-modal").click(function(){						// close modal window
		this.style.display = "none";
	});
	
};

schn.dc_analytics.prototype.getSubHeader = function( str ) {
	//note that inline styles could be put in their own class and put as a second class for the div
	return ["<div class='sub-title-disp' style='margin:-6px -6px 6px -6px;border-left:none;border-right:none;'>",str,"</div>"].join("");
};

var rangeLook, faclook, wardLook, medLook, medLook_cd, amoLook, amoLook_cd, myLook = false;
var user_id;
var dcsumm_copy = [];   // copy of JSON for global use
var dcPieChart;			//to store place for pie chart, for global reference
var modal, close;		//to store references to modal windows, for global use

schn.dc_analytics.prototype.render = function() {
	var component = this;
	var compId = component.getComponentUid();
	var target = component.getTarget();
	var targetHTML = [];
	var dcrecord = component.data.ENC;
	var dcsumm = dcrecord.QUAL;
	//trim the ward to allow string matching
	for(i=0;i<dcsumm.length;i++){
		dcsumm[i].WARD = dcsumm[i].WARD.trim();
	}
	dcsumm_copy = dcsumm;  // copy to the global array
	var dcamo = dcrecord.AMOFILTER;
	var dcmed = dcrecord.MEDSERVICEFILTER;
	var dcward = dcrecord.WARDFILTER;
	var dcuser = dcrecord.USER;
	user_id = dcuser[0].USER_ID;

	rangeLook = 7;
	faclook = 'CHW';
	wardLook = 'All';
	medLook = 'All';
	medLook_cd = 'All';
	amoLook = 'All';
	amoLook_cd = 'All';
	
	var defaultRange = dcsumm.filter(function(v,i) {
    	return v.DISDT_RANGE === 7;
	});
	
	//set and create subheader (uncomment and update if needed)
	targetHTML.push(component.getSubHeader("Lists discharged patients only. AMO's, Wards, and Medical Services without incomplete discharges are not listed in drop-down filters"));
	
	//set the title text if needed (uncomment and update if needed)
	//component.setProperty("headerTitle", "New Title");
	
	//set the subtitle text next to header if needed (uncomment and update if needed)
	//component.setProperty("headerSubTitle","(10)");
	
	//set the component to collapsed (false)/expanded (true) if needed (uncomment and update if needed)
	//component.setProperty("headerShowHideState",true);
	
	//do something here with the targetHTML (component.data will have data type defined by this.cclDataType)

	//JAVADELI>> - show/hide filters
	targetHTML.push('<div class="schn-filters">');
	targetHTML.push('<input type="checkbox" id="show_filters-dc" role="button">');
	targetHTML.push('<label for="show_filters-dc" onclick=""><span>Change Filters &#9776;&#9662;</span><span style="font-weight: bold;">&#10005;</span></label>');
	targetHTML.push('<section>');
	//JAVADELI<<
	
	targetHTML.push('<div class="schn-filters-form"><form><fieldset>',
						'<div class="selection">',
						'<label for="schn-dc-lookback">Lookback Range: </label>',
						'<select name="lookback" id="schn-dc-lookback" size="1" class="schn-filters-selector">',
							'<option value="7" selected="selected">7 Days</option>',
							'<option value="14">14 Days</option>',
							'<option value="30">30 Days</option>',
						'</select>',
						'</div>',
						'<div class="selection">',
						'<label for="schn-dc-facility">Facility: </label>',
						'<select name="facility" id="schn-dc-facility" size="1" class="schn-filters-selector">',
							'<option value="CHW" selected="selected">CHW</option>',
						'</select>',
						'</div>',
						'<div class="selection">',
						'<label for="schn-dc-wards">Ward: </label>',
						'<select name="wards" id="schn-dc-wards" size="1" class="schn-filters-selector">',
							'<option value="All" selected="selected">All</option>');
							
							for (i=0;i<dcward.length;i++){
								targetHTML.push('<option value="' + dcward[i].WARD_NAME.trim() + '">' + dcward[i].WARD_NAME.trim() + '</option>');
							}	
						targetHTML.push('</select>',
						'</div>');

	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-medserv">Medical Service: </label>',
						'<select name="medserv" id="schn-dc-medserv" class="schn-filters-selector">',
							'<option value="All">All</option>');
						
							for (i=0;i<dcmed.length;i++){
								targetHTML.push('<option value="' + dcmed[i].MED_SERVICE_CODES + '">' + dcmed[i].MED_SERVICE_NAME.trim() + '</option>');
							}
		targetHTML.push('</select>');
						
	targetHTML.push('</div>');
	
	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-amo">Attending Medical Officer: </label>',
						'<select name="amo" id="schn-dc-amo" class="schn-filters-selector">',
							'<option value="All">All</option>');
							
							for (j=0;j<dcamo.length;j++){
								targetHTML.push('<option value="' + dcamo[j].AMO_PERSON_ID + '">' + dcamo[j].AMO_NAME.trim() + '</option>');
							}
	
		targetHTML.push('</select>',
						'</div>');
	
	targetHTML.push('<div class="selection">',
						'<label for="schn-dc-myOwn">My records only: </label>',
						'<input type="checkbox" name="schn-dc-myOwn" value="myOwn" id="schn-dc-myOwn" class="dc-check" style="float: left;"><span class="schn-instruction"> includes AMO, author, or Updated by</span>',
					'</div>');
	
	targetHTML.push('</fieldset></form></div></section></div>');
	targetHTML.push('<div id="dc-hover"></div>');
	//pie chart display
	targetHTML.push('<div id="dc-chart" class="dc-pie-chart" style="width:100%; height:200px; margin-top:7px; margin-bottom:10px;"></div>');
	
	//modal pop up window for on-click event
	targetHTML.push('<div id="schn-dc-modal" class="schn-modal">',
						'<div id="schn-dc-modal-content" class="schn-modal-content"><span class="schn-close" style="margin-bottom:10px";>&#10006;</span>',
							'<div id="dc-list" class="schn-modal-list">',
							'</div>',
						'</div>',
					'</div>');
	
	target.innerHTML = targetHTML.join("");
			
	dcPieChart = $("#" + compId + " .dc-pie-chart");			//placeholder for pie chart in global variable
	modal = document.getElementById('schn-dc-modal');			//modal window in global variable
	close = document.getElementsByClassName("schn-close")[0];	//modal window close button in global variable
	
	//call pie chart rendering here
	component.countArray(defaultRange);
	
	//this may or may not be needed - add last after HTML is rendered so JQuery can find them.
	component.addEventHandlers();
};   // end render
	
schn.dc_analytics.prototype.countArray = function(summs){
	var component = this;
	var completed = 0,
		inProgress = 0,
		notCommenced = 0;

	for (i=0; i<summs.length;i++){
		switch((summs[i].SUMMARY_STATUS).trim()) {
			case "Auth (Verified)":
				completed++;
				break;
			case "Modified":
				completed++;
				break;
			case "In Progress":
				inProgress++;
				break;
			default:
				notCommenced++;
		} 
	}
	var dc_list = document.getElementById('dc-list');
	pieHTML = [];
	pieHTML.push('<h4 class="boldie">Incomplete Discharge Summaries</h4>');
	if (summs.length > 0 && ((inProgress > 0) ||  (notCommenced > 0))) {
		pieHTML.push('<h6>Summaries due for service <span class="boldie">' + medLook + '</span>, ward <span class="boldie">' + wardLook + '</span>, attending medical officer: <span class="boldie">' + amoLook + '</span>, last <span class="boldie">' + rangeLook + '</span> days</h6>');
		pieHTML.push('<table id="incomplete-dc">');
		pieHTML.push('<tr><th>Name</th><th>DOB</th><th>Age</th><th>Gender</th><th>MRN</th><th>Admit Date</th><th>Discharge Date</th><th>Est Discharge Date</th><th>Ward</th><th>Medical Service</th><th>Attending MO</th><th>Summary Status</th><th>Author</th><th>Last Updated</th><th>Updated by</th>');
		for (j=0; j<summs.length;j++){
			var dc_status = summs[j].SUMMARY_STATUS.trim();
			if (dc_status === "In Progress" || dc_status === ""){
				pieHTML.push('<tr>');
				pieHTML.push('<td><a class="schn-link" href="javascript:schn.openChart(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ');">' + summs[j].PATIENTNAME + '</a></td>');
				pieHTML.push('<td>' + summs[j].DOB + '</td>',
							'<td>' + summs[j].AGE + '</td>',
							'<td>' + summs[j].GENDER + '</td>',
							'<td>' + summs[j].MRN + '</td>',
							'<td>' + summs[j].ADMIT_DT_TM.substring(0,10) + '</td>',
							'<td>' + summs[j].DISCH_DT_TM.substring(0,10) + '</td>',
							'<td>' + summs[j].EDD + '</td>',
							'<td>' + summs[j].WARD.trim() + '</td>',
							'<td>' + summs[j].MEDICAL_SERVICE.trim() + '</td>',
							'<td>' + summs[j].AMO.trim() + '</td>',
							'<td><a class="schn-link" href="#" onclick="javascript:schn.modifyDynDoc(' + summs[j].PERSON_ID + ', ' + summs[j].ENCNTR_ID + ', ' + summs[j].EVENTID +');">' + summs[j].SUMMARY_STATUS + '</a></td>', 
							'<td>' + summs[j].AUTHOR.trim() + '</td>',
							'<td>' + summs[j].UPDATED_DATE + '</td>',
							'<td>' + summs[j].UPDATED_BY + '</td>',
							'</tr>');
			}   // end if
		}   // end for
		pieHTML.push('</table>');
	} else {
		pieHTML.push("<p>No incomplete summaries due for service <span class='boldie'>" + medLook + "</span>, ward <span class='boldie'>" + wardLook + "</span>, attending medical officer: <span class='boldie'>" + amoLook + "</span>, last <span class='boldie'>" + rangeLook + "</span> days.</p>");
	}
	pieHTML = pieHTML.join("");
	
	dc_list.innerHTML = (pieHTML);
	
	var data = [
		{label: "Completed", data: completed, color: "#005CDE" },
		{label: "In Progress", data: inProgress, color: "#7D0096" },
		{label: "Not Commenced", data: notCommenced, color: "#DE000F" }
	]

	$(function () { 
		var options = {
			series: {
				pie: {	show: true,
					radius: 1,
					label: {
						show: true,
						radius: 1/2,
						formatter: function (label, series) {
							return '<div style="font-size:8pt;padding:5px;color:white;">' + label + '<br/>' +   
							Math.round(series.percent) + '%</div>';
						},
						background: {
                   		opacity: 0.0
						},
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		};

		renderPie(dcPieChart, data, options); 
	});

	function renderPie(place, data, opts){
		$.plot(place, data, opts)
		place.bind("plotclick", pieClick);
		place.bind("plothover", pieHover);
	}	
	
	function pieHover(event,pos,obj){
		if (!obj){return;}
            var dc_percent = Math.round(parseFloat(obj.series.percent));
 
        var dcHover = [];
        dcHover.push("<div style=\"float:left;width:250px;height:20px;color:", obj.series.color, "\">",
                  "<span style=\"font-weight:bold;color:", obj.series.color, "\">", obj.series.label, ": " , obj.series.data[0][1] , " (", dc_percent, "%)</span>",
                  "</div>");
 
            $("#dc-hover").html(dcHover.join('')); 
	}
		
	function pieClick(event, pos, obj){
		if(obj){
			if(obj.series.label == "Completed") {
				return;
			} else if(obj.series.label == "In Progress") {
				modal.style.display = "block";
			} else if (obj.series.label == "Not Commenced") {
				modal.style.display = "block";
			}
		}
	}
};   // end countArray

schn.dc_analytics.prototype.updateFilters = function(){
	var component = this;
	var days = document.getElementById("schn-dc-lookback");
	var facility = document.getElementById("schn-dc-facility");
	var ward = document.getElementById("schn-dc-wards");
	var medsrv = document.getElementById("schn-dc-medserv");
	var attending = document.getElementById("schn-dc-amo");
	var myOwn = document.getElementById("schn-dc-myOwn");
	rangeLook = days.options[days.selectedIndex].value;
	faclook = facility.options[facility.selectedIndex].text;
	wardLook = ward.options[ward.selectedIndex].value;
	medLook = medsrv.options[medsrv.selectedIndex].text;
	medLook_cd = medsrv.options[medsrv.selectedIndex].value;
	amoLook = attending.options[attending.selectedIndex].text;
	amoLook_cd = attending.options[attending.selectedIndex].value;
	if($("#schn-dc-myOwn").attr('checked')){
		myLook = 1;
	} else {
		myLook = 0;
	}
		
	var filterParams = 'v.DISDT_RANGE <= parseInt(rangeLook)';
	if (wardLook != 'All'){
		filterParams += ' && v.WARD == wardLook';
	}
	if (medLook_cd != 'All'){
		filterParams += ' && v.MED_SERVICE_CD == medLook_cd';
	}
	if (amoLook_cd != 'All'){
		filterParams += ' && v.AMO_ID == amoLook_cd';
	}
	if (myLook === 1){
		filterParams += ' && (v.AMO_ID == ' + user_id + ' || v.AUTHOR_ID == ' + user_id + ' || v.UPDATED_ID == ' + user_id + ')';
	}
	if (filterParams){
		var filterRange = dcsumm_copy.filter(function(v,i) {
			return eval(filterParams);
		})
	}
	if(filterRange.length == 0){
		// no results
		$("#dc-chart").html("No results for range <span class='boldie'>" + rangeLook + "</span> days, <span class='boldie'>" + wardLook + "</span>, <span class='boldie'>" + medLook + "</span>, attending medical officer: <span class='boldie'>" + amoLook + "</span>");
		$("#dc-list").html("");
	} else {
		$("#dc-chart").html("");
		component.countArray(filterRange);
	}
};   // end updateFilters
// end dc_analytics namespace