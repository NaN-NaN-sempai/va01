import mysql from "mysql2";

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'valdinei',
	database: 'escola'
});

const query = (sql) => {
    return new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
            if (error) {
                throw error;
            }
        
            resolve(results);
        });
    });
}

export default query;

export const login = async ({ login, senha }) => {

    let valores = await query(`
        SELECT *
        FROM Usuarios
        WHERE login = '${login}' AND senha = '${senha}';
    `);
    
    let usuario = valores[0];

    if(!usuario) usuario = "não encontrado";

    return usuario;
} 

export const usuario = async (usuario) => {

    let valores = await query(`
        SELECT *
        FROM Usuarios
        WHERE id = '${usuario.id}';
    `);

    return valores[0];
}

export const listaAlunos = async () => {

    let valores = await query(`
        SELECT *
        FROM Usuarios
        WHERE tipo = 'aluno';
    `);

    valores.forEach(v => v.senha = null);

    return valores;
}

export const registrarUsuario = async (usuario) => {

    let operacao;

    let imagens = [
        'https://img.freepik.com/fotos-gratis/amor-romance-perfurado-coracao-de-papel_53876-87.jpg',
        'https://thumbs.dreamstime.com/b/superf%C3%ADcie-surfando-da-%C3%A1gua-onda-de-oceano-do-mar-124362369.jpg',
        'https://blog.emania.com.br/wp-content/uploads/2015/09/papers.co-ma57-rainy-city-nature-22-wallpaper.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtch8ZZl1aByQsF732-szGWhDRa5_6kzzY47XWG9myVzQgpmWjAi4hLI6AzoGXF2Z4A3Q&usqp=CAU',
        'https://focalizando.com.br/sites/default/files/2023-01/10-apps-que-vao-deixar-suas-fotos-top.jpg',
        'https://www.hypeness.com.br/1/2022/08/e4cd3b07-foto-da-lua_vijay-suddala-smartphone-moon-photography-1.jpeg',
        'https://www.frasesdobem.com.br/wp-content/uploads/2023/01/frases-legais.jpg',
        'https://img.r7.com/images/2014/09/25/5d4chntfod_3tq3rtkv75_file.jpg',
        'https://wl-incrivel.cf.tsp.li/resize/728x/jpg/19e/d08/da974d5ee9aa87ec6a57819486.jpg'
    ];

    let hex = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0').toUpperCase();

    let cor = `https://placehold.co/15x15/${hex}/${hex}.png`;


    let imagem = imagens[Math.floor(Math.random()*imagens.length)];


    let selecionado  =  (Math.random() > .5)? cor: imagem;



    try {

        await query(`
            INSERT INTO Usuarios (tipo, login, senha, nome_exib, imagem_exib)
            VALUES (
                '${usuario.tipo}',
                '${usuario.login}',
                '${usuario.senha}',
                '${usuario.nome_exib}',
                '${selecionado}'
            );
        `);

        operacao = "sucesso";

    } catch (erro) {
        operacao = erro;
    }

    return operacao;

}