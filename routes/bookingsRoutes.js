const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const { create, listMine, cancel } = require('../controllers/bookingsController');

const router = Router();

router.use(requireAuth);

router.get('/mine', listMine);
router.post('/', create);
router.post('/:id/cancel', cancel);

module.exports = router;
