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
    setting:{
        profile:()=>get('user/fetch-user'),
        update_password:(data)=>Post('user/update-password', data),
        update_profile:(data)=>Post('user/update', data),
        delete:()=>Post('user/delete')
    },
    booking:{
        open_session:()=>get('/user/fetch-available-therapists'),
        fetch_therapist:()=>get('/user/fetch-therapist-data'),
        fetch_therapist_data:(data)=>Post('/user/fetch-therapist-data', data),
        fetch_active_session_bookings:()=>get('/user/booked-active-sessions'),
        fetch_completed_session_bookings:()=>get('/user/booked-completed-sessions'),
        fetch_cancelled_session_bookings:()=>get('/user/booked-cancelled-sessions'),
    },
    therapy_type:{
        types:()=>get('/user/fetch-therapy-types'),
    },
    payment_methods:{
        fetch_payment_methods:()=>get('/user/fetch-payment-methods'),
    },

}
export default EndPoints;