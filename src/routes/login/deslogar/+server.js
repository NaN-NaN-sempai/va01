import session from '$src/lib/session';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
    session(cookies).set({}, 0);

    return new Response('Redirect', {status: 303, headers: { Location: '/login' }});

}