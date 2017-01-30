const router = require('express').Router();
const {create, read, readAll, update, remove} = require('../../db/controllers/expense');
const {authenticate} = require('../../middleware/authenticate');

router.post('/', create)
router.get('/', authenticate, readAll)
router.get('/:id', read)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router
