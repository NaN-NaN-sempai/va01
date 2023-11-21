import query from '$src/db';
import session from '$src/lib/session';
import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').LayoutServerLoad} */
export async function load({url, params, cookies}) {
    let ATVsucesso = url.searchParams.get('ATVsucesso'); 
    let ALNsucesso = url.searchParams.get('ALNsucesso'); 


    let turmaId = params.id;


    let turma = (await query(`
        SELECT *
        FROM Turmas
        WHERE id='${turmaId}';
    `))[0];

    if(!turma){
        throw redirect(404, './');
    }

    let professor = (await query(`
        SELECT *
        FROM Usuarios
        WHERE id='${turma.id_professor}';
    `))[0];
    

    let aluno_turma = await query(`
        SELECT *
        FROM ${" `Aluno-Turma`"}
        WHERE id_turma='${turmaId}';
    `);

    let alunosDaTurma = [];

    for(let relacao of aluno_turma){
        alunosDaTurma.push((await query(`
            SELECT *
            FROM Usuarios
            WHERE id='${relacao.id_aluno}';
        `))[0]);
    }



    let alunos = await query(`
        SELECT *
        FROM Usuarios
        WHERE tipo='aluno';
    `);

    let atividades = await query(`
        SELECT *
        FROM Atividades
        WHERE id_turma = '${turma.id}';
    `);

    for(let atividade of atividades){
        atividade.feitos = [];
        //atividade.arquivo = [];

        let relacoes = await query(`
            SELECT *
            FROM ${" `Aluno-Atividade`"}
            WHERE id_atividade = '${atividade.id}'
        `);

        for(let relacao of relacoes){   
            let aluno = (await query(`
                SELECT *
                FROM Usuarios
                WHERE id='${relacao.id_aluno}';
            `))[0];

            if(aluno) {
                aluno.senha = null;
            }
    
            aluno.arquivo = relacao.arquivo;
            atividade.feitos.push(aluno);
        }
    }


    
    let aluno_atividade = await query(`
        SELECT *
        FROM ${" `Aluno-Atividade`"};
    `);

	return {
        ATVsucesso, ALNsucesso,
        turma,
        professor,
        atividades,
        aluno_atividade,
        alunosDaTurma,
        alunos
	};
};


export const actions = {
	default: async ({request}) => {
		let valoresDoForm = await request.formData();
	
		var body = {};
		valoresDoForm.forEach(function(value, key){
            body[key] = value;
		});

        if(body.operacao == "atividade"){

            if(body.acao == "post" ){

                await query(`
                    INSERT INTO Atividades (id_turma, valor, titulo, descricao, arquivo)
                    VALUES (
                        '${body.id_turma}',
                        '${body.valor}',
                        '${body.titulo}',
                        '${body.descricao}',
                        '${body.arquivo}'
                    );
                `);
                
			    throw redirect(302, './'+body.id_turma+'?ATVsucesso='+encodeURI('Atividade "'+ body.titulo +'" registrada com sucesso!'));

            } else if(body.acao == "delete") {

                let atividade = JSON.parse(body.atividade);

                await query(`
                    DELETE FROM Atividades
                    WHERE id=${atividade.id};
                `);

			    throw redirect(302, './'+atividade.id_turma+'?ATVsucesso='+encodeURI('Atividade "'+ atividade.titulo +'" removida com sucesso!'));
            }
        } else if(body.operacao == "relacao") {

            if(body.acao == "post") {
                body.atividade = JSON.parse(body.atividade);
                body.usuario = JSON.parse(body.usuario);
                
                await query(`
                    INSERT INTO ${" `Aluno-Atividade`"} (id_aluno, id_atividade, arquivo)
                    VALUES (
                        '${body.usuario.id}',
                        '${body.atividade.id}',
                        '${body.arquivo}'
                    );
                `);


                throw redirect(302, './'+body.atividade.id_turma+'?ATVsucesso='+encodeURI('Atividade "'+ body.atividade.titulo +'" marcada como "feito"!'));
            } else if(body.acao == "delete") {
                body.atividade = JSON.parse(body.atividade);

                await query(`
                    DELETE FROM ${" `Aluno-Atividade`"}
                    WHERE id_aluno='${body.id_aluno}' AND id_atividade='${body.id_atividade}';
                `);


                throw redirect(302, './'+body.atividade.id_turma+'?ATVsucesso='+encodeURI('Atividade "'+ body.atividade.titulo +'" marcada como "não feito"!'));
            }
        } else if(body.operacao == "alunos") {
            if(body.acao == "post") {
                
                body.alunos = JSON.parse(body.alunos);

                for(let id of body.alunos){
                    console.log(id);
                    await query(`
                        INSERT INTO ${" `Aluno-Turma`"} (id_aluno, id_turma)
                        VALUES (
                            '${id}',
                            '${body.id_turma}'
                        );
                    `);
                }

                throw redirect(302, './'+body.id_turma+'?ALNsucesso='+encodeURI(body.alunos.length + ' aluno'+(body.alunos.length != 1? "s":"")+ ' adicionado a esta turma com sucesso!'));
            } else if(body.acao == "delete") {
                body.aluno = JSON.parse(body.aluno);           

                await query(`
                    DELETE FROM ${" `Aluno-Turma`"}
                    WHERE id_aluno='${body.id_aluno}' AND id_turma='${body.id_turma}';
                `);

                throw redirect(302, './'+body.id_turma+'?ALNsucesso='+encodeURI('Aluno "' + body.aluno.login + '" removido desta turma com sucesso!'));

            }
        }

    }
};