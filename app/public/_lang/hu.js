var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Ehhez a tartalomhoz JAVASCRIPT és AFP engedélyezése szükséges";

var label_multiple_fields_add="Hozzáadás";
var label_multiple_fields_del="Törlés";
var label_multiple_fields_edit="Szerkesztés";

var label_checkPostForumData={
	"code0":"Válassz kategóriát, amelyikben posztolni szeretnél",
	"code1":"Válaszd ki a footage nyelvét",
	"code2":"Cím megadása",
	"code3":"Szöveg beírása",
	"code4":"A szöveg nem lehet több 7000 karakternél"
};
var label_fillCommentArea={"code0":"írt"};
/* LABEL UPLOADER */
var uploaderS = {
	messages:	{
   		typeError: 		"rossz kiterjesztésű. Csak az alábbi kiterjesztések lehetségesek:",
		sizeError: 		"túl nagy, a maximum fájl méret:",
		minSizeError:	"túl kicsi, a minimum fájl méret:",
		emptyErrorText: "üres, kérjük, válaszd ki újra az összes szükséges fájlt, kivéve ezt",
		onLeave: 		"Feltöltés folyamatban. Ha elnavigálsz az oldalról, megszakad a feltöltés."	
	}, 
	dropLabel: 			"Húzd ide a feltöltendő fájlokat (elfogadott formátumok: ",
	buttonLabel:		"Fájl feltöltése (elfogadott formátumok: ",
	uploadErrorText:	"A fálj az átugrott azonosítóval vagy nem került feltöltésre, vagy már fel van töltve, vagy le lett törölve",
	loadingText:		"-tól"
}
var uploaderM = {
	messages:	{
   		typeError: 		"rossz kiterjesztésű. Csak az alábbi kiterjesztések lehetségesek:",
		sizeError: 		"túl nagy, a maximum fájl méret:",
		minSizeError:	"túl kicsi, a minimum fájl méret:",
		emptyErrorText: "üres, kérjük, válaszd ki újra az összes szükséges fájlt, kivéve ezt",
		onLeave: 		"Feltöltés folyamatban. Ha elnavigálsz az oldalról, megszakad a feltöltés."	
	}, 
	dropLabel: 			"Húzd ide a feltöltendő fájlokat (elfogadott formátumok: ",
	buttonLabel:		"Tölts fel egy vagy több fájlt, vagy .zip-et (elfogadott formátumok: ",
	uploadErrorText:	"A fálj az átugrott azonosítóval vagy nem került feltöltésre, vagy már fel van töltve, vagy le lett törölve",
	loadingText:		"-tól"
}

/* RATE js */ 
var label_rateJs={
	"code0":"Értékelés",
	"code1":"Még nem regisztráltál?",
	"code2":"Regisztrálj most",
	"code3":"Ha már van azonosítód, kérlek jelentkezz be a jobb oldali mezőben"
};
/* FRIEND */
var label_friend_js={"amico":"Ismerős","amici":"Ismerősök"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"A regisztrációhoz el kell fogadnod a személyes adatfeldolgozás feltételeit."};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Becenév megadása kötelező"};
var label_ctr_user_edit_textLenght_2={"code0":"A Város mező kitöltése kötelező"};
var label_ctr_user_edit_is_selected_3={"code0":"Válaszd ki az országod"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Érvénytelen URL"};
var label_ctr_user_edit_checklogin_7={"code2":"A Felhasználónév 1 és 20 karakter közötti hosszúságú lehet","code1":"A Felhasználónév már foglalt, kérjük válassz egy másik Felhasználónevet","code0":"Érvénytelen karakterek"};
var label_ctr_user_edit_textLenght_8={"code0":"A jelszó kitöltése kötelező, 4 és 20 karakter között"};
var label_ctr_user_edit_passwdCheck_9={"code1":"A jelszó megerősítéséhez írd be újra","code0":"A jelszó megadása kötelező"};
var label_ctr_user_edit_textLenght_10={"code0":"Név megadása kötelező"};
var label_ctr_user_edit_textLenght_11={"code0":"Vezetéknév megadása kötelező"};
var label_ctr_user_edit_checkEmail_12={"code1":"email cím már regisztrálva van az adattárunkban","code0":"Érvénytelen email"};
var label_ctr_user_edit_is_selected_13={"code0":"Kérjük válaszd ki a nemed"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Érvénytelen születési dátum, a nap az első érték "+currentTime.getFullYear()+"-01-01 és 1910/01/01 után","code0":"A születési idő formátuma nem megfelelő"};
var label_ctr_user_edit_is_checked_15={"code0":"Elfogad"};
var label_ctr_user_edit_file_up_16={"code0":"A kép formátuma nem megfelelő","code1":"Hiba: nem tudja betölteni a file-t"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Biztos, hogy szeretnéd törölni ezt a weboldalt?"};
var label_ctr_user_edit_email_msg_18={"code0":"Ha megváltoztatod ezt az email címet, elveszik az érvényesítés és a hírlevél feliratkozás","code1":"Kérjük várj türelemmel a megerősítő kódra","code2":"Biztos, hogy szeretnéd törölni ezt az email címet?","code3":"Email cím megadása","code4":"Az email cím már benne van a rendszerünkben, ha úgy gonolod, hogy nem lehetséges, vedd fel a kapcsolatot a szerver adminisztrátorral: info@flxer.net","code5":"rossz email formátum, kérünk próbáld újra"};
var label_ctr_user_edit_location_msg_19={"code0":"Biztos, hogy szeretnéd törölni ezt a helyszínt?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"A név mező TV Show szükséges"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Esemény neve mező kitöltése kötelező"};
//var label_ctr_evento_new_textLenght_2={"code0":"Esemény felirat mező kitöltése kötelező"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Válasszon 1 típusú"};
var label_ctr_evento_new_textLenght_3={"code0":"érvénytelen karakter, csak numerikus karaktereket használj"};
var label_ctr_evento_new_textLenght_4={"code0":"A Leírás mező kitöltése kötelező, megengedett terjedelem 100 és 65536 karakter közötti"};
var label_ctr_evento_new_one_is_selected_5={"code0":"Beállítás 1 kiválasztása"};
var label_ctr_evento_new_ora_inizio={"code0":"Kezdő időpont mezőben van szükség"};
var label_ctr_evento_new_ora_fine={"code0":"Befejezés ideje mező kitöltése kötelező"};
var label_ctr_evento_new_data_evento={"code0":"Helytelen dátum formátum, használd ezt: EEEE-HH-NN"};
var label_ctr_evento_new_luogo={"code0":"Helyszín mező kitöltése kötelező helyezze min 5, max 255 karakter"};
var label_ctr_evento_new_citta={"code0":"Város területén van szükség helyezze min 5, max 255 karakter"};
var label_ctr_evento_new_nazione={"code0":"Válasszon 1 nemzet"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Válasszon 1 nemzet"};
var label_ctr_evento_new_del_perf={"code0":"Biztos benne, hogy törli ezt a teljesítményt az esemény?","code1":"Visszaigazolás folyamatban"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Kérjük, adja meg legalább 2 karakter és nem több, mint 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Válasszon 1 termelés"};
var label_ctr_evento_new_members_1={"code0":"Az esemény kell legalább egy termelési"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"A File mező kitöltése kötelező"};
var label_ctr_post_new_textLenght_1={"code0":"A Footage mező kitöltése kötelező"};
var label_ctr_post_new_one_is_checked_3={"code0":"Válasszon 1 szerző"};
var label_ctr_post_new_one_is_checked_4={"code0":"Válasszon 1 típusú"};
var label_ctr_post_new_one_is_checked_5={"code0":"Válassza ki a tag kötelező"};
var label_ctr_post_new_textLenght_6={"code0":"A Leírás mező kitöltése kötelező, megengedett terjedelem 100 és 65536 karakter közötti"};
var label_ctr_post_new_is_checked_7={"code0":"Kérjük fogadd el a feltételeket & szabályrendszert"};
var label_ctr_post_new_file_up_8={"code0":"Helytelen file kiterjesztés","code1":"Hiba: nem tudja betölteni a file-t"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"A Footage mező kitöltése kötelező"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Válasszon 1 szerző"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Válasszon 1 típusú"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Válassza ki a tag kötelező"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"A Playlist Címe mező kitöltése kötelező"};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"A Performansz Címe mező kitöltése kötelező"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Válasszon 1 típusú"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Válasszon 1 technika"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Válasszon 1 műfaj"};
var label_ctr_perf_new_textLenght_3={"code0":"érvénytelen karakter, csak numerikus karaktereket használj"};
var label_ctr_perf_new_textLenght_4={"code0":"A Leírás mező kitöltése kötelező, megengedett terjedelem 100 és 65536 karakter közötti"};
var label_ctr_perf_new_textLenght_5={"code0":"A Technikai rider mező kitöltése kötelező, megengedett terjedelem 20 és 65536 karakter közötti"};
var label_ctr_perf_new_one_is_checked_5={"code0":"Válasszon 1 szerző"};
var label_ctr_perf_new_file_up_5={"code0":"Helytelen file kiterjesztés","code1":"Hiba: nem tudja betölteni a file-t"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"A Performansz Címe mező kitöltése kötelező"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Válasszon 1 típusú"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Válasszon 1 technika"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Válasszon 1 műfaj"};
var label_ctr_perf_edit_textLenght_3={"code0":"érvénytelen karakter, csak numerikus karaktereket használj"};
var label_ctr_perf_edit_textLenght_4={"code0":"A Leírás mező kitöltése kötelező, megengedett terjedelem 100 és 65536 karakter közötti"};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Válasszon 1 szerző"};
var label_ctr_perf_edit_file_up_6={"code0":"Helytelen file kiterjesztés","code1":"Hiba: nem tudja betölteni a file-t"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Helytelen .zip file kiterejesztés","code1":"Hiba: nem tudja betölteni a file-t","code2":"Betöltés folyamatban, kérjük várj"};
var label_ctr_perf_edit_members_8={"code0":"Biztos benne, hogy törölni kívánja ezt a szerzőt a performanszból?","code1":"Visszaigazolás folyamatban","code2":"A teljesítmény kell legalább 1 szerző"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Írd be a felhasználónevedet"};
var label_ctr_crew_textLenght_1={"code0":"A Csapatnév mező kitöltése kötelező, megengedett terjedelem 1 és 255 karakter közötti"};
var label_ctr_crew_textLenght_2={"code0":"A Város mező kitöltése kötelező"};
var label_ctr_crew_is_selected_3={"code0":"Válaszd ki az országod"};
var label_ctr_crew_checkWebsite_4={"code0":"Érvénytelen URL"};
var label_ctr_crew_checklogin_7={"code2":"A Felhasználónév 1 és 20 karakter közötti hosszúságú lehet","code1":"A Felhasználónév már foglalt, kérjük válassz egy másik Felhasználónevet","code0":"Érvénytelen karakterek"};
var label_ctr_crew_textLenght_8={"code0":"A jelszó kitöltése kötelező, 4 és 20 karakter között"};
var label_ctr_crew_passwdCheck_9={"code1":"A jelszó megerősítéséhez írd be újra","code0":"A jelszó megadása kötelező"};
var label_ctr_crew_textLenght_10={"code0":"Név megadása kötelező"};
var label_ctr_crew_textLenght_11={"code0":"Vezetéknév megadása kötelező"};
var label_ctr_crew_checkEmail_12={"code1":"Az Email használatban van, a jelszó lekérdezéséhez kattints ide","code0":"Érvénytelen email"};
var label_ctr_crew_is_selected_13={"code0":"Kérjük válaszd ki a nemed"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Érvénytelen születési dátum, a nap az első érték "+currentTime.getFullYear()+"-01-01 és 1910/01/01 után","code0":"Helytelen dátum formátum, használd ezt: EEEE-HH-NN"};
var label_ctr_crew_file_up_15={"code0":"A kép formátuma nem megfelelő","code1":"Hiba: nem tudja betölteni a file-t"};
var label_ctr_crew_members_16={"code0":"Csapattag már létezik"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Biztos, hogy szeretnéd törölni ezt a weboldalt?"};
var label_ctr_crew_member_18={"code0":"Biztos, hogy törölni szeretnéd ezt a tagot a csoportból?","code1":"Visszaigazolás folyamatban"};
/* gallery */
var label_gallery_edit={"code0":"Biztos, hogy törölni szeretnéd ezt a galériát?","code1":"Biztos, hogy törölni szeretnéd ezt a tartalmat?","code2":"Mentés..","code3":"A ZIP file elkészítéséig várnod kell"};

/* playlist */
var label_playlist_new={"code0":"A File mező kitöltése kötelező","code1":"Ott legalább 5 kép található Footage"};

/* preview */
var label_preview_edit={"code0":"Betöltése sikeresen végrehajtott","code1":"A fájl kell kódolni a H.264","code2":"Mentése után fogja látni a videót, amint szerverek lesz kész az átalakítás","code3":"vagy","code4":"Másik kiválasztása","code5":"MENTÉS","code6":"Új","code7":"Ikonok szerkesztése"};
/* window */
var label_window_ok_btn="Bezárás";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
	"code0":"Nap kiválasztása",
	"code1":"Nemzetiség kiválasztása",
	"code2":"Írd be a telefonszámod",
	"code3":"Válaszd ki az érkezési dátumod",
	"code4":"Válaszd ki az indulási dátumod",
	"code5":"Legalább egy művész jelen kell lennie"
};
