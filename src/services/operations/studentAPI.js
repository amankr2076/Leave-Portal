import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GENERATE_PDF_API , GET_LEAVE_NATURE_DATA_API, GET_ALL_LEAVE_OF_USER_API, GET_LEAVE_DETAILS }= studentEndpoints;




//function to generate leave application pdf file
export async function generatePdfFileFunction(token,formData) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            GENERATE_PDF_API,
            {
              formData,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.dismiss(toastId)
      toast.success("pdf file generated Successfully");
      return response?.data?.pdf_link;

    } catch (error) {
      console.log("GENERATE_PDF_API ERROR............", error)
      toast.dismiss(toastId);
      toast.error("Pdf file generation error");
    }
  }




//function to generate leave application pdf file
export async function getLeaveNatureData(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_LEAVE_NATURE_DATA_API,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GENERATE_PDF_API ERROR............", error)
      toast.error("Pdf file generation error");
    }
    return result;
  }



//function to generate leave application pdf file
export async function getAllLeavesOfUser(token,userID) {
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            GET_ALL_LEAVE_OF_USER_API,
            {
              userID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_ALL_LEAVE_OF_USER_API ERROR............", error)
      toast.error("get all leaves of a user error");
    }
    return result;
  }



//function to generate leave application pdf file
export async function getLeaveDetail(token,application_id) {
    let result = []
    try {
        const response = await apiConnector(
            "POST",
            GET_LEAVE_DETAILS,
            {
              application_id,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_LEAVE_DETAILS ERROR............", error)
      toast.error("get leave details error");
    }
    return result;
  }