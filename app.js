require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection;
database.on('error', (error) => console.log('error connecting to database', error));
database.once('connected', () => console.log('Database connected'));

const app = express();

app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running server at http://localhost:${PORT}`));