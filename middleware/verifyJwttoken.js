const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    // Get token from header
    // console.log(JSON.stringify(req.headers));
    const token = req.cookies.Authorization;
   
    // Check if token exists
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        // console.log(decoded);
        req.user = decoded.user;
        next(); // Move to the next middleware
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {verifyToken};