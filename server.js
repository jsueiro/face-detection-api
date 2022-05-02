//import express from 'express';
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

knex({
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

const database = {
    users: [
        {
            id: '123',
            name: 'bob',
            email: 'bob@bob.com',
            password: 'qweqwe',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sal@bob.com',
            password: 'qweqwe',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'bob@bob.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {

    // bcrypt.hash('bacon', null, null, function (err, hash) {

    // })

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        //res.json('success');
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }



})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    // bcrypt.hash(password, null, null, function (err, hash) {
    //     console.log(hash)
    // });

    database.users.push({
        id: '12125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})




// bcrypt.compare('bacon', hash, function(err, res){



// })



app.listen(3430, () => {
    console.log('app is running on 3430')
})