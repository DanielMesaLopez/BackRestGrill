const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getProductos = (request, response) => {
    connection.query("SELECT * FROM productos", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/productos")
.get(getProductos);

//Agregar producto
const postProductos = (request, response) => {
    const {id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado} = request.body;
    connection.query("INSERT INTO productos(id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado) VALUES (?, ?, ?, ?, ?, ?,?)",
    [id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Item creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/productocrear")
.post(postProductos);


//Actualizar producto


module.exports = app;