const jwt = require('jsonwebtoken');



const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };
                
        jwt.sign( payload, process.env.SERVER_PRIVATE_KEY, {
            expiresIn: '8h'
        }, ( err, token ) => {

            if ( err ) {                
                reject( 'Failed to generate token' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = {
    generateJWT
}