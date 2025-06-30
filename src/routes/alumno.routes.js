import { Router } from 'express';
import { alumnoController } from '../controllers/alumno.controller.js';

const alumnoRoutes = Router();

alumnoRoutes.get('/alumno',alumnoController.getAll); // Muestra todos los alumnos
alumnoRoutes.get('/alumno/:id',alumnoController.getId); // Muestra un alumno en particular
alumnoRoutes.get('/alumno/:id/materia',alumnoController.verMateriaMatriculada); // Muestra las materias de un alumno
alumnoRoutes.get('/alumno/:id/tarea',alumnoController.tarea); // Muestra las tareas de un alumno


alumnoRoutes.post('/alumno/:id/tarea/:id',alumnoController.entregarTarea); // Alumno carga una tarea
alumnoRoutes.post('/alumno/:usuarioID/tarea/:tareaID/entregar', alumnoController.entregarTarea); // Alumno entrega una tarea
alumnoRoutes.post('/alumno',alumnoController.create); // Crea un alumno
alumnoRoutes.post('/alumno/tarea', alumnoController.tarea); // Alumno consulta sus tareas
alumnoRoutes.post('/alumno/materia',alumnoController.verMateriaMatriculada)// Alumno consulta sus materias matriculadas
alumnoRoutes.post('/alumno/:id/materia', alumnoController.matricularMateria); // Alumno se matricula en una materia

export default alumnoRoutes; 