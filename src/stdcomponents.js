import JwtDecode from "jwt-decode";
import Axios from "axios";
import { apiUrl } from "./config.json";
//export
export const user = JwtDecode(localStorage.getItem("JwtToken"));
export const token = localStorage.getItem("JwtToken");
export const Api = apiUrl;
export const axios = Axios;
