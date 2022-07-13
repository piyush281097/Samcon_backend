var express = require('express');
var router = express.Router();
var userController = require('../controller/user')
var bookController = require('../controller/book')
var orderController = require('../controller/order')
const auth = require("../middleware/auth");

router.post('/insertUser', auth, userController.createUser);

router.put('/updateUser', auth, userController.updateUser);

router.get('/getUser', auth, userController.getUser)

router.delete('/deleteUser/:id', auth, userController.deleteUser)

router.post('/insertBook', auth, bookController.createBook);

router.put('/updateBook', auth, bookController.updateBook);

router.get('/getBookById', bookController.getBookById)

router.get('/getBook', auth, bookController.getBook)

router.get('/getBooks', bookController.getBook)

router.delete('/deleteBook/:id', auth, bookController.deleteBook)

router.post('/order', auth, orderController.placeOrder);

router.get('/token',userController.getToken)

module.exports = router;
