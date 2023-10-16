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
import { Button, Modal } from "rsuite";
import { checkSession } from "./api/UserServices";
import Brands from "./pages/Dashbord/Brands";
import Category from "./pages/Dashbord/Category";
import Users from "./pages/Dashbord/Users";
import { Login } from "./pages/Login";
import { logOut } from "./redux/slices/user.slices";

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
      {expire && (
        <Modal open={open}>
          <Modal.Header>
            <Modal.Title>Session Expired !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="font-bold text-2xl">Please login again !</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bg-indigo-400 text-white w-36"
              onClick={() => {
                dispatch(logOut());
                navigate("/");
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
