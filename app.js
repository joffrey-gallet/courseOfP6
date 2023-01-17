const express = require('express');

const app = express();

const stuffRoads = require('./roads/stuff');
const userRoads = require('./roads/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://joffreyG:2512AedJM2962013@cluster0.zgid3wg.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/stuff', stuffRoads);
app.use('/api/auth', userRoads)

module.exports = app;