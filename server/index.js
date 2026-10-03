import Database from 'better-sqlite3';
import express from 'express';

const db = new Database('./db/usuarios.db');

const init = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL
  )
`;

db.exec(init);

const app = express();

app.use(express.json());

app.post('/api/login', (req, res) => {
  console.log(req.body)
  const { correo, contraseña } = req.body;
  const usuario = db.prepare('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?').get(correo, contraseña);
  res.json(usuario);
});

app.post('/api/registro', (req, res) => {
  console.log(req.body)
  const { correo, contraseña } = req.body;
  const usuario = db.prepare('INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)').run(correo, contraseña);
  res.json({ ok: true, usuario: usuario });
});

app.listen(3000, () => {
  console.log('DB funcionando');
});