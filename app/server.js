const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const users = require('./routes/userRoutes')
app.use(express.json());

app.use('/users', users)

mongoose.connect('mongodb://localhost:27017/louonsdb', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to the database')
                    })


app.listen(port, () => {
    console.log(`App listening to the port ${port}`)
})