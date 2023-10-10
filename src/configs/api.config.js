let host = "https://rest.app.gobd.xyz";
export const config = {
  endpoints: {
    login: host + "/signin",
    session_check: host + "/verify/session",
    users: host + "/get/users", // has query params -> see api doc
    search_user: host + "/get/user", // has query params -> see api doc
    update_user: host + "/user/info/update",
  },
};
