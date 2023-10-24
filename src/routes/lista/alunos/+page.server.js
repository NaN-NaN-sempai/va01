import query, { listaAlunos } from '$src/db';



/** @type {import('./$types').LayoutServerLoad} */
export async function load({url}) {
    let sucesso = url.searchParams.get('sucesso'); 

	return {
		sucesso,
		alunos: await listaAlunos()
	};
}