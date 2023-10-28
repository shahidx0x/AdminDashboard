import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import SideNavigation from "./components/Sidebar";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { checkSession } from "./api/UserServices";
import NavbarHeader from "./components/Navbar";
import AddCompany from "./pages/Dashbord/AddCompany";
import { AllCompany } from "./pages/Dashbord/AllCompany";
import Brands from "./pages/Dashbord/Brands";
import Category from "./pages/Dashbord/Category";
import EditCompany from "./pages/Dashbord/EditCompany";
import Products from "./pages/Dashbord/Products";
import UserInfoEdit from "./pages/Dashbord/UserInfoEdit";
import { UserTable } from "./pages/Dashbord/UserTable";
import Users from "./pages/Dashbord/Users";
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
          path: "brands",
          element: <Brands />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: ":brand_name/categories/:brand_id",
          element: <Category />,
        },
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
  const [expire, setExpire] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.user.user.jwt);
  const { error } = useQuery(["session-check", jwt], checkSession);
  useEffect(() => {
    if (error?.response?.status === 401) {
      setExpire(true);
    }
  }, [error]);
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
