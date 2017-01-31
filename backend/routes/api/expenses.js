const router = require('express').Router();
const {create, read, readAll, update, remove} = require('../../db/controllers/expense');
const {authenticate} = require('../../middleware/authenticate');

router.post('/',authenticate, create)
router.get('/', authenticate, readAll)
router.get('/:id',authenticate, read)
router.put('/:id', authenticate, update)
router.delete('/:id', authenticate,remove)

module.exports = router
