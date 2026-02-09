const express = require('express');
const { chat, getFAQs } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/', chat);
router.get('/faqs', getFAQs);

module.exports = router;
