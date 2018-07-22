/*
*  Script Name:  eso_bios_modobj
*  Type:  Open Engine Modify Object Script
*
*  Author:  Josh Hankin
*  Domain:  PBUILD
*  Creation Date:  16/01/2018 15:00:00
*
*  Modifications:
*  2018-06-01 - Josh Hankin - drop A06 messages that have not originated in ED (e.g. waitlist admissions)
*
*/

if (oen_reply->CONTROL_GROUP [1]->MSH [1]->message_type->messg_trigger = "A06")
	declare prev_encntr_type_cd = f8
	set prev_encntr_type_cd = 0
	
	select into "nl:"
	elh.encntr_type_cd
	from
	encntr_loc_hist elh
	where elh.encntr_id = oen_reply->cerner->person_info->person [1]->encntr_id
	and elh.encntr_type_cd = value(uar_get_code_by("MEANING", 71, "EMERGENCY"))
	and elh.active_ind = 1
	detail
		prev_encntr_type_cd = elh.encntr_type_cd
	with nocounter

	if (prev_encntr_type_cd = 0)
		set oenstatus->ignore = 1
		go to end_script
	endif
endif

execute oen_eso_bios_modobj

# end_script