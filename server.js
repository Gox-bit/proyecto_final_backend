const express = require('express');
const cors = require('cors');
require('dotenv').config();
const gameRoutes = require("./routes/games");
const reviewRoutes = require('./routes/Review');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/games", gameRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Servidor Express funcionando');
});


connectDB();

const PORT = process.env.PORT || 1578;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



module.exports = app;
