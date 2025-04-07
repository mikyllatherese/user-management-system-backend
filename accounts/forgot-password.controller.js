const express = require('express');
const router = express.Router();
const forgotPasswordService = require('./forgot-password.service');

// Route to handle forgot password
router.post('/', async (req, res, next) => {
    try {
        await forgotPasswordService.forgotPassword(req.body, req.get('origin'));
        res.json({ message: 'Please check your email for password reset instructions' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;