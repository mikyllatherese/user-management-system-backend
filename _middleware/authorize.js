const { expressjwt: jwt } = require('express-jwt');
const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = authorize;

function authorize(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const account = await db.Account.findByPk(req.auth.sub); 

            if (!account || (roles.length && !roles.includes(account.role))) {
                
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const refreshTokens = await account.getRefreshTokens();
            
            req.user = {
                ...req.auth,
                role: account.role,
                id: account.id,
                ownsToken: token => !!refreshTokens.find(x => x.token === token)
              };              
              
            next();
        }
    ];
}