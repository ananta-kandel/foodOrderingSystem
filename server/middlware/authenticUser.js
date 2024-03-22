const jwt = require('jsonwebtoken');
const JWT_SECRET = "ananta";

const authenticUser = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    const tokens = token.split(" ")[1]
    console.log(tokens)
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    try {
        // Verify the token
        console.log("Trying to verify token");
        const decoded = jwt.verify(tokens, JWT_SECRET);

        // Attach the user object to the request for future use
        // req.user = decoded.user;
         id = decoded.id;
        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired
        console.error(error);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
}

module.exports = authenticUser;
