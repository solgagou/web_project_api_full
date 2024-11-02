const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { celebrate, Joi, errors } = require('celebrate');
const { validateUser } = require('./middlewares/validators');
const { requestLogger } = require('./middlewares/logger');
const cors = require('cors');
require('dotenv').config();

const app = express();


/*const allowedOrigins = [
  'http://localhost:3000',
  'https://aroundthesun.jumpingcrab.com',
   'https://www.aroundthesun.jumpingcrab.com'
];

const corsOptions = {origin: allowedOrigins, optionsSuccessStatus:200}*/


const allowedDomains = ['http://localhost:3000', 'https://aroundthesun.jumpingcrab.com',
   'https://www.aroundthesun.jumpingcrab.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedDomains.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));


/*// Configuración de CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Permite solicitudes de cualquier origen en desarrollo o si está en la lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true
};*/

/*app.options('*', cors(corsOptions))*/

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

mongoose.connect('mongodb://localhost:27017/aroundb')
.then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log('Error de conexión a MongoDB:', error));

app.post('/signin', celebrate({
    body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);
app.post('/signup', createUser);

/*}), (req, res, next) => {
  // Añadir encabezados CORS a la respuesta
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Llama al controlador de inicio de sesión
  login(req, res, next);
});

app.post('/signup', (req, res, next) => {
  // Añadir encabezados CORS a la respuesta
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  createUser(req, res, next);
});*/

app.use(auth);

app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());
app.use(errorHandler);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});








