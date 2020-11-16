const express = require('express')
const app = express()
const port = process.env.PORT || 5498
const path = require('path')
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use((req, res) => {
  res.redirect('/index.html')
})

app.listen(port, () => {
  console.log(`Planet of universe  listening at http://localhost:${port}`)
})