import session from '$src/lib/session';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
    let erro = url.searchParams.get('erro'); 
	const usuario = session(cookies).get(); 
    

	return {
		usuario,
		erro
	};
}