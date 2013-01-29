	<div class="cnt">
		<div id="col1">
<?
if(!isset($_COOKIE['ALERT_COUNTRY']) && !isset($_GET['ac'])) {
 echo($this->community->scriviAlertBox()); 
}
?>
<? echo($this->community->scriviBoxPerfPrimoPiano()); ?>
			<div id="col1-1">
<?  echo($this->community->writeUltimeForum()); ?>
<?  echo($this->community->writeListaPlaylists1col()); ?>
			</div>
			<div id="col1-2">
<?  echo($this->homePost); ?>
			</div>
		</div>
		<div id="col2">
<?  echo($this->community->scriviBanner()); ?>
<?  echo($this->community->writeListaEventi1col()); ?>
<script src="/_php/twitter.php" type="text/javascript"></script>
<script type="text/javascript">
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 4,
  interval: 6000,
  width: 300,
  height: 300,
  theme: {
    shell: {
      background: '#FFFFFF',
      color: '#000000'
    },
    tweets: {
      background: '#ededed',
      color: '#000000',
      links: '#0000ff'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: false,
    hashtags: true,
    timestamp: true,
    avatars: false,
    behavior: 'all'
  }
}).render().setUser('flxer').start();
document.write("<"+"style"+">.twtr-widget{font-family: Arial,Helvetica,sans-serif !important;}.twtr-doc,.twtr-timeline {-moz-border-radius:0 !important;}<\/"+"style"+">");
</script>
<?  echo($this->community->writeListaExplorer1col()); ?>
		</div>
	</div>
