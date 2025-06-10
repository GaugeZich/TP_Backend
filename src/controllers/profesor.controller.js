import { request, response } from 'express';
import { getConnection } from '../database/database.js';

// Traer todos los profesores
const findAll = async (req = request, res = response) => {
  // Conexion con la base de datos
  const connection = await getConnection();

  // Consulta SQL para traer todos los usuarios con rol "profesor"
  const [result, raw] = await connection.query('SELECT * FROM usuario WHERE rol = "profesor"');

  // Mensaje OK con la lista de profesores
  res.status(201).json({ok:true, result, msg: 'Approved'});
}


// Traer un profesor por ID
const findOne = async (req = request, res = response) => {
  // Guardamos el parametro de la URL
  const idParam = req.params.id;

  // Conexion con la base de datos
  const connection = await getConnection();  
  
  // Consulta SQL para traer toda la información de un usuario por su ID
  const [result, raw] = await connection.query('SELECT * FROM usuario WHERE id = ?',
    [idParam]
  )

  // Guardar los datos del objeto unico
  const user = result[0]

  // Comprobación de usuario existente
  if(!user){
    return res.status(401).json({ok: false, msg: "Usuario no encontrado"})
  }

  // Comprobación de usuario rol "profesor"
  if(user.rol != "profesor"){
    return res.status(401).json({ok: false, msg: "El usuario no es profesor"})
  }
  
  // Devolver el profesor
  res.status(201).json({ok:true, user, msg: 'Approved'});
}


// Crear usuario profesor
const create = async (req = request, res = response ) => {
  // Conexion con la base de datos
  const connection = await getConnection();

  // Guardamos los datos enviados en el body de Postman
  const { nombre, email } = req.body;

  // Consulta SQL para insertar un usuario con los datos recibidos y el rol 1 (1 => profesor)
  const [result] = await connection.query(
    'INSERT INTO usuario(nombre, email, rol) VALUES (?, ?, 1)',
    [nombre, email] 
  );

  // Devolver el resultado
  res.status(201).json({ ok: true, result, msg: 'Approved' });
};

// Matricular alumno
const insAlum = async (req = request, res = response ) => {
  // Conexion con la base de datos
  const connection = await getConnection();

  // Guardamos datos: Parametros de URL (id) y de body de Postman
  const ProfesorID  = req.params.id;
  const {UsuarioID, MateriaID } = req.body;

  // Consulta SQL para posterior comprobación de profesor
  const [resultRol, raw] = await connection.query('SELECT rol FROM usuario WHERE id = ?',[
    ProfesorID,
  ]);

  // Consulta SQL para posterior comprobación de alumno
  const [resultRolAlum, raw2] = await connection.query('SELECT rol FROM usuario WHERE id = ?',[
    UsuarioID
  ]);

  // Guardamos los datos del objeto unico y traemos el rol
  const rol = resultRol[0].rol
  const rolAlum = resultRolAlum[0].rol

  // Comprobación de profesor
  if (rol !== "profesor"){
    return res.status(401).json({ok: false, msg: 'El usuario ingresado no es profesor'});
  }

  // Comprobación de alumno
  if(rolAlum !== "alumno"){
    return res.status(401).json({ok:false, msg: 'El usuario a matricular no es alumno'})
  }

  // Consulta SQL para insertar la matricula
  const [result] = await connection.query(
    'INSERT INTO matricula(usuarioID, materiaID) VALUES (?, ?)',
    [UsuarioID, MateriaID] 
  );

  // Devolver el resultado
  res.status(201).json({ ok: true, result, msg: 'Approved' });
};



export const profesorController = {findAll, findOne, create, insAlum};