import { combineReducers } from "@reduxjs/toolkit";

import authReducer from '../slices/authslice';
import profileReducer from '../slices/profileslice';
import navReducer from '../slices/navslice';


const rootReducer=combineReducers({
    auth: authReducer,
    profile: profileReducer,
    nav : navReducer,
})

export default rootReducer;