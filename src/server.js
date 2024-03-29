const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const nodemailer = require('nodemailer');
const axios = require('axios');
const app = express();
const router = require("./app/router");
const port = process.env.PORT || 8080;



// Configuración de la conexión a MySQL
let db;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Servir archivos estáticos desde la carpeta 'src'
app.use(express.static("src"));

// Motor de vistas Ejs
app.set("views", path.join(__dirname, "../src/views/pages/"));
app.set("view engine", "ejs");

app.use("/", router);

// Función para reconectar a la base de datos
function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DATBASE_HOST ? process.env.DATBASE_HOST : "localhost",
    user: process.env.DATABASE_USERNAME
      ? process.env.DATABASE_USERNAME
      : "root",
    password: process.env.DATABASE_PASSWORD
      ? process.env.DATABASE_PASSWORD
      : "1x6x-osq5-S719.()",
    database: "pineapplesea",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error de MySQL:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on("error", (err) => {
    console.error("Error de MySQL:", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"
    ) {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

// Establecer la conexión inicial
handleDisconnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'src'
app.use(express.static("src"));

// Motor de vistas Ejs
app.set("views", path.join(__dirname, "../src/views/pages/"));
app.set("view engine", "ejs");

app.use("/", router);

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Configuración de express-session
app.use(session({
  secret: 'tu_secreto',
  resave: true,
  saveUninitialized: true
}));

/// Endpoint para obtener los detalles de un producto por su ID
app.get('/productDetails', (req, res) => {
  const productID = req.query.productID; // Obtener el productID de la solicitud
  // Realizar una consulta a la base de datos para obtener los detalles del producto
  db.query('SELECT * FROM productos WHERE productoID = ?', [productID], (err, results) => {
      if (err) {
          console.error('Error al obtener detalles del producto:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ message: 'Producto no encontrado' });
          return;
      }
      // Enviar los detalles del producto como respuesta
      const productDetails = results[0];
      res.json({
          nombre: productDetails.nombre,
          imagen: productDetails.imagen,
          precio: productDetails.precio,
          descripcion: productDetails.descripcion,
          categoria: productDetails.categoria
      });
  });
});




// Endpoint para eliminar la cuenta de usuario
app.delete('/eliminarCuenta', (req, res) => {
  const userID = req.session.userID; // Obtener el ID de usuario de la sesión
  if (!userID) {
    res.status(403).json({ message: 'Usuario no autenticado' });
    return;
  }

  // Eliminar todos los datos correspondientes al usuario de la tabla usuarios
  db.query('DELETE FROM usuarios WHERE userID = ?', [userID], (err, results) => {
    if (err) {
      console.error('Error al eliminar cuenta de usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    // Eliminar la sesión del usuario después de eliminar la cuenta
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.clearCookie('connect.sid'); // Limpiar la cookie de sesión
      res.json({ message: 'Cuenta eliminada exitosamente' });
    });
  });
});




// Ruta para obtener productos por categoría
app.get('/productos-por-categoria', (req, res) => {
  const { categoria } = req.query;
  console.log('Solicitud para obtener productos de la categoría:', categoria);
  let query = 'SELECT productoID, nombre, imagen, precio FROM productos';
  let params = [];
  
  // Si se especifica una categoría, filtramos por ella
  if (categoria && categoria !== 'todos') {
    query += ' WHERE categoria = ?';
    params.push(categoria);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error al obtener productos por categoría: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log('Productos encontrados:', results);
    res.json(results);
  });
});





const getToken = require('./generateToken');
const generateXML = require('./generateXML');
const firmarXML = require('./firmarXML');
const enviarXML = require('./enviarXML'); // Importar el nuevo script

// Endpoint para realizar la facturación
app.post('/facturacion', async (req, res) => {
  try {
      // Obtener el token
      const accessToken = await getToken();

      // Generar el XML
      const xmlGenerado = await generateXML();

      // Firmar el XML
      const xmlFirmado = await firmarXML(xmlGenerado);

      // Enviar el XML
      const resultadoEnvio = await enviarXML(xmlFirmado, accessToken); // Almacenar el resultado de enviarXML

      console.log('Resultado del envío:', resultadoEnvio); // Imprimir el resultado del envío

      // Envía una respuesta de éxito
      res.json({ message: 'Facturación realizada exitosamente' });
  } catch (error) {
      console.error('Error en el proceso de facturación:', error);
      res.status(500).json({ error: 'Error en el proceso de facturación' });
  }
});


// Endpoint para obtener el total de productos
app.get('/totalProductos', (req, res) => {
  // Consultar la base de datos para obtener el total de productos
  db.query('SELECT COUNT(*) AS totalProductos FROM productos', (err, results) => {
      if (err) {
          console.error('Error al obtener el total de productos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
      }
      const totalProductos = results[0].totalProductos;
      res.json({ totalProductos });
  });
});




// Endpoint para obtener el total de usuarios registrados
app.get('/totalUsuarios', (req, res) => {
    // Consultar la base de datos para obtener el total de usuarios
    db.query('SELECT COUNT(*) AS totalUsuarios FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener el total de usuarios:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        const totalUsuarios = results[0].totalUsuarios;
        res.json({ totalUsuarios });
    });
});


// Endpoint para enviar mensaje de contacto
app.post('/enviarMensaje', (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  // Validar que los datos requeridos no estén vacíos
  if (!nombre || !correo || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Insertar los datos del mensaje de contacto en la tabla de contactos
  db.query('INSERT INTO contacto (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, correo, asunto, mensaje], (err, result) => {
          if (err) {
              console.error('Error al insertar mensaje de contacto:', err);
              return res.status(500).json({ error: 'Error interno del servidor' });
          }
          res.json({ message: 'Mensaje enviado correctamente' });
      });
});


app.post('/suscribirse', (req, res) => {
  const { correo } = req.body; // Obtener el correo electrónico del cuerpo de la solicitud
  if (!correo) {
    res.status(400).json({ error: 'Correo electrónico no proporcionado' });
    return;
  }

  // Insertar el correo electrónico en la tabla novedades
  db.query('INSERT INTO novedades (correo) VALUES (?)', [correo], (err, results) => {
    if (err) {
      console.error('Error al suscribirse:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ message: '¡Te has suscrito correctamente!' });
  });
});





// Ruta para manejar la solicitud de checkout
app.post('/placeOrder', (req, res) => {
  const { userID, carritoID, nombre, apellido, pais, direccion, provincia, distrito, telefono, correo } = req.body;

  // Insertar datos en la tabla 'facturacion'
  const sql = `INSERT INTO facturacion (userID, carritoID, nombre, apellido, pais, direccion, provincia, distrito, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [userID, carritoID, nombre, apellido, pais, direccion, provincia, distrito, telefono, correo];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos insertados correctamente en la tabla de facturación');
     
    }
  });
});



// Modificar la función enviarMail para incluir console.log de los productos recuperados
const enviarMail = async (userId, carritoId) => {
  try {
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'gabrieljbc2@gmail.com',
        pass: 'jvjj kdul kdza icsd',
      }
    };

    // Obtener los productos del carrito del usuario
    const getProductosCarritoQuery = `SELECT p.nombre, p.precio, c.cantidad, (p.precio * c.cantidad) AS subtotal FROM productos p JOIN carrito c ON p.productoID = c.productoID WHERE c.userID = ? AND c.carritoID = ?`;

    db.query(getProductosCarritoQuery, [userId, carritoId], async (err, productosCarrito) => {
      if (err) {
        console.error('Error al obtener los productos del carrito:', err);
        return;
      }

      console.log('Productos del carrito:', productosCarrito); // Verificar los productos recuperados

      // Construir la lista de productos en el carrito para el correo electrónico
      const listaProductos = productosCarrito.map(producto => {
        return `
          <li>Producto: ${producto.nombre}</li>
          <li>Precio: $${producto.precio.toFixed(2)}</li>
          <li>Cantidad: ${producto.cantidad}</li>
          <li>Subtotal: $${producto.subtotal.toFixed(2)}</li>
        `;
      });

      // Calcular el total de la compra
      const totalCompra = productosCarrito.reduce((total, producto) => total + producto.subtotal, 0);

      console.log('Total del carrito:', totalCompra); // Verificar el total del carrito

      // Mensaje de correo electrónico con los detalles de la compra
      const mensaje = {
        from: 'gabrieljbc2@gmail.com',
        to: 'gabrieljbc2@gmail.com',
        subject: 'Confirmación de Compra en PineApple Sea',
        html: `
          <p>Estimado/a Cliente,</p>
          <p>¡Gracias por realizar tu compra en nuestra tienda!</p>
          <p>A continuación, te proporcionamos los detalles de tu compra:</p>
          <ul>
            ${listaProductos.join('')}
          </ul>
          <p>Total: $${totalCompra.toFixed(2)}</p>
          <p>Recuerda que puedes contactarnos si tienes alguna pregunta o inquietud sobre tu compra.</p>
          <p>¡Esperamos que disfrutes de tu producto!</p>
          <p>Atentamente,<br>Equipo de la Tienda PineApple Sea</p>
        `
      };

      // Enviar el correo electrónico
      const transport = nodemailer.createTransport(config);
      const info = await transport.sendMail(mensaje);
      console.log('Correo enviado:', info);
    });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

// Modificar la ruta para enviar el correo
app.post('/enviar-correo', (req, res) => {
  const { userId, carritoId } = req.body;
  enviarMail(userId, carritoId)
    .then(() => res.send('Correo enviado'))
    .catch(error => {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    });
});





// Ruta para agregarProducto.html
app.get('/agregarProducto.html', (req, res) => {
  // Verificar si el usuario tiene sesión activa, si tiene rol igual a 2 y si ha iniciado sesión
  if (req.session.loggedin && req.session.rol === 2) {
    // Si cumple con los requisitos, renderiza agregarProducto.html
    res.sendFile(path.join(__dirname, '../src/agregarProducto.html'));
  } else {
    // Si no cumple con los requisitos, redirige a la página de inicio de sesión
    res.redirect('/inicio.html');
  }
});

// Ruta para modificarProducto.html
app.get('/modificarProducto.html', (req, res) => {
  // Verificar si el usuario tiene sesión activa, si tiene rol igual a 2 y si ha iniciado sesión
  if (req.session.loggedin && req.session.rol === 2) {
    // Si cumple con los requisitos, renderiza modificarProducto.html
    res.sendFile(path.join(__dirname, '../src/modificarProducto.html'));
  } else {
    // Si no cumple con los requisitos, redirige a la página de inicio de sesión
    res.redirect('/inicio.html');
  }
});


// Ruta para la autenticación
app.post("/authenticate", (req, res) => {
  const { correo, contraseña } = req.body;
  db.query(
    "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?",
    [correo, contraseña],
    (err, results) => {
      if (err) {
        console.error("Error al realizar la consulta: ", err);
        res.status(500).send("Error interno del servidor");
        return;
      }

      if (results.length > 0) {
        const usuario = results[0];
        req.session.loggedin = true;
        req.session.userId = usuario.userID; // Configurar el ID de usuario en la sesión
        req.session.correo = correo;
        req.session.rol = usuario.rol; // Establecer correctamente el rol en la sesión
        console.log(
          "Inicio de sesión exitoso. Rol del usuario:",
          req.session.rol
        );
        res.redirect("/");
      } else {
        req.session.loggedin = false; // Si el inicio de sesión falla, asegúrate de establecer loggedin en false
        req.session.rol = null; // También establece el rol en null
        console.log("Inicio de sesión fallido.");
        res.send("Correo o contraseña incorrectos");
      }
    }
  );
});

// Ruta para verificar sesión activa
app.get("/checkSession", (req, res) => {
  res.json({
    loggedin: req.session.loggedin || false,
    rol: req.session.rol || null,
  });
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'src'
app.use(express.static(path.join(__dirname, '../src')));



// Configurar CORS para permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



// Ruta para la autenticación
app.post('/inicio.html', (req, res) => {
  const { correo, contraseña } = req.body;
  db.query('SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      const usuario = results[0];
      req.session.loggedin = true;
      req.session.userId = usuario.userID; // Configurar el ID de usuario en la sesión
      req.session.correo = correo;
      req.session.rol = usuario.rol; // Establecer correctamente el rol en la sesión
      console.log('Inicio de sesión exitoso. Rol del usuario:', req.session.rol);
      res.redirect('/index.html');
    } else {
      req.session.loggedin = false; // Si el inicio de sesión falla, asegúrate de establecer loggedin en false
      req.session.rol = null; // También establece el rol en null
      console.log('Inicio de sesión fallido.');
      res.send('Correo o contraseña incorrectos');
    }
  });
});




// Ruta para verificar sesión activa
app.get('/checkSession', (req, res) => {
  res.json({ loggedin: req.session.loggedin || false, rol: req.session.rol || null });
});

// Ruta para el registro de usuarios
app.post('/registro', (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;
  db.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo], (err, results) => {
      if (err) {
          console.error('Error al realizar la consulta: ', err);
          res.status(500).send('Error interno del servidor');
          return;
      }

      if (results.length > 0) {
          res.send('El correo electrónico ya está registrado');
      } else {
          db.query(`INSERT INTO usuarios (nombre, apellido, correo, contraseña, rol) VALUES (?, ?, ?, ?, 1)`, [nombre, apellido, correo, contraseña], (err, result) => {
              if (err) {
                  console.error('Error al insertar el nuevo usuario: ', err);
                  res.status(500).send('Error interno del servidor');
                  return;
              }
              console.log('Usuario registrado correctamente');
              res.send('Usuario registrado correctamente');
          });
      }
  });
});




// Ruta para mostrar productos en admin.html
app.get("/get-productos", (req, res) => {
  db.query(
    "SELECT productoID, nombre, imagen, precio FROM productos",
    (err, results) => {
      if (err) {
        console.error("Error al obtener productos: ", err);
        res.status(500).send("Error interno del servidor");
        return;
      }
      const productosConID = results.map((producto) => ({
        ...producto,
        productoID: producto.productoID,
      }));
      res.json(productosConID);
    }
  );
});

// Ruta para agregar un producto
app.post('/agregarProducto', (req, res) => {
  const { nombre, descripcion, imagen, precio, stock, categoria } = req.body; // Obtener la categoría del cuerpo de la solicitud
  if (!nombre || !descripcion || !imagen || !precio || !stock || !categoria) { // Verificar que todos los campos necesarios estén presentes
      res.status(400).json({ error: 'Por favor, complete todos los campos incluyendo la categoría.' });
      return;
  }
  db.query('INSERT INTO productos (nombre, descripcion, imagen, precio, stock, categoria) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, imagen, precio, stock, categoria], (err, results) => {
      if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
              res.status(400).json({ error: 'Ya existe un producto con este nombre.' });
          } else {
              console.error('Error al agregar producto: ', err);
              res.status(500).json({ error: 'Error interno del servidor' });
          }
          return;
      }
      res.json({ message: 'Producto agregado exitosamente', productId: results.insertId });
  });
});




// Ruta para eliminar un producto
app.delete('/eliminarProducto/:id', (req, res) => {
  const productoID = req.params.id;
  db.query('DELETE FROM productos WHERE productoID = ?', [productoID], (err, results) => {
    if (err) {
      console.error('Error al eliminar producto: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'No se encontró el producto para eliminar' });
    }
  });
});

// Ruta para cerrar sesión
app.get('/cerrarSesion', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión: ', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.redirect('/index.html');
  });
});

// Ruta para contar productos por categoría
app.get('/countProductsByCategory', (req, res) => {
  const { category } = req.query;
  db.query('SELECT COUNT(*) AS count FROM productos WHERE categoria = ?', [category], (err, results) => {
    if (err) {
      console.error('Error al contar productos por categoría: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ count: results[0].count });
  });
});


// Ruta para obtener los productos del carrito asociados al usuario actual
app.get('/productos-carrito', (req, res) => {
  const userId = req.session.userId; // Obtener el ID de usuario de la sesión
  if (!userId) {
    return res.json([]); // Si no hay un usuario loggeado, devolvemos un carrito vacío
  }

  const query = `
    SELECT p.productoID, p.nombre, p.descripcion, p.imagen, p.precio, p.stock, p.categoria, IFNULL(c.cantidad, 0) AS cantidad 
    FROM productos p 
    LEFT JOIN carrito c ON p.productoID = c.productoID AND c.userID = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener los productos del carrito: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});




// Ruta para agregar un producto al carrito
app.post('/agregar-al-carrito', (req, res) => {
  const userId = req.session.userId; // Obtener el ID de usuario de la sesión
  const { productoId } = req.body;

  // Verificar si el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ error: 'Debe iniciar sesión para agregar productos al carrito' });
  }

  const query = `INSERT INTO carrito (productoID, userID, cantidad) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE cantidad = cantidad + 1`;
  db.query(query, [productoId, userId], (err, result) => {
    if (err) {
      console.error('Error al agregar el producto al carrito: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Obtener los datos del producto agregado al carrito
    const getProductQuery = `SELECT p.productoID, p.nombre, p.descripcion, p.imagen, p.precio, c.cantidad, (p.precio * c.cantidad) AS subtotal, 0 AS total FROM productos p JOIN carrito c ON p.productoID = c.productoID WHERE p.productoID = ? AND c.userID = ?`;
    db.query(getProductQuery, [productoId, userId], (err, results) => {
      if (err) {
        console.error('Error al obtener el producto agregado al carrito: ', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'No se encontró el producto agregado al carrito' });
        return;
      }
      const producto = results[0];
      res.json(producto);
    });
  });
});

// Ruta para eliminar un producto del carrito
app.delete('/eliminarDelCarrito/:id', (req, res) => {
  const productoID = req.params.id;
  db.query('DELETE FROM carrito WHERE productoID = ?', [productoID], (err, results) => {
    if (err) {
      console.error('Error al eliminar producto del carrito: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } else {
      res.status(404).json({ error: 'No se encontró el producto en el carrito para eliminar' });
    }
  });
});




// Ruta para admin.html
app.get('/admin', (req, res) => {
  // Verificar si el usuario tiene sesión activa y si el rol es igual a 2
  if (req.session.loggedin && req.session.rol === 2) {
    // Si cumple con los requisitos, renderiza admin.html
    res.sendFile(path.join(__dirname, '../src/admin.html'));
  } else {
    // Si no cumple con los requisitos, redirige a otra página (puedes redirigir a una página de acceso denegado)
    res.redirect('/access-denied.html');
  }
});

// Ruta para asahboard.html
app.get('/dashboard', (req, res) => {
  // Verificar si el usuario tiene sesión activa y si el rol es igual a 2
  if (req.session.loggedin && req.session.rol === 2) {
    // Si cumple con los requisitos, renderiza dashboard.html
    res.sendFile(path.join(__dirname, '../src/dashboard.html'));
  } else {
    // Si no cumple con los requisitos, redirige a otra página (puedes redirigir a una página de acceso denegado)
    res.redirect('/access-denied.html');
  }
});




// Ruta para obtener la información de un producto por su ID
app.get('/product/:id', (req, res) => {
  const productoID = req.params.id;
  // Consultar la base de datos para obtener la información del producto por su ID
  db.query('SELECT nombre, descripcion, precio, categoria FROM productos WHERE productoID = ?', [productoID], (err, results) => {
      if (err) {
          console.error('Error al obtener el producto desde la base de datos: ', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
      }
      // Verificar si se encontró el producto
      if (results.length === 0) {
          res.status(404).json({ error: 'No se encontró el producto' });
          return;
      }
      // Enviar la información del producto como respuesta
      const producto = results[0];
      res.json(producto);
  });
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

