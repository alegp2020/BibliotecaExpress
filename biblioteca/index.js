const express = require("express");

const app = express();

app.use(express.json());

// req.query --> GET --> filtrar
// req.body --> POST y PUT
// req.params --> GET y DELETE --> identificar un solo elemento

let libros = [
    {
        id: 1,
        titulo: "El señor de los anillos",
        autor: "J.R.R. Tolkien",
        año: 1954,
        precio: 25
    },
    {
        id: 2,
        titulo: "El señor de los anillos 1",
        autor: "J.R.R. Tolkien",
        año: 1956,
        precio: 20
    },
    {
        id: 3,
        titulo: "Amar sobre escalas",
        autor: "Rebeca Stones",
        año: 2025,
        precio: 18
    },
    {
        id: 4,
        titulo: "Twisted love",
        autor: "Ana Huang",
        año: 2025,
        precio: 21
    },
];

app.get("/", (req, res) => {
    res.send("API biblioteca funcionando");
});

// Listar libros y filtrar por precio
app.get("/libros", (req, res) => {
    const precioMax = req.query.precio;

    if (precioMax) {
        const librosFiltrados = libros.filter(libro => libro.precio <= Number(precioMax));

        return res.json({
            status: 200,
            mensaje: "Libros filtrados por precio",
            data: librosFiltrados
        });
    }

    res.json({
        status: 200,
        mensaje: "Lista de libros",
        data: libros
    });
});

// Buscar libro por ID
app.get("/libros/:id", (req, res) => {
    const idBuscado = Number(req.params.id);

    const libroBuscado = libros.find(libro => libro.id === idBuscado);

    if (!libroBuscado) {
        return res.status(404).json({
            status: 404,
            mensaje: "No existe el libro"
        });
    }

    res.json({
        status: 200,
        mensaje: "Libro encontrado",
        data: libroBuscado
    });
});

// Agregar libro
app.post("/libros", (req, res) => {
    const { titulo, autor, año, precio } = req.body;

    if (!titulo || !autor || año === undefined || precio === undefined) {
        return res.status(400).json({
            status: "ERROR",
            mensaje: "Faltan datos del libro"
        });
    }

    const nuevoId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;

    const nuevoLibro = {
        id: nuevoId,
        titulo,
        autor,
        año: Number(año),
        precio: Number(precio)
    };

    libros.push(nuevoLibro);

    res.status(201).json({
        status: "OK",
        mensaje: "Libro agregado correctamente",
        data: nuevoLibro
    });
});

// Actualizar libro
app.put("/libros/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor, año, precio } = req.body;

    const indice = libros.findIndex(libro => libro.id === id);

    if (indice === -1) {
        return res.status(404).json({
            status: "ERROR",
            mensaje: "Libro no encontrado"
        });
    }

    libros[indice] = {
        ...libros[indice],
        titulo: titulo !== undefined ? titulo : libros[indice].titulo,
        autor: autor !== undefined ? autor : libros[indice].autor,
        año: año !== undefined ? Number(año) : libros[indice].año,
        precio: precio !== undefined ? Number(precio) : libros[indice].precio,
    };

    res.json({
        status: "OK",
        mensaje: "Libro actualizado correctamente",
        data: libros[indice]
    });
});

// Eliminar libro
app.delete("/libros/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = libros.findIndex(libro => libro.id === id);

    if (indice === -1) {
        return res.status(404).json({
            status: "ERROR",
            mensaje: "Libro no encontrado"
        });
    }

    const libroEliminado = libros[indice];
    libros.splice(indice, 1);

    res.json({
        status: "OK",
        mensaje: "Libro eliminado correctamente",
        data: libroEliminado
    });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});