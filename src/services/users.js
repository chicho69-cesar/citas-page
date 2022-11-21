export async function login(username, password) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/users.json';

	let response = await fetch(url);
	let data = await response.json();

	let user = null;

	for (let idUser in data) {
        if ((data[idUser])["username"] === username && (data[idUser])["password"] === password) {
            user = { ...data[idUser] };
        }
	}

	return {
		status: 200, 
		body: user
	};
}

export async function register(user) {
    let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/users.json';

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return await login(user.username, user.password);
}

export async function getImage(username) {
    let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/users.json';

	let response = await fetch(url);
	let data = await response.json();

	let user = null;

	for (let idUser in data) {
        if ((data[idUser])["username"] === username) {
            user = { ...data[idUser] };
        }
	}

    return user.picture;
}