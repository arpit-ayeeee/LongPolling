const express = require('express');

const app = express();

const LIMIT = 20;
const DELAY = 1000;

let connections = [];

app.get('/date', function(req, res, next) {

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked'); //Chunked encoding means, the server will send the data in chunks

    connections.push(res);
})

let tick = 0;

setTimeout(function run() {
    console.log(tick);

    if(++tick > LIMIT) {
        connections.map(res => {
            res.write("END\n"); //Pushes the data to the response
            res.end();  //Closes the connection
        })
        connections = [];
        tick = 0;
    }

    connections.map((res, i) => {
        res.write(`Hello ${i}! Tick${tick} \n`);
    })

    setTimeout(run, DELAY);
}, DELAY)

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});