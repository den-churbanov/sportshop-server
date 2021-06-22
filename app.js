const express = require('express')
const config = require('config')
const path = require('path')
const PORT = config.get('port') || 5000

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/catalog', require('./routes/catalog.routes'))
app.use('/api/images', require('./routes/images.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/basket', require('./routes/basket.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build'), 'index.html')
    })
}

async function startServer() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`)
    })
}

startServer()