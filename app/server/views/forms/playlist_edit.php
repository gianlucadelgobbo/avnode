<div class="cntTitPalette">
	<div class="left">
		<h3><? echo($this->getLabel("Modifica")); echo(isset($_POST['title']) ? ": ".$_POST['title'] : $this->getLabel("Playlist")); ?></h3>
	</div>
	<div class="right new">			
	<? if($_POST['public'][0]==1){ ?>
		<a href="/<? echo($this->community->getPermalinkStr($_POST['uid'],"soggetti")."/playlists/".$this->community->getPermalinkStr($_GET['playlistid'],"playlist")); ?>/" class="right"><? echo($this->getLabel("Mostra")); ?></a>
	<? } ?>	&nbsp;		
	</div>
	<br class="myClear" />
</div>
<form method="post" name="playlist_edit" id="playlist_edit" action="<? echo($_SERVER['PHP_SELF']); ?>?<? echo($_SERVER['QUERY_STRING']); ?>" enctype="multipart/form-data">
	<div class="boxFormFull">
 		<label id="label_title" for="title">
  			<? echo($this->getLabel("Titolo Playlist")) ?>&nbsp;*&nbsp;
  			<a class="info" href="#">
				<img src="/_images/tip_small.png" border="0" alt="show tips"/>
				<span class="infobox"><? echo($this->getLabel("Titolo Playlist infobox")) ?></span>
  			</a>
 		</label><br/>
		<input type="text" name="title" id="title" class="textfields" value="<? echo(isset($_POST['title']) ? $_POST['title'] : ""); ?>" maxlength="255" onfocus="clearError(this)" />
		<br class="myClear" />
	</div>
	<div class="boxFormFull">
		<div class="formSpacer">
			<h3><? echo($this->getLabel("Post")) ?></h3>
		</div>
		<div id="lista">	
		<?
			$_GET['id'] = $_GET['playlistid'];
			$tmp = $this->community->writeListaPostAjax("playlist","/footage/","footage");
			echo($tmp[0]);
		?>	
		</div>
		<br class="myClear" />
	</div>
	<div class="boxFormFull">			
		<label id="label_public" for="public"><input type="checkbox" name="public" id="public" class="radio" value="1" <? echo($_POST['public']=="1" ? " checked=\"checked\"" : ""); ?>  onchange="clearErrors(this)"/> <? echo($this->getLabel("Visibile a tutti gli utenti")) ?></label><br/>
	</div>
	<div class="boxFormSubmit">
		<input type="submit" name="submit_playlist_edit" id="submit_playlist_edit" value="<? echo($this->getLabel("Salva")) ?>" onclick="return validate_playlist_edit(this);" class="pulsBig" />
		<input type="submit" name="delete_playlist_edit" id="delete_playlist_edit" value="<? echo($this->getLabel("Cancella")) ?>" onclick="return deletePlaylist(<? echo($idPlaylist); ?>);" class="pulsBig" />
	</div>
</form>
