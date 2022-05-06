//import express from 'express';
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

console.log(process.env.DATABASE_URL);

const pg = knex({
    client: 'pg',

    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }


});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', signin.handleSignin(pg, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, pg, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, pg) })

app.put('/image', (req, res) => { image.handleImage(req, res, pg) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const PORT = process.env.PORT;

app.listen(PORT || 3430, () => {
    console.log(`Server is listening on ${PORT}`)
})

