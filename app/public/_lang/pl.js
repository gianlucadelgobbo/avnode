var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Strona wymaga JavaScript i Adobe Flash Player.";

var label_multiple_fields_add="Dodaj ";
var label_multiple_fields_del="Usuń";
var label_multiple_fields_edit="Edycja ";

var label_checkPostForumData={
  "code0":"Wybierz kategorię, do której chcesz wysłać posta.",
  "code1":"Wybierz język footage ",
  "code2":"Dodaj tytuł. ",
  "code3":"Dodaj tekst ",
  "code4":"Tekst nie powinien przekraczać 7000 znaków"
};
var label_fillCommentArea={"code0":"napisał "};
/* LABEL UPLOADER */
var uploaderS = {
  messages:  {
       typeError:     "ma niepoprawne rozszerzenie. Są to jedyne dozwolone rozszerzenia plików",
    sizeError:     "jest za duży, maksymalny rozmiar pliku to",
    minSizeError:  "jest za mały, minimalny rozmiar pliku",
    emptyErrorText: "jest pusty, wybierz ponownie wszystkie potrzebne pliki poza tym jednym",
    onLeave:     "Pliki są pobierane, jeśli teraz opuścisz stronę, upload zostanie anulowany"
  },
  dropLabel:       "Wrzuć tutaj pliki do przesłania (tylko. jpg,. png,. gif)",
  buttonLabel:    "Prześlij plik (tylko. jpg,. png,. gif)",
  uploadErrorText:  "Plik z ID nie został dodany, bądź został już przesłany lub usunięty",
  loadingText:    "z"
}
var uploaderM = {
  messages:  {
       typeError:     "ma niepoprawne rozszerzenie. Są to jedyne dozwolone rozszerzenia plików",
    sizeError:     "jest za duży, maksymalny rozmiar pliku to",
    minSizeError:  "jest za mały, minimalny rozmiar pliku",
    emptyErrorText: "jest pusty, wybierz ponownie wszystkie potrzebne pliki poza tym jednym",
    onLeave:     "Pliki są pobierane, jeśli teraz opuścisz stronę, upload zostanie anulowany"
  },
  dropLabel:       "Wrzuć tutaj pliki do przesłania (tylko",
  buttonLabel:    "Prześlij jeden lub wiecęj plików lub archiwum zip (tylko",
  uploadErrorText:  "Plik z ID nie został dodany, bądź został już przesłany lub usunięty",
  loadingText:    "z"
}

/* RATE js */ 
var label_rateJs={
  "code0":"Nota",
  "code1":"Nie jesteś zarejestrowany? ",
  "code2":"Zarejestruj się teraz ",
  "code3":"Jeśli masz już konto, zaloguj się proszę w formularzu po prawej."
};
/* FRIEND */
var label_friend_js={"amico":"znajomy","amici":"znajomi"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"Aby się zarejestrować musisz zaakceptować warunki przetwarzania danych osobowych. "};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Nickname jest wymagany"};
var label_ctr_user_edit_textLenght_2={"code0":"Pole Miasto jest obowiązkowe"};
var label_ctr_user_edit_is_selected_3={"code0":"Wybierz państwo"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Nieprawidłowy adres URL"};
var label_ctr_user_edit_checklogin_7={"code2":"Twoja nazwa użytkownika musi zawierać od 1 do 20 znaków.","code1":"Nazwa już używana przez innego użytkownika, wybierz inną nazwę","code0":"Niepoprawne znaki."};
var label_ctr_user_edit_textLenght_8={"code0":"Hasło jest polem wymaganym i musi zawierać od 4 do 20 znaków."};
var label_ctr_user_edit_passwdCheck_9={"code1":"Wpisz hasło ponownie dla potwierdzenia.","code0":"Podanie hasła jest wymagane"};
var label_ctr_user_edit_textLenght_10={"code0":"Imię jest wymagane"};
var label_ctr_user_edit_textLenght_11={"code0":"Nazwisko jest wymagane"};
var label_ctr_user_edit_checkEmail_12={"code1":"podany email jest już w naszej bazie danych","code0":"Email jest nieprawidłowy"};
var label_ctr_user_edit_is_selected_13={"code0":"Wybierz płeć"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Data urodzenia nie jest poprawna, dzień musi być pierwszą wartością "+currentTime.getFullYear()+"-01-01 i po 1910/01/01","code0":"Format daty urodzenia nie jest poprawny"};
var label_ctr_user_edit_is_checked_15={"code0":"Zaakceptuj"};
var label_ctr_user_edit_file_up_16={"code0":"Rozszerzenie pliku nieważne","code1":"Błąd: Nie można załadować pliku"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Czy na pewno chcesz usunąć tę stronę www?"};
var label_ctr_user_edit_email_msg_18={"code0":"Jeśli zmienisz ten adres email, utracisz uprawomocnienie i zapis do newslettera","code1":"Proszę czekać na przesłanie kodu weryfikacji ...","code2":"Czy na pewno chcesz usunąć ten adres emaila?","code3":"Wpisz adres email","code4":"Adres email jest już w naszej bazie danych, jeśli myślisz, że jest to nadużycie, skontaktuj się proszę z administratorem serwera na info@flxer.net","code5":"nieprawidłowy format email, spróbuj ponownie"};
var label_ctr_user_edit_location_msg_19={"code0":"Czy na pewno chcesz usunąć tę lokalizację?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"W polu Nazwa TV Show jest wymagane"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Pole Nazwa imprezy jest wymagane"};
//var label_ctr_evento_new_textLenght_2={"code0":"Pola podtytuł, jest zobowiązany"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Wybierz 1 typ"};
var label_ctr_evento_new_textLenght_3={"code0":"Nieprawidłowy znak, używaj tylko znaków numerycznych."};
var label_ctr_evento_new_textLenght_4={"code0":"Pole Opis jest wymagane i musi zawierać od 100 do 65536 znaków."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Wybierz opcję 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Pole Czas rozpoczęcia jest wymagane"};
var label_ctr_evento_new_ora_fine={"code0":"Pole Czas zakończenia jest wymagane"};
var label_ctr_evento_new_data_evento={"code0":"Nieprawidłowy format daty, proszę użyć RRRR-MM-DD"};
var label_ctr_evento_new_luogo={"code0":"Pole jest wymagane miejsce wstawić min 5, max 255 znaków"};
var label_ctr_evento_new_citta={"code0":"Pole Miasto jest wymagane wstawić min 5, max 255 znaków"};
var label_ctr_evento_new_nazione={"code0":"Wybierz 1 narodu"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Wybierz 1 narodu"};
var label_ctr_evento_new_del_perf={"code0":"Czy na pewno chcesz usunąć ten występ z imprezy?","code1":"Oczekuje potwierdzenia"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Proszę podać co najmniej 2 znaki i nie więcej niż 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Wybierz produkcyjnym 1"};
var label_ctr_evento_new_members_1={"code0":"Zdarzenie musi mieć co najmniej jedną produkcję"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"Pole Plik jest wymagane"};
var label_ctr_post_new_textLenght_1={"code0":"Tytuł footage jest wymagany!"};
var label_ctr_post_new_one_is_checked_3={"code0":"Wybierz 1 autor"};
var label_ctr_post_new_one_is_checked_4={"code0":"Wybierz 1 typ"};
var label_ctr_post_new_one_is_checked_5={"code0":"Wybierz tag obowiązkowe"};
var label_ctr_post_new_textLenght_6={"code0":"Pole Opis jest wymagane i musi zawierać od 100 do 65536 znaków."};
var label_ctr_post_new_is_checked_7={"code0":"Proszę zaakceptować warunki i zastrzeżenia"};
var label_ctr_post_new_file_up_8={"code0":"Nieważne rozszerzeniu pliku","code1":"Błąd: Nie można załadować pliku"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"Tytuł footage jest wymagany!"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Wybierz 1 autor"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Wybierz 1 typ"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Wybierz tag obowiązkowe"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"Tytuł playlisty jest wymagany"};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"Nazwa performansu jest wymagana"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Wybierz 1 typ"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Wybierz 1 Technika"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Wybierz 1 gatunku"};
var label_ctr_perf_new_textLenght_3={"code0":"Nieprawidłowy znak, używaj tylko znaków numerycznych."};
var label_ctr_perf_new_textLenght_4={"code0":"Pole Opis jest wymagane i musi zawierać od 100 do 65536 znaków."};
var label_ctr_perf_new_textLenght_5={"code0":"Pole Technical rider jest wymagane i musi zawierać od 20 do 65536 znaków."};
var label_ctr_perf_new_one_is_checked_5={"code0":"Wybierz 1 autor"};
var label_ctr_perf_new_file_up_5={"code0":"Nieważne rozszerzeniu pliku","code1":"Błąd: Nie można załadować pliku"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"Nazwa performansu jest wymagana"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Wybierz 1 typ"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Wybierz 1 Technika"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Wybierz 1 gatunku"};
var label_ctr_perf_edit_textLenght_3={"code0":"Nieprawidłowy znak, używaj tylko znaków numerycznych."};
var label_ctr_perf_edit_textLenght_4={"code0":"Pole Opis jest wymagane i musi zawierać od 100 do 65536 znaków."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Wybierz 1 autor"};
var label_ctr_perf_edit_file_up_6={"code0":"Nieważne rozszerzeniu pliku","code1":"Błąd: Nie można załadować pliku"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Rozszerzenie pliku zip jest niepoprawne","code1":"Błąd: Nie można załadować pliku","code2":"Ładowanie, proszę czekać..."};
var label_ctr_perf_edit_members_8={"code0":"Czy jesteś pewien, że chcesz usunąć tę stronę z performansu?","code1":"Oczekuje potwierdzenia","code2":"Wydajność potrzebuje co najmniej 1 autor"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Wprowadź nazwę użytkownika"};
var label_ctr_crew_textLenght_1={"code0":"Pole Nazwa Crew jest wymagane i musi zawierać od 1 do 255 znaków."};
var label_ctr_crew_textLenght_2={"code0":"Pole Miasto jest obowiązkowe"};
var label_ctr_crew_is_selected_3={"code0":"Wybierz państwo"};
var label_ctr_crew_checkWebsite_4={"code0":"Nieprawidłowy adres URL"};
var label_ctr_crew_checklogin_7={"code2":"Twoja nazwa użytkownika musi zawierać od 1 do 20 znaków.","code1":"Nazwa już używana przez innego użytkownika, wybierz inną nazwę","code0":"Niepoprawne znaki."};
var label_ctr_crew_textLenght_8={"code0":"Hasło jest polem wymaganym i musi zawierać od 4 do 20 znaków."};
var label_ctr_crew_passwdCheck_9={"code1":"Wpisz hasło ponownie dla potwierdzenia.","code0":"Podanie hasła jest wymagane"};
var label_ctr_crew_textLenght_10={"code0":"Imię jest wymagane"};
var label_ctr_crew_textLenght_11={"code0":"Nazwisko jest wymagane"};
var label_ctr_crew_checkEmail_12={"code1":"Email jest już w użyciu, kliknij tutaj, aby uzyskać hasło","code0":"Email jest nieprawidłowy"};
var label_ctr_crew_is_selected_13={"code0":"Wybierz płeć"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Data urodzenia nie jest poprawna, dzień musi być pierwszą wartością "+currentTime.getFullYear()+"-01-01 i po 1910/01/01","code0":"Nieprawidłowy format daty, proszę użyć RRRR-MM-DD"};
var label_ctr_crew_file_up_15={"code0":"Rozszerzenie pliku nieważne","code1":"Błąd: Nie można załadować pliku"};
var label_ctr_crew_members_16={"code0":"Użytkownik już dodany"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Czy na pewno chcesz usunąć tę stronę www?"};
var label_ctr_crew_member_18={"code0":"Czy na pewno chcesz usunąć tego użytkownika z grupy?","code1":"Oczekuje potwierdzenia"};
/* gallery */
var label_gallery_edit={"code0":"Czy na pewno chcesz usunąć tę galerię?","code1":"Czy na pewno chcesz usunąć tę treść?","code2":"Zapisywanie ...","code3":"Poczekaj na przygotowanie pliku ZIP"};

/* playlist */
var label_playlist_new={"code0":"Pole Plik jest wymagane","code1":"Musi być co najmniej 5 plików znajdujących się w News"};

/* preview */
var label_preview_edit={"code0":"Ładowanie pomyślnie zrealizowane","code1":"Plik musi być zakodowany w formacie H.264","code2":"Po zapisaniu pojawi się wideo, jak tylko nasze serwery zakończeniu konwersji","code3":"lub","code4":"Wybierz inny","code5":"ZAPISZ ","code6":"Nowy","code7":"Edycja miniaturki "};
/* window */
var label_window_ok_btn="Zamknij ";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
  "code0":"Wybierz dzień",
  "code1":"Wybierz narodowość",
  "code2":"Podaj telefon",
  "code3":"Wybierz datę przyjazdu",
  "code4":"Wybierz datę wyjazdu",
  "code5":"co najmniej jeden artysta musi być obecny"
};
