const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});



const PORT = process.env.PORT || 1578;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


const connectDB = require('./config/db');
connectDB();
