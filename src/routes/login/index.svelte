<script>
    import { login } from '../../services/users';

    let username = '';
    let password = '';

    async function signIn() {
        let user = await login(username, password);
        
        if (user.body !== null) {
            localStorage.setItem('user', JSON.stringify(user.body));
            location.href = '/';
        }
    }
</script>

<svelte:head>
	<title>Iniciar sesion</title>
</svelte:head>

<div class="min-h-screen bg-red-300 grid place-content-center">
    <main class="mx-auto flex flex-row justify-between items-center gap-24">
        <div>
            <img src="/favicon.png" alt="Hola" class="rounded-lg"/>
        </div>

        <form action="" class="w-max bg-white p-12 rounded-md shadow-md
        flex flex-col justify-between items-center">
            <h1 class="text-red-500 font-serif text-xl">Login</h1>

            <div class="my-4 flex flex-col justify-between">
                <label for="" class="text-red-500">Username: </label>
                <input type="text" bind:value={ username } class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <div class="my-4 flex flex-col justify-between">
                <label for="" class="text-red-500">Password: </label>
                <input type="password" bind:value={ password } class="border-2 border-red-500 rounded-md outline-none px-4 py-2"/>
            </div>

            <button type="submit" class="bg-red-500 px-4 py-2 mt-4 text-white
            text-lg shadow-md rounded-md hover:shadow-none" on:click|preventDefault={ signIn }>
                Iniciar Sesión 
                <i class="bi bi-box-arrow-in-right"></i>
            </button>

            <a href="/signup" class="mt-4 text-blue-700">
                ¿Aun no tienes una cuenta?, registrate aquí
            </a>
        </form>
    </main>
</div>