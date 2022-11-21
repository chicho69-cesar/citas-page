<script>
	import Header from '../../components/Header.svelte';

    import dateFormat from "dateformat";
    import { getImage } from '../../services/users';
    import { onMount } from 'svelte';
    import { getComments, postComment } from '../../services/comments';
    import { getUserPosts } from '../../services/posts'

    let comments = {};
    let comment = '';
    let user = {};
    let posts = [];

    async function getAllComments(post) {
        let result = await getComments(post);
        comments[post] = [ ...result.body ];
        return comments;
    }

    async function addComment(post) {
        const now = new Date();
        let fecha = dateFormat(now, "dd/mmmm/yyyy");

        let commentToAdd = {
            comentario: comment,
            fecha: fecha,
            post: post,
            usuario: user.username
        };
        
        await postComment(commentToAdd);

        comments[post] = [ ...comments[post], commentToAdd ];
        comment = '';
    }

    async function getImageProfile(username) {
        return await getImage(username);
    }

    function logout() {
        localStorage.removeItem('user');
        location.href = '/login';
    }

    onMount(async () => {
        user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            location.href = '/login';
        }

        let response = await getUserPosts(user.username);
        posts = response.body;
    });
</script>

<svelte:head>
	<title>{ user.username }</title>
</svelte:head>

<Header/>

<main class="py-24 w-1/2 mx-auto">
    <section class="profile-information flex flex-row flex-nowrap justify-between items-start">
        <article class="w-1/3">
            <img src="{user.picture}" alt="{user.username}"
            class="w-48 h-48 rounded-full object-cover object-center">
        </article>

        <article class="w-2/3 pl-4">
            <h2 class="text-[30px] text-zinc-600 mb-4">
                {user.username} 

                <a href="/" class="ml-4 text-[16px] text-black py-1 px-3 
                border rounded-sm hover:bg-zinc-100">
                    Editar perfil
                </a>

                <a href="/" class="ml-4 text-[16px] py-1 px-3 
                rounded-sm bg-red-700 hover:bg-red-600 text-white"
                on:click|preventDefault={logout}>
                    Salir
                </a>
            </h2>

            <p class="text-lg font-semibold mb-1">
                {user.name} {user.lastname}
            </p>

            <p>
                {user.degree} 👨‍💻🔧
            </p>

            <p class="text-blue-900">
                {user.email}
            </p>

            <p class="mt-2 font-semibold">
                {posts.length} publicaciones
            </p>
        </article>
    </section>

    <section class="overflow-hidden mt-10">
        {#each posts as post}
            <article class="bg-white border mb-8">
                <header class="py-4 px-6 border-b flex flex-row justify-between items-center">
                    <div class="group flex justify-start gap-4 items-center">
                        {#await getImageProfile(post.usuario) then image}
                            <img src="{ image }" alt="" class="w-12 h-12 object-cover object-center rounded-full">
                        {/await}

                        <div class="data">
                            <p class="text-lg text-gray-700">{ post.usuario }</p>
                            <p class="text-sm text-red-700">{ post.fecha }</p>
                        </div>
                    </div>

                    <a href="/" class="py-1 px-4 border border-red-500 rounded-full text-red-500
                    hover:text-white hover:bg-red-500">
                        invitar
                    </a>
                </header>

                <div class="photo">
                    <img src="{ post.picture }" alt="" class="photo">
                </div>

                <footer>
                    <section class="icons w-full p-2 flex flex-row gap-2 justify-start items-center">
                        <a href="/" class="text-xl">
                            <i class="bi bi-heart"></i>
                        </a>

                        <a href="/" class="text-xl">
                            <i class="bi bi-bookmark"></i>
                        </a>
                    </section>

                    <section class="posting">
                        <p class="w-full pl-4 pb-2 border-b">
                            <span class="font-bold">{ post.usuario }</span> 
                            { post.descripcion }
                        </p>
                    </section>
                    
                    <section class="comments mt-4 pl-4 pb-2 border-b">
                        {#await getAllComments(post.post)}
                            <p>Loading...</p>
                        {:then response}
                            {#each comments[post.post] as comment}
                                <p class="text-gray-800">
                                    <span class="font-bold text-md">{ comment.usuario }</span> 
                                    { comment.comentario }
                                </p>
                            {/each}
                        {/await}
                    </section>

                    <section class="comment">
                        <form action="" class="flex flex-row justify-between items-center">
                            <input type="text" placeholder="Escribe un comentario ..." class="w-full py-2 px-4 outline-none"
                            bind:value={ comment }>
                            
                            <button class="py-2 px-4 text-gray-600 hover:text-black"
                            on:click|preventDefault={ () => addComment(post.post) }>
                                <i class="bi bi-send"></i> 
                            </button>
                        </form>
                    </section>
                </footer>
            </article>
        {/each}
    </section>
</main>

<style>
    .photo {
        width: 100%;
        /* height: 700px; */
        aspect-ratio: 9 / 11;
        object-fit: cover;
        object-position: center;
    }
</style>