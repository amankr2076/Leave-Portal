// Import the required modules
const express = require("express")
const router = express.Router();

const {auth,isUser,isAdmin} = require("../middleware/auth");
const { AllNewApllications, rejectApplication, acceptApplication, AllApllicationsForAdmin, AllUsersList, AllDepartmentList,
        addUserFunction, AddUserByFileFunction } = require("../controller/Admin");

router.get("/get-all-new-applications",auth,isAdmin,AllNewApllications);
router.get("/get-all-applications",auth,isAdmin,AllApllicationsForAdmin);
router.get("/get-all-dept",auth,isAdmin,AllDepartmentList);
router.get("/get-all-users",auth,isAdmin,AllUsersList);
router.post("/reject-application",auth,isAdmin,rejectApplication);
router.post("/accept-application",auth,isAdmin,acceptApplication);
router.post("/add-user",auth,isAdmin,addUserFunction);
router.post("/add-user-by-file",auth,isAdmin,AddUserByFileFunction);






// Export the router for use in the main application
module.exports = router;