import { Api, user, axios, token } from "../stdcomponents";
import { Post } from "./axioPost";

// ("/api");
// ("/api/img");
// ("/api/audit");
// ("/api/quicktask");
// ("/api/plant");
// ("/api/personalsettings");
// ("/api/others");

export const getPlace = Post({
  Api: "/api/plant/all/department",
  notifytrue: false,
  data: {
    company: user.company,
  },
});
