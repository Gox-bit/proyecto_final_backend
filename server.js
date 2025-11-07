const express = require('express');
const cors = require('cors');
require('dotenv').config();
const gameRoutes = require("./Controllers/GameController");
const connectDB = require('./config/db');

const app = express();
app.use("/api", gameRoutes);
app.use(cors());
app.use(express.json());
app.use("/api", gameRoutes);



app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});



const PORT = process.env.PORT || 1578;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



module.exports = app;
