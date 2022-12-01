const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config()
const port = process.env.PORT

const mongoose = require('mongoose')
mongoose.connect(process.env.URI).then(() => console.log("MongoDB Connected"))
  .catch(error => console.error(error))

app.set('port', port );

app.get('/', (req, res) => {
    res.send('안녕하세요, 항해99 10기 E반 김혜란 입니다.')
  })

app.use('/api', require('./Routes/users'))

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });