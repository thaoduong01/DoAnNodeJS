const express = require('express');

const userModel = require('../models/user');

const app = express();

app.get('/', (req, res) => {
    res.render("adduser");
});

async function hashedPass(password) {
    const res = await bcryptjs.hash(password, 10)
    return res
}

async function compare(userPass, hashedPass) {
    const res = await bcryptjs.compare(userPass, hashedPass)
    return res
}



// app.get("/", (req, res) => {
//     // if(req.cookies.jwt){
//     //     const verify = jwt.verify(req.cookies.jwt,"xinchaohomnaylamotngayratdepvatuoixanhngat")
//     //     res.render("home", {username:verify.username})
//     // }
//     // else{
//     res.render("login")
//     // }
// })

app.post("/login", async (req, res) => {
    try {
        const check = await userModel.findOne({ username: req.body.username })

        const passCheck = await compare(req.body.password, check.password)


        if (check && passCheck) {
            // res.cookie("jwt", check.token,{
            //     maxAge:600000,
            //     httpOnly:true
            // })
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

app.get("/signup", (req, res) => {
    res.render("user/signup.hbs")
})

app.post("/signup", async (req, res) => {
    try {
        const check = await userModel.findOne({ username: req.body.username })

        if (check) {
            res.send("User already exist")
        }
        else {
            const token = jwt.sign({ username: req.body.username }, "xinchaohomnaylamotngayratdepvatuoixanhngat")

            // res.cookie("jwt", token,{
            //     maxAge:600000,
            //     httpOnly:true
            // })


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

            // res.render("home", {username:req.body.username})

            res.render("/user/login.hbs")
        }

    } catch {
        res.send("wrong details")
        // res.render("signup")
    }

})


module.exports = app;