import { server, PORT } from './server.js';

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});