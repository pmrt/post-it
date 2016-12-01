class PostItView {

	constructor() {
	}

	draw() {
		let me = document.createElement('div');
		let content = document.createElement('p');
		let delbtn = document.createElement('img');

		me.className = 'post-it';

		me.appendChild(content);
		me.appendChild(delbtn);
		document.getElementsByClassName('board')[0].appendChild(me);
	}
}
