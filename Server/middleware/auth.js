const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connectDB = require('../config/database');
dotenv.config();


exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header

		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` }); 
		}

		try {
			// Verifying the JWT token
			// console.log("hello");
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			// console.log("printing the decoded data",decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		//move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token ${error}`,
		});
	}
};


exports.isUser = async (req, res, next) => {
	try {
		// Create connection to the database
        const db = await connectDB();
        const emailID=req.user.email;
        // finding the user in our database
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [emailID]);
        let userDetails=rows[0];
        
        // console.log("printing the user Details",userDetails);
		if (userDetails.role !== "student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};


exports.isAdmin = async (req, res, next) => {
	try {
		// Create connection to the database
        const db = await connectDB();
        const emailID=req.user.email;
        // finding the user in our database
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [emailID]);
        let adminDetails=rows[0];

		if (adminDetails.role !== "admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};



