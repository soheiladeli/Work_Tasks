//046 ============================>

		targetHTML.push('<div class="sub-sec"><h3 class="sub-sec-hd"><span class="sub-sec-hd-tgl">-</span><span class="sub-sec-title">Non-Clinical Alerts</span></h3>');
//046	if ((nc_alert[0].PT_ALERT.length > 0) || (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1)) {
		if ((nc_alert[0].PT_ALERT.length > 0) || (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1) || (nc_alert[0].PTCALL_INSTRUCTION != "")) {	
			
			targetHTML.push('<div class="sub-sec-content"><table><tbody>');
			if (nc_alert[0].PT_ALERT.length > 0) {
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2"><b>Patient Alert:</b></td></tr>');
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2">' + nc_alert[0].PT_ALERT + '</td></tr>');				
			}
				
			if (nc_alert[0].SOCIAL_ALERTS[0].SOCIAL_ALERT.length > 1) {
				targetHTML.push('<tr><td class="schn-alerts-cell"><b>Social Alert:</b></td><td class="schn-alerts-cell"><b>Last Updated</b></td></tr>');
				for (m=0;m < nc_alert[0].SOCIAL_ALERTS.length; m++){
					targetHTML.push('<tr><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_ALERT + '</td><td class="schn-alerts-cell">' + nc_alert[0].SOCIAL_ALERTS[m].SOCIAL_UPDT + '</td></tr>');
				}				
			}
//046>>
			if (nc_alert[0].PTCALL_INSTRUCTION != "") {
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2"><b>Patient Call Instruction:</b></td></tr>');
				targetHTML.push('<tr><td  class="schn-alerts-cell" colspan="2">' + nc_alert[0].PTCALL_INSTRUCTION + '</td></tr>');
			}
//<<046
			targetHTML.push('</tbody></table></div>');   //close sub-sec-content
		} else {
			targetHTML.push("<div class='sub-sec-content'><span class='res-none'>There are no Patient or Social alerts entered for this patient.</span></div>");
		}

		targetHTML.push('</div>');   //close sub-sec	

	} else {
		targetHTML.push('<table class="schn-alerts-table"><tr><td class="schn-alerts-cell">' + nc_alert[0].DECEASED );
		if (nc_alert[0].DEC_DATE > ""){
			targetHTML.push('<br />Deceased Date: ' + nc_alert[0].DEC_DATE );
		}
		targetHTML.push('<br />' + nc_alert[0].DEC_EST + '</td></tr></table>');
	}

	targetHTML.push('</div>');  //close content-body