const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		origin:process.env.CLIENT_URL,
		credentials:true,
	})
)


// for database
const connectDB = require('./config/database');
connectDB();




const userRoutes =require("./routes/User");
const studentRoutes=require("./routes/Student");
const adminRoutes=require("./routes/Admin");




//routes
app.use("/auth",userRoutes);
app.use("/student",studentRoutes);
app.use("/admin",adminRoutes);



app.get("/abcd", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})





