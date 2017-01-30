const router = require('express').Router();
const {create, read, readAll, update, remove} = require('../../db/controllers/report');

router.get('/:id', read);
router.get('/', readAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router
