<script>
    export let title = "Input";
    export let placeholder = "Input";
    export let name = "nome";

    let input;
    let valorEscondido;
    const selecionar = (usuario) => {
        input.value = `${usuario.nome_exib} (${usuario.login})`;
        valorEscondido.value = usuario.id;
    }


    export let lista = [];

</script>

<div class="wrapper">
    <span> {title} </span>
    <input bind:this={input} placeholder="{placeholder}" class="input" required type="text">
    <input bind:this={valorEscondido} type="hidden" name="{name}">

    <div class="lista">
        {#each lista as item}
            <div class="item" aria-hidden on:click={() => selecionar(item)}>
                <div class="foto" style="--foto: url({item.imagem_exib})" />
                <span>{item.nome_exib} ({item.login})</span>
            </div>
        {/each}
    </div>

</div>




<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: stretch;
        width: 300px;
    }

    .input {
        text-align: left;
        border: none;
        background: #D9D9D9;
        padding: 10px;
        cursor: pointer;
        pointer-events: none;
    }

    .foto {
        height: 30px;
        width: 30px;
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        border-radius: 50%;
    }

    .lista {
        margin-top: 10px;
        outline: 3px solid #D9D9D9;
        border-radius: 10px;
        max-height: 150px;
        overflow: hidden auto;
        background: white;
    }

    .lista .item:nth-child(odd) {
        background: #e7e7e7;
    }
    .lista .item {
        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .lista .item:hover {
        background: #a7a7a7;
    }

    span {
        text-align: left;
        text-transform: capitalize;
        margin-left: 10px;
        padding-bottom: 5px;
    }
</style>