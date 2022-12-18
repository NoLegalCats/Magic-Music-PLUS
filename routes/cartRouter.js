const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/AddTrack', cartController.AddTrack);
router.post('/GetAllTrack', cartController.GetAllTrack);
router.post('/BuyTrack', cartController.BuyTrack);
router.post('/DeleteTrack', cartController.DeleteTrack);
router.post('/GetInfoSales', cartController.GetInfoSales)

module.exports = router;
