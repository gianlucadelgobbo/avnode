var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Questo contenuto richiede JAVASCRIPT abilitato e Adobe Flash Player.";

var label_multiple_fields_add="Aggiungi";
var label_multiple_fields_del="Cancella";
var label_multiple_fields_edit="Modifica";

var label_checkPostForumData={
  "code0":"Seleziona la categoria in cui inviare il post.",
  "code1":"Seleziona la lingua del footage",
  "code2":"Inserisci il Titolo",
  "code3":"Inserisci il Testo",
  "code4":"Il testo non deve superare i 7.000 caratteri"
};
var label_fillCommentArea={"code0":"ha scritto"};
/* LABEL UPLOADER */
var uploaderS = {
  messages:  {
       typeError:     "ha un estensione non valida. Sono accettate solo queste estensioni",
    sizeError:     "è troppo grande, il peso massimo è",
    minSizeError:  "è troppo piccolo, il peso minimo è",
    emptyErrorText: "è vuoto, seleziona di nuovo tutti i file escludendo questo",
    onLeave:     "L\'upload dei file è in corso, se abbandoni questa pagina ora l\'upload verrà annullato"
  },
  dropLabel:       "Trascina qui il file per l\'upload (solo ",
  buttonLabel:    "Carica un file (solo ",
  uploadErrorText:  "Il file con l\'id non è stato aggiunto, o era stato già caricato o annullato",
  loadingText:    "di"
}
var uploaderM = {
  messages:  {
       typeError:     "ha un estensione non valida. Sono accettate solo queste estensioni",
    sizeError:     "è troppo grande, il peso massimo è",
    minSizeError:  "è troppo piccolo, il peso minimo è",
    emptyErrorText: "è vuoto, seleziona di nuovo tutti i file escludendo questo",
    onLeave:     "L\'upload dei file è in corso, se abbandoni questa pagina ora l\'upload verrà annullato"
  },
  dropLabel:       "Trascina qui i file per l\'upload (solo ",
  buttonLabel:    "Carica uno o più file o un singolo file zip (solo ",
  uploadErrorText:  "Il file con l\'id non è stato aggiunto, o era stato già caricato o annullato",
  loadingText:    "di"
}

/* RATE js */ 
var label_rateJs={
  "code0":"Vota",
  "code1":"Non sei registrato?",
  "code2":"registrati ora",
  "code3":"Se sei gia registrato fai il login dal form a destra."
};
/* FRIEND */
var label_friend_js={"amico":"amico","amici":"amici"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"Per registrarti devi aderire alle condizioni di trattamento dei dati personali."};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Il campo Nickname è obbligatorio"};
var label_ctr_user_edit_textLenght_2={"code0":"Il campo Città è obbligatorio"};
var label_ctr_user_edit_is_selected_3={"code0":"Seleziona il tuo stato"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Url non valido"};
var label_ctr_user_edit_checklogin_7={"code2":"La tua Username deve contenere da 1 a 20 caratteri.","code1":"Username già utilizzata da un altro utente, scegli un\'altra Username","code0":"Caratteri non validi."};
var label_ctr_user_edit_textLenght_8={"code0":"Il campo password è obbligatorio e deve contenere da 4 a 20 caratteri."};
var label_ctr_user_edit_passwdCheck_9={"code1":"Inserire nuovamente la password per conferma.","code0":"Il campo password è obbligatorio"};
var label_ctr_user_edit_textLenght_10={"code0":"Il campo nome è obbligatorio"};
var label_ctr_user_edit_textLenght_11={"code0":"Il campo cognome è obbligatorio"};
var label_ctr_user_edit_checkEmail_12={"code1":"indirizzo email già presente nel nostro database","code0":"email non valido"};
var label_ctr_user_edit_is_selected_13={"code0":"Si prega di selezionare il sesso"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Data di nascita non valida, il giorno deve essere il primo valore "+currentTime.getFullYear()+"-01-01 e dopo 1910/01/01","code0":"Formato della data di nascita non valida"};
var label_ctr_user_edit_is_checked_15={"code0":"Si prega di accettare"};
var label_ctr_user_edit_file_up_16={"code0":"Estensione del file immagine non valida","code1":"Errore: non è possibile caricare il file"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Sei sicuro di voler cancellare questo sito?"};
var label_ctr_user_edit_email_msg_18={"code0":"Se si modifica questo indirizzo email perderai la validazione e le sottoscrizioni alle newsletter","code1":"Si prega di attendere l\'invio del codice di verifica...","code2":"Sei sicuro di voler cancellare questo indirizzo email?","code3":"Inserisci l\'indirizzo email","code4":"L\'indirizzo email è già presente nel nostro database, se pensi sia una frode contatta l\'amministratore del server all\'indirizzo info@flxer.net","code5":"formato email errato, riprova"};
var label_ctr_user_edit_location_msg_19={"code0":"Sei sicuro di voler cancellare questa location?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"Il campo Nome del TV Show è obbligatorio"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Il campo Nome evento è obbligatorio"};
//var label_ctr_evento_new_textLenght_2={"code0":"Il campo Sottotitolo è obbligatorio"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Scegli 1 tipo"};
var label_ctr_evento_new_textLenght_3={"code0":"Carattere non valido, perfavore utilizza solo caratteri numerici."};
var label_ctr_evento_new_textLenght_4={"code0":"Il campo Descrizione è obbligatorio e deve contenere da 100 a 65536 caratteri."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Scegli l\'opzione 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Il campo ora inizio è obbligatorio"};
var label_ctr_evento_new_ora_fine={"code0":"Il campo Ora fine è obbligatorio"};
var label_ctr_evento_new_data_evento={"code0":"Formato della data non corretto, perfavore usa AAAA-MM-DD"};
var label_ctr_evento_new_luogo={"code0":"Il campo luogo dell\'evento è obbligatorio e deve contenere da 5 a 255 caratteri"};
var label_ctr_evento_new_citta={"code0":"Il campo citta dell\'evento è obbligatorio e deve contenere da 5 a 255 caratteri"};
var label_ctr_evento_new_nazione={"code0":"Scegli 1 nazione"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Scegli 1 nazione"};
var label_ctr_evento_new_del_perf={"code0":"Sei sicuro di voler eliminare questa performance dall\'evento?","code1":"In attesa di conferma"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Inserisci almeno 2 caratteri e non piu di 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Scegli 1 produzione"};
var label_ctr_evento_new_members_1={"code0":"L\'evento deve avere almeno una produzione"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"Il campo File è obbligatorio"};
var label_ctr_post_new_textLenght_1={"code0":"Il campo Titolo Footage è obbligatorio"};
var label_ctr_post_new_one_is_checked_3={"code0":"Scegli 1 autore"};
var label_ctr_post_new_one_is_checked_4={"code0":"Scegli 1 tipo"};
var label_ctr_post_new_one_is_checked_5={"code0":"Scegli 1 tag obbligatoria"};
var label_ctr_post_new_textLenght_6={"code0":"Il campo Descrizione è obbligatorio e deve contenere da 100 a 65536 caratteri."};
var label_ctr_post_new_is_checked_7={"code0":"Perfavore accettare termini e condizioni"};
var label_ctr_post_new_file_up_8={"code0":"Estensione del file non valida","code1":"Errore: non è possibile caricare il file"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"Il campo Titolo Footage è obbligatorio"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Scegli 1 autore"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Scegli 1 tipo"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Scegli 1 tag obbligatoria"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"Il campo Titolo Playlist è obbligatorio"};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"Il campo Nome performance è obbligatorio"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Scegli 1 tipo"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Scegli 1 tecnica"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Scegli 1 genere"};
var label_ctr_perf_new_textLenght_3={"code0":"Carattere non valido, perfavore utilizza solo caratteri numerici."};
var label_ctr_perf_new_textLenght_4={"code0":"Il campo Descrizione è obbligatorio e deve contenere da 100 a 65536 caratteri."};
var label_ctr_perf_new_textLenght_5={"code0":"Il campo Scheda tecnica è obbligatorio e deve contenere da 20 a 65536 caratteri."};
var label_ctr_perf_new_one_is_checked_5={"code0":"Scegli 1 autore"};
var label_ctr_perf_new_file_up_5={"code0":"Estensione del file non valida","code1":"Errore: non è possibile caricare il file"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"Il campo Nome performance è obbligatorio"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Scegli 1 tipo"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Scegli 1 tecnica"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Scegli 1 genere"};
var label_ctr_perf_edit_textLenght_3={"code0":"Carattere non valido, perfavore utilizza solo caratteri numerici."};
var label_ctr_perf_edit_textLenght_4={"code0":"Il campo Descrizione è obbligatorio e deve contenere da 100 a 65536 caratteri."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Scegli 1 autore"};
var label_ctr_perf_edit_file_up_6={"code0":"Estensione del file non valida","code1":"Errore: non è possibile caricare il file"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Estensione del file .zip non valida","code1":"Errore: non è possibile caricare il file","code2":"Attendere il caricamento"};
var label_ctr_perf_edit_members_8={"code0":"Sei sicuro di voler eliminare questo autore dalla performance?","code1":"In attesa di conferma","code2":"La performance ha bisogno di almeno 1 autore"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Inserire il nome dell\'utente"};
var label_ctr_crew_textLenght_1={"code0":"Il campo Nome crew è obbligatorio e deve contenere da 1 a 255 caratteri."};
var label_ctr_crew_textLenght_2={"code0":"Il campo Città è obbligatorio"};
var label_ctr_crew_is_selected_3={"code0":"Seleziona il tuo stato"};
var label_ctr_crew_checkWebsite_4={"code0":"Url non valido"};
var label_ctr_crew_checklogin_7={"code2":"La tua Username deve contenere da 1 a 20 caratteri.","code1":"Username già utilizzata da un altro utente, scegli un\'altra Username","code0":"Caratteri non validi."};
var label_ctr_crew_textLenght_8={"code0":"Il campo password è obbligatorio e deve contenere da 4 a 20 caratteri."};
var label_ctr_crew_passwdCheck_9={"code1":"Inserire nuovamente la password per conferma.","code0":"Il campo password è obbligatorio"};
var label_ctr_crew_textLenght_10={"code0":"Il campo nome è obbligatorio"};
var label_ctr_crew_textLenght_11={"code0":"Il campo cognome è obbligatorio"};
var label_ctr_crew_checkEmail_12={"code1":"Email gia in uso, fare clic qui per recuperare la tua password","code0":"email non valido"};
var label_ctr_crew_is_selected_13={"code0":"Si prega di selezionare il sesso"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Data di nascita non valida, il giorno deve essere il primo valore "+currentTime.getFullYear()+"-01-01 e dopo 1910/01/01","code0":"Formato della data non corretto, perfavore usa AAAA-MM-DD"};
var label_ctr_crew_file_up_15={"code0":"Estensione del file immagine non valida","code1":"Errore: non è possibile caricare il file"};
var label_ctr_crew_members_16={"code0":"Membro gia inserito"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Sei sicuro di voler cancellare questo sito?"};
var label_ctr_crew_member_18={"code0":"Sei sicuro di voler eliminare questo membro dal gruppo?","code1":"In attesa di conferma"};
/* gallery */
var label_gallery_edit={"code0":"Sei sicuro di voler cancellare questa galleria?","code1":"Sei sicuro di voler cancellare questo contenuto?","code2":"Salvataggio in corso...","code3":"Attendere l\'elaborazione del file ZIP"};

/* playlist */
var label_playlist_new={"code0":"Il campo File è obbligatorio","code1":"Devono essere presenti almeno 5 file in Footage trovati"};

/* preview */
var label_preview_edit={"code0":"Caricamento eseguito con successo","code1":"Il tuo file necessita di essere codificato in h.264","code2":"dopo aver salvato potrai vedere il tuo video non appena il nostro server avra terminato la conversione","code3":"o","code4":"Scegli un altro file","code5":"SALVA","code6":"Nuovo","code7":"Modifica miniatura"};
/* window */
var label_window_ok_btn="Chiudi";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
  "code0":"seleziona un giorno",
  "code1":"seleziona la nazionalità",
  "code2":"inserisci il telefono",
  "code3":"seleziona la data di arrivo",
  "code4":"seleziona la data di partenza",
  "code5":"almeno un artista deve essere presente"
};
