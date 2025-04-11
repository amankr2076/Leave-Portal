const BASE_URL=process.env.REACT_APP_BASE_URL;


//Auth endpoints
export const endpoints = {
    // SENDOTP_API: BASE_URL + "/auth/sendotp",
    // SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",
  }


export const studentEndpoints = {
  GENERATE_PDF_API: BASE_URL + "/student/generate-pdf",
  GET_LEAVE_NATURE_DATA_API : BASE_URL + "/student/get-leave-nature-data",
  GET_ALL_LEAVE_OF_USER_API : BASE_URL + "/student/get-user-leave",
  GET_LEAVE_DETAILS : BASE_URL + "/student/get-user-leave-details",
}


export const adminEndpoints = {
  GET_ALL_NEW_APPLICATION_API : BASE_URL + "/admin/get-all-new-applications",
  GET_ALL_APPLICATION_API : BASE_URL + "/admin/get-all-applications",
  GET_ALL_USERS_API : BASE_URL + "/admin/get-all-users",
  ADD_USER_API : BASE_URL + "/admin/add-user",
  ADD_USER_BY_FILE_API : BASE_URL + "/admin/add-user-by-file",
  GET_ALL_DEPARTMENT_API : BASE_URL + "/admin/get-all-dept",
  REJECT_APPLICATION_API : BASE_URL + "/admin/reject-application",
  ACCEPT_APPLICATION_API : BASE_URL + "/admin/accept-application"
}
  