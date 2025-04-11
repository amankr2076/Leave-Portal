import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {CHANGE_PASSWORD_API}=endpoints;


  //function to change password
  export async function changepassword(token,formData) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "POST",
            CHANGE_PASSWORD_API,
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
  
        if (response.data.success && !response.data.check) {
              toast.dismiss(toastId)
              toast.error(response.data.message);
              return;
        }
  
      toast.success("Password updated successfully");
    } catch (error) {
      console.log("CHANGE_PASSWORD_API ERROR............", error)
      toast.error("operation failed");
    }
    toast.dismiss(toastId)
  }
  