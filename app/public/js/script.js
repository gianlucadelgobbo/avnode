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




// isotope layout in bootstrap tabs
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	$('.grid_tab').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'masonry'
	});
});


// isotope layout in lists
$('.grid').isotope({
	// options
	itemSelector: '.grid-item',
	layoutMode: 'masonry'
});

// isotope layout in bootstrap tabs
$('.grid_tab').isotope({
	// options
	itemSelector: '.grid-item',
	layoutMode: 'masonry'
});
