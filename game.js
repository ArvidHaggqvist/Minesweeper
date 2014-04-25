
	var sweeper = {

		board: [],
		NUMROWS: 0,
		NUMCOLS: 0,
		NUMBOMBS: 0,
		OPENED: 0,

		createGrid: function() {

			for(i=0;i<this.NUMROWS;i++) {
				this.board[i] = [];
				for(j=0;j<this.NUMCOLS;j++) {
					this.board[i][j] = '';
				}
			}
		},
		generateBombs: function() {

			var self = this;
			var bombs = [];

			function placeBomb() {
				var x = Math.floor(Math.random() * self.NUMCOLS),
					y = Math.floor(Math.random() * self.NUMROWS);

				console.log(x + " " + y);

				var found = false;

				for(j=0;j<bombs.length;j++) {
					if(bombs[j].xPos === x && bombs[j].yPos === y) found = true;
				}
				if(found) {
					console.log("Conflict!");
					placeBomb();
				}
				else {
					bombs.push({xPos: x, yPos:y});
					self.board[x][y] = 1;
				}
			}

			for(i=0;i<this.NUMBOMBS;i++) {
				placeBomb();
			}
			
		},
		findAdjacentNodes: function(x,y) {
			var self = this;
			var nodes = [];
			var makeNode = function(x,y) {
				if(self.board[x] !== undefined && self.board[x][y] !== undefined) {
					nodes.push({
						xPos: x,
						yPos: y,
						val: self.board[y][x]
					});
				}
			};

			makeNode(x,y+1);
			makeNode(x,y-1);
			makeNode(x+1,y);
			makeNode(x+1,y+1);
			makeNode(x+1,y-1);
			makeNode(x-1,y);
			makeNode(x-1,y+1);
			makeNode(x-1,y-1);


			return nodes;

		},
		markSquare: function(x,y, val) {
			if(val === 0) {
				$(".square[data-x='" + x + "'][data-y='" + y + "']").css('backgroundColor', 'yellow');
				this.board[y][x] = 'opened';
				this.OPENED++;
			}
			else {
				$(".square[data-x='" + x + "'][data-y='" + y + "']").css('backgroundColor', 'red');
				$(".square[data-x='" + x + "'][data-y='" + y + "']").html('<span>' + val + '</span>');
				this.board[y][x] = 'opened';
				this.OPENED++;
			}
		},
		examineNode: function(x,y, depth) {

			if(this.board[y][x] !== 'opened') {
				var adjacentNodes = this.findAdjacentNodes(x,y);
				console.log(adjacentNodes);

				var numAdjacentBombs = 0;

				adjacentNodes.forEach(function(node) {
					if(node.val === 1) numAdjacentBombs += 1;
				});
				if(numAdjacentBombs !== 0) {
					this.markSquare(x,y,numAdjacentBombs);
				}
				else {
					var self = this;
					this.markSquare(x,y,0);
					adjacentNodes.forEach(function(node) {
						self.examineNode(node.xPos, node.yPos);
					});
				}
				this.printBoard();
			}
		},
		printBoard: function() {
			this.board.forEach(function(arr, i){
				console.log("Row " + i);
				arr.forEach(function(v) {
					console.log(v);
				});
				console.log("\n\n");
			});
		},
		init: function(numrows, numcols, numbombs) {
			this.NUMROWS = numrows,
			this.NUMCOLS = numcols,
			this.NUMBOMBS = numbombs;

			this.createGrid();
			this.generateBombs();
		}

	};

	sweeper.init(10,10,10);
	console.log(sweeper.board);
