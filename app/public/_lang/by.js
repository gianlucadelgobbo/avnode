var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Для гэтых матэр\'ялаў патрабны JavaScript i Adobe Flash Player.";

var label_multiple_fields_add="Дадаць";
var label_multiple_fields_del="Выдаліць";
var label_multiple_fields_edit="Змяніць";

var label_checkPostForumData={
  "code0":"Выберыце катэгорыю, у якой хочаце апублікаваць гэты пост",
  "code1":"Выберыце мову відэаматэр\'ялаў",
  "code2":"Дадайце назву",
  "code3":"Дадайце тэкст",
  "code4":"Тэкст не можа быць больш за 7000 знакаў"
};
var label_fillCommentArea={"code0":"напісў"};
/* LABEL UPLOADER */
var uploaderS = {
  messages:  {
    typeError:     "мае неправільны фармат. Дазваляюцца толькі гэтыя фарматы:",
    sizeError:     "занадта вялікі. Максімальны памер файла -",
    minSizeError:  "занадта маленькі. Мінімальны памер файла -",
    emptyErrorText: "пусты. Калі ласка, яшчэ раз выберыце ўсе неабходныя файлы, акрамя гэтага",
    onLeave:     "Ідзе загрузка. Калі закроеце старонку - загрузка будзе адмененая."
  },
  dropLabel:       "Перацягніце сюды файлы, якія хочаце загрузіць (толькі ў фармаце",
  buttonLabel:    "Загрузіце файл (толькі ў фармаце",
  uploadErrorText:  "Гэты файл не быў дадазены, альбо яго загрузка ўжо адбылася ці была адмененая",
  loadingText:    "з"
}
var uploaderM = {
  messages:  {
    typeError:     "мае неправільны фармат. Дазваляюцца толькі гэтыя фарматы:",
    sizeError:     "занадта вялікі. Максімальны памер файла -",
    minSizeError:  "занадта маленькі. Мінімальны памер файла -",
    emptyErrorText: "пусты. Калі ласка, яшчэ раз выберыце ўсе неабходныя файлы, акрамя гэтага",
    onLeave:     "Ідзе загрузка. Калі закроеце старонку - загрузка будзе адмененая."
  },
  dropLabel:       "Перацягніце сюды файлы, якія хочаце загрузіць (толькі ў фармаце",
  buttonLabel:    "Загрузіце адзін, альбо некалькі файлаў у zip-архіве (толькі ў фарматах",
  uploadErrorText:  "Гэты файл не быў дадазены, альбо яго загрузка ўжо адбылася ці была адмененая",
  loadingText:    "з"
}

/* RATE js */ 
var label_rateJs={
  "code0":"Адзначыць",
  "code1":"Вы яшчэ не зарэгістраваліся?",
  "code2":"Зарэгіструйцеся зараз",
  "code3":"Калі ў вас ужо ёсць акаунт, калі ласка, увайдзіце праз форму справа"
};
/* FRIEND */
var label_friend_js={"amico":"сябар","amici":"сябры"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"Каб зарэгістравацца, неабходна прыняць пагадненне аб умовах апрацоўкі вашых асабістых дадзеных"};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Поле Нікнэйм\" - абавязковае\""};
var label_ctr_user_edit_textLenght_2={"code0":"Поле Горад\" - абавязковае\""};
var label_ctr_user_edit_is_selected_3={"code0":"Выберыце краіну"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Неправільны URL"};
var label_ctr_user_edit_checklogin_7={"code2":"Імя карыстальніка можа мець ад 1 да 20 знакаў","code1":"Такое імя карыстальніка ўжо нехта мае. Калі ласка, выберыце іншае","code0":"Недазволеныя сімвалы"};
var label_ctr_user_edit_textLenght_8={"code0":"Поле пароль\" з\'яўляецца абавязковым і павінна мець ад 4 да 20 знакаў\""};
var label_ctr_user_edit_passwdCheck_9={"code1":"Упішыце пароль яшчэ раз, каб падцвердзіць яго","code0":"Поле Пароль\" з\'яўляецца абавязковым.\""};
var label_ctr_user_edit_textLenght_10={"code0":"Поле Імя\" з\'яўляецца абавязковым\""};
var label_ctr_user_edit_textLenght_11={"code0":"Поле Прозвішча\" з\'яўляецца абавязковым\""};
var label_ctr_user_edit_checkEmail_12={"code1":"Гэты адрас ужо ёсць у нашай базе","code0":"Неправільны email"};
var label_ctr_user_edit_is_selected_13={"code0":"Калі ласка, пазначце свой пол"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Дата нараджэння ў неправільным фармаце. Спачатку трэба пазначыць дзень "+currentTime.getFullYear()+"-01-01 і пасля 1910/01/01","code0":"Фармат даты нараджэння неправільны"};
var label_ctr_user_edit_is_checked_15={"code0":"Калі ласка, прыміце"};
var label_ctr_user_edit_file_up_16={"code0":"Фармат файла не падыходзіць","code1":"Памылка: немагчыма загрузіць файл"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Вы сапраўды хочаце выдаліць гэты сайт?"};
var label_ctr_user_edit_email_msg_18={"code0":"Калі вы зменіце гэты электронны адрас, то згубіце валідацыю вашага адраса і падпіскі на рассылкі.","code1":"Пачакайце, калі ласка. Адпраўляем код для падцверджання.","code2":"Вы сапраўды хочаце выдаліць гэты электронны адрас?","code3":"Упішыце email","code4":"Гэты адрас ужо ў нашай базе. Калі вы лічаце, што гэта можа быць звязана з махлярствам, калі ласка, напішыце адміністратару сервена на info@flxer.net","code5":"неправільны фармат email. Калі ласка, паспрабуйце яшчэ раз"};
var label_ctr_user_edit_location_msg_19={"code0":"Вы сапраўды хочаце выдаліць гэтае месца?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"Назва галіне тэлебачання Паказаць патрабуецца"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Поле Назва падзеі патрабуецца"};
//var label_ctr_evento_new_textLenght_2={"code0":"Поле падзей субтытраў патрабуецца"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Абярыце 1 тыпу"};
var label_ctr_evento_new_textLenght_3={"code0":"Недазволены сімвал. Калі ласка, карыстайцеся толькі лічбамі."};
var label_ctr_evento_new_textLenght_4={"code0":"Поле Апісанне з\'яўляецца абавязковым і павінна мець ад 100 да 65536 знакаў."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Выберыце варыянт 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Поле Час пачатку патрабуецца"};
var label_ctr_evento_new_ora_fine={"code0":"Поле Час заканчэння патрабуецца"};
var label_ctr_evento_new_data_evento={"code0":"Неправільны фармат даты. Калі ласка, пазначце яе ў фармаце ГГГГ-ММ-ДД"};
var label_ctr_evento_new_luogo={"code0":"Месца поле з\'яўляецца абавязковым ўставіць мін 5, макс 255 знакаў"};
var label_ctr_evento_new_citta={"code0":"Горад поле з\'яўляецца абавязковым ўставіць мін 5, макс 255 знакаў"};
var label_ctr_evento_new_nazione={"code0":"Выбераце адзін народ"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Выбераце адзін народ"};
var label_ctr_evento_new_del_perf={"code0":"Вы сапраўды жадаеце выдаліць гэты прадукцыйнасці ад мерапрыемства?","code1":"Чакаем падцверджання"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Калі ласка, увядзіце не менш 2 сімвалаў і не больш за 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Вылучыце 1 вытворчасці"};
var label_ctr_evento_new_members_1={"code0":"Мерапрыемства павінна мець па крайняй меры адно вытворчасць"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"Поле Файл\" з\'яўляецца абавязковым\""};
var label_ctr_post_new_textLenght_1={"code0":"Поле Назва відэа\" з\'яўляецца абавязковым\""};
var label_ctr_post_new_one_is_checked_3={"code0":"Абярыце 1 аўтарам"};
var label_ctr_post_new_one_is_checked_4={"code0":"Абярыце 1 тыпу"};
var label_ctr_post_new_one_is_checked_5={"code0":"Абярыце тэгі абавязковым"};
var label_ctr_post_new_textLenght_6={"code0":"Поле Апісанне з\'яўляецца абавязковым і павінна мець ад 100 да 65536 знакаў."};
var label_ctr_post_new_is_checked_7={"code0":"Калі ласка, пагадзіцеся з умовамі і тэрмінамі"};
var label_ctr_post_new_file_up_8={"code0":"Неправільны фармат файла","code1":"Памылка: немагчыма загрузіць файл"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"Поле Назва відэа\" з\'яўляецца абавязковым\""};
var label_ctr_post_edit_one_is_checked_3={"code0":"Абярыце 1 аўтарам"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Абярыце 1 тыпу"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Абярыце тэгі абавязковым"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"Поле Назва плэйліста\" з\'яўляецца абавязковым\""};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"Поле Назва перформанса\" з\'яўляецца абавязковым\""};
var label_ctr_perf_new_one_is_checked_2={"code0":"Абярыце 1 тыпу"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Абярыце 1 Тэхніка"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Выбераце адзін жанр"};
var label_ctr_perf_new_textLenght_3={"code0":"Недазволены сімвал. Калі ласка, карыстайцеся толькі лічбамі."};
var label_ctr_perf_new_textLenght_4={"code0":"Поле Апісанне з\'яўляецца абавязковым і павінна мець ад 100 да 65536 знакаў."};
var label_ctr_perf_new_textLenght_5={"code0":"Поле Тэхнічны райдэр\" з\'яўляецца абавязковым і павінна мець ад 20 да 65536 знакаў.\""};
var label_ctr_perf_new_one_is_checked_5={"code0":"Абярыце 1 аўтарам"};
var label_ctr_perf_new_file_up_5={"code0":"Неправільны фармат файла","code1":"Памылка: немагчыма загрузіць файл"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"Поле Назва перформанса\" з\'яўляецца абавязковым\""};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Абярыце 1 тыпу"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Абярыце 1 Тэхніка"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Выбераце адзін жанр"};
var label_ctr_perf_edit_textLenght_3={"code0":"Недазволены сімвал. Калі ласка, карыстайцеся толькі лічбамі."};
var label_ctr_perf_edit_textLenght_4={"code0":"Поле Апісанне з\'яўляецца абавязковым і павінна мець ад 100 да 65536 знакаў."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Абярыце 1 аўтарам"};
var label_ctr_perf_edit_file_up_6={"code0":"Неправільны фармат файла","code1":"Памылка: немагчыма загрузіць файл"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Неправільнае пашырэнне .zip файла","code1":"Памылка: немагчыма загрузіць файл","code2":"Калі ласка, пачакайце загрузкі"};
var label_ctr_perf_edit_members_8={"code0":"Вы сапраўды хочаце выдаліць гэтага аўтара са спісу аўтараў перформанса?","code1":"Чакаем падцверджання","code2":"Прадукцыйнасці неабходна па крайняй меры адзін аўтар"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Упішыце сваё імя"};
var label_ctr_crew_textLenght_1={"code0":"Поле Назва каманды з\'яўляецца абавязковым і павінна мець ад 1 да 255 знакаў."};
var label_ctr_crew_textLenght_2={"code0":"Поле Горад\" - абавязковае\""};
var label_ctr_crew_is_selected_3={"code0":"Выберыце краіну"};
var label_ctr_crew_checkWebsite_4={"code0":"Неправільны URL"};
var label_ctr_crew_checklogin_7={"code2":"Імя карыстальніка можа мець ад 1 да 20 знакаў","code1":"Такое імя карыстальніка ўжо нехта мае. Калі ласка, выберыце іншае","code0":"Недазволеныя сімвалы"};
var label_ctr_crew_textLenght_8={"code0":"Поле пароль\" з\'яўляецца абавязковым і павінна мець ад 4 да 20 знакаў\""};
var label_ctr_crew_passwdCheck_9={"code1":"Упішыце пароль яшчэ раз, каб падцвердзіць яго","code0":"Поле Пароль\" з\'яўляецца абавязковым.\""};
var label_ctr_crew_textLenght_10={"code0":"Поле Імя\" з\'яўляецца абавязковым\""};
var label_ctr_crew_textLenght_11={"code0":"Поле Прозвішча\" з\'яўляецца абавязковым\""};
var label_ctr_crew_checkEmail_12={"code1":"Такі email ужо выкарыстоўваецца, калі ласка, націсніце тут, каб атрымаць свой пароль","code0":"Неправільны email"};
var label_ctr_crew_is_selected_13={"code0":"Калі ласка, пазначце свой пол"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Дата нараджэння ў неправільным фармаце. Спачатку трэба пазначыць дзень "+currentTime.getFullYear()+"-01-01 і пасля 1910/01/01","code0":"Неправільны фармат даты. Калі ласка, пазначце яе ў фармаце ГГГГ-ММ-ДД"};
var label_ctr_crew_file_up_15={"code0":"Фармат файла не падыходзіць","code1":"Памылка: немагчыма загрузіць файл"};
var label_ctr_crew_members_16={"code0":"Карыстальнік ужо дададзены"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Вы сапраўды хочаце выдаліць гэты сайт?"};
var label_ctr_crew_member_18={"code0":"Вы сапраўды хочаце выдаліць гэтага ўдзельніка з групы?","code1":"Чакаем падцверджання"};
/* gallery */
var label_gallery_edit={"code0":"Вы сапраўды хочаце выдаліць гэту галерэю?","code1":"Вы сапраўды хочаце выдаліць гэтыя матэр\'ялы?","code2":"Захаванне...","code3":"Пачакайце падрыхтоўкі ZIP архіва"};

/* playlist */
var label_playlist_new={"code0":"Поле Файл\" з\'яўляецца абавязковым\"","code1":"Там павінна быць не менш за 5 файлаў, знойдзеных у Футажи"};

/* preview */
var label_preview_edit={"code0":"Загрузка паспяхова выкананы","code1":"Ваш файл павінен быць у кадоўцы H.264","code2":"Пасля захавання вы ўбачыце відэа, як толькі нашы серверы будзе скончана пераўтварэнне","code3":"або","code4":"Выберыце іншы","code5":"ЗАХАВАЦЬ","code6":"Новыя\\","code7":"Рэдагаваць мініятуры"};
/* window */
var label_window_ok_btn="Закрыць ";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
  "code0":"Выберыце дзень",
  "code1":"Выберыце грамадзянства",
  "code2":"Упішыце тэлефон",
  "code3":"Выберыце дату прыезду",
  "code4":"Выберыце дату ад\'езду",
  "code5":"па меншай меры, адзін мастак павінен прысутнічаць"
};
