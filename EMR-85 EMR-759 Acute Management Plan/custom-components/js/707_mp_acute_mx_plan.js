/********************* Acute Management Plans MPage ********************

Date		Programmer			Change												
23/05/2016	Tony Fitzsimons		Original Version
08/12/2016	Tony Fitzsimons		Add Kids GPS Management Plan
08/02/2017	Tony Fitzsimons		Add Neurology & Seizure Plans
08/06/2017  Laxmisree Vanam     Asthma Action Plan new CCL link updated  T:8012370 T:8704115
15/06/2017	Tony Fitzsimons		Add Pre School Wheeze action plan
23/06/2017	Tony Fitzsimons		Add Asthma medication reducing plan
*************************************************************************/


//current date and time
// For todays date; 
Date.prototype.today = function () { return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear(); } 
// For the time now 
Date.prototype.timeNow = function () { return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds(); }

var newDate = new Date(); 
var datetime = "Plans as at : " + newDate.today() + ", " + newDate.timeNow();

var mxPlans = "";

	//call the function to format html and populate sections
	function getPlans(){
		acuteMxPlans();
	}
	
	function acuteMxPlans(){
	// Initialize the request object
	//var mxPlans = "";
	mxPlans = new XMLCclRequest();

	// Get the response
	mxPlans.onreadystatechange = function () {
		if (mxPlans.readyState == 4 && mxPlans.status == 200) {
			var msgPlans = "";
			msgPlans = mxPlans.responseText;

			if (msgPlans != undefined && msgPlans != null && msgPlans > " ") {
				var jsonPlans = "";
				jsonPlans = eval('(' + msgPlans + ')');
			}
  
			if (jsonPlans){
				var targetHTML = [];
				targetHTML.push("<p class='schn-instruction'>" + datetime + ";   <a class='schn-link' href='javascript:refresh();'>Refresh List</a></p>");
				var pos_cd = jsonPlans.PLANS.ADMIN_CODES[0].ADMIN_CODE;
				
				if (pos_cd != 1){
					//not admin position, display the links to add forms
					$('#AMP-new').css("display" , "block");
				}
				if (pos_cd == 1) {
					//admin position, hide the links to add problems
					$('#add-problem').css("display", "none");
				}
				
				
				var plans_exist = 0;
				if (jsonPlans.PLANS.ADRENAL_INSUFF[0].ADR_ACTIVITY_ID > 0 || 
					jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_EVENT_ID > 0 ||
					jsonPlans.PLANS.ANAES_SPEC[0].ANSP_EVENT_ID > 0 ||
					jsonPlans.PLANS.AND_PLAN[0].AND_ACTIVITY_ID > 0 || 
					jsonPlans.PLANS.AST_ACT_PLAN[0].AST_ACTIVITY_ID > 0 || 
					jsonPlans.PLANS.AST_RED_PLAN[0].AST_RED_ACTIVITY_ID > 0 ||
					jsonPlans.PLANS.GPS[0].GPS_EVENT_ID > 0 ||
					jsonPlans.PLANS.ITB[0].ITB_EVENT_ID > 0 ||
					jsonPlans.PLANS.RESP_SUPPORT[0].RESP_ACTIVITY_ID > 0 ||
					jsonPlans.PLANS.SEV_AST_PLAN[0].SEV_ACTIVITY_ID > 0 ||
					jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_EVENT_ID > 0 ||
					jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_EVENT_ID > 0 ||
					jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_EVENT_ID > 0 ||
					jsonPlans.PLANS.WHEEZE_PLAN[0].WHEEZE_ACTIVITY_ID > 0
					){    
					plans_exist = 1;
				}
				if (plans_exist == 1){
					targetHTML.push('<div id="am_plans"><h3 class="schn-h3" style="color:#ff0000">Current Acute Management Plans</h3><table>');
					
					//adrenal insufficiency management plan
					if (jsonPlans.PLANS.ADRENAL_INSUFF[0].ADR_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_ADRENAL_PLAN\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan'>" + jsonPlans.PLANS.ADRENAL_INSUFF[0].ADR_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.ADRENAL_INSUFF[0].ADR_UPDT + "<br />Updated by: " + jsonPlans.PLANS.ADRENAL_INSUFF[0].ADR_UPDT_BY + "</td></tr>");
					}
					
					//Anaesthetic Difficult Airway
					if (jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_UPDT + "<br />Updated by: " + jsonPlans.PLANS.ANAES_AIRWAY[0].ANAW_UPDT_BY + "</td></tr>");
					}
					
					//Anaesthetic Special Needs
					if (jsonPlans.PLANS.ANAES_SPEC[0].ANSP_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.ANAES_SPEC[0].ANSP_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.ANAES_SPEC[0].ANSP_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.ANAES_SPEC[0].ANSP_UPDT + "<br />Updated by: " + jsonPlans.PLANS.ANAES_SPEC[0].ANSP_UPDT_BY + "</td></tr>");
					}
					
					//AND plan
					if (jsonPlans.PLANS.AND_PLAN[0].AND_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_AND_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan'>" + jsonPlans.PLANS.AND_PLAN[0].AND_DESC + "</a></td><td>Last Updated: " + jsonPlans.PLANS.AND_PLAN[0].AND_UPDT + "<br />Updated by: " + jsonPlans.PLANS.AND_PLAN[0].AND_UPDT_BY + "</td></tr>");
					}
					
					//Intrathecal Baclofen plan
					if (jsonPlans.PLANS.ITB[0].ITB_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_REHAB_IBAC_PUMP\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan'>" + jsonPlans.PLANS.ITB[0].ITB_DESC + "</a><br /><span class='schn-instruction'><a class='schn-link' href='javascript:APPLINK(100, \"http://chw.schn.health.nsw.gov.au/o/documents/policies/guidelines/2011-8045.pdf\",\"\");'>ITB Practice Guidelines</a></span></td><td>Last Updated: " + jsonPlans.PLANS.ITB[0].ITB_UPDT + "<br />Updated by: " + jsonPlans.PLANS.ITB[0].ITB_UPDT_BY + "</td></tr>");
					}

					//Neuro Management Plan - ED
					if (jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_UPDT + "<br />Updated by: " + jsonPlans.PLANS.NEURO_ED[0].NEURO_ED_UPDT_BY + "</td></tr>");
					}
					
					//Respiratory support settings
					if (jsonPlans.PLANS.RESP_SUPPORT[0].RESP_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_RESPS_FORM_DATA\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan'>" + jsonPlans.PLANS.RESP_SUPPORT[0].RESP_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.RESP_SUPPORT[0].RESP_UPDT + "<br />Updated by: " + jsonPlans.PLANS.RESP_SUPPORT[0].RESP_UPDT_BY + "</td></tr>");
					}
					
					//Seizure Management Plan - ED
					if (jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_UPDT + "<br />Updated by: " + jsonPlans.PLANS.SEIZURE_ED[0].SEIZURE_ED_UPDT_BY + "</td></tr>");
					}

					//Seizure Management Plan - Inpatient
					if (jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_UPDT + "<br />Updated by: " + jsonPlans.PLANS.SEIZURE_INPT[0].SEIZURE_INPT_UPDT_BY + "</td></tr>");
					}

					//severe asthma management plan
					if (jsonPlans.PLANS.SEV_AST_PLAN[0].SEV_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_SEVERE_ASTHMA_DATA\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan'>" + jsonPlans.PLANS.SEV_AST_PLAN[0].SEV_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.SEV_AST_PLAN[0].SEV_UPDT + "<br />Updated by: " + jsonPlans.PLANS.SEV_AST_PLAN[0].SEV_UPDT_BY + "</td></tr>");
					}
										
					/*
					//cvad
					if (jsonPlans.PLANS.CVAD[0].CVAD_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:schn.openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.CVAD[0].CVAD_EVENT_ID + ");' title='Click link to view latest document'>" + jsonPlans.PLANS.CVAD[0].CVAD_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.CVAD[0].CVAD_UPDT + "<br />Updated by: " + jsonPlans.PLANS.CVAD[0].CVAD_UPDT_BY + "</td></tr>");
					}
					*/
					targetHTML.push('</table><p>&nbsp;</p><h3 class="schn-h3" style="color:#ff0000">Current Non-Acute Management Plans</h3><table>');
					
					// asthma action plan
					if (jsonPlans.PLANS.AST_ACT_PLAN[0].AST_ACTIVITY_ID > 0){
					//	targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='#' >" + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_DESC + "</a><br /><span class='schn-instruction'>Please go to Task Menu --> Reports to print the Asthma Action plan</span></td><td>Last Updated:" + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_UPDT + "<br />Updated by: " + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_UPDT_BY + "</td></tr>");
					    targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_ASTHMA_ACTION_PLAN\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan' >" + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_UPDT + "<br />Updated by: " + jsonPlans.PLANS.AST_ACT_PLAN[0].AST_UPDT_BY + "</td></tr>");
					}
					// asthma medication reducing plan
					if (jsonPlans.PLANS.AST_RED_PLAN[0].AST_RED_ACTIVITY_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='#' >" + jsonPlans.PLANS.AST_RED_PLAN[0].AST_RED_DESC + "</a><br /><span class='schn-instruction'>Please go to Task Menu --> Reports to print the Asthma Reducing Medication Plan</span></td><td>Last Updated:" + jsonPlans.PLANS.AST_RED_PLAN[0].AST_RED_UPDT + "<br />Updated by: " + jsonPlans.PLANS.AST_RED_PLAN[0].AST_RED_UPDT_BY + "</td></tr>");
					}
					// pre school wheeze action plan
					if (jsonPlans.PLANS.WHEEZE_PLAN[0].WHEEZE_ACTIVITY_ID > 0){
					    targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:CCLLINK(\"707_PS_WHEEZE_ACTION_PLAN\", \"^MINE^, value($pat_personid$)\", 0);' title='Click link to view the plan' >" + jsonPlans.PLANS.WHEEZE_PLAN[0].WHEEZE_DESC + "</a></td><td>Last Updated:" + jsonPlans.PLANS.WHEEZE_PLAN[0].WHEEZE_UPDT + "<br />Updated by: " + jsonPlans.PLANS.WHEEZE_PLAN[0].WHEEZE_UPDT_BY + "</td></tr>");
					}
					//Kids GPS Management plan
					if (jsonPlans.PLANS.GPS[0].GPS_EVENT_ID > 0){
						targetHTML.push("<tr class='amp_row'><td><a class='amp_link' href='javascript:openDocumentViewer(value($pat_personid$), " + jsonPlans.PLANS.GPS[0].GPS_EVENT_ID + ");' title='Click link to view the plan'>" + jsonPlans.PLANS.GPS[0].GPS_DESC + "</a><td>Last Updated: " + jsonPlans.PLANS.GPS[0].GPS_UPDT + "<br />Updated by: " + jsonPlans.PLANS.GPS[0].GPS_UPDT_BY + "</td></tr>");
					}
					
					targetHTML.push('</table></div>');
				
				} else {
					targetHTML.push('<div id="am_plans"><span class="res-none">There are no Management Plans documented for this patient.</span></div>');
				}
								
				document.getElementById('current_plans').innerHTML  = targetHTML.join("");
	
			} //if (jsonPlans)

		};   //if
	} //function


	//  Call the ccl progam and send the parameter string
	mxPlans.open('GET', "707_MP_ACUTE_MANAGEMENT_PLAN_1");
	mxPlans.send("MINE, value($pat_personid$), value($USR_PositionCd$)");
	//mxPlans.send("MINE, "+MPAGE_REC.PERSON_ID+", "+MPAGE_REC.USER_POS+"");

	return;
	}


