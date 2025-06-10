import { request, response } from 'express';
import { getConnection } from '../database/database.js';

// Traer todos los profesores
const findAll = async (req = request, res = response) => {
  const connection = await getConnection();

  const [result, raw] = await connection.query('SELECT * FROM usuario WHERE rol = "profesor"');

  res.status(201).json({ok:true, result, msg: 'Approved'});
}

// Traer un profesor

const findOne = async (req = request, res = response) => {
  const idParam = req.params.id;
  const connection = await getConnection();  
  
  const [result, raw] = await connection.query('SELECT * FROM usuario WHERE id = ?',
    [idParam]
  )

  const user = result[0]

  if(!user){
    return res.status(401).json({ok: false, msg: "Usuario no encontrado"})
  }

  if(user.rol != "profesor"){
    return res.status(401).json({ok: false, msg: "El usuario no es profesor"})
  }
  
  res.status(201).json({ok:true, user, msg: 'Approved'});
}


// Crear usuario profesor
const create = async (req = request, res = response ) => {
  const connection = await getConnection();
  const { nombre, email } = req.body;

  const [result] = await connection.query(
    'INSERT INTO usuario(nombre, email, rol) VALUES (?, ?, 1)',
    [nombre, email] 
  );

  res.status(201).json({ ok: true, result, msg: 'Approved' });
};

// Matricular alumno
const insAlum = async (req = request, res = response ) => {
  const connection = await getConnection();
  const ProfesorID  = req.params.id;
  const {UsuarioID, MateriaID } = req.body;

  const [resultRol, raw] = await connection.query('SELECT rol FROM usuario WHERE id = ?',[
  ProfesorID,
  ]);

  const rol = resultRol[0].rol

  if (rol !== "profesor"){
    return res.status(401).json({ok: false, msg: 'El usuario ingresado no es profesor'})
  }

  const [result] = await connection.query(
    'INSERT INTO matricula(usuarioID, materiaID) VALUES (?, ?)',
    [UsuarioID, MateriaID] 
  );

  res.status(201).json({ ok: true, result, msg: 'Approved' });
};



export const profesorController = {findAll, findOne, create, insAlum};