import { createServer } from 'http';
import { parse } from 'url';


export const PORT = 3000;

const usuarioAleatorio = () => {
    return fetch('https://randomuser.me/api/')
        .then(response => {
            return response.json();
        }).catch(() => {
            throw new Error("Erro ao buscar dados!");
        })
}

const usuarios = [];
var id = 0;

export const server = createServer((req, res) => {
    const url = parse(req.url, true);

    if (url.pathname == '/addUser') {

        usuarioAleatorio().then(usuarioDados => {
            const usuario = {
                id: ++id,
                nome: `${usuarioDados.results[0].name.first} ${usuarioDados.results[0].name.last}`,
                email: usuarioDados.results[0].email,
                telefone: usuarioDados.results[0].phone,
                celular: usuarioDados.results[0].cell,
                pais: usuarioDados.results[0].nat
            }

            usuarios.push(usuario);
            res.end(JSON.stringify(
                {
                    message: `Usuário ${usuario.nome} adicionado com sucesso!`,
                    id: usuario.id
                }
            ))
        })
    }

    else if (url.pathname == '/users') {
        res.end(JSON.stringify(usuarios));
    }

    else if (req.url.startsWith("/user/")) {
        const idUsuario = parseInt(req.url.split('/')[2]);
        const usuario = usuarios.find(u => u.id === idUsuario);

        if (usuario) {
            res.end(JSON.stringify(usuario));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(
                {
                    message: "Usuário não encontrado!",
                }
            ))
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(
            {
                message: "Rota não encontrada!",
            }
        ))
    }

});