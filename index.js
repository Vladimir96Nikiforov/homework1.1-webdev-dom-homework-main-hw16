import { getAPI } from "./api.js";
let token;
export function setToken(data){
    token = data;
}
export function getToken(){
    return token;
}
getAPI()