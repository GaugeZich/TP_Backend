import { request,response } from "express";
import { getconnection } from "../database/database.js";

// Crear usuario alumno
const create = async (req = request, res = response) => {
    const { nombre, apellido, email } = req.body;
    const connection = await getconnection();
    try {
        const [result] = await connection.query('INSERT INTO usuarios (nombre, apellido, email) VALUES (?, ?, ?)', [nombre, apellido, email]);
        res.status(201).json({ message: 'Alumno creado', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el alumno' });
    }
}


const tarea = async (req = request, res = response) => {
    const connection = await getconnection();
    const {usuarioID}= req.body;
    try {
        const [result] = await connection.query('SELECT * FROM tareas WHERE usuarioID = ?', [usuarioID]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas para este alumno' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
}


const entregarTarea = async (req = request, res = response) => {
    const connection = await getconnection();
    const { tareaID, usuarioID } = req.body;
    try {
        const [result] = await connection.query('UPDATE tareas SET entregada = 1 WHERE id = ? AND usuarioID = ?', [tareaID, usuarioID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada o no pertenece a este alumno' });
        }
        res.status(200).json({ message: 'Tarea entregada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al entregar la tarea' });
    }
}


export const alumnoController = {
    create,
    tarea,
    entregarTarea
};