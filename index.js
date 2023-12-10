import { getAPI } from "./api.js";
let token;
let user;
export function setToken(data){
    token = data;
}
export function setUser(data){
    user = data;
}
export function getToken(){
    return token;
}
export function getUser(){
    return user;
}
getAPI()