var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Эти материалы требуют Javascript и Adobe Flash Player.";

var label_multiple_fields_add="Добавить";
var label_multiple_fields_del="Удалить";
var label_multiple_fields_edit="Изменить";

var label_checkPostForumData={
	"code0":"Выберите категорию, к которую вы хотите поместить сообщение.",
	"code1":"Выберите язык видеоматериалов",
	"code2":"Введите название",
	"code3":"Введите текст.",
	"code4":"Текст не должен превышать 7000 символов"
};
var label_fillCommentArea={"code0":"пишет"};
/* LABEL UPLOADER */
var uploaderS = {
	messages:	{
   		typeError: 		"неправильное расширение. Допустимы только эти форматы:",
		sizeError: 		"слишком большой. Максимальный размерфайла -",
		minSizeError:	"слишком маленький. Минимальный размер файла -",
		emptyErrorText: "пуст. Пожалуйста, выберите файлы ещё раз, не включая этот",
		onLeave: 		"Идёт загрузка файлов. Если вы закроете страницу - загрузка не состоится."	
	}, 
	dropLabel: 			"Перетащите сюда файлы для загрузки (допустимы: ",
	buttonLabel:		"Загрузите файл (допустимы: ",
	uploadErrorText:	"Данный файл не был добавлен, либо был загружен ранее или отменён",
	loadingText:		"от"
}
var uploaderM = {
	messages:	{
   		typeError: 		"неправильное расширение. Допустимы только эти форматы:",
		sizeError: 		"слишком большой. Максимальный размерфайла -",
		minSizeError:	"слишком маленький. Минимальный размер файла -",
		emptyErrorText: "пуст. Пожалуйста, выберите файлы ещё раз, не включая этот",
		onLeave: 		"Идёт загрузка файлов. Если вы закроете страницу - загрузка не состоится."	
	}, 
	dropLabel: 			"Перетащите сюда файлы для загрузки (допустимы: ",
	buttonLabel:		"Загрузите один или несколько файлов, или zip-архив (допустимы: ",
	uploadErrorText:	"Данный файл не был добавлен, либо был загружен ранее или отменён",
	loadingText:		"от"
}

/* RATE js */ 
var label_rateJs={
	"code0":"Оценить",
	"code1":"Вы не зарегистрированы?",
	"code2":"Зарегистрируйтесь сейчас",
	"code3":"Если вы уже зарегистрированы, пожалуйста, войдите в систему, воспользовавшись формой справа."
};
/* FRIEND */
var label_friend_js={"amico":"друг","amici":"друзья"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"чтобы зарегистрироваться, необходимо принять соглашение об условиях обработки ваших личных данных."};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Поле Ник\" является обязательным\""};
var label_ctr_user_edit_textLenght_2={"code0":"Поле Город\" является обязательным\""};
var label_ctr_user_edit_is_selected_3={"code0":"Выберите страну"};
var label_ctr_user_edit_checkWebsite_4={"code0":"Неправильный URL"};
var label_ctr_user_edit_checklogin_7={"code2":"Имя пользователя может содержать от 1 до 20 символов.","code1":"Такое имя пользователя уже используется кем-то другим, выберите, пожалуйста, другое имя","code0":"Недопустимые символы."};
var label_ctr_user_edit_textLenght_8={"code0":"Поле пароль\" является обязательным и должно содержать от 4 до 20 символов.\""};
var label_ctr_user_edit_passwdCheck_9={"code1":"Введите пароль ещё раз для его подтверждения.","code0":"Поле Пароль\" является обязательным\""};
var label_ctr_user_edit_textLenght_10={"code0":"Поле Имя\" является обязательным\""};
var label_ctr_user_edit_textLenght_11={"code0":"Поле Фамилия\" является обязательным\""};
var label_ctr_user_edit_checkEmail_12={"code1":"этот email уже в нашей базе данных","code0":"этот email неправильный"};
var label_ctr_user_edit_is_selected_13={"code0":"Пожалуйста, укажите пол"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Дата рождения в неправильном формате, укажите сначала день "+currentTime.getFullYear()+"-01-01 и после 1910/01/01","code0":"Формат даты рождения неправильный"};
var label_ctr_user_edit_is_checked_15={"code0":"Пожалуйста, примите"};
var label_ctr_user_edit_file_up_16={"code0":"Формат изображения не подходит","code1":"Ошибка: не удается загрузить файл"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Вы уверены, что хотите удалить этот сайт?"};
var label_ctr_user_edit_email_msg_18={"code0":"Если вы измените этот адрес электронной почты, вы потеряете подписку на информационную рассылку и вам придётся заново пройти процедуру валидации адреса","code1":"Пожалуйста, подождите. Отправляем код подтверждения...","code2":"Вы уверены, что хотите удалить этот адрес?","code3":"Введите email","code4":"Этот адрес уже находится в нашей базе данных. Если вы думаете, что это связано с мошенничеством, пожалуйста, напишите на info@flxer.net","code5":"неправильный формат email. Пожалуйста, попробуйте еще раз"};
var label_ctr_user_edit_location_msg_19={"code0":"Вы уверены, что хотите удалить это место?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"Название области телевидения Показать требуется"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Поле Название события требуется"};
//var label_ctr_evento_new_textLenght_2={"code0":"Поле событий субтитров требуется"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Выберите 1 типа"};
var label_ctr_evento_new_textLenght_3={"code0":"Недопустимый символ. Пожалуйста, используйте только цифры"};
var label_ctr_evento_new_textLenght_4={"code0":"Поле Описание является обязательным и должно содержать от 100 до 65536 символов."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Выберите 1 вариант"};
var label_ctr_evento_new_ora_inizio={"code0":"Поле Время начала требуется"};
var label_ctr_evento_new_ora_fine={"code0":"Поле Время окончания требуется"};
var label_ctr_evento_new_data_evento={"code0":"Неправильный формат даты, пожалуйста, введите её в формате ГГГГ-ММ-ДД"};
var label_ctr_evento_new_luogo={"code0":"Место поле является обязательным вставить мин 5, макс 255 символов"};
var label_ctr_evento_new_citta={"code0":"Город поле является обязательным вставить мин 5, макс 255 символов"};
var label_ctr_evento_new_nazione={"code0":"Выберите один народ"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Выберите один народ"};
var label_ctr_evento_new_del_perf={"code0":"Вы действительно хотите удалить этот производительности от мероприятия?","code1":"Ожидаем подтверждения"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Пожалуйста, введите не менее 2 символов и не более 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Выберите 1 производства"};
var label_ctr_evento_new_members_1={"code0":"Мероприятие должно иметь по крайней мере одно производство"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"Поле Файл\" является обязательным\""};
var label_ctr_post_new_textLenght_1={"code0":"Поле Название видео\" является обязательным\""};
var label_ctr_post_new_one_is_checked_3={"code0":"Выберите 1 автором"};
var label_ctr_post_new_one_is_checked_4={"code0":"Выберите 1 типа"};
var label_ctr_post_new_one_is_checked_5={"code0":"Выберите теги обязательным"};
var label_ctr_post_new_textLenght_6={"code0":"Поле Описание является обязательным и должно содержать от 100 до 65536 символов."};
var label_ctr_post_new_is_checked_7={"code0":"Примите соглашение о сроках и условиях"};
var label_ctr_post_new_file_up_8={"code0":"Неправильное расширение файла","code1":"Ошибка: не удается загрузить файл"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"Поле Название видео\" является обязательным\""};
var label_ctr_post_edit_one_is_checked_3={"code0":"Выберите 1 автором"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Выберите 1 типа"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Выберите теги обязательным"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"Поле Название плейлиста\" является обязательным\""};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"Поле Название перформанса\" является обязательным\""};
var label_ctr_perf_new_one_is_checked_2={"code0":"Выберите 1 типа"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Выберите 1 Техника"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Выберите один жанр"};
var label_ctr_perf_new_textLenght_3={"code0":"Недопустимый символ. Пожалуйста, используйте только цифры"};
var label_ctr_perf_new_textLenght_4={"code0":"Поле Описание является обязательным и должно содержать от 100 до 65536 символов."};
var label_ctr_perf_new_textLenght_5={"code0":"Поле Технический райдер\" является обязательным и должно содержать от 20 до 65536 символов.\""};
var label_ctr_perf_new_one_is_checked_5={"code0":"Выберите 1 автором"};
var label_ctr_perf_new_file_up_5={"code0":"Неправильное расширение файла","code1":"Ошибка: не удается загрузить файл"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"Поле Название перформанса\" является обязательным\""};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Выберите 1 типа"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Выберите 1 Техника"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Выберите один жанр"};
var label_ctr_perf_edit_textLenght_3={"code0":"Недопустимый символ. Пожалуйста, используйте только цифры"};
var label_ctr_perf_edit_textLenght_4={"code0":"Поле Описание является обязательным и должно содержать от 100 до 65536 символов."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Выберите 1 автором"};
var label_ctr_perf_edit_file_up_6={"code0":"Неправильное расширение файла","code1":"Ошибка: не удается загрузить файл"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Неправильное расширение Zip файла","code1":"Ошибка: не удается загрузить файл","code2":"Пожалуйста, дождитесь загрузки"};
var label_ctr_perf_edit_members_8={"code0":"Вы действительно хотите удалить этого автора?","code1":"Ожидаем подтверждения","code2":"Производительности необходимо по крайней мере один автор"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Введите ваше имя"};
var label_ctr_crew_textLenght_1={"code0":"Поле Название команды является обязательным и должно содержать от 1 до 255 символов."};
var label_ctr_crew_textLenght_2={"code0":"Поле Город\" является обязательным\""};
var label_ctr_crew_is_selected_3={"code0":"Выберите страну"};
var label_ctr_crew_checkWebsite_4={"code0":"Неправильный URL"};
var label_ctr_crew_checklogin_7={"code2":"Имя пользователя может содержать от 1 до 20 символов.","code1":"Такое имя пользователя уже используется кем-то другим, выберите, пожалуйста, другое имя","code0":"Недопустимые символы."};
var label_ctr_crew_textLenght_8={"code0":"Поле пароль\" является обязательным и должно содержать от 4 до 20 символов.\""};
var label_ctr_crew_passwdCheck_9={"code1":"Введите пароль ещё раз для его подтверждения.","code0":"Поле Пароль\" является обязательным\""};
var label_ctr_crew_textLenght_10={"code0":"Поле Имя\" является обязательным\""};
var label_ctr_crew_textLenght_11={"code0":"Поле Фамилия\" является обязательным\""};
var label_ctr_crew_checkEmail_12={"code1":"Такой email уже используется, пожалуйста, нажмите здесь, чтобы получить ваш пароль","code0":"этот email неправильный"};
var label_ctr_crew_is_selected_13={"code0":"Пожалуйста, укажите пол"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Дата рождения в неправильном формате, укажите сначала день "+currentTime.getFullYear()+"-01-01 и после 1910/01/01","code0":"Неправильный формат даты, пожалуйста, введите её в формате ГГГГ-ММ-ДД"};
var label_ctr_crew_file_up_15={"code0":"Формат изображения не подходит","code1":"Ошибка: не удается загрузить файл"};
var label_ctr_crew_members_16={"code0":"Участник уже добавлен"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Вы уверены, что хотите удалить этот сайт?"};
var label_ctr_crew_member_18={"code0":"Вы уверены, что хотите удалить этого пользователя из группы?","code1":"Ожидаем подтверждения"};
/* gallery */
var label_gallery_edit={"code0":"Вы уверены, что хотите удалить эту галерею?","code1":"Вы уверены, что хотите удалить эти материалы?","code2":"Сохранение...","code3":"Дождитесь подготовки ZIP файла"};

/* playlist */
var label_playlist_new={"code0":"Поле Файл\" является обязательным\"","code1":"Там должно быть не менее 5 файлов, найденных в Футажи"};

/* preview */
var label_preview_edit={"code0":"Загрузка успешно выполнены","code1":"Ваш файл должен быть в кодировке H.264","code2":"После сохранения вы увидите видео, как только наши серверы будет закончено преобразование","code3":"или","code4":"Выбрать другое","code5":"СОХРАНИТЬ","code6":"Новые","code7":"Редактировать миниатюры"};
/* window */
var label_window_ok_btn="Закрыть";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
	"code0":"Выберите день",
	"code1":"Выберите гражданство",
	"code2":"Введите телефон",
	"code3":"Выберите дату приезда",
	"code4":"Выберите дату возвращения",
	"code5":"по крайней мере, один художник должен присутствовать"
};
