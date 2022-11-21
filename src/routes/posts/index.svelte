<script>
	import { addPost } from "../../services/posts";
	import { onMount } from "svelte";
	import dateFormat from "dateformat";

	let imageBase64 = '';
	let description = '';
	let user = {};

	const onFileSelected = (e) =>{
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			// @ts-ignore
			imageBase64 = e.target.result;
		};
	}

	async function uploadTheImage() {
		const now = new Date();

		let post = {
			descripcion: description,
			fecha: dateFormat(now, "dd/mmmm/yyyy"),
			likes: 0,
			picture: imageBase64,
			usuario: user.username
		};

		await addPost(post);
		location.href = '/';
	}

	onMount(() => {
		user = JSON.parse(localStorage.getItem('user'));
	});
</script>

<svelte:head>
	<title>Agregar publicacion</title>
</svelte:head>

<div class="min-h-screen bg-red-300 grid place-content-center">
	<main class="bg-white shadow-md rounded-md flex flex-col flex-nowrap
	justify-between items-center">
		<h2 class="w-full text-[28px] text-gray-800 border-b mb-4 text-center px-16">
			Crea una publicación
		</h2>

		<form class="h-80 flex flex-col flex-nowrap justify-center items-center">
			<input type="file" name="picture" id="picture" style="display: none;"
			on:change={(e) => onFileSelected(e)}>
			
			<label for="picture">
				<section class="text-[90px] grid place-content-center text-gray-800">
					<i class="bi bi-images"></i>
				</section>

				<p class="text-xl text-center text-gray-800 mb-6">
					Seleccionar las fotos y los videos aquí
				</p>
			</label>

			<input type="text" class="w-full py-2 px-4 border-2 border-gray-500 mb-4
			outline-none rounded-md" placeholder="Escribe algo genial..."
			bind:value={description}>

			<div class="grid place-content-center">
				<button class="py-2 px-10 bg-gray-700 text-white shadow-md
				rounded-full text-lg hover:shadow-none mb-4"
				on:click|preventDefault={() => uploadTheImage()}>
					Publicar
				</button>
			</div>
		</form>
	</main>
</div>