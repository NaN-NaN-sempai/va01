<script> 
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';
    $tituloDaPagina = "inicio";

    import { page } from '$app/stores';

    import { goto } from '$app/navigation';
    import BlockPanel from '$components/blockPanel/index.js'; 
    import gotoIf from '$src/lib/gotoIf.js';

    export let data;
    let { turmas, aluno_turma } = data;
    let { usuario, erro } = $page.data;  

    let turmasParaMostrar = turmas;

    if(usuario.tipo == "aluno"){
        let turmasDoAluno = aluno_turma.filter(at => at.id_aluno == usuario.id).map(at => at.id_turma);

        turmasParaMostrar = turmas.filter(t => turmasDoAluno.includes(t.id));

    } else if(usuario.tipo == "professor") {
        turmasParaMostrar = turmas.filter(t => t.id_professor == usuario.id);
    }

    gotoIf(!usuario.id, './login'); // se não estiver logado vai para login

</script>
{#if usuario.id}

    <div class="wrapper">
        {#if erro}
            <div class="erro">
                <h2>{ erro }</h2>
            </div>
        {/if}

        {#if usuario.tipo == "admin"}
            <div class="content">                
                <BlockPanel.Panel>
                    <div class="admin">
                        <div class="titulo">
                            <BlockPanel.Title> Painel do administrador </BlockPanel.Title>
                        </div>

                        <div class="acao">
                            <h3> Adicione ou remova Alunos </h3>
                            <BlockPanel.Button onClick={() => goto("/lista/alunos")} opcoesBotao={{value:"Lista de Alunos"}}/>
                        </div>

                        <div class="acao">
                            <h3> Adicione ou remova Professores </h3>
                            <BlockPanel.Button onClick={() => goto("/lista/professores")} opcoesBotao={{value:"Lista de Professores"}}/>
                        </div>

                        <div class="acao">
                            <h3> Adicione ou remova Turmas </h3>
                            <BlockPanel.Button onClick={() => goto("/lista/turmas")} opcoesBotao={{value:"Lista de Turmas"}}/>
                        </div>
                    </div>
                </BlockPanel.Panel>
            </div>
        {/if}

        <div class="content">
            
            <BlockPanel.Panel>
                <div class="admin">
                    <div class="titulo">
                        <BlockPanel.Title> Suas turmas </BlockPanel.Title>
                    </div>

                    <div class="listaTurma">
                        {#each turmasParaMostrar as turma }
                            <a class="turmaItem" href="./turma/{turma.id}">
                                
                                <div class="foto"  style="--foto: url(https://static.vecteezy.com/system/resources/previews/002/219/582/non_2x/illustration-of-book-icon-free-vector.jpg)" />

                                <h2 class="nome"> {turma.nome} </h2>
                            </a>
                        {:else}
                            <div class="turmaItem">
                                
                                <div class="foto"  style="--foto: url(https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/cancellation-x.png)" />

                                <h2 class="nome"> Sem turmas no momento </h2>
                            </div>
                        {/each}
                    </div>
                </div>
            </BlockPanel.Panel>
        </div>
        
    </div>

{:else}
    <h1> Usuario não logado. Redirecionando para login... </h1>
{/if}

<style>
    .wrapper {
        padding: 20px;
    }

    .listaTurma {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .listaTurma .turmaItem {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: linear-gradient(to right bottom, #d9d9d9, white);
        border-radius: 40px;
        padding: 10px;
        margin: 10px;
        text-decoration: none;
        color: black;
    }
    .listaTurma .turmaItem:hover {
        background: #d9d9d9;
    }

    
    .nome {
        font-weight: bolder;
        font-size: 25px;
        text-align: left;
        margin-left: 20px;
    }

    .foto {
        width: 10px;
        height: 10px;
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 20px;
        border-radius: 50%;
    }

    .content {
        margin-bottom: 20px;;
    }

    .admin .titulo {
        text-align: center;
        margin-bottom: 70px;
        margin-top: 20px;
    }

    .erro {
        text-align: center;
        background: red;
        padding: 20px;
        color: white;
        font-weight: bolder;
        border-radius: 20px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    .admin .acao {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 50px;
        padding-left: 20px;
        padding-right: 20px;
    }
</style>