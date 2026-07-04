const User = require('../models/user');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const { route } = require('../routes/authRoutes');


// Controller function for User Registration
exports.register = async (req, res)=>{
try{
    const{name, email, password} = req.body;

    // check if user details is already exist
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message:'User with this email already exists'})
    }

    // 2. Hash the password before saving (Security Best Practice)
const slotRounds = 10;

const hashedPassword = await bcrypt.hash(password, slotRounds);

// 3. Create new user document
const newUser = new User({
    name,
    email,
    password: hashedPassword
})

// 4. save into database
await newUser.save();

return res.status(201).json({message:'User registered successfully!'});
}

catch(error){
  console.error('Registration Error:', error)
  res.status(500).json({message:'Server error during registration'})
}

}


exports.login = async (req, res) =>{
try{
    // 1. take user input using req.boby 
    const {email, password} = req.body;

    // 2. find user using email
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message:'Invalid email or password'});
    }

    // 3. check is password is match with hashPassword in DB
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid email or password'});
    }

    // 4. sign a jwt token(expired in 1D)
    const token =  jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET ,
        {expiresIn: '1d'}
    )

    // D. Respond with the token and user details (excluding password)

    return res.status(200).json({
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })

}
catch(error){
    console.error("Login error:", error)
    return res.status(500).json({message:'Server error during login'})
}
}