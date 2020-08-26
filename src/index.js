"use strict";
import express from 'express'
import bodyParser from 'body-parser'


// set up express app
const app = express();
const port = process.env.port || 4000

app.use(bodyParser.json())
// initialize routes
app.use('/api/v1', require('./routes/api'));

// listen for requests
app.listen(port, function(){
    console.log(`Now listening for requests on - http://localhost:${port}/`);
});