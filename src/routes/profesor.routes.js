import { Router } from 'express';
import { profesorController } from '../controllers/profesor.controller.js';

const alumnoRoutes = Router();

userRoutes.get('/profesor');
userRoutes.get('/profesor/:id')
userRoutes.get('/profesor/:id/materia');

userRoutes.post('/profesor/:id/materia/:id/alumno/:id')
userRoutes.post('/alumno/:id/tarea/:id')

export default userRoutes;