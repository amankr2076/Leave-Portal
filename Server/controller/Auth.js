const otpGenerator = require('otp-generator');
// const mailSender = require('../utils/mailsender'); // assuming this is your mail sending function
// const emailTemplate = require('../emailTemplate/emailVerificationTemplate'); // assuming this is your email template function
const connectDB = require('../config/database');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { checkout } = require('../routes/User');


  //function for login user
  exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(200).json({
          success: false,
          check:true,
          message: `Please Fill up All the Required Fields`,
        })
      } 


      // Create connection to the database
      const db = await connectDB();

      // finding the user in our database
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    //   console.log(rows);

      // If user not found with provided email
      if (rows.length===0) {
        return res.status(200).json({
          success: false,
          check:true,
          message: `User is not Registered\n Please Contact Admin`,
        })
      }
      
      //create a user
      let user=rows[0];
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user.u_id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        const tokenExpiresIn=24*60*60*1000+Date.now();
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 24*60*60*1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          tokenExpiresIn,
          message: `User Login Success`,
        })
      } else {
        return res.status(200).json({
          success: false,
          check:true,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        check:false,
        message: `Login Failure Please Try Again`,
      })
    }
  }







  //function to change the password
  exports.changepassword = async (req, res) => {
    try {
      // Get email and password from request body
      const { formData } = req.body;
      // console.log("printing the password",formData);
      if (formData.new_pass !== formData.conf_pass) {
        return res.json({
          success: true,
          check:false,
          message: "Password and Confirm Password Does not Match",
        });
      }

      // console.log("printing the user data",req.user);


      // Create connection to the database
      const db = await connectDB();

      // finding the user in our database
      const [rows] = await db.execute('SELECT * FROM users WHERE u_email = ?', [req.user.email]);

      // console.log(rows);

      //create a user
      let user=rows[0];
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(formData.curr_pass, user.u_password)) {
          
          // Hash the password
          const hashedPassword = await bcrypt.hash(formData.new_pass, 10);

          const query="UPDATE users set u_password = ? WHERE u_id= ? "
          const [response]=await db.execute(query,[hashedPassword,user.u_id]);

          return res.status(200).json({
            message : "password updated successfully",
            success : true,
            check : true,
          });
      }
      else
      {
        return res.status(200).json({
          message :"provided password is wrong",
          success : true,
          check: false,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `operation failes Please Try Again`,
      })
    }
  }


  



  //function to change the password
  exports.changepassword = async (req, res) => {
    try {
      // Get email and password from request body
      const { formData } = req.body;
      // console.log("printing the password",formData);
      if (formData.new_pass !== formData.conf_pass) {
        return res.json({
          success: true,
          check:false,
          message: "Password and Confirm Password Does not Match",
        });
      }

      // console.log("printing the user data",req.user);


      // Create connection to the database
      const db = await connectDB();

      // finding the user in our database
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [req.user.email]);

      // console.log(rows);

      //create a user
      let user=rows[0];
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(formData.curr_pass, user.password)) {
          
          // Hash the password
          const hashedPassword = await bcrypt.hash(formData.new_pass, 10);

          const query="UPDATE users set password = ? WHERE u_id= ? "
          const [response]=await db.execute(query,[hashedPassword,user.u_id]);

          return res.status(200).json({
            message : "password updated successfully",
            success : true,
            check : true,
          });
      }
      else
      {
        return res.status(200).json({
          message :"provided password is wrong",
          success : true,
          check: false,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `operation failes Please Try Again`,
      })
    }
  }
