let host = import.meta.env.VITE_HOST;
let fcmKey = import.meta.env.VITE_FIREBASE_FCM_KEY;
export const config = {
  endpoints: {
    host: host,
    fcmKey: fcmKey,
    login: host + "/signin",
    session_check: host + "/check/session",
    users: host + "/get/users", // has query params -> see api doc
    search_user: host + "/get/user", // has query params -> see api doc
    update_user: host + "/user/info/update",
    brands: host + "/get/all/brands", // has query params -> see api doc
    brand_create: host + "/create/brands",
    brand_delete: host + "/delete/brands/by",
    all_category: host + "/get/all/category", // has query params -> see api doc
    create_category_under_brand: host + "/create/category",
    get_all_product: host + "/get/all/products", // has query params -> see api doc
    get_all_product_by_brand_id: host + "/get/all/products/by/brand", // has query params -> see api doc
    update_product: host + "/update/products",
    delete_product: host + "/delete/products",
    get_all_brand_id_and_name: host + "/get/all/brands/id/and/name",
    create_products: host + "/create/products",
    brand_search: host + "/get/all/brands/search",
  },
};
