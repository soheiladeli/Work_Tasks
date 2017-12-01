/****************** Common functions for use in full page custom pages  ************************************/


function refresh() {
    window.location.reload(true);
}


//open a powerform
//pid = person_id; 
//eid = encntr_id; 
//formid = DCP_FORMS_REF_ID from the DCP_FORMS_REF table, but if actid is valued, then formid is ignored.  If both the formId and activityId are set to 0, the Ad Hoc Charting dialog is displayed.
//actid = DCP_FORMS_ACTIVITY_ID field of the DCP_FORMS_ACTIVITY table for an existing PowerForm for the personId and encntrId.  A value of 0 for the activityId starts a new instance of the PowerForm associated with the formId.  If both the formId and activityId are set to 0, the Ad Hoc Charting dialog is displayed.
//mode = 0 opens the existing PowerForm in read/write mode; 1 opens the existing PowerForm in read only mode.
//openPowerform = function(pid,eid,formid,actid,mode){
/*
function openPowerform(pid,eid,formid,actid,mode){
	var mpObj=window.external.DiscernObjectFactory("POWERFORM");
	mpObj.OpenForm(pid,eid,formid,actid,mode);
}
*/

openPowerform = function (persId, encntrId, formId, activityId, chartMode, compId) {
    var paramString = persId + "|" + encntrId + "|" + formId + "|" + activityId + "|" + chartMode;
    MPAGES_EVENT("POWERFORM", paramString);
	window.location.reload(true);
}



//open a document
//openDocumentViewer = function(dPersonId, dEventId){
function openDocumentViewer(dPersonId, dEventId) {
	var objPVViewerMPage = window.external.DiscernObjectFactory("PVVIEWERMPAGE");
	objPVViewerMPage.CreateDocViewer(dPersonId);
	objPVViewerMPage.AppendDocEvent(dEventId);
	objPVViewerMPage.LaunchDocViewer();
}


//create a new dynamic doc by note type and template
function createNewDynDoc(dPersonId, dEncounterId,dRefTemplateId,noteTypeEventCd){
	var DynDocMPageUtils = window.external.DiscernObjectFactory("DYNDOC");
	DynDocMPageUtils.OpenNewDocumentByReferenceTemplateIdAndNoteType(dPersonId, dEncounterId, dRefTemplateId, noteTypeEventCd);
}





