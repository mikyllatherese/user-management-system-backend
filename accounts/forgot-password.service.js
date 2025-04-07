const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const sendEmail = require('_helpers/send-email');
const { randomTokenString } = require('_helpers/token');

module.exports = {
    forgotPassword
};

async function forgotPassword({ email }, origin) {
    const account = await db.Account.findOne({ where: { email } });
    if (!account) return;

    // Generate a reset token
    const resetToken = randomTokenString();
    account.resetToken = await bcrypt.hash(resetToken, 10); // Hash the token for security
    account.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry
    await account.save();

    // Send the password reset email with the plain reset token (not the hashed version)
    await sendPasswordResetEmail(account, resetToken, origin);
}

async function sendPasswordResetEmail(account, resetToken, origin) {
    const resetUrl = origin
        ? `${origin}/reset-password?token=${resetToken}`
        : null;

    const message = resetUrl
        ? `<p>Click below to reset your password (valid for 24h):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
        : `<p>Use this token to reset your password: <code>${resetToken}</code></p>`;

    await sendEmail({
        to: account.email,
        subject: 'Reset Password',
        html: `<h4>Reset Password</h4>${message}`
    });
}