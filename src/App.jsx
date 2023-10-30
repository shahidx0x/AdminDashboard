import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavbarHeader from "./components/Navbar";
import SideNavigation from "./components/Sidebar";
import AddCompany from "./pages/Dashbord/AddCompany";
import { AllCompany } from "./pages/Dashbord/AllCompany";
import AddCategory from "./pages/Dashbord/Category/AddCategory";
import { AllCategory } from "./pages/Dashbord/Category/AllCategory";
import EditCategory from "./pages/Dashbord/Category/EditCategory";
import EditCompany from "./pages/Dashbord/EditCompany";
import Products from "./pages/Dashbord/Products";
import { SubcategoryList } from "./pages/Dashbord/Subcategory/SubcategoryList";
import UserInfoEdit from "./pages/Dashbord/UserInfoEdit";
import { UserTable } from "./pages/Dashbord/UserTable";
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
          path: "products",
          element: <Products />,
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
          path: "category/subcategory/add",
          element: <EditCategory />,
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
