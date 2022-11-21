export async function getDates(username) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/dates.json';

	let response = await fetch(url);
	let data = await response.json();

	let dates = [];

	for (let idDate in data) {
        if ((data[idDate])['usuarioRecive'] === username) {
            dates.push(
                {
                    ...data[idDate],
                    idDate: idDate
                }
            );
        }
	}

	return {
		status: 200, 
		body: dates
	};
}

export async function addDate(date) {
	let url = 'https://citas-f39bd-default-rtdb.firebaseio.com/dates.json';

	let response = await fetch(url, {
		method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
		body: JSON.stringify({
            ...date,
        })
	});

	let data = await response.json();

	console.log(data);
}

export async function aceptOrRejectADate(date) {
	let url = `https://citas-f39bd-default-rtdb.firebaseio.com/dates/${date.idDate}.json`;

	let response = await fetch(url, {
		method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
	});

	let data = await response.json();

	console.log(data);
}