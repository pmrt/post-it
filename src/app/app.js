class Board {

	constructor() {
		this.title = 'My Post-It Board';
		this.postIts = [];
	}

	set postIt(postItObj) {
		this.postIts[this.getLastId()+1+""] = postItObj;
	}

	// getLastId() {
	// 	let ids = Object.keys(this.postIts);

	// 	if (ids == "") {
	// 		return -1;
	// 	} else {
	// 		return parseInt(ids[ids.length-1]);
	// 	}
	// }

	addPostIt(postIt) {
		this.postIts.push(postIt);
	}

}

class PostIt {

	constructor(content) {
		this.content = content;
	}
}
