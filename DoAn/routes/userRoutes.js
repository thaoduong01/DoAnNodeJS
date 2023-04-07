const express = require('express');

const UserModel = require('../models/user');

const app = express();

//add data
app.post('/user', async (req, res) => {
    const u = new UserModel(req.body);
    try {
        await u.save();
        res.send(u);
    } catch (error) {
        res.status(500).send(error);
    }
});

//getAll
app.get('/list', async (req, res) => {
    const users = await UserModel.find({});

    try {
        res.send(users);
        // res.render("home", { users })
    } catch (error) {
        res.status(500).send(error);
    }
});


//update

app.patch('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        await UserModel.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete

app.delete('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id, req.body);
        if (!user) res.status(404).send("No items found");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;
