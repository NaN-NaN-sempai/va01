<script>
    import BlockPanel from '$components/BlockPanel'; 
    import tituloDaPagina from '$src/lib/tituloDaPagina.js';

    $tituloDaPagina = "Nosso Site";

    import { page } from '$app/stores';
    import gotoIf from '$src/lib/gotoIf';

    let { usuario, erro } = $page.data;  

    gotoIf(usuario.id, "/"); // se estiver logado, volta proinicio

    let iptLogin = {
        name: "login",
        type: "text",
        placeholder: "Digite seu Login...",
        required: true,
    }
    let iptSenha = {
        name: "senha",
        type: "password",
        placeholder: "Digite sua Senha...",
        required: true,
    }
    let botaoEntrar = { 
        value: "Entrar",
    }
</script>

<div class="login">
    <BlockPanel.Panel>
        <form class="center" method="POST" action="/login/validar">
            <BlockPanel.Title> Login </BlockPanel.Title> 

            {#if erro == "sim"}
                <div class="erro">
                    Usuario ou Senha incorreta.
                </div>
            {/if}

            <div class="input">
                <BlockPanel.Input value="admin" title="Login" iptOptions={iptLogin} />
                <BlockPanel.Input value="senha" title="Senha" iptOptions={iptSenha} />
            </div>
            <BlockPanel.Button opcoesBotao={botaoEntrar} />
        </form>
    </BlockPanel.Panel>
</div>

<div>
    <BlockPanel.Panel>
        <BlockPanel.Title> Bem vindo ao nosso Site </BlockPanel.Title> 

        Venha conhecer
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ad nulla perspiciatis pariatur obcaecati quasi explicabo doloremque aperiam assumenda dolorum autem voluptatum consequuntur, itaque dignissimos eum exercitationem odio esse magni.
    </BlockPanel.Panel>
</div>

<style>
    .login { 
        margin: 25px;
    }
    .erro {
        background: red;
        padding: 20px;
        color: white;
        font-weight: bolder;
        border-radius: 20px;
        margin-top: 20px;
    }
    .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input {
        margin: 20px 0;
        display: grid;
        grid-gap: 20px;
    }
</style>