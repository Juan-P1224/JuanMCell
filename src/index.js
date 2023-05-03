import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
    <App />
     </BrowserRouter>
  </React.StrictMode>
);




/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'felipe0228',
  database: 'juanmcell'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.listen(4000, () => {
  console.log('Servidor backend en ejecución en el puerto 4000');
});

app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/productos/:id', (req, res) => {
  connection.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    res.send(rows[0])
  });
});
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
