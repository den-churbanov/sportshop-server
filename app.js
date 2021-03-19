const express = require('express');
const path = require('path');
const {Router} = require('express')
const config = require('config');
const PORT = config.get('port') || 5000;
const app = express();
const router = Router();
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/catalog', require('./routes/catalog.routes'))

getImages('/images/products', {
    ContentType: 'image/jpeg'
});

getImages('/images/backgrounds', {
    ContentType: 'image/jpeg'
});


function getImages(route, headers) {
    app.get(route, (request, response) => {
        try {
            const {imagepath} = request.query;
            response.sendFile(path.join(__dirname, route, imagepath), {
                headers
            });
        } catch (e) {
            console.log(e);
        }
    });
}
async function startServer() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
    });
}

startServer();