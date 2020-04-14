const express = require('express')
const app = express()
const port = 3030

app.get('/hello', (req,res) => res.send('Hello from Sample Node App!'))

app.listen(port, () => console.log(`Sample app started on port: ${port}`))