const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        status: 102,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    // return res.json({
                    //   status: 100,
                    //   message: "valid token"
                    // });
                    next();
                }
            });
        } else {
            return res.json({
                success: 101,
                message: "Invalid Token"
            });
        }
    },
    validateAccessToken: (req, res) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ isValidToken: false, message: "No token provided" });
        }
        if (token) {
            // token = token.slice(7);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json({ isValidToken: false, message: "Invalid token" });
                }
                res.status(200).json({ isValidToken: true, message: "Token is valid" });
            });
        }

    }
};