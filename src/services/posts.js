export async function getPosts() {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/posts.json';

	let response = await fetch(url);
	let data = await response.json();

	let posts = [];

	for (let idPost in data) {
		posts.push(
			{
				...data[idPost],
				post: idPost
			}
		);
	}

	return {
		status: 200, 
		body: posts
	};
}

export async function addPost(post) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/posts.json';

	let response = await fetch(url, {
		method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
		body: JSON.stringify(post)
	});

	let data = await response.json();

	console.log(data);
}

export async function getUserPosts(username) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/posts.json';

	let response = await fetch(url);
	let data = await response.json();

	let posts = [];

	for (let idPost in data) {
		if ((data[idPost])["usuario"] === username) {
			posts.push(
				{
					...data[idPost],
					post: idPost
				}
			);
		}
	}

	return {
		status: 200, 
		body: posts
	};
}