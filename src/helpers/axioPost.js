import Axios from "axios";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JwtDecode from "jwt-decode";

const decodedToken = () => {
  if (localStorage.getItem("JwtToken")) {
    return JwtDecode(localStorage.getItem("JwtToken"));
  }
};
const token = localStorage.getItem("JwtToken");

toast.configure({
  autoClose: 3000,
  draggable: false,
});
const notify = (data) => toast.success(data);
const badNotify = (data) => toast.error(data);

export const fetch = async ({ api }) => {
  const res = Axios.post(
    apiUrl + api,
    {
      company: decodedToken().company,
    },
    { headers: { "auth-token": token } }
  );
  return res;
};
export const UserName = token ? decodedToken().name : "";
export const Admin = token ? decodedToken().isAdmin : "";
export const User = token ? decodedToken() : "";
export const Company = token ? decodedToken().company : "";

export const Post = async ({ api, data, message, notifytrue }) => {
  try {
    const res = await Axios.post(
      apiUrl + api,
      {
        company: Company,
        data,
      },
      { headers: { "auth-token": token } }
    );
    if (notifytrue !== false) {
      notify(message);
    }
    return res.data;
  } catch (e) {
    badNotify(e.response.data);
  }
};
export const Patch = async ({ api, data, message, notifytrue }) => {
  try {
    const res = await Axios.patch(
      apiUrl + api,
      {
        data,
      },
      { headers: { "auth-token": token } }
    );
    if (notifytrue !== false) {
      notify(message);
    }
    return res.data;
  } catch (e) {
    badNotify(e.response.data);
  }
};
