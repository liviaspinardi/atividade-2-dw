const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

// Rota GET (listar todas as notas)
app.get('/notas', (req, res) => {
  const notas = JSON.parse(fs.readFileSync(path.join(__dirname, 'notas.json')));
  res.json(notas);
});

// Rota POST (criar nota)
app.post('/notas', (req, res) => {
  const notas = JSON.parse(fs.readFileSync(path.join(__dirname, 'notas.json')));
  notas.push(req.body);
  fs.writeFileSync('notas.json', JSON.stringify(notas, null, 2));
  res.status(201).json({ message: 'Nota criada!' });
});

// Rota PUT (editar nota por ID)
app.put('/notas/:id', (req, res) => {
  const notas = JSON.parse(fs.readFileSync(path.join(__dirname, 'notas.json')));
  const id = req.params.id;
  notas[id] = req.body;
  fs.writeFileSync('notas.json', JSON.stringify(notas, null, 2));
  res.json({ message: 'Nota atualizada!' });
});

// Rota DELETE (excluir nota por ID)
app.delete('/notas/:id', (req, res) => {
  const notas = JSON.parse(fs.readFileSync(path.join(__dirname, 'notas.json')));
  const id = req.params.id;
  notas.splice(id, 1);
  fs.writeFileSync('notas.json', JSON.stringify(notas, null, 2));
  res.json({ message: 'Nota excluída!' });
});

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));