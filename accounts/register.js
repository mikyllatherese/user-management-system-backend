const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('_helpers/db'); // Sequelize models
const sendEmail = require('_helpers/send-email');
const config = require('config');
const { randomTokenString, generateJwtToken, generateRefreshToken } = require('_helpers/token');

async function register(params, origin) {
    if (await db.Account.findOne({ where: { email: params.email } })) {
        await sendAlreadyRegisteredEmail(params.email, origin);
        return;
    }

    const account = new db.Account(params);
    const isFirstAccount = (await db.Account.count()) === 0;
    account.role = isFirstAccount ? 'Admin' : 'User';
    account.verificationToken = randomTokenString();
    account.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    account.passwordHash = await bcrypt.hash(params.password, 10);


    await account.save();

    await sendVerificationEmail(account, origin);
}

function basicDetails(account) {
    const { id, title, firstName, lastName, email, role, createdAt, updatedAt } = account;
    return { id, title, firstName, lastName, email, role, createdAt, updatedAt };
}

async function sendVerificationEmail(account, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/verify-email?token=${account.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Use the token below with the /verify-email API route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Verify Email',
        html: `<h4>Verify Email</h4>${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message;
    if (origin) {
        message = `<p>You can reset your password via <a href="${origin}/forgot-password">forgot password</a>.</p>`;
    } else {
        message = `<p>You can reset your password via the /forgot-password API route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>The email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}