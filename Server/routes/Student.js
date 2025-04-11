// Import the required modules
const express = require("express")
const router = express.Router();

const {auth,isUser,isAdmin} = require("../middleware/auth");
const { pdfileGenerateFunction , natureOfLeave, AllLeavesOfUser, LeavesOfUserDetails } = require("../controller/Student");

router.post("/generate-pdf",auth,isUser,pdfileGenerateFunction);
router.get("/get-leave-nature-data",auth,isUser,natureOfLeave);
router.post("/get-user-leave",auth,isUser,AllLeavesOfUser);
router.post("/get-user-leave-details",auth,LeavesOfUserDetails);





// Export the router for use in the main application
module.exports = router;