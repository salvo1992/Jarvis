const express = require('express');
const cors = require('cors');
const connectToDatabase = require("./db");
const logger = require('./middlewares/logger')
const path = require('path');
require("dotenv").config();

const PORT = 8070;
const app = express();

// Routes
const ItemsRouter = require('./routes/Items');

// Middleware
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(logger);

// Route principale per gli items
app.use('/', ItemsRouter);

// Connessione al database
connectToDatabase();

// Avvio del server
app.listen(PORT, () => console.log(`Server connected and listening on port ${PORT}`));
