class API {

	static addBlank() {
		/*
			Add a blank Post-It.
			Instances a Post-It View Object,
			draws it and watch it.
		*/
		let PostItObjView = new PostItView();
		let PostItObj = new $PostIt();
		PostItObjView.draw();
		API.watchPostIt(PostItObjView);
	}

	static watchPostIt(PostItObjView) {
		/*
			Add the events to the passed PostItObjView.
		*/
		PostItObjView.element.addEventListener('click', function(e) {
				API.editActive(e);
			});
		PostItObjView.element.addEventListener('focusout', function(e){
				API.editInactive(e);
			});
	}

	static watchBoard(BoardView) {
		/*
			Add the events to the passed BoardView.
		*/
		BoardView.title.addEventListener('click', function(e){

		});
	}

	static editActive(e) {
		/*
			Enable the edit mode for the passed event.
		*/
		if (!e.currentTarget.obj.editEnabled) {
			e.currentTarget.obj.editActive();
		}
	}

	static editInactive(e) {
		/*
			Disable the edit mode for the passed event.
		*/
		if (e.currentTarget.obj.editEnabled) {
			e.currentTarget.obj.editInactive();
		}
	}

	static createBoard() {
		let board = new Board();
		let boardView = new BoardView();
		boardView.draw();

		$watchClass(PostIt, function(){
			board.addPostIt(this);
		});

		return board;
	}
}
