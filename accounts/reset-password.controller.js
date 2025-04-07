const express = require('express');
const router = express.Router();
const resetPasswordService = require('./reset-password.service');

// Route to handle reset password
router.post('/', async (req, res, next) => {
    try {
        await resetPasswordService.resetPassword(req.body, req.get('origin'));
        res.json({ message: 'Your password has been successfully reset' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;