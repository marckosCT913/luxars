const { Router } = require('express');
const { list, detail } = require('../controllers/photographersController');

const router = Router();

router.get('/', list);
router.get('/:id', detail);

module.exports = router;
