import { request, response } from 'express';
import { getConnection } from '../database/database.js';

//Crear usuario profesor
const create = async (req = request, res = response ) => {
  const connection = await getConnection();
  const { nombre, email } = req.body;

  const [result] = await connection.query(
    'INSERT INTO usuario(nombre, email, rol) VALUES (?, ?, 1)',
    [nombre, email] 
  );

  res.status(201).json({ ok: true, result, msg: 'Approved' });
};



//Matricular alumno
const insAlum = async (req = request, res = response ) => {
  const connection = await getConnection();
  const {UsuarioID, MateriaID } = req.body;

  const [result] = await connection.query(
    'INSERT INTO matricula(usuarioID, materiaID) VALUES (?, ?)',
    [UsuarioID, MateriaID] 
  );

  res.status(201).json({ ok: true, result, msg: 'Approved' });
};



export const profesorController = {create, insAlum};