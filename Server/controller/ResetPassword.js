const mailSender = require("../utils/mailsender");
const connectDB = require('../config/database');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		// const user = await User.findOne({ email: email });

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
            message: `This Email: ${email} is not Registered With Us Enter a Valid Email`,
            })
        }
        
        //create a user
        let user=rows[0];
        //creating a token to be sent in the email
		const token = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

        // SQL query to insert data into the reset_password table
        const query = `
        INSERT INTO reset_password (user_email, token, resetPasswordExpires)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        token = VALUES(token), resetPasswordExpires = VALUES(resetPasswordExpires)
        `;

        // Execute the query
        const [result] = await db.execute(query, [email, token, resetPasswordExpires]);

		const url = `${process.env.CLIENT_URL}/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		return res.status(200).json({
			success: true,
			message: "Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};






//function to reset password
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
                check:true,
				message: "Password and Confirm Password Does not Match",
			});
		}
        // Create connection to the database
        const db = await connectDB();

        // SQL query to select all details from the reset_password table by token
        const query1 = 'SELECT * FROM reset_password WHERE token = ?';

        // search in the databse that the token exist or not
        const [rows] = await db.execute(query1, [token]);

        if(rows.length===0)
        {
            return res.status(200).json({
				success: false,
                check:true,
				message: "Token is Invalid",
			});
        }

        const tokenDetails=rows[0];
        console.log(tokenDetails);

        if (!(tokenDetails.resetPasswordExpires > Date.now())) {
			return res.status(200).json({
				success: false,
                check:true,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

        // SQL query to update the password in the users table
        const query2 = 'UPDATE users SET password = ? WHERE email = ?';

        // Execute the query with the hashed password and the provided email
        const [result] = await db.execute(query2, [encryptedPassword, tokenDetails.user_email]);

        if (result.affectedRows > 0){
            return res.status(200).json({
				success: true,
				message: `Password Reset Successful`,
			});
        }
        else{
            return res.json({
                success: false,
                message: `Some Error in Updating the Password`,
            });
        }

	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};