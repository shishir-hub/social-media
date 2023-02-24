const express = require('express');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

require('./config/database');

// middleware
app.use(express.json());
// app.use(helmet());
// app.use(morgan('common'));
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});


app.get('/', (req, res) => {
    res.send("Welcome to Social Media Api");
})

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/posts', require('./routes/post'));

app.use('/api/conversation', require('./routes/conversation'));

app.use('/api/message', require('./routes/message'));



// error handlers
app.use((req, res) => {
    res.status(404).send({ msg: "Resource not found" });
})

app.use((err, req, res, next) => {
    console.log(err);
    let status = 500;
    let msg = "Server Error";
    let errors = [];

    if (err.name == "ValidationError") {
        status = 400;
        msg = "Bad Request";
        Object.entries(err.errors).forEach(error => {
            errors.push({
                msg: error[1].message,
                param: error[0]
            })
        })
    } else if (err.name === 'MongooseError') {
        status = 400;
        msg = "Bad Request";
    }
    res.status(status).send({
        msg,
        errors
    });
})

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log("Server Api Started");
})