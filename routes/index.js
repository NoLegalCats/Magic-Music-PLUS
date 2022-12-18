const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const trackRouter = require('./trackRouter');
const cartRouter = require('./cartRouter');

router.use('/users', userRouter);
router.use('/tracks', trackRouter);
router.use('/carts', cartRouter);

module.exports = router;
