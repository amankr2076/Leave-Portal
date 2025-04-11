const { apiConnector } =require('../utils/apiconnector');
const connectDB = require('../config/database');
const mailSender = require("../utils/mailsender");
const moment = require('moment-timezone');
const bcrypt = require("bcryptjs");
const multer = require("multer");
const xlsx = require("xlsx");





//function to add a leave application in the db and generating pdf file
exports.AllNewApllications= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query = `SELECT u.roll_no,u.name,ln.l_nature,la.submission_date,la.status,la.no_of_days, la.application_id FROM leave_applications la JOIN 
                        users u ON la.u_id = u.u_id JOIN leave_nature ln ON la.l_id = ln.l_id WHERE la.status = 'pending'`;
        const [results] = await db.execute(query);

        results.forEach((result) => {
            result.submission_date = moment.tz(result.submission_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

        // console.log("printing the all new application data", results);
       

        return res.status(200).json({
            success: true,
            data : results,
            message: `all new application data fetched successfully`,
          }); 
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching all new appplication data ${error}`, 
          });
    }
}



//function to add a leave application in the db and generating pdf file
exports.AllApllicationsForAdmin= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query = `SELECT u.roll_no,u.name,ln.l_nature,la.submission_date,la.resolved_date,la.status,la.no_of_days, la.application_id FROM leave_applications la JOIN 
                        users u ON la.u_id = u.u_id JOIN leave_nature ln ON la.l_id = ln.l_id order by submission_date desc `;
        const [results] = await db.execute(query);

        results.forEach((result) => {
            result.submission_date = moment.tz(result.submission_date, "Asia/Kolkata").format('YYYY-MM-DD');
            result.resolved_date = moment.tz(result.resolved_date, "Asia/Kolkata").format('YYYY-MM-DD');
          });

        // console.log("printing the all new application data", results);
       

        return res.status(200).json({
            success: true,
            data : results,
            message: `all application data fetched successfully`,
          }); 
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching all appplication data ${error}`, 
          });
    }
}


//function to add a leave application in the db and generating pdf file
exports.AllUsersList= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query = `SELECT u_id, roll_no, name, dept_name, hostel_block, room_number, mobile_no, email from users INNER JOIN departments 
                        ON users.dept_id=departments.dept_id`;
        const [results] = await db.execute(query);

        // console.log("printing the all users data", results);
       

        return res.status(200).json({
            success: true,
            data : results,
            message: `all Users data fetched successfully`,
          }); 
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching all Users data ${error}`, 
          });
    }
}



//function to add a leave application in the db and generating pdf file
exports.AllDepartmentList= async (req,res)=>{

    try{
        // Get the database connection
        const db = await connectDB();

        const query = `select * from departments`;
        const [results] = await db.execute(query);

        console.log("printing all departments data", results);
       

        return res.status(200).json({
            success: true,
            data : results,
            message: `all department data fetched successfully`,
          }); 
    } catch(error){
        return res.status(401).json({
            success: false,
            message: `some error in fetching all department data ${error}`, 
          });
    }
}



//function to reject the leave application
exports.rejectApplication= async (req,res)=>{

    try{

        const { applicationID } = req.body;

        // Get the database connection
        const db = await connectDB();

        const query = `UPDATE leave_applications SET status='rejected', resolved_date = CURRENT_TIMESTAMP WHERE application_id = ?`;
        const [results] = await db.execute(query, [applicationID]);


        try{

          const query=`select email from users INNER JOIN leave_applications ON users.u_id=leave_applications.u_id where application_id=?`
          const [results]=await db.execute(query,[applicationID]);
          console.log("printing the email id",results[0]?.email);
          await mailSender(
            results[0]?.email,
            "Leave Application Rejected",
            `Your Leave application has been Rejected. <br> Thank you`
          );
        } catch(error){
            console.log("some error occured",error);
        }

        return res.status(200).json({
            success: true,
            message: `Application rejected successfully`,
          }); 
    } catch(error){
        return res.status(500).json({
            success: false,
            message: `some error in rejecting the application ${error}`, 
          });
    }
}



//function to reject the leave application
exports.acceptApplication= async (req,res)=>{

    try{

        const { formData, applicationID } = req.body;

        // Get the database connection
        const db = await connectDB();

        console.log("printing the formData",applicationID);

        const query = `UPDATE leave_applications SET status='approved', resolved_date = CURRENT_TIMESTAMP, accepted_days=?, 
                        accepted_from=?, accepted_to=? WHERE application_id = ?`;
        const [results] = await db.execute(query, [formData.accepted_leave_days, formData.accepted_start_date,formData.accepted_end_date,applicationID]);

        try{

          const query=`select email from users INNER JOIN leave_applications ON users.u_id=leave_applications.u_id where application_id=?`
          const [results]=await db.execute(query,[applicationID]);
          console.log("printing the email id",results[0]?.email);
          await mailSender(
            results[0]?.email,
            "Leave Application Accepted",
            `Your Leave application has been accepted for ${formData.accepted_leave_days} days, starting from ${formData.accepted_start_date} to ${formData.accepted_end_date}. <br> Thank you`
          );
        } catch(error){
            console.log("some error occured",error);
        }
        return res.status(200).json({
            success: true,
            message: `Application approved successfully`,
          }); 
    } catch(error){
        return res.status(500).json({
            success: false,
            message: `some error in approving the application ${error}`, 
          });
    }
}









//function to add new user to database
exports.addUserFunction= async (req,res)=>{

    try{
        const {  formData } = req.body;

        if (!formData || !formData.roll_no || !formData.name || !formData.dept_id || !formData.email || !formData.room_number ||
            !formData.hostel_block || !formData.mobile_no)
            {
            return res.status(400).json({
                success: false,
                message: "Missing required fields in formData",
            });
        }
        
        // console.log("printing the formdata",formData);
        // console.log("printing the formdata",formData.mobile_no);
        // Get the database connection
        const db = await connectDB();

        const password="student1234";
        const role="student";

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("printing the hashed password",hashedPassword);


        const query3 = `insert into users(roll_no,name,dept_id,hostel_block,room_number,mobile_no,email,password,role) values(?,?,?,?,?,?,?,?,?)`;
        const [results3] = await db.execute(query3,[formData.roll_no,formData.name,parseInt(formData.dept_id),formData.hostel_block,
                            formData.room_number,formData.mobile_no,formData.email,hashedPassword,role]);
       

        return res.status(200).json({
            success: true,
            message: `user added successfully`,
          }); 
    } catch(error){
        return res.status(500).json({
            success: false,
            message: `some error in adding user ${error}`, 
          });
    }
}





// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Middleware to parse file
exports.AddUserByFileFunction = [
    upload.single("file"),
    async (req, res) => {
      try {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const users = xlsx.utils.sheet_to_json(sheet);


        // Validate required fields
        const requiredFields = ['roll_no', 'name', 'dept_id', 'hostel_block', 'room_number', 'mobile_no', 'email'];

        for (let i = 0; i < users.length; i++) {
          for (let field of requiredFields) {
            if (!users[i].hasOwnProperty(field)) {
              return res.status(409).json({
                success: false,
                message: `Missing required field "${field}" in the file.`,
              });
            }
          }
        }


        // Checking for duplicates within the file
        const rollNos = new Set();
        const emails = new Set();
        for (let user of users) {
        if (rollNos.has(user.roll_no) || emails.has(user.email)) {
            return res.status(409).json({
            success: false,
            message: `Duplicate entry found within file.`,
            });
        }
        rollNos.add(user.roll_no);
        emails.add(user.email);
        }

        const db = await connectDB();
        // Checking for duplicates in the database
        const [existingUsers] = await db.query(
            `SELECT roll_no, email FROM users WHERE roll_no IN (?) OR email IN (?)`,
            [Array.from(rollNos), Array.from(emails)]
          );
          
          if (existingUsers.length > 0) {
            return res.status(409).json({
              success: false,
              message: `Some users already exist in the database.`,
              existing: existingUsers,
            });
          }
  

        const password = "student1234";
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const insertQuery = `INSERT INTO users (roll_no, name, dept_id, hostel_block, room_number, mobile_no, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        let userCount=0;
        for (const user of users) {
          const {
            roll_no,
            name,
            dept_id,
            hostel_block,
            room_number,
            mobile_no,
            email,
          } = user;
  
          // You can add validation here
          await db.execute(insertQuery, [
            roll_no,
            name,
            parseInt(dept_id),
            hostel_block,
            room_number,
            mobile_no,
            email,
            hashedPassword,
            "student"
          ]);

          userCount++;
        }
  
        return res.status(200).json({
            success: true,
            count : userCount,
            message: "Users uploaded successfully"
        });
  
      } catch (error) {
        console.error("Bulk upload error:", error);
        return res.status(500).json({
            success: false,
            message: `Error in uploading users ${error}`
        });
      }
    }
  ];

