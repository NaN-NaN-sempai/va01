import { login } from '$db';
import session from '$src/lib/session';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    let valoresDoForm = await request.formData();

    var body = {};
    valoresDoForm.forEach(function(value, key){
        body[key] = value;
    });

    let usuario = await login(body);


    if(usuario == "não encontrado") {
        return new Response('Redirect', {status: 303, headers: { Location: '/login?erro=sim' }});

    } else {
        usuario.senha = null; 

        session(cookies).set(usuario);

        return new Response('Redirect', {status: 303, headers: { Location: '/' }});
    }

}