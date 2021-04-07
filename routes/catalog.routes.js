const {Router} = require('express');
const controller = require('../controllers/catalog_controller');
const router = Router();

// api/catalog/sections
router.get(
    '/sections',
    controller.getSections);

// api/catalog/subsections
router.post(
    '/subsections',
    controller.getSubSections);

module.exports = router;


