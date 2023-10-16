let host = "https://rest.app.gobd.xyz";
export const config = {
  endpoints: {
    host: host,
    login: host + "/signin",
    session_check: host + "/check/session",
    users: host + "/get/users", // has query params -> see api doc
    search_user: host + "/get/user", // has query params -> see api doc
    update_user: host + "/user/info/update",
    brands: host + "/get/all/brands", // has query params -> see api doc
    brand_create: host + "/create/brands",
    all_category_under_brand: host + "/get/all/category", // has query params -> see api doc
    create_category_under_brand: host + "/create/category",
  },
};
