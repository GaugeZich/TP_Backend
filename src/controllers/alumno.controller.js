import { request,response } from "express";
import { getConnection } from "../database/database.js";


// traer a todos los alumnos
const getAll = async(req = request, res =  response) =>{
    const connection  = await getConnection();
    
    const [result] = await connection.query('SELECT * FROM usuario WHERE rol = "alumno"');
    res.status(201).json({ok: true, result,msg : 'Lista de alumnos obtenida'});
}

const getId = async(req = request, res = response) =>{
    const idParam = req.params.id;
    const connection = await getConnection();

    const [result] = await  connection.query( 'SELECT * FROM usuario where id = ?', [idParam]);
    
    const rol = result[0].rol
    if (rol !== 'alumno'){
        return res.status(401).json({ok: false, msg: 'Este usuario no es un alumno'});
    }

    res.status(201).json({ok: true, result,msg : 'Alumno obtenido'});
}

// Crear usuario alumno
const create = async (req = request, res = response) => {
    const { nombre, email } = req.body;
    const connection = await getConnection();
    try {
        const [result] = await connection.query('INSERT INTO usuario (nombre, email, rol) VALUES (?, ?, 2)', [nombre, email]);
        res.status(201).json({ message: 'Alumno creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el alumno' });
    }
}

// Consultar tareas del alumno
const tarea = async (req = request, res = response) => {
    const connection = await getConnection();
    const {usuarioID}= req.body;
    try {
        const [result] = await connection.query('SELECT * FROM tarea WHERE usuarioID = ?', [usuarioID]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas para este alumno' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }               
}

// Entregar tarea
const entregarTarea = async (req = request, res = response) => {
    const connection = await getConnection();
    const { tareaID, usuarioID } = req.body;
    try {
        const [result] = await connection.query('INSERT INTO entrega (tareaID, usuarioID) VALUES (?, ?)',
            [tareaID, usuarioID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece a este alumno' });
        }
        res.status(200).json({ message: 'Tarea entregada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al entregar la tarea' });
    }
}

// alumno se matricula en una materia
const matricularMateria = async (req = request, res = response) => {
    const connection = await getConnection();
    const { usuarioID, materiaID } = req.body;
    try {
        const [result] = await connection.query('INSERT INTO matricula (usuarioID, materiaID) VALUES (?, ?)', [usuarioID, materiaID]);
        res.status(201).json({ message: 'Materia matriculada correctamente', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al matricular en la materia' });
    }
}

// Ver materias matriculadas por el alumno
const verMateriaMatriculada = async(req = request, res = response) => {
    const connection = await getConnection()
    const usuarioID = req.params.id;
    try {
        const [result] = await connection.query('SELECT * FROM matricula WHERE usuarioID = ?', [usuarioID]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias matriculadas para este alumno' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las materias matriculadas' });
    }
}



// Exportar las funciones del controlador
export const alumnoController = {
    getAll,
    getId,
    create,
    tarea,
    entregarTarea,
    verMateriaMatriculada,
    matricularMateria,
};