import { Router } from 'express';
import { alumnoController } from '../controllers/alumno.controller.js';

const alumnoRoutes = Router();

userRoutes.get('/alumno');
userRoutes.get('/alumno/:id');
userRoutes.get('/alumno/:id/materia');

userRoutes.post('/alumno/:id/tarea/:id');

export default userRoutes;