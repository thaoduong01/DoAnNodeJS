const express = require('express');

const userModel = require('../models/user');

const app = express();

const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt")
const bcryptjs = require("bcryptjs")
const cookieParser = require("cookie-parser")

app.get('/', (req, res) => {
    res.render("user/login");
});

async function hashedPass(password) {
    const res = await bcryptjs.hash(password, 10)
    return res
}

async function compare(userPass, hashedPass) {
    const res = await bcryptjs.compare(userPass, hashedPass)
    return res
}


app.post("/login", async (req, res) => {
    try {
        const check = await userModel.findOne({ username: req.body.username })

        const passCheck = await compare(req.body.password, check.password)


        if (check && passCheck) {
            res.render("home", { username: req.body.username })
        }
        else {
            res.send("Wrong password")
        }
    }
    catch {
        res.send("wrong details")
    }

})

// app.get("/signup", (req, res) => {
//     res.render("user/signup.hbs")
// })

app.post("/signup", async (req, res) => {
    try {
        const check = await userModel.findOne({ username: req.body.username })

        if (check) {
            res.send("User already exist")
        }
        else {
            const token = jwt.sign({ username: req.body.username }, "xinchaohomnaylamotngayratdepvatuoixanhngat")

            const data = {
                id: Date.now().toString(),
                username: req.body.username,
                email: req.body.email,
                phno: req.body.phno,
                password: await hashedPass(req.body.password),
                token: token
            }
            await userModel.insertMany([data])
            console.log(data);


            res.render("user/login")
        }

    } catch (error) {
        console.log(error);
        res.send("An error occurred");
    }

})

app.get('/logout', (req, res) => {
    res.render("user/login");
});

app.get('/home', (req, res) => {
    res.render("home");
});

module.exports = app;