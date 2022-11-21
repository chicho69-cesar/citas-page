<script>
    import { register } from '../../services/users';

    let username = '';
    let degree = '';
    let email = '';
    let name = '';
    let lastname = '';
    let password = '';

    async function signUp() {
        let userToRegister = {
            degree, username, email, name, lastname, password,
            picture: 'https://res.cloudinary.com/dtqilcsm8/image/upload/v1664680483/sample.jpg'
        };

        let user = await register(userToRegister);
        
        if (user.body !== null) {
            localStorage.setItem('user', JSON.stringify(user.body));
            location.href = '/';
        }
    }
</script>

<svelte:head>
	<title>Registrate</title>
</svelte:head>

<div class="min-h-screen bg-red-300 grid place-content-center">
    <main class="mx-auto flex flex-row justify-between items-center gap-24">
        <div>
            <img src="/favicon.png" alt="Hola" class="rounded-lg"/>
        </div>

        <form action="" class="w-max bg-white py-4 rounded-md shadow-md
        flex flex-col justify-between items-center">
            <h1 class="text-red-500 font-serif text-xl">Registrate</h1>

            <div class="my-2 flex flex-col justify-between">
                <label for="" class="text-red-500">Username: </label>
                <input type="text" bind:value={username} class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <div class="my-1 flex flex-col justify-between">
                <label for="" class="text-red-500">Correo: </label>
                <input type="email" bind:value={email} class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <div class="my-1 flex flex-col justify-between">
                <label for="" class="text-red-500">Nombre: </label>
                <input type="text" bind:value={name} class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <div class="my-1 flex flex-col justify-between">
                <label for="" class="text-red-500">Apellidos: </label>
                <input type="text" bind:value={lastname} class="w-full border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <div class="my-1 px-8 flex flex-col justify-between">
                <label for="" class="text-red-500">Carrera: </label>
                <select bind:value={degree} class="border-2 border-red-500 rounded-md outline-none px-4 py-2">
                    <option>Ingenieria en TICs</option>
                    <option>Ingenieria en Electronica</option>
                    <option>Ingenieria Electrica</option>
                    <option>Ingenieria en Mecanica</option>
                    <option>Ingenieria en Gestion Empresarial</option>
                    <option>Ingenieria en Quimica</option>
                    <option>Ingenieria Industrial</option>
                    <option>Ingenieria en Materiales</option>
                    <option>Lic. en Administracion</option>
                </select>
            </div>

            <div class="my-1 flex flex-col justify-between">
                <label for="" class="text-red-500">Password: </label>
                <input type="password" bind:value={password} class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <button type="submit" class="bg-red-500 px-4 py-2 mt-4 text-white
            text-lg shadow-md rounded-md hover:shadow-none" on:click|preventDefault={ signUp }>
                Registrate 
                <i class="bi bi-box-arrow-in-right"></i>
            </button>

            <a href="/login" class="mt-4 text-blue-700">
                Iniciar sesión aquí
            </a>
        </form>
    </main>
</div>