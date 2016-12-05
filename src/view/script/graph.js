/*
PostIt = {
	board {
		{ 'element:div.post-it',

			{ 'delbtn:img' },
			{ 'content:textarea'}
    	}
   	}
}



PostItView = new $View
			 .editEnabled = false;
		     .render(PostIt);

*/

class PostItView {

	draw() {
		/*
			Draw a new blank Post-It inside the board.
			Set element.
			@Return: obj <PostItView>
		*/
		// Elements
		this.element = document.createElement('div');
		this.delbtn = document.createElement('img');
		this.content = document.createElement('textarea');

		// Atribs
		this.delbtn.src = "../resources/vector/trash.svg";
		this.element.className = 'post-it';

		// Tree
		this.element.appendChild(this.delbtn);
		this.element.appendChild(this.content);
		document.getElementsByClassName('board')[0].appendChild(this.element);

		this.element.obj = this;
		this.content.obj = this;
		this.editEnabled = false;

		return this.element;
	}

	editActive() {
		this.editEnabled = true;
		this.content.focus();

	}

	editInactive() {
		this.editEnabled = false;
	}
}

class BoardView {

	draw() {
		this.element = document.createElement('div');
		this.element.className = 'board flex-wrapper';

		document.body.appendChild(this.element);

		return this.element;
	}

}
