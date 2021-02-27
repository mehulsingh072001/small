// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose')
const app = express();

// Import routes
const authRoute = require('./routes/auth')
const node_media_server = require('./media_server');

mongoose.connect('mongodb://127.0.0.1/nodeStream' , { useNewUrlParser: true });


app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}))

//Use Routes
app.use('/api/user', authRoute)
node_media_server.run();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
