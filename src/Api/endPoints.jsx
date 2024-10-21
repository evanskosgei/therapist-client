/* eslint-disable no-unused-vars */
import Put from "./baseURL/put";
import get from "./baseURL/get";
import Delete from "./baseURL/delete";
import Post from "./baseURL/post";

const EndPoints = {
    Auth:{
        signUp:(data)=>Post('/authentication/signup',data),
    },

}
export default EndPoints;