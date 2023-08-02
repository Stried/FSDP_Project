const { verify } = require('jsonwebtoken');
require("dotenv").config();

const validateToken = (req, res, next) => {
    try {
        const accessToken = req.header("Authorization").split(" ")[1];
        if (!accessToken) {
            throw new Error("An error has occured.")
        }

        try {
            const payload = verify(accessToken, process.env.APP_SECRET);

            req.user = payload;
            return next();
            
        } catch (err) {
            console.log("Invalid Token Found!")
            res.sendStatus(404);
        }
        

    } catch (err) {
        return res.sendStatus(401);
    }
}

module.exports = { validateToken };