import { Router } from 'express';
import { alumnoController } from '../controllers/alumno.controller.js';

const alumnoRoutes = Router();

alumnoRoutes.get('/alumno'); // Muestra todos los alumnos
alumnoRoutes.get('/alumno/:id'); // Muestra un alumno en particular
alumnoRoutes.get('/alumno/:id/materia'); // Muestra las materias de un alumno

alumnoRoutes.post('/alumno/:id/tarea/:id'); // Alumno carga una tarea

export default alumnoRoutes; 