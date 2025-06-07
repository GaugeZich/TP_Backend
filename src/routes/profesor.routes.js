import { Router } from 'express';
import { profesorController } from '../controllers/profesor.controller.js';

const profesorRoutes = Router();

//userRoutes.get('/profesor'); // Muestra todos los profesores
//userRoutes.get('/profesor/:id'); // Muestra un profesor en particular
//userRoutes.get('/profesor/:id/materia'); // Muestra las materias de un profesor

profesorRoutes.post('/profesor', profesorController.create);
//userRoutes.post('/profesor/:id/materia/:id/alumno/:id'); // Profesor matricula a un alumno a una materia
//userRoutes.post('/profesor/:id/materia/:id/tarea'); // Profesor sube una tarea a una materia

export default profesorRoutes;