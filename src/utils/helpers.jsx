import { store } from "../redux/store";
import secureLocalStorage from "react-secure-storage";

export function getUser() {
    const state = store.getState();
    return state.auth.user;
}

// export function getToken() {
//     const state = store.getState();
//     return state.auth.token;
// }

export function saveToken(token) {
    secureLocalStorage.setItem("token", JSON.stringify(token));
  }
  
  export function getToken() {
    return JSON.parse(secureLocalStorage.getItem("token"));
  }