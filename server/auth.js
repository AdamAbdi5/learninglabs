const {sign} = require("jsonwebtoken");
require("dotenv/config");

const createAccessToken = (person, teacher) => {

    if (teacher === false) {
        return sign({userId: person[0].id, teacher: false, tokenNumber: person[0].tokenNumber}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
    }
    return sign({userId: person[0].id, teacher: true, tokenNumber: person[0].tokenNumber}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

const createRefreshToken = (person, teacher) => {
    if (teacher === false) { 
        return sign({userId: person[0].id, teacher: false, tokenNumber: person[0].tokenNumber}, 
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn: "7d"})
    }

    return sign({userId: person[0].id, teacher: true, tokenNumber: person[0].tokenNumber}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
}

module.exports = {createAccessToken, createRefreshToken}