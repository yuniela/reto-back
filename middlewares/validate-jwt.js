const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const validateJWT = async ( req, res = response, next ) => {
    try{

        const bear_token = req.header('Authorization').split(' ');
        const token = bear_token[1];        

        if( !token ){
            return res.status(401).json({
                ok: false,
                msg: 'No token in request'
            });
        }

        const { uid } = jwt.verify(
            token,
            process.env.SERVER_PRIVATE_KEY
        );

        const user = await User.findById( {_id: uid} );
        delete user.password;
        req.user = user;
        
        next();


    }catch ( error ){
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        })
    }

}


module.exports = {
    validateJWT
}