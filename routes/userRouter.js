const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/Registration', userController.Registration);
router.post('/Login', userController.Login);
router.post('/AddEmployee', userController.AddEmployee);
router.post('/EditUser', userController.EditUser);

module.exports = router;
