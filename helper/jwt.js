

const expressJwt = require('express-jwt');
const { options } = require('../routers/products');

function authJwt() {

    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked //tp check if its an admin or not
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', options] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', options] },
            `${api}/users/login`,
            `${api}/users/register`,

        ]
    })
}

async function isRevoked(req, payload, done) {  //re = req parameters , payload = data instide jwt token 

    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;