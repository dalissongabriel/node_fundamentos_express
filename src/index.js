const express = require('express');

const app = express();

app.use(express.json());

const customers = [
  { id: 1, name: 'Jose Alfredo Soares', age: 22},
  { id: 2, name: 'Maria Joaquinha Santos', age: 15},
  { id: 3, name: 'Pedro Pinto', age: 43},
];

app.get('/customers', (calopsita, res) => {
  res.json(customers)
});

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;

  const filtredCustomer = customers.find( customer => customer.id === id);

  if (filtredCustomer) {
    res.json(filtredCustomer);
    return;
  }

  res.json({message: 'Cliente não existe'});
});

app.post('/customers/', (req, res) => {
  const newCustomer = req.body;
  
  if (customers.some(customer => customer.id === newCustomer.id)) {
    res.json({message: `Já existe um cliente de ID ${newCustomer.id} cadastrado!`});
    return;
  }

  customers.push(newCustomer);
  res.json({
    createdCustomer: newCustomer,
    message: 'Cliente cadastrado com sucesso.'
  });
});

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const updatedCustomer = req.body;

  const matchCustomer = customers.find( customer => customer.id === id);
  
  if (!matchCustomer) {
    res.json({message: `Cliente de ID ${id} não existe`});
    return;
  }

  const index = customers.indexOf(matchCustomer);
  customers[index] = updatedCustomer;
  res.json({
    updatedCustomer: updatedCustomer,
    message: 'Cliente atualizado com sucesso'});
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;

  const matchCustomer = customers.find( customer => customer.id === id);
  if (!matchCustomer) {
    res.json({message: `Cliente de ID ${id} não existe.`});
    return;
  }

  const index = customers.indexOf(matchCustomer);
  const deletedCustomer = customers.pop(index);
  res.json({
    deletedCustomer: deletedCustomer,
    message: 'Cliente removido com sucesso.'});
});

app.listen(3333);