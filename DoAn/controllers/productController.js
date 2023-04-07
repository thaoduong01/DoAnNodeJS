const express = require('express');

const productModel = require('../models/product');

const app = express();


app.get('/', (req, res) => {
    // res.json("Hello");
    res.render('product/add_edit', {
        title: "Information Product"
    });
});

//getAll

app.get('/list', (req, res) => {
    productModel.find({}).then(products => {
        res.render('product/listpro', {
            title: "List Product",
            products: products.map(product => product.toJSON())
        });
    })

});

//add and edit data
app.post('/add', async (req, res) => {
    console.log(req.body);
    if (req.body.id == '') {
        //add
        addRecord(req,)
    } else {
        //edit
        updateRecord(req, res)
    }

});

function addRecord(req, res) {
    const p = new productModel(req.body);
    try {
        p.save();
        // res.send(p);
        res.render('product/add_edit', {
            title: "Add product susscessfully!!"
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateRecord(req, res) {
    try {
        const doc = await productModel.findByIdAndUpdate(req.body.id, req.body, { new: true });
        res.redirect('/product/list');
    } catch (err) {
        console.log(err);
        res.render('product/add_edit', {
            title: "Edit failed!!"
        });
    }
}


//edit
app.get('/edit/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            res.render('product/add_edit', {
                title: "Edit Product",
                product: product.toJSON()
            });
        } else {
            res.status(404).send("Product not found.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});


//delete
app.get('/delete/:id', async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body);
        if (!product) res.status(404).send("No product found");
        else {
            res.redirect('/product/list');
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = app;