const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001; // El puerto en el que se ejecutará el servidor

app.use(bodyParser.json());

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
  host: 'mail.digital-mirage.ar', // Reemplaza con tu servidor SMTP
  port: 587, // El puerto SMTP
  secure: false, // Establece a true si usas SSL/TLS
  auth: {
    user: 'admin@digital-mirage.ar', // Cambia a tu correo electrónico
    pass: '832511nZ', // Cambia a tu contraseña
  },
});

// Ruta para procesar el formulario y enviar el correo
app.post('/enviar-correo', (req, res) => {
  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos en el formulario' });
  }

  const mailOptions = {
    from: 'admin@digital-mirage.ar',
    to: 'contacto@digital-mirage.ar',
    subject: 'Nueva consulta de ' + nombre + ' ' + apellido,
    text: 'Email: ' + email + '\n\nMensaje:\n' + mensaje,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo: ' + error);
      res.status(500).json({ error: 'Hubo un problema al enviar el correo' });
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).json({ message: 'Correo enviado con éxito' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
