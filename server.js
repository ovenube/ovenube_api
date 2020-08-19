const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/errorHandler');
const app = express();

const port = process.env.PORT || 3000;
const routes = require('./api/routes');

app.use(bodyParser.json());
routes(app);

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});

app.get('/', (req, res) => {
    res.json({
        message: 'Express API'
    });
});

app.use(errorHandler.notFound);
app.use(errorHandler.internalServerError);