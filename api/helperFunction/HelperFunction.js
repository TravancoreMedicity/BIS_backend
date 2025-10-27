// @ts-nocheck
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../../logger/logger");

const generateAccessToken = (userData) => {
    const plainUserData = JSON.parse(JSON.stringify(userData));
    // console.log(plainUserData);
    return jwt.sign(plainUserData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}
// jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

const generateRefreshToken = ({ userSlno }) =>
    jwt.sign({ id: userSlno }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });


const generateEliderToken = (userSlno) => {
    // const plainUserData = JSON.parse(JSON.stringify(userData));
    return jwt.sign({ id: userSlno }, process.env.SECRET_KEY_MEL, {
        expiresIn: "60d",
    });
};

module.exports = { generateAccessToken, generateRefreshToken, generateEliderToken };
