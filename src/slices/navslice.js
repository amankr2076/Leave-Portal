import {createSlice} from "@reduxjs/toolkit"


const determineInitialOption = () => {
    const path = window.location.pathname;
    if(path==="/dashboard/admin-settings" || path==="/dashboard/user-settings")
    {
        return 3;
    }
    else if (path.startsWith("/dashboard/admin/")) {
        return 2;
    }
    else if(path.startsWith("/dashboard/")){
        return 2;
    }
    return 0; // default value
};

const initialState = {
    option: determineInitialOption(),
};

const navSlice = createSlice({
    name:"nav",
    initialState: initialState,
    reducers: {
        setOption(state, value) {
            state.option = value.payload;
        },
    },
});

export const {setOption} = navSlice.actions;
export default navSlice.reducer;