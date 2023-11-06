import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavbarHeader from "./components/Navbar";
import SideNavigation from "./components/Sidebar";

import AddCategory from "./pages/Dashbord/Category/AddCategory";
import { AllCategory } from "./pages/Dashbord/Category/AllCategory";
import EditCategory from "./pages/Dashbord/Category/EditCategory";
import AddCompany from "./pages/Dashbord/Company/AddCompany";
import { AllCompany } from "./pages/Dashbord/Company/AllCompany";
import EditCompany from "./pages/Dashbord/Company/EditCompany";
import { MainDashbord } from "./pages/Dashbord/MainDashbord";
import AddProduct from "./pages/Dashbord/Products/AddProduct";
import { ProductList } from "./pages/Dashbord/Products/ListProduct";
import EditSubCategory from "./pages/Dashbord/Subcategory/SubCategoryEdit";
import AddSubCategory from "./pages/Dashbord/Subcategory/SubcategoryAdd";
import { SubcategoryList } from "./pages/Dashbord/Subcategory/SubcategoryList";
import UserInfoEdit from "./pages/Dashbord/Users/UserInfoEdit";
import { UserTable } from "./pages/Dashbord/Users/UserTable";
import { Login } from "./pages/Login";

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
          element: <AddProduct />,
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
