const express = require('express');
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('HELLO FROM APP'))

app.listen(PORT, _ => console.log("Listening on PORT", PORT))