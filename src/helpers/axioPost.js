import { useContext } from "react";

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
export const token = localStorage.getItem("JwtToken");

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

// functions

export const Post = async ({ api, data, message, notifytrue }) => {
  try {
    const res = await Axios.post(
      apiUrl + api,
      {
        data: { ...data, company: Company },
      },
      { headers: { "auth-token": token } }
    );
    if (!res.data.data) {
      return res.data;
    } else {
      notify(res.data.message);
      return res.data.data;
    }
  } catch (err) {
    badNotify(err.response.data);
  }
};
