const express = require('express');
const config = require('config');
const PORT = config.get('port') || 5000;

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/catalog', require('./routes/catalog.routes'));

app.use('/api/images', require('./routes/images.routes'));

async function startServer() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}


startServer();