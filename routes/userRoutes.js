const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/getAll', userController.getAllItems);
router.get('/getSellType', userController.getSellType);
router.get('/getLostType', userController.getLostType);
router.get('/getFoundType', userController.getFoundType);

router.post('/getAll', userController.createItem);
router.post('/addToWish',userController.addToWish);

router.post('/buyThis',userController.buyThis);
router.post('/getWishList',userController.getWishList)
router.post('/yourUploads',userController.yourUploads)
router.post('/deleteThis',userController.deleteThis)
router.post('/accept',userController.accept)
router.post('/yourOrders',userController.yourOrders)
router.post('/cancelOrder',userController.cancelOrder)

module.exports = router;
