import { request, response } from 'express';
import { getConnection } from '../database/database.js';

/* 
  Metodos GET:
*/

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
  );

  // Guardar los datos del objeto unico
  const user = result[0];

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


// Mostrar las materias de un profesor
const seeMats = async (req = request, res = response) => {
  // Guardamos el parametro de la URL
  const idParam = req.params.id;

  // Conexion con la base de datos
  const connection = await getConnection();

    // Consulta SQL para el rol de un usuario por su ID
  const [resultRol, raw] = await connection.query('SELECT rol FROM usuario WHERE id = ?',
    [idParam]
  );

  // Guardamos el rol del objeto unico
  const rol = resultRol[0].rol;

  // Comprobación de profesor
  if (rol !== "profesor"){
    return res.status(401).json({ok: false, msg: 'El usuario ingresado no es profesor'});
  }

  // Consulta SQL para traer toda la información de la materia segun el ID del profesor
  const [result, raw2] = await connection.query('SELECT * FROM materia WHERE usuarioId = ?',
    [idParam]
  );

  // Devolver el resultado
  res.status(201).json({ ok: true, result, msg: 'Approved' });
}


/* 
  Metodos POST:
*/

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
    ProfesorID
  ]);

  // Consulta SQL para posterior comprobación de si la materia es del profesor
  const [resultMat, raw2] = await connection.query('SELECT * FROM materia WHERE id = ? AND usuarioID = ?',
    [MateriaID, ProfesorID]
  )

  // Consulta SQL para posterior comprobación de alumno
  const [resultRolAlum, raw3] = await connection.query('SELECT rol FROM usuario WHERE id = ?',[
    UsuarioID
  ]);

  // Guardamos los datos del objeto unico. traemos el rol de los usuarios y la materia
  const rol = resultRol[0].rol;
  const mat = resultMat[0];
  const rolAlum = resultRolAlum[0].rol;

  // Comprobación de profesor
  if (rol !== "profesor"){
    return res.status(401).json({ok: false, msg: 'El usuario ingresado no es profesor'});
  }

  // Comprobación de si la materia es del profesor 
  if(!mat){
    return res.status(401).json({ok: false, msg: 'La materia no es del profesor'});
  }

  // Comprobación de alumno
  if(rolAlum !== "alumno"){
    return res.status(401).json({ok:false, msg: 'El usuario a matricular no es alumno'});
  }

  // Consulta SQL para insertar la matricula
  const [result] = await connection.query(
    'INSERT INTO matricula(usuarioID, materiaID) VALUES (?, ?)',
    [UsuarioID, MateriaID] 
  );

  // Devolver el resultado
  res.status(201).json({ ok: true, result, msg: 'Approved' });
};

// Profesor sube tarea
const insTarea = async (req = request, res = response) => {
  // Conexion con la base de datos
  const connection = await getConnection();

  // Guardamos ambos parametros enviados por la URL (Id para profesor y materia)
  const profesorID = req.params.id;
  const materiaID = req.params.id2;

  // Guardamos los datos enviados en el body
  const {titulo, descripcion, fechaEntrega} = req.body;

  // Consulta SQL para posterior comprobación de profesor
  const [resultRol, raw] = await connection.query('SELECT rol FROM usuario WHERE id = ?',[
    profesorID
  ]);

  // Consulta SQL para comprobación de si la materia es del profesor
  const [resultMat, raw2] = await connection.query('SELECT * FROM materia WHERE id = ? AND usuarioID = ?',
    [materiaID, profesorID]
  )

  // Guardamos los datos del objeto unico
  const rol = resultRol[0].rol;
  const mat = resultMat[0];

  // Comprobación de profesor
  if (rol !== "profesor"){
    return res.status(401).json({ok: false, msg: 'El usuario ingresado no es profesor'});
  }

  // Comprobación de si la materia es del profesor 
  if(!mat){
    return res.status(401).json({ok: false, msg: 'La materia no es del profesor'});
  }

  // Consulta SQL para agregar la tarea
  const [resultTar, raw3] = await connection.query('INSERT INTO tarea(titulo, descripcion, fechaEntrega, usuarioID, materiaID) VALUES (?,?,?,?,?)',
    [titulo, descripcion, fechaEntrega, profesorID, materiaID]
  )

  // Respuesta del resultado
  res.status(201).json({ok: true, msg: "La tarea se ha subido correctamente"})
}


export const profesorController = {findAll, findOne, seeMats, create, insAlum, insTarea};