var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Este contenido requiere JAVASCRIPT activado y Adobe Flash Player.";

var label_multiple_fields_add="Añadir ";
var label_multiple_fields_del="Borrar";
var label_multiple_fields_edit="Editar";

var label_checkPostForumData={
  "code0":"Selecciona la categoría en la que enviar la publicación.",
  "code1":"Selecciona el idioma por el footage",
  "code2":"Inserta el Título.",
  "code3":"Inserta el Texto",
  "code4":"El texto no debe exceder 7000 letras"
};
var label_fillCommentArea={"code0":"escribió"};
/* LABEL UPLOADER */
var uploaderS = {
  messages:  {
       typeError:     "tiene una extensión que no es válida. Estas son las solas extensiones de archivo permitidas",
    sizeError:     "es demasiado grande, el tamaño máximo del archivo es",
    minSizeError:  "es demasiado pequeño, el tamaño mínimo de archivo es",
    emptyErrorText: "está vacío, por favor, vuelva a seleccionar todos los archivos necesarios, excepto éste",
    onLeave:     "Los archivos se están cargando, si te vas ahora el upload se cancelará"
  },
  dropLabel:       "Coloque aquí los archivos que desea subir (sólo ",
  buttonLabel:    "Subir un archivo (sólo ",
  uploadErrorText:  "El archivo con el id pasado, o no se ha añadido, o ya ha sido subido o borrado",
  loadingText:    "de"
}
var uploaderM = {
  messages:  {
       typeError:     "tiene una extensión que no es válida. Estas son las solas extensiones de archivo permitidas",
    sizeError:     "es demasiado grande, el tamaño máximo del archivo es",
    minSizeError:  "es demasiado pequeño, el tamaño mínimo de archivo es",
    emptyErrorText: "está vacío, por favor, vuelva a seleccionar todos los archivos necesarios, excepto éste",
    onLeave:     "Los archivos se están cargando, si te vas ahora el upload se cancelará"
  },
  dropLabel:       "Coloque aquí los archivos que desea subir (sólo ",
  buttonLabel:    "Subir uno o varios archivos o un archivo zip (sólo ",
  uploadErrorText:  "El archivo con el id pasado, o no se ha añadido, o ya ha sido subido o borrado",
  loadingText:    "de"
}

/* RATE js */ 
var label_rateJs={
  "code0":"Vota",
  "code1":"¿Aun no estás registrado?",
  "code2":"regístrate ahora",
  "code3":"Si ya estás registrado puedes identificarte con el form a la derecha."
};
/* FRIEND */
var label_friend_js={"amico":"amigo","amici":"amigos"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"Para inscribirse es necesario aceptar los términos del tratamiento de los datos personales."};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"El campo Nickname es obligatorio "};
var label_ctr_user_edit_textLenght_2={"code0":"El campo Ciudad es obligatorio"};
var label_ctr_user_edit_is_selected_3={"code0":"Selecciona tu país"};
var label_ctr_user_edit_checkWebsite_4={"code0":"URL inválido"};
var label_ctr_user_edit_checklogin_7={"code2":"Tu nombre de usuario debe contener entre 1 y 20 letras.","code1":"Nombre de usuario ya en uso, porfavor elige otro nombre","code0":"Letras invalidas."};
var label_ctr_user_edit_textLenght_8={"code0":"El campo de contraseña es obligatorio y debe contener entre 4 y 20 letras."};
var label_ctr_user_edit_passwdCheck_9={"code1":"inserta la contraseña de nuevo para confirmar.","code0":"El campo de contraseña es obligatorio"};
var label_ctr_user_edit_textLenght_10={"code0":"El campo nombre es obligatorio"};
var label_ctr_user_edit_textLenght_11={"code0":"El apellido es obligatorio"};
var label_ctr_user_edit_checkEmail_12={"code1":"dirección de correo electronico ya registrada en nuestra base de datos","code0":"email inválida"};
var label_ctr_user_edit_is_selected_13={"code0":"Por favor selecciona el sexo"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"Fecha de nacimiento inválida, el día debe ser el primero valor "+currentTime.getFullYear()+"-01-01 y después 1910/01/01","code0":"Formato de la fecha de nacimiento inválido"};
var label_ctr_user_edit_is_checked_15={"code0":"Por favor, acepta"};
var label_ctr_user_edit_file_up_16={"code0":"Formato de la imagen inválido","code1":"Error: No se puede cargar el archivo"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"¿Estás seguro de que desea eliminar esta pagina web?"};
var label_ctr_user_edit_email_msg_18={"code0":"Si se cambia esta dirección de correo electrónico, perderás la validación y la suscripción al boletín ","code1":"Por favor esperas que el código de verificación sea enviado...","code2":"¿Estás seguro de que desea eliminar esta dirección de correo electronico?","code3":"Inserta la dirección de correo electrónico","code4":"La dirección de correo electrónico ya está en nuestra base de datos, si usted piensa que se trata de un fraude porfavor ponte en contacto con el administrador del servidor en info@flxer.net","code5":"formato de correo electrónico invalido, por favor ententa de nuevo"};
var label_ctr_user_edit_location_msg_19={"code0":"¿Estás seguro de que quieres eliminar esta location?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"El campo de nombre de programa de televisión se requiere"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Campo Nombre del evento se requiere"};
//var label_ctr_evento_new_textLenght_2={"code0":"Campo de evento subtítulo se requiere"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Elija un tipo de"};
var label_ctr_evento_new_textLenght_3={"code0":"Carácter inválido, porfavor utiliza únicamente letras numéricas."};
var label_ctr_evento_new_textLenght_4={"code0":"El campo Descripción es obligatorio y debe contener entre 100 y 65536 letras."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Elige la opción 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Campo de la hora de inicio es necesario"};
var label_ctr_evento_new_ora_fine={"code0":"Campo final se requiere tiempo"};
var label_ctr_evento_new_data_evento={"code0":"Formato de fecha incorrecto, porfavor utiliza AAAA-MM-DD"};
var label_ctr_evento_new_luogo={"code0":"Lugar de campo se requiere insertar min 5, máximo 255 caracteres"};
var label_ctr_evento_new_citta={"code0":"Campo de la ciudad es necesario insertar min 5, máximo 255 caracteres"};
var label_ctr_evento_new_nazione={"code0":"Elija un país"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Elija un país"};
var label_ctr_evento_new_del_perf={"code0":"¿Está seguro que desea eliminar esta actuación en el evento?","code1":"Pendiente de confirmación"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"Por favor, introduzca al menos 2 caracteres y no más de 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Elija una producción "};
var label_ctr_evento_new_members_1={"code0":"El evento debe tener al menos una producción"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"El campo Archivo es obligatorio"};
var label_ctr_post_new_textLenght_1={"code0":"El campo Título del Footage es necesario"};
var label_ctr_post_new_one_is_checked_3={"code0":"Elija un autor"};
var label_ctr_post_new_one_is_checked_4={"code0":"Elija un tipo de"};
var label_ctr_post_new_one_is_checked_5={"code0":"Elija una etiqueta obligatoria"};
var label_ctr_post_new_textLenght_6={"code0":"El campo Descripción es obligatorio y debe contener entre 100 y 65536 letras."};
var label_ctr_post_new_is_checked_7={"code0":"Porfavor acepta los términos y las condiciones"};
var label_ctr_post_new_file_up_8={"code0":"Formato de archivo inválido","code1":"Error: No se puede cargar el archivo"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"El campo Título del Footage es necesario"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Elija un autor"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Elija un tipo de"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Elija una etiqueta obligatoria"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"El campo Título de la Playlist es obligatorio"};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"El campo Titulo de la Actuación es obligatorio"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Elija un tipo de"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Elija una técnica de"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Elige un género"};
var label_ctr_perf_new_textLenght_3={"code0":"Carácter inválido, porfavor utiliza únicamente letras numéricas."};
var label_ctr_perf_new_textLenght_4={"code0":"El campo Descripción es obligatorio y debe contener entre 100 y 65536 letras."};
var label_ctr_perf_new_textLenght_5={"code0":"El campo Rider técnico es obligatorio y debe contener entre 20 y 65536 letras."};
var label_ctr_perf_new_one_is_checked_5={"code0":"Elija un autor"};
var label_ctr_perf_new_file_up_5={"code0":"Formato de archivo inválido","code1":"Error: No se puede cargar el archivo"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"El campo Titulo de la Actuación es obligatorio"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Elija un tipo de"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Elija una técnica de"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Elige un género"};
var label_ctr_perf_edit_textLenght_3={"code0":"Carácter inválido, porfavor utiliza únicamente letras numéricas."};
var label_ctr_perf_edit_textLenght_4={"code0":"El campo Descripción es obligatorio y debe contener entre 100 y 65536 letras."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Elija un autor"};
var label_ctr_perf_edit_file_up_6={"code0":"Formato de archivo inválido","code1":"Error: No se puede cargar el archivo"};
var label_ctr_perf_edit_gallery_up_7={"code0":"Formato del archivo .zip inválido","code1":"Error: No se puede cargar el archivo","code2":"Cargando, espera"};
var label_ctr_perf_edit_members_8={"code0":"¿Estás seguro que quieres eliminar este autor de la actuación?","code1":"Pendiente de confirmación","code2":"Las necesidades de rendimiento por lo menos un autor"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Escribe el nombre de usuario"};
var label_ctr_crew_textLenght_1={"code0":"El campo Nombre del crew es obligatorio y debe contener entre 1 y 255 letras."};
var label_ctr_crew_textLenght_2={"code0":"El campo Ciudad es obligatorio"};
var label_ctr_crew_is_selected_3={"code0":"Selecciona tu país"};
var label_ctr_crew_checkWebsite_4={"code0":"URL inválido"};
var label_ctr_crew_checklogin_7={"code2":"Tu nombre de usuario debe contener entre 1 y 20 letras.","code1":"Nombre de usuario ya en uso, porfavor elige otro nombre","code0":"Letras invalidas."};
var label_ctr_crew_textLenght_8={"code0":"El campo de contraseña es obligatorio y debe contener entre 4 y 20 letras."};
var label_ctr_crew_passwdCheck_9={"code1":"inserta la contraseña de nuevo para confirmar.","code0":"El campo de contraseña es obligatorio"};
var label_ctr_crew_textLenght_10={"code0":"El campo nombre es obligatorio"};
var label_ctr_crew_textLenght_11={"code0":"El apellido es obligatorio"};
var label_ctr_crew_checkEmail_12={"code1":"Email ya en uso, haz clic aquí para recuperar tu contraseña ","code0":"email inválida"};
var label_ctr_crew_is_selected_13={"code0":"Por favor selecciona el sexo"};
var label_ctr_crew_checkIntervalDate_14={"code1":"Fecha de nacimiento inválida, el día debe ser el primero valor "+currentTime.getFullYear()+"-01-01 y después 1910/01/01","code0":"Formato de fecha incorrecto, porfavor utiliza AAAA-MM-DD"};
var label_ctr_crew_file_up_15={"code0":"Formato de la imagen inválido","code1":"Error: No se puede cargar el archivo"};
var label_ctr_crew_members_16={"code0":"Miembro yá agregado"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"¿Estás seguro de que desea eliminar esta pagina web?"};
var label_ctr_crew_member_18={"code0":"¿Estás seguro de que deseas eliminar este miembro de tu grupo?","code1":"Pendiente de confirmación"};
/* gallery */
var label_gallery_edit={"code0":"¿Estás seguro de que quieres eliminar esta galería?","code1":"¿Estás seguro de que deseas eliminar este contenido?","code2":"Guardando ...","code3":"Espera a la preparación del archivo ZIP"};

/* playlist */
var label_playlist_new={"code0":"El campo Archivo es obligatorio","code1":"Debe haber por lo menos 5 archivos que se encuentran en las imágenes"};

/* preview */
var label_preview_edit={"code0":"Cargando ejecutado con éxito","code1":"Su archivo debe estar codificado en H.264","code2":"Después de guardar, verá el vídeo tan pronto como nuestros servidores se ha terminado la conversión","code3":"o","code4":"Elige otro","code5":"GUARDAR","code6":"Nuevo","code7":"Editar miniaturas "};
/* window */
var label_window_ok_btn="Cerrar";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
  "code0":"Seleccione un día",
  "code1":"Seleccione la nacionalidad",
  "code2":"Introduzca teléfono",
  "code3":"Seleccione la fecha de llegada",
  "code4":"Seleccionar la fecha de salida",
  "code5":"al menos un artista debe estar presente"
};
