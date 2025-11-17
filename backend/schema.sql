CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    rol TEXT
);

CREATE TABLE IF NOT EXISTS proyectos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    responsable TEXT
);

CREATE TABLE IF NOT EXISTS etapas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proyectoId INTEGER,
    nombre TEXT
);

CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    etapaId INTEGER,
    nombre TEXT,
    descripcion TEXT,
    fechaVencimiento TEXT,
    estatus TEXT,
    archivo TEXT
);
