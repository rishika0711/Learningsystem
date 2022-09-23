const User  = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "learningmanagementtoken";

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if(!email || !password){
      return res.status(400).send({
          status: false,
          message: "Email and password are required",
        });
      }
      const user = await User.findOne({email: email});

      if(!user){
      return res.status(400).send({
          status: false,
          message: "Credentials did not match",
        });
      }
      const passwordIsCorrect = await bcrypt.compare(password, user.password);

      if(!passwordIsCorrect){
        return res.status(400).send({
          status: false,
          message: "Credentials did not match"
        });
      }
      res.status(200).send({
        status: true,
        message: "LoggedIn Successfully",
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "Error: " + err.message,
      });
    }
    
  },
  register: async (req, res) => {
    try{
      const { name, email, phone, password } = req.body;
      let pass = password;
      const salt = await bcrypt.genSalt(10);
      pass = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: pass,
        phone
      });
      const result = await user.save();

      const payload = {
        user: {
          id: result._id
        }
      };

      const token  = await jwt.sign(payload, jwtSecret,  {expiresIn: 240000});

      res.status(200).send({
        status: true,
        message: "registered Successfully",
        data:result,
        token,
      });
    } catch(err){
      res.status(400).send({
        status: false,
        message: "Error: " + err.message,
      });
    }
  }
}

module.exports = userController;