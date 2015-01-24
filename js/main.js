$(document).ready(function () {
	/* Define global variables */
	var check = '<img class="check" src="images/to-do.svg" alt="check">';
	var restore = '<img class="restore" src="images/restore.svg" alt="restore" style="display: none">';
	var del = '<img class="delete" src="images/delete.svg" alt="delete" style="display: none">';
	var archive = '<img class="archive" src="images/archive.svg" alt="archive" style="display: none">'
	var tasks = 0;
	var complete = 0;
	var hidden = 0;

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
		tasks ++;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
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
				.find('p').css('margin-left', '5px');
		})
		.on('mouseleave', 'li', function ( event ) {
			$( this )
				.removeClass('hover')
				.find('img').hide()
				.find('p').css('margin-left', '35px');
		});

	/* Check off task */
	$( '.list ul' ).on('click', 'li > img.check', function ( event ) {
		console.log('Task checked off');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var completeTask = '<li class="complete">' + restore + taskText + archive + '</li>';
		$( 'ul.complete' ).append(completeTask);
		$( this ).parent().remove();
		tasks --;
		complete ++;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Restore task */
	$( '.list ul' ).on('click', 'li > img.restore', function ( event ) {
		console.log('Task unchecked');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var incompleteTask = '<li class="task">' + check + taskText + del + '</li>';
		$( 'ul.to-do' ).append(incompleteTask);
		$( this ).parent().remove();
		tasks ++;
		complete --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Delete task */
	$( '.list ul' ).on('click', 'li > img.delete', function ( event ) {
		console.log('Task deleted');
		$( this ).parent().remove();
		tasks --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Hide complete task */
	$( '.list ul' ).on('click', 'li > img.archive', function ( event ) {
		console.log('Complete task hidden');
		var taskText = '<p>' + $( this ).parent().text() + '</p>';
		var hiddenTask = '<li class="complete">' + restore + taskText + '</li>';
		$( 'ul.hidden' ).append(hiddenTask);
		$( this ).parent().remove();
		hidden ++;
		complete --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Archive all completed tasks */
	$( '.hide-tasks' ).click( function ( event ) {
		console.log( 'All complete tasks hidden' );
		$( 'ul.complete' ).find( 'img.archive' ).remove();
		$( 'ul.hidden' ).append( $( 'ul.complete' ).html() );
		$( 'ul.complete' ).children().remove();
		hidden += $( 'ul.hidden' ).length();
		complete = 0;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Show hidden tasks */
	$( '.unhide' ).click( function ( event ) {
		$( 'ul.hidden' ).show();
		$( this )
			.text( 'Hide archived' )
			.addClass( 'hide-complete' )
			.removeClass( 'unhide' );
	});

	/* Hide hidden tasks */
	$( '.hide-complete' ).click( function ( event ) {
		$( 'ul.hidden' ).hide();
		$( this )
			.text( 'Show archived' )
			.addClass( 'unhide' )
			.removeClass( 'hide-complete' );
	});

	/* Delete all tasks */
	$( '.delete-all' ).click( function ( event ) {
		$( 'ul.to-do' ).children().remove();
		$( 'ul.complete' ).children().remove();
		$( 'ul.hidden' ).children().remove();
		tasks = 0;
		complete = 0;
		hidden = 0;
	});

	/* Reorder tasks */
	$( function () {
		$( 'ul.to-do' ).sortable();
		$( 'ul.to-do' ).disableSelection();
	});

});