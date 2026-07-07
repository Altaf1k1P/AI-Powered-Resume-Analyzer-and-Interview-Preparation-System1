const jwt = require('jsonwebtoken');
const User = require('../models/user');


const protect = async(req, res, next) =>{
    let token;

      // 1. Check if the request contains the Authorization Header and starts with 'Bearer'
      if(req.headers.authorization && 
          req.headers.autharization.startWith('bearer')
        ){
            try{
                // 2. Extract the token from the header (format: "Bearer <token>")
                token = req.headers.autharization.split(' ')[1];
                //3. Verify the token using your secret key
                const decode = jwt.verify(token, process.env.JWT_SECRET || 
                    'my_super_secret_key_123');

                    
      // 4. Find the user associated with the token and attach them to the request object (excluding password)
      req.user = await User.finderOne(decoded.userId).select('-password');

      
      // 5. Call next() to proceed to the controller function
      next();
            }
            catch (error) {
      console.error('Token validation error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
        }


         // 6. If no token was found
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
}

module.exports = { protect };