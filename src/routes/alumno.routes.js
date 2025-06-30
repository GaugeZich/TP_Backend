import { Router } from 'express';
import { alumnoController } from '../controllers/alumno.controller.js';

const alumnoRoutes = Router();

userRoutes.get('/alumno'); // Muestra todos los alumnos
userRoutes.get('/alumno/:id'); // Muestra un alumno en particular
userRoutes.get('/alumno/:id/materia'); // Muestra las materias de un alumno

userRoutes.post('/alumno/:id/tarea/:id'); // Alumno carga una tarea

export default userRoutes;