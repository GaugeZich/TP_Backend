import { Router } from 'express';
import { alumnoController } from '../controllers/alumno.controller.js';

const alumnoRoutes = Router();


alumnoRoutes.get('/alumno', alumnoController.getAll); // Todos los alumnos
alumnoRoutes.get('/alumno/:id', alumnoController.getId); // Un alumno
alumnoRoutes.get('/alumno/:id/tarea', alumnoController.tarea); // Tareas del alumno
alumnoRoutes.get('/alumno/:id/materia', alumnoController.verMateriaMatriculada); // Materias del alumno

alumnoRoutes.post('/alumno', alumnoController.create); // Crear alumno
alumnoRoutes.post('/alumno/entregar', alumnoController.entregarTarea); // Entregar tarea
alumnoRoutes.post('/alumno/matricula', alumnoController.matricularMateria); // Matricularse

export default alumnoRoutes;