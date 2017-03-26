const router = require('express').Router();
const { signup, findByToken, login, logout } = require('../../db/controllers/user');
const { authenticate } = require('./../../middleware/authenticate');

router.post('/users', signup);

router.get('/session', findByToken);
router.post('/session', login);
router.delete('/session', authenticate, logout);

module.exports = router;
