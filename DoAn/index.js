const express = require("express")
const bodyparser = require("body-parser")
const path = require("path");
const hbs = require('hbs');
const app = express()

// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');

const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

const templatePath = path.join(__dirname, "/views")
// const publicPath = path.join(__dirname, "../public")

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/DoAnNodeJS")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("faild to connect");
    })


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// app.engine('hbs', hbs);

app.set('view engine', 'hbs')
app.set("views", templatePath)
app.use(express.json());


// app.use(userRoutes);
// app.use(productRoutes);

app.use('/product', productController);
app.use('/user', userController);


app.listen(3000, () => {
    console.log("port connected");
})