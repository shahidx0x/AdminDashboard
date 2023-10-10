import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SideNavigation from "./components/Sidebar";

import Brands from "./pages/Dashbord/Brands";
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
      <div className="flex ">
        <div className="flex justify-between">
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
