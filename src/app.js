import express from 'express';
import { envs } from "./configuration/envs.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bienvenido a nuestro servidor!")
});

app.set('port', envs.PORT);

export default app;