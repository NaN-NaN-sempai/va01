import query, { registrarUsuario } from '$db';

export async function POST({ request }) {
    let valoresDoForm = await request.formData();

    var body = {};
    valoresDoForm.forEach(function(value, key){
        body[key] = value;
    });


    if(body.executar == "DELETE") {
        let { id, login, rota, tipo } = body;


        await query(`
            DELETE FROM Usuarios WHERE id=${id};
        `);

        return new Response('Redirect', {status: 303, headers: { Location: '/lista/' + rota + '?sucesso='+ encodeURI('Usuario "' + login + '" removido com sucesso!')}});
    


    } else {
        let usuarioExiste = await query(`
            SELECT *
            FROM Usuarios
            WHERE login = '${body.login}';
        `);

        if(usuarioExiste.length) {
            return new Response('Redirect', {status: 303, headers: { Location: '/lista/' + body.rota + '?erro='+ encodeURI('Usuario "' + body.login + '" já existe!')}});
        } else {

            let registro = await registrarUsuario(body);

            if(registro ==  "sucesso"){
                return new Response('Redirect', {status: 303, headers: { Location: '/lista/' + body.rota + '?sucesso='+encodeURI('Usuario "' + body.login + '" adicionado com sucesso!') }});

            } else {
                return new Response('Redirect', {status: 303, headers: { Location: '/lista/' + body.rota + '?erro='+ encodeURI('Usuario não foi adicionado:<br>') + encodeURI(registro)}});

            }

        }    
    }
}