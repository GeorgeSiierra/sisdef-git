const express = require('express')
const app = express()
const port = 3000

// Get the client
const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sisdef',
});


//Página inicio de sesión localhost:3000/login 
app.get('/login',async (req, res) => {
    const datos = req.query;
// A simple SELECT query
try {
  const [results, fields] = await connection.query(
    "SELECT * FROM `registrousuarios` WHERE `id_number` = ? AND `pass` = ?",
    [datos.id_number, datos.pass]
  );
  if (results.length > 0) {
    res.status(200).send('Inicio de sesion CORRECTO FELICITACIONES!!')
  } else {
    res.status(401).send('Incorrecto Intentelo de nuevo')
  }

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}
})


//Probar el Puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})