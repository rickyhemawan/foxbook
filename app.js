const express = require('express');
const router = require('./routes')
const session = require('express-session')
const PORT = process.env.PORT;
const app = express();
app.use(session({
  secret: 'KEKWait',
  resave: false,
  saveUninitialized: true,
}))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/', router)

app.listen(PORT, _ => console.log("Listening on PORT", PORT))