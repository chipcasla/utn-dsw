import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import './cliente/cliente.model.js';
import { clienteRouter } from './cliente/cliente.routes.js';
import './mesa/mesa.model.js';
import { mesaRouter } from './mesa/mesa.routes.js';
import { platoRouter } from './plato/plato.routes.js';
import './reserva/reserva.model.js';
import { reservaRouter } from './reserva/reserva.routes.js';
import './reserva/reserva_mesa.entity.js';
import { reseñaRouter } from './reseña/reseña.routes.js';
import './categoria/categoria.model.js';
import { categoriaRouter } from './categoria/categoria.routes.js';
import { sequelize } from './shared/conn.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/clientes', clienteRouter);
app.use('/api/mesas', mesaRouter);
// app.use('/api/localidades', localidadRouter);
app.use('/api/reservas', reservaRouter);
app.use('/api/platos', platoRouter);
app.use('/api/resenias', reseñaRouter);
app.use('/api/categorias', categoriaRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Server running on http://localhost:3000/');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
});
