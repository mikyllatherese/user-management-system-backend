const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const sendEmail = require('_helpers/send-email');
const { randomTokenString } = require('_helpers/token');

module.exports = {
    resetPassword
};

async function resetPassword(data, origin) {
    const { token, password, confirmPassword } = data;

    // Validate token here
    const isValidToken = await validateResetToken(token);
    if (!isValidToken) {
        throw new Error('Invalid or expired token');
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    // Validate password strength (example check for minimum length)
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    // Proceed with password reset logic
    const hashedPassword = await hashPassword(password);

    // Find user by reset token
    const user = await findUserByResetToken(token);
    if (!user) {
        throw new Error('User not found');
    }

    // Update password in the database
    user.password = hashedPassword;
    user.resetToken = null;  // Clear the reset token after successful password reset
    await user.save();

    // Optionally send a confirmation email
    sendConfirmationEmail(user.email);
}

async function validateResetToken(token) {
    const user = await db.Account.findOne({ where: { resetToken: token } });
    if (!user || user.resetTokenExpires < new Date()) {
        return false;  // Token is invalid or expired
    }
    return true;  // Token is valid
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);  // Return hashed password
}

async function findUserByResetToken(token) {
    return await db.Account.findOne({ where: { resetToken: token } });
}

function sendConfirmationEmail(email) {
    sendEmail({
        to: email,
        subject: 'Password Reset Successful',
        html: '<h4>Your password has been successfully reset.</h4>'
    });
}