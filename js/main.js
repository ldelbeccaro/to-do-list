$(document).ready(function () {
	/* Define global variables */
	var check = '<img class="check" src="images/to-do.svg" alt="check">';
	var restore = '<img class="restore" src="images/restore.svg" alt="restore" style="display: none">';
	var del = '<img class="delete" src="images/delete.svg" alt="delete" style="display: none">';
	var archive = '<img class="archive" src="images/archive.svg" alt="archive" style="display: none">'

	/* Create new task from text input */
	$( 'form' ).submit(function ( event ) {
		console.log('Input recognized');
		var task = '<p>' + $( 'input:first' ).val() + '</p>';
		var newTask = '<li class="task">' + check + task + del + '</li>';
		$( 'ul.to-do' ).append(newTask).animate (
				{opacity: 1},
				{queue: true, duration: 'slow' }
			)
		// still need to animate this????
		event.preventDefault();
		$( 'input:first' ).val('');
	});

	/* Show delete button on task hover */
	$( 'ul.to-do' )
		.on('mouseenter', 'li', function ( event ) {
			$( this ).addClass('hover');
			$( this ).find('img.delete').show();
		})
		.on('mouseleave', 'li', function ( event ) {
			$( this ).removeClass('hover');
			$( this ).find('img.delete').hide();
		});

	/* Show restore and archive buttons on complete task hover */
	$( 'ul.complete, ul.hidden' )
		.on('mouseenter', 'li', function ( event ) {
			$( this )
				.addClass('hover')
				.find('img').show()
				.find('p').css('margin-left', '-=30');
		})
		.on('mouseleave', 'li', function ( event ) {
			$( this )
				.removeClass('hover')
				.find('img').hide()
				.find('p').css('margin-left', '+=30');
		});

	/* Check off task */
	$( '.list ul' ).on('click', 'li > img.check', function ( event ) {
		console.log('Task checked off');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var completeTask = '<li class="complete">' + restore + taskText + archive + '</li>';
		$( 'ul.complete' ).append(completeTask);
		$( this ).parent().remove();
	});

	/* Restore task */
	$( '.list ul' ).on('click', 'li > img.restore', function ( event ) {
		console.log('Task unchecked');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var incompleteTask = '<li class="task">' + check + taskText + del + '</li>';
		$( 'ul.to-do' ).append(incompleteTask);
		$( this ).parent().remove();
	});

	/* Delete task */
	$( '.list ul' ).on('click', 'li > img.delete', function ( event ) {
		console.log('Task deleted');
		$( this ).parent().remove();
	});

	/* Archive complete task */
	$( '.list ul' ).on('click', 'li > img.archive', function ( event ) {
		console.log('Complete task hidden');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var hiddenTask = '<li class="complete">' + restore + taskText + '</li>';
		$( 'ul.hidden' ).append(hiddenTask);
		$( this ).parent().remove();
	});

	/* Archive all completed tasks */
	$( '.hide-tasks' ).click( function ( event ) {
		console.log( 'All complete tasks hidden' );
		$( 'ul.complete' ).find( 'img.archive' ).remove();
		$( 'ul.hidden' ).append( $( 'ul.complete' ).html() );
		$( 'ul.complete' ).children().remove();
	});

	/* Show or hide archived tasks */
	$( function () {
		$( '.unhide' ).click (function ( event ) {
//			$( '.unhide' ).slideToggle();
			if ( $( '.unhide' ).text() === 'Show archived' ) {
				$( 'ul.hidden' ).show();
				$( this )
					.text( 'Hide archived' );
			}
			else {
				$( 'ul.hidden' ).hide();
				$( this )
					.text( 'Show archived' );
			}
		});
	});

	/* Delete all tasks */
	$( '.delete-all' ).click( function ( event ) {
		$( 'ul.to-do' ).children().remove();
		$( 'ul.complete' ).children().remove();
		$( 'ul.hidden' ).children().remove();
	});

	/* Reorder tasks */
	$( function () {
		$( 'ul.to-do' ).sortable();
		$( 'ul.to-do' ).disableSelection();
	});

});