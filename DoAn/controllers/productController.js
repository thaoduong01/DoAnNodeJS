const express = require('express');

const productModel = require('../models/product');

const app = express();

app.get('/', (req, res) => {
    res.json("Hello");
});

module.exports = app;