const itemRoutes = require('../controller/item');
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/item', passport.authenticate('jwt', {session:false}), itemRoutes.getItems);
router.post('/item', passport.authenticate('jwt', {session:false}), itemRoutes.newItem);
router.get('/item/:id', passport.authenticate('jwt', {session:false}),itemRoutes.getItemsByID);
router.post('/item/:id', passport.authenticate('jwt', {session:false}), itemRoutes.updateItem);
router.post('/item/:id', passport.authenticate('jwt', {session:false}), itemRoutes.deleteItem);

module.exports = router;
