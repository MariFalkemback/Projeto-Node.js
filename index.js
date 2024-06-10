const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.use(cors({
    origin:'*'
}));

app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

app.get('/sobre', (req, res) =>{
    res.send('Esta é a página sobre');
});

app.get('/tarefas', (req, res) =>{
    //Carrega o arquivo tarefas.json
    const tarefas = require('./public/tarefas.json');

    // Envia o arquivo Json como resposta
    res.json(tarefas);
});

app.post('/novatarefa',(req, res)=>{
    console.log(req.body)
    res.send('A requisição POST para novaTarefa/ chegou: '+req.body.descricao)
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
