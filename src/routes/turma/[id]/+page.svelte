<script> 
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';
    $tituloDaPagina = "Turma";

    import { page } from '$app/stores';

    import BlockPanel from '$components/blockPanel/index.js'; 
    import gotoIf from '$src/lib/gotoIf.js';

    export let data;
    let { turma, alunos, alunosDaTurma, professor, atividades, ALNsucesso, ATVsucesso, aluno_atividade } = data;
    let { usuario, erro } = $page.data; 

    gotoIf(!usuario.id, './login'); // se não estiver logado vai para login

    let modalAtividade = false;
    const removerAtividade = (atividade) => {
        
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
        form.action = "./"+turma.id;

        input("operacao", "atividade");
        input("acao", "delete");

        input("atividade", JSON.stringify(atividade))

        document.body.append(form);

        form.submit();
    }

    let mostrarAtividade = false;
    let atividadeAberta = {feitos:[]};
    

    const mostrarAtividadeFuncao = (atividade) => {
        atividadeAberta = atividade;
        mostrarAtividade = true;
    }

    const marcarFuncao = () => {
        const input = (name, value) => {
            let input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = value;

            form.append(input);
        }
        
        let form = document.createElement("form");
        form.method = "POST";
        form.action = "./"+turma.id;

        input("operacao", "relacao");
        input("acao", "post");

        input("id_aluno", usuario.id);
        input("atividade", JSON.stringify(atividadeAberta));
        input("usuario", JSON.stringify(usuario));

        document.body.append(form);

        form.submit();        
    }

    const removerFeito = () => {
        const input = (name, value) => {
            let input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                input.value = value;

            form.append(input);
        }
        
        let form = document.createElement("form");
        form.method = "POST";
        form.action = "./"+turma.id;

        input("operacao", "relacao");
        input("acao", "delete");

        input("id_aluno", usuario.id);
        input("id_atividade", atividadeAberta.id);
        input("atividade", JSON.stringify(atividadeAberta));

        document.body.append(form);

        form.submit();         
    }

    const checarAtividadeFeita = (atividade) => {
        let existe = aluno_atividade.find(a => (a.id_aluno == usuario.id && a.id_atividade == atividade.id))

        return !!existe;
    }

    let modalAlunos = false;
    let inputAlunos;

    let alunosSelecionados = [];
    let alunosSelecionadosElementos = [];

    const selecionar = (aluno, indice) => {
        if(alunosSelecionados.includes(aluno.id)){
            alunosSelecionados = alunosSelecionados.filter(a => a!=aluno.id);
        } else {
            alunosSelecionados.push(aluno.id);
        }

        alunosSelecionadosElementos[indice].classList.toggle("selecionado", alunosSelecionados.includes(aluno.id));

        inputAlunos.value = JSON.stringify(alunosSelecionados);
    }

    const removerAlunoe = (aluno) => {
        let confirmar = confirm("Tem cecrteza que quer remover '" + aluno.login + "' desta turma?");

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
        form.action = "./"+turma.id;

        input("operacao", "alunos");
        input("acao", "delete");

        input("id_aluno", aluno.id);
        input("id_turma", turma.id);
        input("aluno", JSON.stringify(aluno));

        document.body.append(form);

        form.submit();      
    }
</script>
{#if usuario.id}

    <div class="wrapper">
        {#if erro}
            <div class="erro">
                <h2>{ erro }</h2>
            </div>
        {/if}

        <div class="content">
            
            <BlockPanel.Panel>
                <div class="titulo">
                    <BlockPanel.Title> {turma.nome} </BlockPanel.Title>
                </div>

                <div class="liscente">
                    <span>Professor: </span>
                    {#if typeof professor != "undefined"}
                        <div class="foto" style="--foto: url({professor.imagem_exib})" />
                        <span class="nome">{professor.nome_exib}</span>
                    {:else}
                        <div class="foto" style="--foto: url(https://cdn-icons-png.flaticon.com/512/1828/1828843.png)" />
                        <span class="nome"> REMOVIDO  </span>
                    {/if}
                </div>

                <div class="descricao">
                    {turma.descricao}
                </div>

                <br>
                
                <div class="titulo">
                    <BlockPanel.Title> Atividades </BlockPanel.Title>
                </div>


                <div class="atividade">
                    {#if ATVsucesso}                    
                        <div class="ATVsucesso">
                            <h3>{ATVsucesso}</h3>
                        </div>
                    {/if}
                    
                    <div class="atividadeLista">
                        {#each atividades as atividade}
                                <div class="atividadeItem {checarAtividadeFeita(atividade)? "feito": ""}" aria-hidden on:click|self={()=>mostrarAtividadeFuncao(atividade)}>
                                        
                                    <div class="foto"  style="--foto: url(https://static.vecteezy.com/system/resources/previews/002/219/582/non_2x/illustration-of-book-icon-free-vector.jpg)" />

                                    <h2 class="nome"> {atividade.titulo} ({atividade.valor}) </h2>

                                    {#if ["admin", "professor"].includes(usuario.tipo)}
                                        <buttons aria-hidden on:click|self={()=>removerAtividade(atividade)} class="remover">REMOVER</buttons>
                                    {/if}
                                </div>
                        {:else}
                            <div class="vazio">
                                <h3> Sem Atividades por enquanto... </h3> 
                            </div>
                        {/each}
                    </div>

                </div>

                {#if ["admin", "professor"].includes(usuario.tipo) }
                    <div class="adicionarAtividade">
                        <BlockPanel.Button onClick={()=>modalAtividade = true} opcoesBotao={{value: "adicionar nova atividade"}}></BlockPanel.Button>
                    </div>
                {/if}
                
                <br>
                <br>
                <br>
                <br>

                
                <div class="titulo">
                    <BlockPanel.Title> Alunos </BlockPanel.Title>
                </div>
                    
                <div class="atividadeLista">
                    {#if ALNsucesso}                    
                        <div class="ATVsucesso">
                            <h3>{ALNsucesso}</h3>
                        </div>
                    {/if}

                    {#each alunosDaTurma as aluno}
                        <div class="atividadeItem alunos">
                                
                            <div class="foto"  style="--foto: url({aluno.imagem_exib})" />

                            <h2 class="nome"> {aluno.nome_exib} ({aluno.login}) </h2>

                            {#if ["admin", "professor"].includes(usuario.tipo) }
                                <buttons aria-hidden on:click|self={()=>{removerAlunoe(aluno)}} class="remover">REMOVER</buttons>
                            {/if}
                        </div>
                    {:else}
                        <div class="vazio">
                            <h3> Ainda não tem nem um aluno registrado nessa turma... </h3> 
                        </div>
                    {/each}

                    {#if ["admin", "professor"].includes(usuario.tipo)  }
                        <div class="adicionarAtividade">
                            <BlockPanel.Button onClick={()=>modalAlunos = true} opcoesBotao={{value: "adicionar alunos"}}></BlockPanel.Button>
                        </div>
                    {/if}
                </div>
                
            </BlockPanel.Panel>
        </div>
        
    </div>

    {#if ["admin", "professor"].includes(usuario.tipo) }

        <div class="wrapper modal" style="display: {modalAlunos? "block": "none"}">
                
            <BlockPanel.Panel>
                <div class="titulo">
                    <BlockPanel.Title> Adicionar alunos </BlockPanel.Title>
                </div>

                <button class="fechar" aria-hidden on:click={() => (modalAlunos = false)}>FECHAR</button>
                
                <form class="adicionarForm" method="POST" action="./{turma.id}">
                    <input type="hidden" name="operacao" value="alunos">
                    <input type="hidden" name="acao" value="post">
                    <input type="hidden" name="id_turma" value="{turma.id}">
                    
                    <input type="text" style="opacity: 0; height: 0;" name="alunos" required bind:this={inputAlunos} >

                    <h3>Selecione os Alunos</h3>

                    <div class="listaAlunos">
                        {#each alunos.filter(a => !alunosDaTurma.map(e=>e.id).includes(a.id)) as aluno, indice}
                            <div class="alunoItem" aria-hidden bind:this={alunosSelecionadosElementos[indice]} on:click={() => selecionar(aluno, indice)}>
                                <div class="foto" style="--foto: url({aluno.imagem_exib})" />
                                <span class="nome">{aluno.nome_exib} ({aluno.login})</span>
                            </div>
                        {:else}
                            <div class="alunoItem" aria-hidden on:click={() => {}}>
                                <span> Não existem alunos registrados no sistem...</span>
                            </div>
                        {/each}
                    </div>
                    <br><br>

                    <div class="adicionar">
                        <BlockPanel.Button opcoesBotao={{value: "adicionar novo"}}></BlockPanel.Button>
                    </div>
                </form>

            </BlockPanel.Panel>
            
        </div>
    {/if}
    
    <div class="wrapper modal" style="display: {modalAtividade? "block": "none"}">
                
        <BlockPanel.Panel>
            <div class="titulo">
                <BlockPanel.Title> Adicionar atividade </BlockPanel.Title>
            </div>

            <button class="fechar" aria-hidden on:click={() => (modalAtividade = false)}>FECHAR</button>
            
            <form class="adicionarForm" method="POST" action="./{turma.id}">
                <input type="hidden" name="operacao" value="atividade">
                <input type="hidden" name="acao" value="post">
                <input type="hidden" name="id_turma" value="{turma.id}">
                
                <div class="input">
                    <BlockPanel.Input title="Valor" iptOptions={{
                        name: "valor",
                        type: "number",
                        placeholder: "Digite o valor da atividade...",
                        required: true,
                    }} /> 
                </div>
                
                <div class="input">
                    <BlockPanel.Input title="Titulo" iptOptions={{
                        name: "titulo",
                        type: "text",
                        placeholder: "Digite o titulo da atividade...",
                        required: true,
                    }} /> 
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

    <div class="wrapper modal" style="display: {mostrarAtividade? "block": "none"}">
        <BlockPanel.Panel>
            <div class="titulo">
                <BlockPanel.Title> {atividadeAberta.titulo} </BlockPanel.Title>
            </div>

            <button class="fechar" aria-hidden on:click={() => (mostrarAtividade = false)}>FECHAR</button>
            
            <span> Valor: {atividadeAberta.valor}</span>
            <br>
            <br>

            <div class="descricao" style="margin-bottom: 20px;">
                {atividadeAberta.descricao}
            </div>
            
            <h3>Usuarios que fizeram esta atividade:</h3>
            <div class="listaFeitos">
            {#each atividadeAberta.feitos as feito}
            {#if feito}

                <div class="feitoItem">
                    <div class="foto" style="--foto: url({feito.imagem_exib})" />
                    <span class="nome">{feito.nome_exib}</span>

                </div>
            {:else}

                <div class="feitoItem">
                    <div class="foto" style="--foto: url(https://cdn-icons-png.flaticon.com/512/1828/1828843.png)" />
                    <span class="nome"> REMOVIDO  </span>

                </div>
            {/if}

            {:else}
                <div class="feitoItem">
                    <span class="nome"> Ninguem fez essa atividade ainda...  </span>
                </div>
            {/each}
            </div>

            <br>
            <br>
            

            {#if usuario.tipo != "professor"}
                <div class="adicionar" style="text-align: center;">
                    
                    {#if !checarAtividadeFeita(atividadeAberta)}
                        <BlockPanel.Button 
                            onClick={()=>marcarFuncao()}
                            opcoesBotao={{value: "marcar como feito"}}></BlockPanel.Button>
                    {:else}
                        <BlockPanel.Button 
                            onClick={()=>removerFeito()}
                            opcoesBotao={{value: "remover feito"}}></BlockPanel.Button>
                    {/if}
                </div>
            {/if}

        </BlockPanel.Panel>
        
    </div>

{:else}
    <h1> Usuario não logado. Redirecionando para login... </h1>
{/if}

<style>
    .wrapper {
        padding: 20px;
    }





    .listaAlunos {
        margin-top: 10px;
        outline: 3px solid #D9D9D9;
        border-radius: 10px;
        max-height: 300px;
        overflow: hidden auto;
        background: white;
    }

    .listaAlunos .alunoItem:nth-child(odd) {
        background: #e7e7e7;
    }
    .listaAlunos .alunoItem {
        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .listaAlunos .alunoItem:hover {
        background: #a7a7a7;
    }
    .listaAlunos .alunoItem:active {
        background: #636363;
    }
    :global(.listaAlunos .alunoItem.selecionado) {
        background: hsl(216, 94%, 65%) !important;
    }
    :global(.listaAlunos .alunoItem.selecionado:nth-child(odd)) {
        background: hsl(216, 65%, 51%) !important;        
    }
    :global(.listaAlunos .alunoItem.selecionado:hover) {
        background: hsl(216, 100%, 76%) !important;
    }
    :global(.listaAlunos .alunoItem.selecionado:active) {
        background: hsl(216, 51%, 44%) !important;
    }

    
    

    .listaAlunos .alunoItem .nome {
        margin-left: 20px;
    } 
    .listaAlunos .alunoItem .foto {
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 15px;
        border-radius: 50%;
    }









    .listaFeitos {
        margin-top: 10px;
        outline: 3px solid #D9D9D9;
        border-radius: 10px;
        max-height: 150px;
        overflow: hidden auto;
        background: white;
    }

    .listaFeitos .feitoItem:nth-child(odd) {
        background: #e7e7e7;
    }
    .listaFeitos .feitoItem {
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .listaFeitos .feitoItem .nome {
        margin-left: 20px;
    }

    .listaFeitos .feitoItem .foto {
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 15px;
        border-radius: 50%;
    }



    .ATVsucesso {
        background: green;
        padding: 20px;
        border-radius: 20px;
        margin-bottom: 20px;
    }


    
    .atividadeLista {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .atividadeLista .atividadeItem {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content:space-between;
        background: linear-gradient(to right bottom, #d9d9d9, white);
        border-radius: 40px;
        padding: 10px;
        margin: 10px;
        text-decoration: none;
        color: black;
    }
    .atividadeLista .atividadeItem.alunos {
        cursor: default;
    }
    .atividadeLista .atividadeItem.feito {
        background: linear-gradient(to right bottom, green, white);
    }
    .atividadeLista .atividadeItem.feito:hover {
        background: rgb(0, 82, 0);
    }
    .atividadeLista .atividadeItem:hover {
        background: #d9d9d9;
    }

    

    .atividadeLista .atividadeItem .remover {
        background: red;
        border: none;
        padding: 15px;
        border-radius: 20px;
        font-weight: bolder;
        font-size: 15px;
        cursor: pointer;
    }
    .atividadeLista .atividadeItem .remover:hover {
        background: rgb(255, 114, 114);
    }
    .atividadeLista .atividadeItem .remover:active {
        background: rgb(127, 0, 0);
    }



    .atividadeLista .atividadeItem .nome {
        font-weight: bolder;
        font-size: 25px;
        text-align: left;
        margin-left: 20px;
    }

    .atividadeLista .atividadeItem .foto {
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

    .vazio, .adicionarAtividade {
        text-align: center;
    }
    .adicionarAtividade {
        margin-top: 20px;
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
    .modal .titulo {
        text-align: center;
        margin-bottom: 70px;
        margin-top: 20px;
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

    .liscente {
        display: flex;
        align-items: center;
        margin-bottom: 20px;;
    }
    .liscente .nome {
        margin-left: 10px;
        font-weight: bold;
    }
    .liscente .foto {
        margin-left: 10px;
        background: var(--foto);
        background-size:     cover; 
        background-repeat:   no-repeat;
        background-position: center center;   
        padding: 15px;
        border-radius: 50%;
    }
    .descricao {
        user-select: text;
    }




    .content .titulo {
        text-align: center;
        margin-bottom: 40px;
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
</style>