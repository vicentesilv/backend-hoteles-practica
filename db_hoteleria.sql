/* deprecated */
CREATE DATABASE db_hoteleria;
USE db_hoteleria;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    rol ENUM('cliente', 'hotelero') NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hoteles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idhotelero int NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idhotelero) REFERENCES usuarios(id) ON DELETE CASCADE 
);

create table habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idhotel INT NOT NULL,
    numhabitacion VARCHAR(20) NOT NULL,
    tipo ENUM('individual', 'doble', 'suite') NOT NULL,
    capacidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('disponible', 'reservada', 'mantenimiento') DEFAULT 'disponible',
    descripcion TEXT,
    fotos JSON,
    FOREIGN KEY (idhotel) REFERENCES hoteles(id) ON DELETE CASCADE
);

create table reserva(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idusuario INT NOT NULL,
    idhabitacion INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idusuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (idhabitacion) REFERENCES habitaciones(id) ON DELETE CASCADE
);

CREATE table gananciaReserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idreserva INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idreserva) REFERENCES reserva(id) ON DELETE CASCADE
);

