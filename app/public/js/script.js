// t > errors, alert, confirm, search_and_add, search_map
function showModal(t, m, callback) {
	if (m) $('.modal-'+t+' .modal-body p').html(m);
	$('.modal-'+t).modal('show');
	if ($.isFunction(callback)) {
		$('.modal-'+t).on('hidden.bs.modal', function () {
		  callback();
		})
	}
}
