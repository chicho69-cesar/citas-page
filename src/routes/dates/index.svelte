<script>
    import Header from '../../components/Header.svelte';

    import { onMount } from 'svelte';
    import { getDates, addDate, aceptOrRejectADate } from '../../services/dates';
    import { getImage } from '../../services/users';

    let user = {};
    let dates = [];
    let completedDates = [];
    let pendingDates = [];

    let postToCalificate = 0;
    let calification = 0;

    let modalContainer = null;
    let modal = null;

    function addDatesToTheCategory() {
        dates.forEach(date => {
            if (date['pendiente']) {
                pendingDates.push(date);
            } else {
                completedDates.push(date);
            }
        });
    }

    async function aceptOrRejectADateFromPage(date) {
        await aceptOrRejectADate(date);
        date.pendiente = false;
        await addDate(date);

        completedDates = [];
        pendingDates = [];
        
        let response = await getDates(user.username);
        dates = response.body;

        addDatesToTheCategory();
        
        completedDates = [ ...completedDates ];
        pendingDates = [ ...pendingDates ];
    }

    onMount(async () => {
        user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            location.href = '/login';
        }

        let response = await getDates(user.username);
        dates = response.body;

        addDatesToTheCategory();
        
        completedDates = [ ...completedDates ];
        pendingDates = [ ...pendingDates ];

        modalContainer = document.querySelector('#modal-component-container');
        modal = document.querySelector('#modal-container');
    });

    function openCalificate(index) {
        postToCalificate = index;
        openModal();
    }

    function openModal() {
        showAndHidde(modalContainer, ['block', 'animate-bg-fadeIn'], ['hidden', 'animate-bg-fadeOut']);
        showAndHidde(modal, ['animate-modal-scaleIn'], ['animate-modal-scaleOut']);
    }

    function closeCalificate() {
        (completedDates[postToCalificate])['calificacion'] = calification;
        closeModal();
    }

    function closeModal() {
        showAndHidde(modalContainer, ['animate-bg-fadeOut'], ['animate-bg-fadeIn']);
        showAndHidde(modal, ['animate-modal-scaleOut'], ['animate-modal-scaleIn']);

        setTimeout(() => {
            showAndHidde(modalContainer, ['hidden'], ['block']);
        }, 500);
    }

    function showAndHidde(element, classessToAdd, classessToRemove) {
        element.classList.remove(...classessToRemove);
        element.classList.add(...classessToAdd);
    }
</script>

<svelte:head>
	<title>Citas</title>
</svelte:head>

<Header/>

<main class="py-24 w-2/3 mx-auto flex flex-row flex-nowrap gap-8 justify-between items-start">
    <section class="history w-1/2">
        <h3 class="text-2xl font-sans text-start mb-4">
            Historial de citas
        </h3>

        {#each completedDates as date, index}
            <article class="date border rounded-md shadow-sm">
                <header class="w-full py-2 px-4 flex flex-row flex-nowrap 
                justify-between items-center border-b text-lg">
                    <h4>Cita con <span class="font-semibold">{date['usuarioEnvia']}</span></h4>
                    
                    {#await getImage(date['usuarioEnvia']) then picture}
                        <img src="{picture}" alt="Cita" class="w-12 h-12 object-cover object-center rounded-full"/>
                    {/await}
                </header>

                <div class="body p-4 text-lg">
                    <p class="mb-1">
                        <span class="font-semibold">Fecha: </span> {date['fecha']}
                    </p>

                    <p class="mb-1">
                        <span class="font-semibold">Lugar: </span> {date['lugar']}
                    </p>

                    <p class="mb-1">
                        <span class="font-semibold">Descripcion: </span> {date['descripcion']}
                    </p>
                </div>

                <div class="grade px-4 pb-4">
                    <p class="py-2 px-4 bg-red-300 rounded-full font-bold inline-block">{date['calificacion']} / 10</p>
                    
                    <a href="/" on:click|preventDefault={() => openCalificate(index)}
                    class="ml-3 py-2 px-4 bg-blue-300 rounded-full 
                    font-bold inline-block text-gray-700 transition hover:text-black">
                        Calificar
                    </a>
                </div>
            </article>
        {/each}
    </section>
    
    <section class="pendings w-1/2">
        <h3 class="text-2xl font-sans text-start mb-4">
            Citas pendientes
        </h3>

        {#each pendingDates as date, index}
            <article class="date border rounded-md shadow-sm">
                <header class="w-full py-2 px-4 flex flex-row flex-nowrap 
                justify-between items-center border-b text-lg">
                    <h4>Propuesta de <span class="font-semibold">{date['usuarioEnvia']}</span></h4>
                    
                    {#await getImage(date['usuarioEnvia']) then picture}
                        <img src="{picture}" alt="Cita" class="w-12 h-12 object-cover object-center rounded-full"/>
                    {/await}
                </header>

                <div class="body p-4 text-lg">
                    <p class="mb-1">
                        <span class="font-semibold">Fecha: </span> {date['fecha']}
                    </p>

                    <p class="mb-1">
                        <span class="font-semibold">Lugar: </span> {date['lugar']}
                    </p>

                    <p class="mb-1">
                        <span class="font-semibold">Descripcion: </span> {date['descripcion']}
                    </p>
                </div>

                <div class="grade px-4 pb-4">
                    <a href="/" on:click|preventDefault={() => aceptOrRejectADateFromPage(pendingDates[index])}
                    class="py-2 px-4 bg-green-600 text-white font-semibold
                    shadow rounded-full transition hover:shadow-none mr-2">
                        Aceptar
                    </a>

                    <a href="/" on:click|preventDefault={() => aceptOrRejectADateFromPage(pendingDates[index])}
                    class="py-2 px-4 bg-red-600 text-white font-semibold
                    shadow rounded-full transition hover:shadow-none ml-2">
                        Rechazar
                    </a>
                </div>
            </article>
        {/each}
    </section>
</main>

<div id="modal-component-container" class="fixed inset-0 hidden">
    <div class="modal-flex-container flex items-end justify-center 
    min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75"></div>
        
        <div class="modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen"></div>

        <div class="modal-container inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg" id="modal-container">
            <section class="p-6 text-center">
                <h3 class="text-3xl">Califica esta cita</h3>

                <input type="number" bind:value={calification}
                class="w-full inline-block py-3 px-5 my-4 outline-none border
                border-red-300 rounded-md text-lg"
                placeholder="10"/>

                <div class="buttons flex flex-row flex-nowrap gap-4 justify-center items-center">
                    <a href="/" on:click|preventDefault={() => closeModal()}
                    class="bg-gray-300 font-semibold py-2 px-4 rounded-md shadow-md transition hover:shadow-none">
                        Cancelar
                    </a>

                    <a href="/" on:click|preventDefault={() => closeCalificate()}
                    class="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition hover:shadow-none">
                        Calificar
                    </a>
                </div>
            </section>
        </div>
    </div>
</div>