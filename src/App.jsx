import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import NavbarHeader from "./components/Navbar";
import SideNavigation from "./components/Sidebar";
import AddAdmin from "./pages/Dashbord/Admin/AddAdmin";
import AdminTable from "./pages/Dashbord/Admin/AdminTable";
import EditAdmin from "./pages/Dashbord/Admin/EditAdmin";
import Inventory from "./pages/Dashbord/Inventory/Inventory";
import Order from "./pages/Dashbord/Orders/Order";
import Transaction from "./pages/Dashbord/Transaction/Transaction";
import Login from "./pages/Login";

// Lazy load the components
const AddCategory = lazy(() => import("./pages/Dashbord/Category/AddCategory"));
const AllCategory = lazy(() => import("./pages/Dashbord/Category/AllCategory"));
const EditCategory = lazy(() =>
  import("./pages/Dashbord/Category/EditCategory")
);
const AddCompany = lazy(() => import("./pages/Dashbord/Company/AddCompany"));
const AllCompany = lazy(() => import("./pages/Dashbord/Company/AllCompany"));
const EditCompany = lazy(() => import("./pages/Dashbord/Company/EditCompany"));
const MainDashbord = lazy(() => import("./pages/Dashbord/MainDashbord"));
const AddProduct = lazy(() => import("./pages/Dashbord/Products/AddProduct"));
const EditProduct = lazy(() => import("./pages/Dashbord/Products/EditProduct"));
const ProductList = lazy(() => import("./pages/Dashbord/Products/ListProduct"));
const EditSubCategory = lazy(() =>
  import("./pages/Dashbord/Subcategory/SubCategoryEdit")
);
const AddSubCategory = lazy(() =>
  import("./pages/Dashbord/Subcategory/SubcategoryAdd")
);
const SubcategoryList = lazy(() =>
  import("./pages/Dashbord/Subcategory/SubcategoryList")
);
const UserInfoEdit = lazy(() => import("./pages/Dashbord/Users/UserInfoEdit"));
const UserTable = lazy(() => import("./pages/Dashbord/Users/UserTable"));

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/dashbord",
      element: <Dashbord />,
      children: [
        {
          path: "status",
          element: (
            <Suspense fallback={<Loading />}>
              <MainDashbord />
            </Suspense>
          ),
        },
        {
          path: "user-table",
          element: (
            <Suspense fallback={<Loading />}>
              <UserTable />
            </Suspense>
          ),
        },
        {
          path: "update-admin-info",
          element: (
            <Suspense fallback={<Loading />}>
              <EditAdmin />
            </Suspense>
          ),
        },
        {
          path: "add-new-admin",
          element: (
            <Suspense fallback={<Loading />}>
              <AddAdmin />
            </Suspense>
          ),
        },
        {
          path: "admin-table",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminTable />
            </Suspense>
          ),
        },
        {
          path: "user-table/edit",
          element: (
            <Suspense fallback={<Loading />}>
              <UserInfoEdit />
            </Suspense>
          ),
        },
        {
          path: "all-company/edit",
          element: (
            <Suspense fallback={<Loading />}>
              <EditCompany />
            </Suspense>
          ),
        },
        {
          path: "company/add",
          element: (
            <Suspense fallback={<Loading />}>
              <AddCompany />
            </Suspense>
          ),
        },
        {
          path: "all-company",
          element: (
            <Suspense fallback={<Loading />}>
              <AllCompany />
            </Suspense>
          ),
        },
        {
          path: "category/all",
          element: (
            <Suspense fallback={<Loading />}>
              <AllCategory />
            </Suspense>
          ),
        },
        {
          path: "category/add",
          element: (
            <Suspense fallback={<Loading />}>
              <AddCategory />
            </Suspense>
          ),
        },
        {
          path: "category/edit",
          element: (
            <Suspense fallback={<Loading />}>
              <EditCategory />
            </Suspense>
          ),
        },
        {
          path: "subcategory/list/:category_name/:category_id",
          element: (
            <Suspense fallback={<Loading />}>
              <SubcategoryList />
            </Suspense>
          ),
        },
        {
          path: "subcategory/:brand_id/:category_id/add",
          element: (
            <Suspense fallback={<Loading />}>
              <AddSubCategory />
            </Suspense>
          ),
        },
        {
          path: "subcategory/edit",
          element: (
            <Suspense fallback={<Loading />}>
              <EditSubCategory />
            </Suspense>
          ),
        },
        {
          path: "product/add",
          element: (
            <Suspense fallback={<Loading />}>
              <AddProduct />
            </Suspense>
          ),
        },
        {
          path: "product/list",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductList />
            </Suspense>
          ),
        },
        {
          path: "product/edit",
          element: (
            <Suspense fallback={<Loading />}>
              <EditProduct />
            </Suspense>
          ),
        },
        {
          path: "manage/orders",
          element: (
            <Suspense fallback={<Loading />}>
              <Order />
            </Suspense>
          ),
        },
        {
          path: "manage/transaction",
          element: (
            <Suspense fallback={<Loading />}>
              <Transaction />
            </Suspense>
          ),
        },
        {
          path: "manage/inventory",
          element: (
            <Suspense fallback={<Loading />}>
              <Inventory />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}
function Root() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

function Dashbord() {
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  const scrollableStyle = {
    flex: "1",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <>
      <NavbarHeader />
      <div style={containerStyle}>
        <div
          style={{
            flex: "0 0 auto",
            height: "100%",
          }}
        >
          <SideNavigation />
        </div>
        <div style={scrollableStyle} className="main-content ">
          <style>
            {`
              .main-content::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
