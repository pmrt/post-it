class Board {

	constructor(title) {
		this.title = title || 'My Post-It Board';
	}

}

class PostIt {

	constructor(title, content) {
		this.title = title;
		this.content = content;
	}
}
