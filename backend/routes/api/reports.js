const router = require('express').Router();
const {create, read, readAll, update, remove} = require('../../db/controllers/report');
const {authenticate} = require('../../middleware/authenticate');


router.get('/:id', authenticate, read);
router.get('/', authenticate,  readAll);
router.post('/', authenticate, create);
router.delete('/:id', authenticate, remove);

module.exports = router
