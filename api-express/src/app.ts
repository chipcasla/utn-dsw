import express from 'express';
import './cliente/cliente.model.js';
import { clienteRouter } from './cliente/cliente.routes.js';
import './mesa/mesa.model.js';
import { mesaRouter } from './mesa/mesa.routes.js';
import './reserva/reserva.model.js';
import { reservaRouter } from './reserva/reserva.routes.js';
import './reserva/reserva_mesa.entity.js';
import { sequelize } from './shared/conn.js';

const app = express();

app.use(express.json());

app.use('/api/clientes', clienteRouter);
app.use('/api/mesas', mesaRouter);
// app.use('/api/localidades', localidadRouter);
app.use('/api/reservas', reservaRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Server running on http://localhost:3000/');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
});
