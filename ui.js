

	var ui = {
		makeBoard: function(board) {
			var gamediv = $(".game");
			for(i=0;i<sweeper.NUMCOLS;i++) {
				for(j=0;j<sweeper.NUMCOLS;j++) {
					(sweeper.board[i][j] === 1) ?
						gamediv.append("<div class='square bomb' data-y='" + i + "' data-x='" + j + "'></div>") : 
						gamediv.append("<div class='square' data-y='" + i + "' data-x='" + j + "'></div>");
				}
			}
		}
	};
	ui.makeBoard();

	$(".square").on('click', function() {
		if(!$(this).hasClass('bomb')) {
			var x = $(this).attr('data-x'),
				y = $(this).attr('data-y');
			sweeper.examineNode(parseInt(x),parseInt(y));
		}
		if(sweeper.OPENED + sweeper.NUMBOMBS === (sweeper.NUMROWS * sweeper.NUMCOLS)) gameWin();
	});
	$(".bomb").on('click', function() {
		gameOver();
		$(this).css('backgroundImage', 'url(bomb_exploding.gif)');
	});
	$(".square").on('mousedown', function(e) {
		if(!$(this).hasClass('flagged')) {
			if(e.button === 2) $(this).css('backgroundImage', 'url(flag.png)');
			$(this).addClass('flagged');
		}
		else {
			$(this).css('backgroundImage', 'none');
			$(this).removeClass('flagged');
		}

	});

	function gameOver() {
		//alert("Game over!");
		//$(".overlay").show(0).height($());
		$("body").append("<h1 class='gameend'>Game Over</h1>");
		$(".gameend").animate({
			fontSize: '100px'
		}, 1000);
		$(".bomb").css('backgroundColor', 'gray');
		$(".bomb").css('backgroundImage', 'url(bomb.png)');
	}
	function gameWin() {
		$(".overlay").show(0);
		$("body").append("<h1 class='gameend win'>You Win!</h1>");
		$(".gameend").animate({
			fontSize: '100px'
		}, 1000);
	}
