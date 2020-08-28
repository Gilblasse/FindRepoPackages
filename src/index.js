"use strict";
const express = require('express')
const bodyParser = require('body-parser')
// import express from 'express'
// import bodyParser from 'body-parser'
// import router from './routes/api'



// set up express app
const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
})

app.get('/', (req,res) => {
    res.send({grettings: "Hello"})
})

// initialize routes
app.use('/api/v1',  require('./routes/api.js'));

// listen for requests
app.listen(PORT, function(){
    console.log(`Now listening for requests on port - ${PORT}`);
});

module.exports = app;