var currentTime = new Date();
/* LABEL IN SCRIPT */
var flashErrMess = "Ce contenu nécessite JAVASCRIPT et Adobe Flash Player.";

var label_multiple_fields_add="Ajouter";
var label_multiple_fields_del="Annuler ";
var label_multiple_fields_edit="Modifier ";

var label_checkPostForumData={
  "code0":"Sélectionnez la catégorie dans laquelle envoyer le message ",
  "code1":"Sélectionnez la langue pour le footage",
  "code2":"Entrez le titre. ",
  "code3":"Entrez un texte.",
  "code4":"Le texte ne devrait pas dépasser 7000 caractères"
};
var label_fillCommentArea={"code0":"a écrit "};
/* LABEL UPLOADER */
var uploaderS = {
  messages:  {
       typeError:     "a une extension invalide. Celles qui suivent sont les seules extensions permis",
    sizeError:     "est trop grand, la taille par fichier dois être un maximum de",
    minSizeError:  "est trop petit, la taille par fichier dois être un minimum de ",
    emptyErrorText: "est vide, s\'il vous plaît sélectionner à nouveau tous les fichiers nécessaires, sauf celui-ci",
    onLeave:     "Le téléchargement des fichiers est en cours, si vous quittez maintenant le téléchargement sera annulé"
  },
  dropLabel:       "Déposer ici les fichiers à télécharger (seulement ",
  buttonLabel:    "Télécharger un fichier (seulement ",
  uploadErrorText:  "Le fichier avec le ID n\'est pas été ajouté, ou il a déjà été téléchargé ou supprimé",
  loadingText:    "de"
}
var uploaderM = {
  messages:  {
       typeError:     "a une extension invalide. Celles qui suivent sont les seules extensions permis",
    sizeError:     "est trop grand, la taille par fichier dois être un maximum de",
    minSizeError:  "est trop petit, la taille par fichier dois être un minimum de ",
    emptyErrorText: "est vide, s\'il vous plaît sélectionner à nouveau tous les fichiers nécessaires, sauf celui-ci",
    onLeave:     "Le téléchargement des fichiers est en cours, si vous quittez maintenant le téléchargement sera annulé"
  },
  dropLabel:       "Déposer ici les fichiers à télécharger (seulement ",
  buttonLabel:    "Télécharger un ou plusieurs fichiers ou une archive zip (seulement ",
  uploadErrorText:  "Le fichier avec le ID n\'est pas été ajouté, ou il a déjà été téléchargé ou supprimé",
  loadingText:    "de"
}

/* RATE js */ 
var label_rateJs={
  "code0":"Votez-vous",
  "code1":"N\'êtes-vous pas enregistré? ",
  "code2":"inscrivez-vous",
  "code3":"Si vous êtes déjà inscrit, vous devez vous identifier dans la fiche sur la droite."
};
/* FRIEND */
var label_friend_js={"amico":"ami","amici":"amis"};
/* USER REGISTER */
var label_ctr_user_edit_is_checked_0={"code0":"Pour vous inscrire, vous devez accepter les termes concernant le traitement des données personnelles. "};
/* USER EDIT */

var label_ctr_user_edit_textLenght_1={"code0":"Le champ Nom d\'Utilisateur est requis"};
var label_ctr_user_edit_textLenght_2={"code0":"Le champ Ville est requis"};
var label_ctr_user_edit_is_selected_3={"code0":"Sélectionnez votre Pays"};
var label_ctr_user_edit_checkWebsite_4={"code0":"URL incorrecte"};
var label_ctr_user_edit_checklogin_7={"code2":"Votre nom d\'utilisateur doit contenir de 1 à 20 caractères.","code1":"Nom d\'utilisateur déjà utilisé, s\'il vous plaît choisissez un autre nom","code0":"Caractères pas valides."};
var label_ctr_user_edit_textLenght_8={"code0":"Le champ mot de passe est requis et doit contenir de 4 à 20 caractères."};
var label_ctr_user_edit_passwdCheck_9={"code1":"Entrez encore le mot de passe pour confirmation.","code0":"Le champ mot de passe est requis"};
var label_ctr_user_edit_textLenght_10={"code0":"Le champ nom est requis"};
var label_ctr_user_edit_textLenght_11={"code0":"Le champ nom de famille est requis"};
var label_ctr_user_edit_checkEmail_12={"code1":"Cette adresse e-mail est déjà dans notre base de données","code0":"Adresse e-mail pas valide"};
var label_ctr_user_edit_is_selected_13={"code0":"S\'il vous plaît indiquer le sexe"};
var label_ctr_user_edit_checkIntervalDate_14={"code1":"La date de naissance n\'est pas valide, la journée doit être la première valeur "+currentTime.getFullYear()+"-01-01 Et après 1910/01/01","code0":"Le format de la date de naissance n\'est pas valide"};
var label_ctr_user_edit_is_checked_15={"code0":"S\'il vous plaît acceptez"};
var label_ctr_user_edit_file_up_16={"code0":"Extension du fichier image pas valide","code1":"Erreur: il n\'est pas possible charger le fichier"};
var label_ctr_user_edit_websiteDeleteConfirmMsg_17={"code0":"Etes-vous sûr de vouloir supprimer ce site?"};
var label_ctr_user_edit_email_msg_18={"code0":"Si vous modifiez cette adresse email, vous perdrez la validation et le bulletin abonnements","code1":"S\'il vous plaît attendre pour envoyer le code de vérification ...","code2":"Etes-vous sûr de vouloir supprimer ce adresse e-mail?","code3":"Entrez l\'adresse e-mail","code4":"L\'email est déjà dans notre base de données, si vous pensez que ceci est un contact de fraude à l\'administrateur du serveur info@flxer.net","code5":"en utilisant l\'email erroné, s\'il vous plaît essayez de nouveau"};
var label_ctr_user_edit_location_msg_19={"code0":"Etes-vous sûr de vouloir supprimer cet emplacement?"};

/* TVSHOW */
var label_ctr_tvshow_textLenght_1={"code0":"Le champ du nom de TV Show est nécessaire"};

/* EVENTO NEW */
var label_ctr_evento_new_textLenght_1={"code0":"Champ Nom de l\'événement est requis"};
//var label_ctr_evento_new_textLenght_2={"code0":"Champ de sous-titrage de l\'événement est requis"};
var label_ctr_evento_new_one_is_selected_2={"code0":"Choisissez le type 1"};
var label_ctr_evento_new_textLenght_3={"code0":"Caractère pas valide, S\'il vous plaît utilisez uniquement des caractères numériques."};
var label_ctr_evento_new_textLenght_4={"code0":"Le champ Description est requis et doit contenir de 100 à 65536 caractères."};
var label_ctr_evento_new_one_is_selected_5={"code0":"Choisissez l\'option 1"};
var label_ctr_evento_new_ora_inizio={"code0":"Champ Heure de début est nécessaire"};
var label_ctr_evento_new_ora_fine={"code0":"Champ d\'heure de fin est nécessaire"};
var label_ctr_evento_new_data_evento={"code0":"Format de la date incorrecte, utilisez AAAA-MM-JJ"};
var label_ctr_evento_new_luogo={"code0":"Lieu de terrain est nécessaire d\'insérer min 5, max 255 caractères"};
var label_ctr_evento_new_citta={"code0":"Champ Ville est nécessaire d\'insérer min 5, max 255 caractères"};
var label_ctr_evento_new_nazione={"code0":"Choisissez une nation"};
var label_ctr_evento_new_one_is_checked_2={"code0":"Choisissez une nation"};
var label_ctr_evento_new_del_perf={"code0":"Etes-vous sûr de vouloir supprimer cette performance de l\'événement?","code1":"En attendant la confirmation"};
var label_ctr_evento_new_perf_textLenght_0={"code0":"S\'il vous plaît entrer au moins 2 caractères et pas plus de 255"};
var label_ctr_evento_new_one_is_checked_3={"code0":"Choisir 1 production"};
var label_ctr_evento_new_members_1={"code0":"L\'événement doit avoir au moins une production"};

/* POST NEW */
var label_ctr_post_new_textLenght_0={"code0":"Le champ fichier est requis"};
var label_ctr_post_new_textLenght_1={"code0":"Le champ Titre Footage est requis"};
var label_ctr_post_new_one_is_checked_3={"code0":"Choisissez 1 auteur"};
var label_ctr_post_new_one_is_checked_4={"code0":"Choisissez le type 1"};
var label_ctr_post_new_one_is_checked_5={"code0":"Choisissez une étiquette obligatoires"};
var label_ctr_post_new_textLenght_6={"code0":"Le champ Description est requis et doit contenir de 100 à 65536 caractères."};
var label_ctr_post_new_is_checked_7={"code0":"S\'il vous plaît acceptez les termes e conditions"};
var label_ctr_post_new_file_up_8={"code0":"Extension du fichier pas valide","code1":"Erreur: il n\'est pas possible charger le fichier"};
/* POST EDIT */
var label_ctr_post_edit_textLenght_1={"code0":"Le champ Titre Footage est requis"};
var label_ctr_post_edit_one_is_checked_3={"code0":"Choisissez 1 auteur"};
var label_ctr_post_edit_one_is_checked_4={"code0":"Choisissez le type 1"};
var label_ctr_post_edit_one_is_checked_5={"code0":"Choisissez une étiquette obligatoires"};
/* PLAYLIST EDIT */
var label_ctr_playlist_edit_textLenght_1={"code0":"Le champ Titre playlist est requis "};
/* PERFORMANCE NEW */
var label_ctr_perf_new_textLenght_1={"code0":"Le champ Nom performance est requis"};
var label_ctr_perf_new_one_is_checked_2={"code0":"Choisissez le type 1"};
var label_ctr_perf_new_one_is_checked_3={"code0":"Choisissez une technique"};
var label_ctr_perf_new_one_is_checked_4={"code0":"Choisissez une genre"};
var label_ctr_perf_new_textLenght_3={"code0":"Caractère pas valide, S\'il vous plaît utilisez uniquement des caractères numériques."};
var label_ctr_perf_new_textLenght_4={"code0":"Le champ Description est requis et doit contenir de 100 à 65536 caractères."};
var label_ctr_perf_new_textLenght_5={"code0":"Le champ Fiche technique est requis et doit contenir de 20 à 65536 caractères."};
var label_ctr_perf_new_one_is_checked_5={"code0":"Choisissez 1 auteur"};
var label_ctr_perf_new_file_up_5={"code0":"Extension du fichier pas valide","code1":"Erreur: il n\'est pas possible charger le fichier"};
/* PERFORMANCE EDIT */
var label_ctr_perf_edit_textLenght_1={"code0":"Le champ Nom performance est requis"};
var label_ctr_perf_edit_one_is_checked_2={"code0":"Choisissez le type 1"};
var label_ctr_perf_edit_one_is_checked_3={"code0":"Choisissez une technique"};
var label_ctr_perf_edit_one_is_checked_4={"code0":"Choisissez une genre"};
var label_ctr_perf_edit_textLenght_3={"code0":"Caractère pas valide, S\'il vous plaît utilisez uniquement des caractères numériques."};
var label_ctr_perf_edit_textLenght_4={"code0":"Le champ Description est requis et doit contenir de 100 à 65536 caractères."};
var label_ctr_perf_edit_one_is_checked_5={"code0":"Choisissez 1 auteur"};
var label_ctr_perf_edit_file_up_6={"code0":"Extension du fichier pas valide","code1":"Erreur: il n\'est pas possible charger le fichier"};
var label_ctr_perf_edit_gallery_up_7={"code0":"L\'extension de fichier .zip n\'est pas valide","code1":"Erreur: il n\'est pas possible charger le fichier","code2":"Attendez le téléchargement"};
var label_ctr_perf_edit_members_8={"code0":"Etes-vous sûr de vouloir supprimer cet auteur de la performance?","code1":"En attendant la confirmation","code2":"La performance nécessite au moins 1 auteur"};
/* CREW NEW e EDIT */
var label_ctr_crew_textLenght_0={"code0":"Entrez le nom d\'utilisateur"};
var label_ctr_crew_textLenght_1={"code0":"Le champ Nom de l\'équipe est requis et doit contenir de 1 à 255 caractères."};
var label_ctr_crew_textLenght_2={"code0":"Le champ Ville est requis"};
var label_ctr_crew_is_selected_3={"code0":"Sélectionnez votre Pays"};
var label_ctr_crew_checkWebsite_4={"code0":"URL incorrecte"};
var label_ctr_crew_checklogin_7={"code2":"Votre nom d\'utilisateur doit contenir de 1 à 20 caractères.","code1":"Nom d\'utilisateur déjà utilisé, s\'il vous plaît choisissez un autre nom","code0":"Caractères pas valides."};
var label_ctr_crew_textLenght_8={"code0":"Le champ mot de passe est requis et doit contenir de 4 à 20 caractères."};
var label_ctr_crew_passwdCheck_9={"code1":"Entrez encore le mot de passe pour confirmation.","code0":"Le champ mot de passe est requis"};
var label_ctr_crew_textLenght_10={"code0":"Le champ nom est requis"};
var label_ctr_crew_textLenght_11={"code0":"Le champ nom de famille est requis"};
var label_ctr_crew_checkEmail_12={"code1":"Adresse e-mail déjà utilisée, cliquez ici pour récupérer votre mot de passe","code0":"Adresse e-mail pas valide"};
var label_ctr_crew_is_selected_13={"code0":"S\'il vous plaît indiquer le sexe"};
var label_ctr_crew_checkIntervalDate_14={"code1":"La date de naissance n\'est pas valide, la journée doit être la première valeur "+currentTime.getFullYear()+"-01-01 Et après 1910/01/01","code0":"Format de la date incorrecte, utilisez AAAA-MM-JJ"};
var label_ctr_crew_file_up_15={"code0":"Extension du fichier image pas valide","code1":"Erreur: il n\'est pas possible charger le fichier"};
var label_ctr_crew_members_16={"code0":"Ce membre est déjà ajouté"};
var label_ctr_crew_websiteDeleteConfirmMsg_17={"code0":"Etes-vous sûr de vouloir supprimer ce site?"};
var label_ctr_crew_member_18={"code0":"Etes-vous sûr de vouloir supprimer ce membre de votre groupe?","code1":"En attendant la confirmation"};
/* gallery */
var label_gallery_edit={"code0":"Etes-vous sûr de vouloir supprimer cette galerie?","code1":"Etes-vous sûr de vouloir supprimer ce contenu?","code2":"Enregistrement ...","code3":"Attendez la préparation du fichier ZIP"};

/* playlist */
var label_playlist_new={"code0":"Le champ fichier est requis","code1":"Il doit y avoir au moins 5 fichiers trouvés dans les images"};

/* preview */
var label_preview_edit={"code0":"Chargement exécuté avec succès","code1":"Votre fichier doit être encodé en H.264","code2":"Après avoir sauvegardé, vous verrez votre vidéo dès que nos serveurs ont terminé la conversion","code3":"ou","code4":"Choisir un autre fichier","code5":"ENREGISTRER","code6":"Nouveau","code7":"Modifier vignette"};
/* window */
var label_window_ok_btn="Fermer ";
/* LPM SUBSCRIPTION 2010 */
var label_ctr_lpm_step_2={
  "code0":"Sélectionnez un jour",
  "code1":"Sélectionnez la nationalité",
  "code2":"Entrez téléphone",
  "code3":"Sélectionnez la date d\'arrivée",
  "code4":"Sélectionnez votre date de départ",
  "code5":"au moins un artiste doit être présent"
};
