CREATE DATABASE IF NOT EXISTS hoteles_db;
USE hoteles_db;
-- Insertar usuario de ejemplo para pruebas de recuperación de contraseña
-- Email: vicente18aldahirsilva@gmail.com
-- Contraseña: password123
INSERT INTO user (nombre, email, contrasena, fecha_nacimiento, rol, isVerified, fecha_registro) 
VALUES (
    'Vicente Silva',
    'vicente18aldahirsilva@gmail.com',
    '$2b$10$grcOOGVquBUE/PvPE7jfJes9.y2YpMV14gfCLZERUzioHbgKngQai',
    '1999-01-01',
    'cliente',
    true,
    NOW()
) ON DUPLICATE KEY UPDATE nombre=nombre;