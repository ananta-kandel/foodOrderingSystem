const jwt = require('jsonwebtoken');
const JWT_SECRET = "ananta";

const authenticUser =(role) => {
    return async(req,res,next) =>{
        console.log(req.headers)
        const token = req.headers.authorization || req.headers.Authorization;
       console.log(token)
        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        const tokens = token.split(" ")[1]
        try {
            console.log("Trying to verify token");
            const decoded = jwt.verify(tokens, JWT_SECRET);
            // Attach the user objecst to the request for future use
            // req.user = decoded.user;
             id = decoded.id;
            let userRole = decoded.role
            
             if(userRole !== role){
                return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
             }
            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            // If the token is invalid or expired
            console.error(error);
            res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
    }
}
module.exports = authenticUser;
