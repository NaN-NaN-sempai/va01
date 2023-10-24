<script>
    export let usuario = {};
    export let adminEstaVendo = false;

    export let onClick = () => {};

</script>

<div class="wrapper {adminEstaVendo? "": "adminEstaVendo"}">
    <div class="foto"  style="--foto: url({usuario.imagem_exib})" />

    <h2 class="nome"> {usuario.nome_exib} </h2>

    {#if adminEstaVendo}
        <button class="remover" on:click={onClick}> remover </button>
    {/if}
</div>


<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(to right bottom, #d9d9d9, white);
        padding: 20px;
        border-radius: 40px;
        margin: 20px;
    }
    .wrapper:hover {
        background: #d9d9d9;
    }

    .wrapper.adminEstaVendo { 
        justify-content: flex-start;
    }

    .nome {
        font-weight: bolder;
        font-size: 25px;
        text-align: center;
    }
    .wrapper.adminEstaVendo .nome {
        margin-left: 20px;
    }

    .foto {
        width: 40px;
        height: 40px;
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 20px;
        border-radius: 50%;
    }

    .remover {
        background: red;
        border: none;
        padding: 15px;
        border-radius: 20px;
        font-weight: bolder;
        font-size: 25px;
        cursor: pointer;
    }
    .remover:hover {
        background: rgb(255, 114, 114);
    }
    .remover:active {
        background: rgb(127, 0, 0);
    }

</style>