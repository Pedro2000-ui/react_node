import { createServer } from 'http';
import { parse } from 'url';
import { readFile, readFileSync } from 'fs';

export const PORT = 3000;
export const server = createServer((req, res) => {
    const url = parse(req.url, true);
    const pathname = url.pathname;

    switch (pathname) {
        case '/teste':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Teste deu ok');
            break;

        case '/nome':
            if (url.query.usuario) {
                const usuario = url.query.usuario;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Olá  ${usuario}`);
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Erro: parâmetro "usuario" não fornecido.');
            }
            break;

        case '/arquivosync':
            const data = readFileSync('arquivos/arquivo.txt');
            try {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
                // console.log(data);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao ler o arquivo');
            }
            // console.log("Teste sinc");
            break;

        case '/arquivoasync':
            readFile('arquivos/arquivo.txt', 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Erro ao ler o arquivo de forma assíncrona');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
                    // console.log(data);
                }
            });
            // console.log("Teste assinc");
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Rota não encontrada');
            break;
    }
});
