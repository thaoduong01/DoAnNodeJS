const express = require('express');

const productModel = require('../models/product');

const app = express();

//add data
app.post('/product', async (req, res) => {
    const p = new productModel(req.body);
    try {
        await p.save();
        res.send(p);
    } catch (error) {
        res.status(500).send(error);
    }
});

//getAll
app.get('/listpro', async (req, res) => {
    const list = await productModel.find({});

    try {
        res.send(list);

    } catch (error) {
        res.status(500).send(error);
    }
});


//update

app.patch('/product/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body);
        await productModel.save();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete

app.delete('/product/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body);
        if (!product) res.status(404).send("No product found");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;
