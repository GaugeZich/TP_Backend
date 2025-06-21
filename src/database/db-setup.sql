-- Crear base de datos:
CREATE DATABASE IF NOT EXISTS escuela;
USE escuela;

-- Crear tablas:
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rol ENUM('profesor', 'alumno') NOT NULL
);

CREATE TABLE materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuarioID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT NOT NULL,
    materiaID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (materiaID) REFERENCES materia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE tarea (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fechaEntrega DATE NOT NULL,
    usuarioID INT NOT NULL,
    materiaID INT NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (materiaID) REFERENCES materia(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE entrega (
    id INT AUTO_INCREMENT PRIMARY KEY,
    horaEntrega DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tareaID INT NOT NULL,
    usuarioID INT NOT NULL,
    FOREIGN KEY (tareaID) REFERENCES tarea(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (usuarioID) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Insertar datos genericos:
INSERT INTO usuario (nombre, email, rol) VALUES
('Genaro Parra','genaro.parra@escuela.com','profesor'),
('Guillermo Valenzuela', 'guillermo.valenzuela@escuela.com', 'profesor'),
('Lucía Fernández', 'lucia.fernandez@escuela.com', 'alumno'),
('Julián Pérez', 'julian.perez@escuela.com', 'alumno'),
('Valentina Rodríguez', 'valentina.rodriguez@escuela.com', 'alumno'),
('Tomás Díaz', 'tomas.diaz@escuela.com', 'alumno'),
('Camila Morales', 'camila.morales@escuela.com', 'alumno');

INSERT INTO materia (nombre, usuarioID) VALUES
('Matemáticas', 1),
('Lengua y Literatura', 1),
('Historia', 2),
('Biología', 2),
('Educación Física', 1),
('Inglés', 2),
('Física', 1);

INSERT INTO matricula (usuarioID, materiaID) VALUES
(3, 1),
(3, 2),
(3, 4),
(4, 1),
(4, 3),
(4, 6),
(5, 2),
(5, 4),
(5, 5),
(6, 1),
(6, 3),
(6, 7),
(7, 2),
(7, 6),
(7, 5);

INSERT INTO tarea (titulo, descripcion, fechaEntrega, usuarioID, materiaID) VALUES
('Trabajo de Fracciones', 'Resolver los ejercicios de la guía 3.', '2025-06-25', 1, 1),
('Ensayo sobre Borges', 'Escribir un ensayo de 500 palabras.', '2025-06-27', 1, 2),
('Revolución Francesa', 'Realizar línea del tiempo.', '2025-06-28', 2, 3);

INSERT INTO entrega (horaEntrega, tareaID, usuarioID) VALUES
('2025-06-24 14:23:00', 1, 3),  
('2025-06-24 15:45:00', 1, 4),  
('2025-06-26 18:00:00', 2, 5),  
('2025-06-27 10:00:00', 3, 6);  
