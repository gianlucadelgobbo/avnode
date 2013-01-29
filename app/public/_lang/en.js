var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.";

var label_multiple_fields_add="Add";
var label_multiple_fields_del="Delete";
var label_multiple_fields_edit="Edit";

var label_checkPostForumData={
	"code0":"Select the category which you want to publish the post to.",
	"code1":"Select the language for the footage",
	"code2":"Insert Title.",
	"code3":"Insert Text",
	"code4":"The text should not exceed 7000 characters"
};
var label_fillCommentArea={"code0":"wrote"};
/* LABEL UPLOADER */
var uploaderS = {
	messages:	{
   		typeError: 		"has an invalid extension. These are the only file extensions allowed",
		sizeError: 		"is too large, maximum file size is",
		minSizeError:	"is too small, minimum file size is",
		emptyErrorText: "is empty, please select again all the needed files except this one",
		onLeave: 		"The files are being uploaded, if you leave now the upload will be cancelled"	
	}, 
	dropLabel: 			"Drop here files to upload (only ",
	buttonLabel:		"Upload a file (only ",
	uploadErrorText:	"File with passed id was either not added, or it has been already uploaded or deleted",
	loadingText:		"from"
}
var uploaderM = {
	messages:	{
   		typeError: 		"has an invalid extension. These are the only file extensions allowed",
		sizeError: 		"is too large, maximum file size is",
		minSizeError:	"is too small, minimum file size is",
		emptyErrorText: "is empty, please select again all the needed files except this one",
		onLeave: 		"The files are being uploaded, if you leave now the upload will be cancelled"	
	}, 
	dropLabel: 			"Drop files here to upload (only ",
	buttonLabel:		"Upload one or multiple files or a zip archive (only ",
	uploadErrorText:	"File with passed id was either not added, or it has been already uploaded or deleted",
	loadingText:		"from"
}

/* RATE js */ 
var label_rateJs={
	"code0":"Rate",
	"code1":"Are you not registered yet?",
	"code2":"register now",
	"code3":"If you already have an account, please login through the form on the right."
};
/* FRIEND */
var label_friend_js={"amico":"friend","amici":"friends"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"To register you must agree to the terms of your personal data processing."};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"The Nickname field is required"};
var label_ctr_user_edit_textLenght_2={"code0":"The City field is mandatory"};
var label_ctr_user_edit_is_selected_3={"code0":"Select your country"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Invalid URL"};
var label_ctr_user_edit_checklogin_7={"code2":"Your Username must contain between 1 and 20 characters.","code1":"Username already in use, please choose another Username","code0":"Invalid characters."};
var label_ctr_user_edit_textLenght_8={"code0":"The password field is required and must contain between 4 and 20 characters."};
var label_ctr_user_edit_passwdCheck_9={"code1":"Enter the password again to confirm.","code0":"The password field is required"};
var label_ctr_user_edit_textLenght_10={"code0":"The name field is required"};
var label_ctr_user_edit_textLenght_11={"code0":"Last name is required"};
var label_ctr_user_edit_checkEmail_12={"code1":"email address already registered in our database","code0":"email is not valid"};
var label_ctr_user_edit_is_selected_13={"code0":"Please select the sex"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Date of birth is not valid, the day must be the first value "+currentTime.getFullYear()+"-01-01 and after 1910/01/01","code0":"Format of the date of birth is not valid"};
var label_ctr_user_edit_is_checked_15={"code0":"Please accept"};
var label_ctr_user_edit_file_up_16={"code0":"Image format file invalid","code1":"Error: can not load the file"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Are you sure you want to delete this website?"};
var label_ctr_user_edit_email_msg_18={"code0":"If you change this email address, you will lose the validation and newsletter subscriptions","code1":"Please wait for the verification code to be sent...","code2":"Are you sure you want to delete this email address?","code3":"Enter email address","code4":"The email address is already listed in our database, if you think this could be a fraud, please contact the server administrator at info@flxer.net","code5":"using the wrong email format, please try again"};
var label_ctr_user_edit_location_msg_19={"code0":"Are you sure you want to delete this location?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"The name field of TV Show is required"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Event name field is required"};
//var label_ctr_evento_new_textLenght_2={"code0":"Event subtitle field is required"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Choose 1 type"};
var label_ctr_evento_new_textLenght_3={"code0":"Invalid character, please use only numeric characters."};
var label_ctr_evento_new_textLenght_4={"code0":"The Description field is required and must contain between 100 and 65536 characters."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Choose option 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Start time field is required"};
var label_ctr_evento_new_ora_fine={"code0":"End time field is required"};
var label_ctr_evento_new_data_evento={"code0":"Incorrect date format, please use YYYY-MM-DD"};
var label_ctr_evento_new_luogo={"code0":"Venue field is required insert min 5, max 255 characters"};
var label_ctr_evento_new_citta={"code0":"City field is required insert min 5, max 255 characters"};
var label_ctr_evento_new_nazione={"code0":"Choose 1 nation"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Choose 1 nation"};
var label_ctr_evento_new_del_perf={"code0":"Are you sure you want to delete this performance from the event?","code1":"Pending confirmation"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Please enter at least 2 characters and no more than 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Choose 1 production"};
var label_ctr_evento_new_members_1={"code0":"The event must have at least one production"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"The File field is required"};
var label_ctr_post_new_textLenght_1={"code0":"The Footage Title field is required"};
var label_ctr_post_new_one_is_checked_3={"code0":"Choose 1 author"};
var label_ctr_post_new_one_is_checked_4={"code0":"Choose 1 type"};
var label_ctr_post_new_one_is_checked_5={"code0":"Choose a tag mandatory"};
var label_ctr_post_new_textLenght_6={"code0":"The Description field is required and must contain between 100 and 65536 characters."};
var label_ctr_post_new_is_checked_7={"code0":"Please accept the terms & conditions"};
var label_ctr_post_new_file_up_8={"code0":"Invalid file extension","code1":"Error: can not load the file"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"The Footage Title field is required"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Choose 1 author"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Choose 1 type"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Choose a tag mandatory"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"The Playlist Title field is required "};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"The Performance Name field is required"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Choose 1 type"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Choose 1 Technique"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Choose 1 genre"};
var label_ctr_perf_new_textLenght_3={"code0":"Invalid character, please use only numeric characters."};
var label_ctr_perf_new_textLenght_4={"code0":"The Description field is required and must contain between 100 and 65536 characters."};
var label_ctr_perf_new_textLenght_5={"code0":"The Technical rider field is required and must contain between 20 and 65536 characters."};
var label_ctr_perf_new_one_is_checked_5={"code0":"Choose 1 author"};
var label_ctr_perf_new_file_up_5={"code0":"Invalid file extension","code1":"Error: can not load the file"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"The Performance Name field is required"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Choose 1 type"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Choose 1 Technique"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Choose 1 genre"};
var label_ctr_perf_edit_textLenght_3={"code0":"Invalid character, please use only numeric characters."};
var label_ctr_perf_edit_textLenght_4={"code0":"The Description field is required and must contain between 100 and 65536 characters."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Choose 1 author"};
var label_ctr_perf_edit_file_up_6={"code0":"Invalid file extension","code1":"Error: can not load the file"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Invalid .zip file extension","code1":"Error: can not load the file","code2":"Please wait while loading"};
var label_ctr_perf_edit_members_8={"code0":"Are you sure you want to exclude this author from the performance?","code1":"Pending confirmation","code2":"The performance needs at least 1 author"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Enter a username"};
var label_ctr_crew_textLenght_1={"code0":"The Crew Name field is required and must contain between 1 and 255 characters."};
var label_ctr_crew_textLenght_2={"code0":"The City field is mandatory"};
var label_ctr_crew_is_selected_3={"code0":"Select your country"};
var label_ctr_crew_checkWebsite_4={"code0":"Invalid URL"};
var label_ctr_crew_checklogin_7={"code2":"Your Username must contain between 1 and 20 characters.","code1":"Username already in use, please choose another Username","code0":"Invalid characters."};
var label_ctr_crew_textLenght_8={"code0":"The password field is required and must contain between 4 and 20 characters."};
var label_ctr_crew_passwdCheck_9={"code1":"Enter the password again to confirm.","code0":"The password field is required"};
var label_ctr_crew_textLenght_10={"code0":"The name field is required"};
var label_ctr_crew_textLenght_11={"code0":"Last name is required"};
var label_ctr_crew_checkEmail_12={"code1":"Email already in use, click here to retrieve your password","code0":"email is not valid"};
var label_ctr_crew_is_selected_13={"code0":"Please select the sex"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Date of birth is not valid, the day must be the first value "+currentTime.getFullYear()+"-01-01 and after 1910/01/01","code0":"Incorrect date format, please use YYYY-MM-DD"};
var label_ctr_crew_file_up_15={"code0":"Image format file invalid","code1":"Error: can not load the file"};
var label_ctr_crew_members_16={"code0":"Member already added"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Are you sure you want to delete this website?"};
var label_ctr_crew_member_18={"code0":"Are you sure you want to delete this member from your group?","code1":"Pending confirmation"};
/* gallery */
var label_gallery_edit={"code0":"Are you sure you want to delete this gallery?","code1":"Are you sure you want to delete this content?","code2":"Saving ...","code3":"Wait for the preparation of the ZIP file"};

/* playlist */
var label_playlist_new={"code0":"The File field is required","code1":"There must be at least 5 files found in the Footage"};

/* preview */
var label_preview_edit={"code0":"Loading successfully executed","code1":"Your file needs to be encoded in H.264","code2":"After saving you will see your video as soon as our servers will have finished the conversion","code3":"or","code4":"Choose another","code5":"SAVE","code6":"New","code7":"Edit thumbnails"};
/* window */
var label_window_ok_btn="Close";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
	"code0":"Select a day",
	"code1":"Select nationality",
	"code2":"Enter phone number",
	"code3":"Select arrival date",
	"code4":"Select departure date",
	"code5":"at least one artist must be present"
};
