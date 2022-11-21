<script>
	import { onMount } from "svelte";
    import { addDate } from '../../services/dates';

    let userInvitation = '';
    let user = {};
    let date = {};

    let fecha = '';
    let lugar = '';
    let descripcion = '';

    async function addADate() {
        date = {
            fecha, lugar, descripcion,
            pendiente: true,
            calificacion: 0,
            usuarioEnvia: user.username,
            usuarioRecive: userInvitation
        };
        
        await addDate(date);
        location.href = '/dates';
    }

    onMount(() => {
        userInvitation = localStorage.getItem('userInvitation');
        user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            location.href = '/login';
        }
    });
</script>

<svelte:head>
	<title>Invitar a {userInvitation}</title>
</svelte:head>

<div class="min-h-screen bg-red-300 grid place-content-center">
	<main class="px-8 bg-white shadow-md rounded-md flex flex-col flex-nowrap
	justify-between items-center">
		<h2 class="w-full text-[28px] text-gray-800 border-b mb-4 text-center px-16">
			Invita a {userInvitation}
		</h2>

		<form class="flex flex-col flex-nowrap justify-center items-center">
			<div class="group w-full">
                <label for="fecha">Fecha: </label>
                
                <input type="text" class="w-full py-2 px-4 border-2 border-gray-500 mb-4
                outline-none rounded-md" placeholder="Escribe la fecha..."
                id="fecha" bind:value={fecha} autocomplete="off">
            </div>

            <div class="group w-full">
                <label for="lugar">Lugar: </label>
                
                <input type="text" class="w-full py-2 px-4 border-2 border-gray-500 mb-4
                outline-none rounded-md" placeholder="Escoge el lugar..."
                id="lugar" bind:value={lugar} autocomplete="off">
            </div>

            <div class="group w-full">
                <label for="descripcion">Descripción: </label>
                
                <input type="text" class="w-full py-2 px-4 border-2 border-gray-500 mb-4
                outline-none rounded-md" placeholder="Escribe algo genial..."
                id="descripcion" bind:value={descripcion} autocomplete="off">
            </div>

			<div class="grid place-content-center">
				<button class="py-2 px-10 bg-red-700 text-white shadow-md
				rounded-full text-lg hover:shadow-none mb-4"
				on:click|preventDefault={() => addADate()}>
					Invitar
				</button>
			</div>
		</form>
	</main>
</div>