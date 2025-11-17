import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import db from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Asegúrate de que la carpeta uploads exista
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Config upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// --------------------------
// 📌 PROYECTOS
// --------------------------

app.get("/api/proyectos", (req, res) => {
    db.all("SELECT * FROM proyectos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/api/proyectos", (req, res) => {
    const { nombre, descripcion, responsable } = req.body;

    db.run(
        "INSERT INTO proyectos (nombre, descripcion, responsable) VALUES (?, ?, ?)",
        [nombre, descripcion, responsable],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// --------------------------
// 📌 ETAPAS (KANBAN)
// --------------------------

app.get("/api/etapas/:proyectoId", (req, res) => {
    db.all(
        "SELECT * FROM etapas WHERE proyectoId = ?",
        [req.params.proyectoId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.post("/api/etapas", (req, res) => {
    const { proyectoId, nombre } = req.body;

    db.run(
        "INSERT INTO etapas (proyectoId, nombre) VALUES (?, ?)",
        [proyectoId, nombre],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// --------------------------
// 📌 TAREAS
// --------------------------

app.get("/api/tareas/:etapaId", (req, res) => {
    db.all(
        "SELECT * FROM tareas WHERE etapaId = ?",
        [req.params.etapaId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.post("/api/tareas", upload.single("archivo"), (req, res) => {
    const { etapaId, nombre, descripcion, fechaVencimiento, estatus } = req.body;

    db.run(
        "INSERT INTO tareas (etapaId, nombre, descripcion, fechaVencimiento, estatus, archivo) VALUES (?, ?, ?, ?, ?, ?)",
        [
            etapaId,
            nombre,
            descripcion,
            fechaVencimiento,
            estatus,
            req.file ? req.file.filename : null,
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// --------------------------
// Servidor
// --------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
