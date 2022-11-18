const User = require("../models/User");

const emailExists = async( email = '' ) => {    
    const user = await User.findOne({ email });
    if ( user ) {
        throw new Error(`This email ${ email } already exists`);
    }
}

const idCardExists = async( ci = '' ) => {
    const user = await User.findOne({ ci });
    if ( user ) {
        throw new Error(`This id card ${ ci } already exists`);
    }
}

module.exports = {
    emailExists,
    idCardExists
}