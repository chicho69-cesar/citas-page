<script>
    import { onMount } from 'svelte';

    let user = {};

    onMount(() => {
        user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            location.href = '/login';
        }
    });
</script>

<div class="header bg-red-200">
    <div class="header-container bg-red-200">
        <div class="header-content">
            <div class="header-logo">
                <a href="/">
                    <h1>CITAS</h1>
                </a>
            </div>

            <div class="header-nav">
                <ul class="">
                    <li class="text-red-900 hover:text-gray-900 cursor-pointer">
                        <a href="/posts">
                            <i class="bi bi-plus-square"></i>
                        </a>
                    </li>

                    <li class="text-red-900 hover:text-gray-900 cursor-pointer">
                        <a href="/dates">
                            <i class="bi bi-heart-fill"></i>
                        </a>
                    </li>

                    <li class="text-red-900 hover:text-gray-900 cursor-pointer">
                        <i class="bi bi-chat-heart"></i>
                    </li>

                    <li>
                        <a href="/profile">
                            <img src="{ user.picture }" alt="" class="w-10 h-10 object-cover object-center rounded-full">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
    }

    .header-container {
        display: grid;
        justify-content: center;
        grid-template-columns: minmax(auto, 936px);
        border-bottom: 1px solid rgba(38, 38, 38, 0.4);
    }

    .header-content {
        padding: 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header ul {
        list-style: none;
        display: flex;
        flex-flow: row nowrap;
        gap: 0.5rem;
        justify-content: flex-end;
        align-items: center;
    }

    .header li {
        display: inline-block;
        margin: 0 0 0 1em;
    }

    .header i {
        cursor: pointer;
        font-size: 16px;
    }

    h1 {
        position: relative;
        cursor: pointer;
        padding: 0;
        margin: 0;
        font-size: 28px;
        color: black;
        font-family: 'Pacifico', cursive;
        background: #fff;
        mix-blend-mode: multiply;
        display: inline-block;
    }

    h1::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        mix-blend-mode: screen;
        background: radial-gradient(circle at top left, #f09433, #bc1888);
    }
</style>