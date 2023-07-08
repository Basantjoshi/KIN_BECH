    import  {axiosInstance}  from "./axiosInstance";

//register user

export const RegisterUser = async (payload)=>{
    try {
        const response = await axiosInstance.post("/api/users/register",payload);
        return response.data;
        
    } catch (error) {
        // return error.message
        console.log(error.response);
    }
}

//login user
export const LoginUser = async (payload)=>{
    try {
        const response = await axiosInstance.post("/api/users/login",payload);
        return response.data;
        
    } catch (error) {
        return error.message
        
    }
}

//get current user

export const GetCurrentUser = async ()=>{
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
        
    } catch (error) {
        return error.message
        // console.log(error.response);
        
    }
}

//get all users
export const GetAllUsers = async ()=>{
    try {
        const response = await axiosInstance.get("/api/users/get-users");
        return response.data;
        
    } catch (error) {
        return error.message
        // console.log(error.response);
        
    }
}

//update user status
export const UpdateUsersStatus = async (id,status)=>{
    try {
        const response = await axiosInstance.put(`/api/users/update-user-status/${id}`, {status});
        return response.data;
        
    } catch (error) {
        return error.message
        // console.log(error.response);
        
    }
}
