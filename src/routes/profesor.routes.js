import { Router } from 'express';
import { profesorController } from '../controllers/profesor.controller.js';

const profesorRoutes = Router();

profesorRoutes.get('/profesor', profesorController.findAll); // Muestra todos los profesores
profesorRoutes.get('/profesor/:id', profesorController.findOne); // Muestra un profesor en particular
//profesorRoutes.get('/profesor/:id/materia'); // Muestra las materias de un profesor

profesorRoutes.post('/profesor', profesorController.create);
profesorRoutes.post('/profesor/:id/matricular', profesorController.insAlum); // Profesor matricula a un alumno a una materia
//profesorRoutes.post('/profesor/:id/materia/:id/tarea'); // Profesor sube una tarea a una materia

export default profesorRoutes;