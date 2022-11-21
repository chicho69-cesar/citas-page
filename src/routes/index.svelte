<script>
	import Header from '../components/Header.svelte';
    
    import { onMount } from 'svelte';
    import dateFormat from "dateformat";
    import { getPosts } from '../services/posts';
    import { getImage } from '../services/users';
    import { getComments, postComment } from '../services/comments';

    let comments = {};
    let reactions = {};
    let likes = [];
    let comment = '';
    let user = {};

    async function getAllPosts() {
        let localPosts = await getPosts();
        localPosts.body.forEach((post, i) => {
            likes[i] = {};
            (likes[i])[post.post] = post.likes;
        });
        return localPosts.body;
    }

    async function getAllComments(post) {
        let result = await getComments(post);
        comments[post] = [ ...result.body ];
        return comments;
    }

    async function reactToAPost (post, index) {
        (likes[index])[post] = (likes[index])[post] + 1;
        likes = [ ...likes ];
        reactions[post] = true;
    }

    async function unReactToAPost (post, index) {
        (likes[index])[post] = (likes[index])[post] - 1;
        likes = [ ...likes ];
        reactions[post] = false;
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

    function inviteToADate(username) {
        localStorage.setItem('userInvitation', username);
        location.href = '/invite';
    }

    onMount(() => {
        user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            location.href = '/login';
        }
    });
</script>

<svelte:head>
	<title>Citas</title>
</svelte:head>

<Header/>

<main class="py-24">
    <section class="posts w-1/2 mx-auto overflow-hidden">
        {#await getAllPosts()}
            <h3>Loading</h3>
        {:then value}
            {#each value as post, index}
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
                        hover:text-white hover:bg-red-500"
                        on:click|preventDefault={() => inviteToADate(post.usuario)}>
                            invitar
                        </a>
                    </header>

                    <div class="photo">
                        <img src="{ post.picture }" alt="" class="photo">
                    </div>

                    <footer>
                        <section class="icons w-full p-2 flex flex-row gap-2 justify-start items-center">
                            {#if reactions[post.post]}
                                <a href="/" class="text-xl text-red-600"
                                on:click|preventDefault={() => unReactToAPost(post.post, index)}>
                                    <i class="bi bi-heart-fill"></i>
                                </a>
                            {:else}
                                <a href="/" class="text-xl"
                                on:click|preventDefault={() => reactToAPost(post.post, index)}>
                                    <i class="bi bi-heart"></i>
                                </a>
                            {/if}

                            <span>
                                {(likes[index])[post.post]}
                            </span>

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
        {/await}
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