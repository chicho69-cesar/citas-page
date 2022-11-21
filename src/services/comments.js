export async function getComments(postId) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/comments.json';

	let response = await fetch(url);
	let data = await response.json();

	let comments = [];

	for (let idComment in data) {
        if ((data[idComment])["post"] === postId) {
            comments.push(data[idComment]);
        }
	}

	return {
		status: 200, 
		body: comments
	};
}

export async function postComment(comment) {
    let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/comments.json';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    let data = await response.json();

    return data["name"];
}