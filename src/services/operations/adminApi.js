import toast from "react-hot-toast";
import { adminEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";



const { GET_ALL_NEW_APPLICATION_API, REJECT_APPLICATION_API, ACCEPT_APPLICATION_API, GET_ALL_APPLICATION_API,
        GET_ALL_USERS_API, GET_ALL_DEPARTMENT_API, ADD_USER_API, ADD_USER_BY_FILE_API } = adminEndpoints;







//function to get all new application
export async function getAllNewApplication(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_NEW_APPLICATION_API,
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
      console.log("GET_ALL_NEW_APPLICATION_API ERROR............", error)
      toast.error("data fetch error");
    }
    return result;
  }




//function to get all applications
export async function getAllApplication(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_APPLICATION_API,
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
      console.log("GET_ALL_NEW_APPLICATION_API ERROR............", error)
      toast.error("data fetch error");
    }
    return result;
  }




//function to get all users
export async function getAllUsersList(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_USERS_API,
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
      console.log("GET_ALL_USERS_API ERROR............", error)
      toast.error("data fetch error");
    }
    return result;
  }




//function to get all users
export async function getAllDepartments(token) {
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_DEPARTMENT_API,
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
      console.log("GET_ALL_DEPARTMENT_API ERROR............", error)
      toast.error("department data fetch error");
    }
    return result;
  }






  

//function to reject the application file
export async function rejectApplicationFunction(token,applicationID) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            REJECT_APPLICATION_API,
            {
                applicationID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Application Rejected");
      toast.dismiss(toastId);
      return true;
    } catch (error) {
      console.log("REJECT_APPLICATION_API ERROR............", error)
      toast.error("reject Application error");
      toast.dismiss(toastId);
      return false;
    }
  }

  



//function to acceot the application file
export async function acceptApplicationFunction(token,formData,applicationID) {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            ACCEPT_APPLICATION_API,
            {
                formData,applicationID,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.dismiss(toastId)
      toast.success("Application Accepted");
      return true;
    } catch (error) {
      console.log("ACCEPT_APPLICATION_API ERROR............", error)
      toast.error("accept Application error");
      toast.dismiss(toastId);
      return false;
    }

  }




  


//function to generate leave application pdf file
export async function addUserFunction(token,formData) {
  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_USER_API,
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
    toast.success("user added Successfully");
  } catch (error) {
    console.log("ADD_USER_API ERROR............", error)
    toast.error("add user error");
  }
  toast.dismiss(toastId)
}





//function to add documents to an existing project
export async function AddUserByFileFunction(token,formData) {

  const toastId = toast.loading("Loading...")
  try {
      const response = await apiConnector(
          "POST",
          ADD_USER_BY_FILE_API,
              formData,
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.dismiss(toastId);
    toast.success(`${response.data.count} Users added successfully`);
  } catch (error) {
    toast.dismiss(toastId);
  
    // Check if it's a validation error (409 Conflict)
    if (error.response && error.response.status === 409) {
      toast.error(error.response.data.message);
      console.log("ADD_USER_BY_FILE_API ERROR............", error);
      return;
    }
  
    console.log("ADD_USER_BY_FILE_API ERROR............", error);
    toast.error("Adding user failed");
  }
}
