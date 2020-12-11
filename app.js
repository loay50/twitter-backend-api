const express = require('express')
const app = express()
const Twitter = require('./api/helpers/twitter');
const port = 3000
const twitter = new Twitter();
require('dotenv').config()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


app.get('/tweets', (req, res) => {

    const query = req.query.q;
    const count = req.query.count;
    twitter.get(query, count).then((response) => {
        res.status(200).send(response.data);
    }).catch((error) => {
        res.status(400).send(error);
    })
})


app.listen(port, () => console.log(`Twitter API is listenin on ${port}`))
