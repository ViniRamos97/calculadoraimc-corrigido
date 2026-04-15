import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

////////////////////////////////////////////////////////////////////////////////////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

const arquivo = path.join(__dirname, 'dados.json');

app.use(express.json());
app.use(express.static('public'));

////////////////////////////////////////////////////////////

function lerDados() {
    try {
        const dados = fs.readFileSync(arquivo, 'utf8');
        return JSON.parse(dados);
    } catch (erro) {
        console.log("Erro ao ler arquivo:", erro);
        return [];
    }
}

function salvarDados(novoDado) {
    const dados = lerDados();
    dados.push(novoDado);

    fs.writeFileSync(
        arquivo,
        JSON.stringify(dados, null, 2)
    );

    console.log("Dados salvos!");
}

///////////////////////////////////////////////////////////////////

app.post('/salvar', (req, res) => {
    const { peso, altura, imc } = req.body;

    if (!peso || !altura || !imc) {
        return res.status(400).send("Dados inválidos!");
    }

    salvarDados({ peso, altura, imc });

    res.send("Salvo com sucesso!");
});

app.get('/ler', (req, res) => {
    const dados = lerDados();
    res.json(dados);
});

///////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});