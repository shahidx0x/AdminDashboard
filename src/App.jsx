import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import NavbarHeader from "./components/Navbar";
import SideNavigation from "./components/Sidebar";

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
const Login = lazy(() => import("./pages/Login"));

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
          element: <MainDashbord />,
        },
        {
          path: "user-table",
          element: <UserTable />,
        },
        {
          path: "user-table/edit",
          element: <UserInfoEdit />,
        },
        {
          path: "all-company/edit",
          element: <EditCompany />,
        },
        {
          path: "company/add",
          element: <AddCompany />,
        },
        {
          path: "all-company",
          element: <AllCompany />,
        },
        {
          path: "category/all",
          element: <AllCategory />,
        },
        {
          path: "category/add",
          element: <AddCategory />,
        },
        {
          path: "category/edit",
          element: <EditCategory />,
        },
        {
          path: "subcategory/list/:category_name/:category_id",
          element: <SubcategoryList />,
        },
        {
          path: "subcategory/:brand_id/:category_id/add",
          element: <AddSubCategory />,
        },
        {
          path: "subcategory/edit",
          element: <EditSubCategory />,
        },
        {
          path: "product/add",
          element: <AddProduct />,
        },
        {
          path: "product/list",
          element: <ProductList />,
        },
        {
          path: "product/edit",
          element: <EditProduct />,
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routers} />
    </Suspense>
  );
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
  return (
    <>
      <NavbarHeader />
      <div className="flex">
        <div>
          <SideNavigation />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
