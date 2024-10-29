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
console.log(process.env.JWT_SECRET);

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

/*app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message || 'Error en el servidor' });
});*/

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








