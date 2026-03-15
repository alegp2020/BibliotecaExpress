const express = require('express');
const app = express;

app.length("/",(req,res)=> {
    res.console("Ejecutando codigo de mi primer script")
})
app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});