$(document).ready(function () {
	/* Define global variables */
	var check = '<img class="check" src="images/to-do.svg" alt="check">';
	var restore = '<img class="restore" src="images/restore.svg" alt="restore">';
	var del = '<img class="delete" src="images/delete.svg" alt="delete" style="display: none">';
	var archive = '<img class="archive" src="images/archive.svg" alt="archive" style="display: none">'
	var tasks = 0;
	var complete = 0;
	var hidden = 0;

	/* Create new task from text input */
	$( 'form' ).submit(function ( event ) {
		console.log('Input recognized');
		var task = $( 'input:first' ).val();
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

	/* Show archive button on complete task hover */
	$( 'ul.complete' )
		.on('mouseenter', 'li', function ( event ) {
			$( this ).addClass('hover');
			$( this ).find('img.archive').show();
		})
		.on('mouseleave', 'li', function ( event ) {
			$( this ).removeClass('hover');
			$( this ).find('img.archive').hide();
		});

	/* Check off task */
	$( '.list ul' ).on('click', 'li > img.check', function ( event ) {
		console.log('Task checked off')
		var taskText = $( this ).parent().text();
		var completeTask = '<li class="complete">' + restore + taskText + archive + '</li>';
		$( 'ul.complete' ).append(completeTask);
		$( this ).parent().remove();
		tasks --;
		complete ++;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Restore task */
	$( '.list ul' ).on('click', 'li > img.restore', function ( event ) {
		console.log('Task unchecked')
		var taskText = $( this ).parent().text();
		var incompleteTask = '<li class="task">' + check + taskText + del + '</li>';
		$( 'ul.to-do' ).append(incompleteTask);
		$( this ).parent().remove();
		tasks ++;
		complete --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Delete task */
	$( '.list ul' ).on('click', 'li > img.delete', function ( event ) {
		console.log('Task deleted')
		$( this ).parent().remove();
		tasks --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Hide complete task */
	$( '.list ul' ).on('click', 'li > img.archive', function ( event ) {
		console.log('Complete task hidden')
		var taskText = $( this ).parent().text();
		var hiddenTask = '<li class="task">' + restore + taskText + '</li>';
		$( 'ul.hidden' ).append(hiddenTask);
		$( this ).parent().remove();
		hidden ++;
		complete --;
		console.log('Tasks: ' + tasks + '\n Complete: ' + complete + '\n Complete & Hidden: ' + hidden);
	});

	/* Hide all complete tasks */
	$( '.hide-tasks' ).click( function ( event ) {
		$( 'ul.hidden' ).hide();
	});

	/* Show hidden tasks */
	$( '.unhide' ).click( function ( event ) {
		$( 'ul.hidden' ).show();
	});

	/* Reorder tasks */
	$( '.list ul' ).sortable({ axis: 'y' });

});



















