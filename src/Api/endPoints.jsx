/* eslint-disable no-unused-vars */
import Put from "./baseURL/put";
import get from "./baseURL/get";
import Delete from "./baseURL/delete";
import Post from "./baseURL/post";

const EndPoints = {
    Auth:{
        login:(data)=>Post('user/login',data),
        signup:(data)=>Post('user/signup', data),
        verify:(data)=>Post('user/email-verify', data),
        otpResend:(data)=>Post('user/resend-otp', data),
        forgotpassword:(data)=>Post('user/forgot-password', data),
        resetpassword:(data)=>Post('user/reset-password', data),
    },

}
export default EndPoints;