<script> 
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';
    $tituloDaPagina = "lista";

    import UserListItem from '$components/UserListItem.svelte';
    import BlockPanel from '$components/BlockPanel/index.js';
    import gotoIf from '$src/lib/gotoIf.js';
    import { page } from '$app/stores'; 

    export let data;

    let {  sucesso, professores } = data; 
    let { usuario, erro, turmas } = $page.data;



    let mostrarModal = false;


    gotoIf(!usuario.id, '/login'); // se não estiver logado vai para login


    const remover = (turma) => {
        let confirmar = confirm("Tem cecrteza que quer remover '" + turma.nome + "'?");

        if(!confirmar){
            return;
        }

        const input = (name, value) => {
            let input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = value;

            form.append(input);
        }
        
        let form = document.createElement("form");
        form.method = "POST";
        form.action = "./turmas";

        input("executar", "DELETE");
        input("id", turma.id);
        input("nome", turma.nome);

        document.body.append(form);

        form.submit();
    }
</script>
{#if usuario.id}

    <div class="wrapper">
        <BlockPanel.Panel>
            <div class="lista">
                <div class="titulo">
                    <BlockPanel.Title> Turmas </BlockPanel.Title>
                </div>

                
                {#if erro}
                    <div class="erro">
                        {erro}
                    </div>
                {/if}
                {#if sucesso}
                    <div class="sucesso">
                        {sucesso}
                    </div>
                {/if}
                
                {#each turmas as turma}
                    <div class="list">
                        <div class="item">
                            <UserListItem onClick={() => remover(turma)} adminEstaVendo={usuario.tipo == "admin"} usuario={{
                                nome_exib: turma.nome,
                                imagem_exib: "https://static.vecteezy.com/system/resources/previews/002/219/582/non_2x/illustration-of-book-icon-free-vector.jpg"
                            }} />
                        </div>
                    </div>
                {:else}
                    <div class="vazio">
                        <BlockPanel.Title> Esta lista esta vazia! </BlockPanel.Title> 
                    </div>
                {/each}

            </div>

            {#if usuario.tipo == "admin"}
                <div class="adicionar">
                    <BlockPanel.Button onClick={()=>(mostrarModal = true)} opcoesBotao={{value: "adicionar novo"}}></BlockPanel.Button>
                </div>
            {/if}
        </BlockPanel.Panel>
    </div>
    
    {#if usuario.tipo == "admin"}
        <div class="wrapper modal" style="display: {mostrarModal? "block": "none"}">
                
            <BlockPanel.Panel>
                <div class="titulo">
                    <BlockPanel.Title> Adicionar turma </BlockPanel.Title>
                </div>

                <button class="fechar" aria-hidden on:click={() => mostrarModal = false}>FECHAR</button>
                
                <form class="adicionarForm" method="POST">
                    <div class="input">
                        <BlockPanel.Input title="Nome" iptOptions={{
                            name: "nome",
                            type: "text",
                            placeholder: "Digite o nome da turma...",
                            required: true,
                        }} /> 
                    </div>

                    <div class="input">
                        <BlockPanel.UserListSlection 
                            title="Professor" 
                            placeholder="Nem um professor selecionado." 
                            name="id_professor"
                            lista={professores} />
                    </div>

                    <div class="input">
                        <BlockPanel.Textarea title="Descrição" iptOptions={{
                            name: "descricao",
                            placeholder: "Digite o nome da turma...",
                            required: true,
                        }} /> 
                    </div>

                    <div class="adicionar">
                        <BlockPanel.Button opcoesBotao={{value: "adicionar novo"}}></BlockPanel.Button>
                    </div>
                </form>

            </BlockPanel.Panel>
            
        </div>
    {/if}

{:else}
    <h1> Usuario não logado. Redirecionando para login... </h1>
{/if}

<style>
    .wrapper {
        padding: 20px;
    }

    .modal {
        position: fixed;
        overflow-y: auto;
        top: 0;
        width: calc(100% - 400px);
        height: calc(100% - 220px);
        background: #00000078;
        backdrop-filter: blur(10px);
        padding-top: 200px;
        padding-right: 200px;
        padding-left: 200px;
    }

    .titulo {
        text-align: center;
        margin-bottom: 70px;
        margin-top: 20px;
    }

    .vazio {
        text-align: center;
        margin-bottom: 150px;
    }

    .adicionar {
        text-align: center
    }

    .adicionarForm {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .adicionarForm .input {
        margin-bottom: 30px;
    }

    .modal .fechar {
        padding: 10px;
        background: red;
        border: none;
        border-radius: 20px;
        font-weight: bolder;
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        right: 50%;
        top: 100px;
        transform: translateX(50%);
    }
    .modal .fechar:hover {
        background: rgb(255, 114, 114);
    }
    .modal .fechar:active {
        background: rgb(127, 0, 0);
    }


    .erro, .sucesso {
        background: red;
        padding: 20px;
        color: white;
        font-weight: bolder;
        border-radius: 20px;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .sucesso {
        background: green;
    }
</style>