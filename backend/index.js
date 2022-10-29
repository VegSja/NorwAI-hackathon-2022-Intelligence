const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})