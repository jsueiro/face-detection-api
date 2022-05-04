//import express from 'express';
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const pg = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'juan',
        password: '',
        database: 'face-detection'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, pg, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, pg, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, pg) })

app.put('/image', (req, res) => { image.handleImage(req, res, pg) })

app.listen(3430, () => {
    console.log('app is running on 3430')
})