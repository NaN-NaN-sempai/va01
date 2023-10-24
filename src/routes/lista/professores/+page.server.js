import query, { listaAlunos } from '$src/db';



/** @type {import('./$types').LayoutServerLoad} */
export async function load({url}) {
    let sucesso = url.searchParams.get('sucesso'); 


	let professores = await query(`
		SELECT *
		FROM Usuarios
		WHERE tipo = 'professor';
	`);

	professores.forEach(v => v.senha = null);

	return {
		sucesso,
		professores
	};
}