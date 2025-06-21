import { Router } from 'express';
import { profesorController } from '../controllers/profesor.controller.js';

const profesorRoutes = Router();

profesorRoutes.get('/profesor', profesorController.findAll); // Muestra todos los profesores
profesorRoutes.get('/profesor/:id', profesorController.findOne); // Muestra un profesor en particular
profesorRoutes.get('/profesor/:id/materias', profesorController.seeMats); // Muestra las materias de un profesor
profesorRoutes.get('/profesor/:id/materia/:id2/alumnos', profesorController.seeAlum) // Muestra los alumnos de una materia
profesorRoutes.get('/profesor/:id/entregas', profesorController.seeEnt) // Muestra las tareas entregadas en las materias de un profesor

profesorRoutes.post('/profesor', profesorController.create); // Crear profesores
profesorRoutes.post('/profesor/:id/matricular', profesorController.insAlum); // Profesor matricula a un alumno a una materia
profesorRoutes.post('/profesor/:id/materia/:id2/tarea', profesorController.insTarea); // Profesor sube una tarea a una materia

export default profesorRoutes;