const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(process.env.URI_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('conectado'))
.catch(err => console.log(err))