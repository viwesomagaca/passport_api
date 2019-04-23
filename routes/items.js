const itemRoutes = require('../model/item');

app.get('/items', itemRoutes.getItems);