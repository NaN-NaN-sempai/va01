import query, { listaAlunos } from '$src/db';
import { redirect } from '@sveltejs/kit';



/** @type {import('./$types').LayoutServerLoad} */
export async function load({url}) {
    let sucesso = url.searchParams.get('sucesso'); 


	let turmas = await query(`
		SELECT *
		FROM Turmas;
	`);

	let aluno_turma = await query(`
        SELECT *
        FROM ${" `Aluno-Turma`"};
    `);



	return {
		sucesso,
        aluno_turma,
		turmas
	};
};