import query, { listaAlunos } from '$src/db';
import { redirect } from '@sveltejs/kit';



/** @type {import('./$types').LayoutServerLoad} */
export async function load({url}) {
    let sucesso = url.searchParams.get('sucesso'); 


	let turmas = await query(`
		SELECT *
		FROM Turmas;
	`);

	let professores = await query(`
		SELECT *
		FROM Usuarios
		WHERE tipo = 'professor';
	`);

	return {
		sucesso,
		turmas,
		professores
	};
}

export const actions = {
	default: async ({request}) => {
		let valoresDoForm = await request.formData();
	
		var body = {};
		valoresDoForm.forEach(function(value, key){
			body[key] = value;
		});

		if(body.executar == "DELETE") {
			await query(`
				DELETE FROM Turmas WHERE id=${body.id};
			`);

			// apagar relacionamentos
			await query(`
				DELETE FROM ${" `Aluno-Turma`"} WHERE id_turma=${body.id};
			`);


			throw redirect(302, '/lista/turmas?sucesso='+ encodeURI('Turma "' + body.nome + '" removida com sucesso!'));
		

			
		} else {
			let turmaExiste = await query(`
				SELECT *
				FROM Turmas
				WHERE nome = '${body.nome}';
			`);

			if(turmaExiste.length){

				throw redirect(302, './turmas?erro='+encodeURI('A turma "'+ body.nome +'" já existe!'));

			} else {
				await query(`
					INSERT INTO Turmas (id_professor, nome, descricao)
					VALUES (
						'${body.id_professor}',
						'${body.nome}',
						'${body.descricao}'
					);
				`);
			}

			throw redirect(302, './turmas?sucesso='+encodeURI('Turma "'+ body.nome +'" registrada com sucesso!'));
		}
	}
};