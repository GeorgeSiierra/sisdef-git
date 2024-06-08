/*SERVICIO NACIONAL DEL SENA - SENA

Tecnología en Analisis y Desarrollo de Softare
Componente Técnico
Evidencia GA7-220501096-AA5 
Diseño y Desarrollo de Servicios Web

 ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═ 




*/

//Se crea la conexion con el servidor en el puerto 3000 a travéz de express
const express = require('express')
const app = express()
const port = 3000

// Obtener el cliente con mysql2
const mysql = require('mysql2/promise');

// Crear la conexion con la base de datos sisdef de MySQL
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sisdef',
});


//Página de inicio de sesión es la URL localhost:3000/login 
app.get('/login',async (req, res) => {
    const datos = req.query; //Obtenemos los datos 

// Consulta SELECT query que solicitamos desde URL
try {
  const [results, fields] = await connection.query(
    "SELECT * FROM `registrousuarios` WHERE `id_number` = ? AND `pass` = ?",
    [datos.id_number, datos.pass]
  );
  if (results.length > 0) {
    //Si el i_number y el pass coinciden con los registrados en MySQL, se responde con un mensaje CORRECTO
    res.status(200).send('Inicio de sesion CORRECTO FELICITACIONES!!')
    console.log('Intento CORRECTO. Ha iniciado de Sesión') 

    //Si no coinciden con los numeros que estan regitrados en MySQL, responde mensaje INCORRECTO
  } else {
    res.status(401).send('Incorrecto Intentelo de nuevo')
    console.log('Intento Incorrecto. Ojo Ahí!')
  }

//En consola se muestra a que registro pertenece ese id_number
  console.log(results);  
  
} catch (err) {
  console.log(err);
}
})

//Probar el Puerto y que salga en consola un mensaje caribeño si está activo correctamente
app.listen(port, () => {
  console.log(`Si, si Probando. Correcto en Puerto ${port}. Si, Si Caribe!!`)
})