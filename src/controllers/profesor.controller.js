import { request, response } from 'express';
import { getConnection } from '../database/database.js';


const create = async (req = request, res = response ) => {
  const connection = await getConnection();
  const { nombre, email } = req.body;

  const [result] = await connection.query(
    'INSERT INTO usuario(nombre, email, rol) VALUES (?, ?, 1)',
    [nombre, email] 
  );

  res.status(201).json({ ok: true, result, msg: 'Approved' });
};




export const profesorController = {create};