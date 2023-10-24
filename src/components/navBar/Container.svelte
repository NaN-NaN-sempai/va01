<script>
    import { goto } from "$app/navigation";

    export let titulo = "Titulo";
    export let logado = false;
    export let usuario = "Nome";
    export let foto = "https://loja.monocard.com.br/img/uploads/sua-logo-aqui.png"; 

    const sair = () => {
        let confirmar = confirm("Deseja deslogar?");

        if(confirmar) {
            goto("/login/deslogar")
        }
    }
</script>

<div class="header">
    <div class="logo" aria-hidden on:click={() => goto("/")} />
    <h1 class="titulo"> {titulo} </h1>
    <div aria-hidden class="sair {logado? 'logado': ""}" on:click={logado? sair: ()=>{} }>
        <h3 class="nome">{usuario}</h3>
        <div class="foto" style='--foto: url({foto});' />
    </div> 
</div>

<style>
    .header {
        max-width: 100%;
        background: hsl(216, 94%, 65%); 
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    }
    .titulo {
        text-transform: uppercase;
    }
    .logo {
        width: 80px;
        height: 80px;
        background: url(https://cdn-icons-png.flaticon.com/512/171/171322.png);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 20px;
        cursor: pointer;
    }
    .sair {
        background: none;
        border: none;
        display: flex;
        align-items: center; 
        flex-direction: row;
        border-radius: 20px;
    }
    .sair.logado {
        cursor: pointer;
    }
    .sair.logado:hover {
        background: rgba(255, 0, 0, 0.437);
    }
    .foto {
        width: 40px;
        height: 40px;
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        border-radius: 50%;
        margin-left: 20px;
    }
</style>