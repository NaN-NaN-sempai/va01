const session = cookies => ({
    get(){
        let user = cookies.get("usuarioLogado");     

        // se usuario estiver na sessão, atualizar tempo para expirar
        if(user) session(cookies).set(JSON.parse(user));
        // se não, passa um objeto vazio como string
        else user = "{}";

        // transforma a string em objeto e retorna na função
        return JSON.parse(user);
    },

    set(user, maxAge){
        let days = 15;
        let time = days * 24 * 60 * 60; 

        cookies.set("usuarioLogado", JSON.stringify(user), {
            path: "/",
            maxAge: maxAge && time,
        });
    }
})

export default session;