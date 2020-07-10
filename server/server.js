require('./config/config.js')

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/device'))

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})

// mongoose.connect('mongodb://localhost:27017/coffee', (err, res) => {
//     if(err) throw err;

//     console.log('DB Connection success!')
// });

mongoose.connect(process.env.DBURL, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
);