const Router = require('express');
const router = new Router();
const trackController = require('../controllers/trackController');

router.post('/GetAllTrack', trackController.GetAllTrack);
router.post('/SortingTrack', trackController.SortingTrack);
router.post('/AddTrack', trackController.AddTrack);
router.post('/UpdateInfoTrack', trackController.UpdateInfoTrack);

router.post('/GetGenre', trackController.GetGenre);
router.post('/GetAutor', trackController.GetAutor);
router.post('/GetAlbum', trackController.GetAlbum);
router.post('/PostGenre', trackController.PostGenre);
router.post('/PostAutor', trackController.PostAutor);
router.post('/PostAlbum', trackController.PostAlbum);

module.exports = router;
