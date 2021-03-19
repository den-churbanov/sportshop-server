const {Router} = require('express');
const {getSections, getSubSections} = require('../controllers/catalog_controller');
const router = Router();

// api/catalog/sections
router.get(
    '/sections',
    getSections);

// api/catalog/subsections
router.get(
    '/subsections',
    getSubSections);

module.exports = router;