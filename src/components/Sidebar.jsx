/* eslint-disable react/prop-types */

import {
  ChevronFirst,
  ChevronLast,
  GanttChartSquare,
  LogOut,
  Trello,
  User2,
} from "lucide-react";
import { useState } from "react";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { logOut } from "../redux/slices/user.slices";

export default function SideNavigation() {
  const [vis, setVis] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
        Swal.fire("Logout", "success");
        navigate("/");
      }
    });
  };
  return (
    <div>
      <Sidebar
        collapsed={vis}
        width="300px"
        collapsedWidth="80px"
        className="h-screen"
      >
        <div className="flex justify-between p-3">
          <h1
            className={
              vis
                ? `overflow-hidden w-0`
                : "text-4xl mt-3 text-indigo-300 font-bold font-mono transition-all"
            }
          >
            FGI-Y2J
          </h1>
          <button
            onClick={() => setVis((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {vis ? (
              <ChevronLast
                className="border-2 p-2 shadow-lg rounded-md"
                color="#6936b5"
                size={50}
              />
            ) : (
              <ChevronFirst className="border p-2" color="#6936b5" size={50} />
            )}
          </button>
        </div>
        <div className="border-b-2 rounded mt-2 shadow-xl"></div>
        <div className="flex flex-col justify-between">
          <div>
            <Menu>
              <SubMenu
                className="font-medium font-mono "
                icon={<GanttChartSquare size={75} color="#6936b5" />}
                label="Manage"
              >
                <div className=" flex flex-col">
                  <NavLink
                    to="users"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-indigo-100 p-3 text-black"
                        : "border-b p-3 bg-base-200"
                    }
                  >
                    <div className="flex gap-3 px-10">
                      <User2 size={20} color="#6936b5" />
                      <p>Users</p>
                    </div>
                  </NavLink>
                  <NavLink
                    to="brands"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-indigo-100 p-3 text-black"
                        : "border-b p-3 bg-base-200"
                    }
                  >
                    <div className="flex gap-3 px-10">
                      <Trello size={20} color="#6936b5" />
                      <p>Brands</p>
                    </div>
                  </NavLink>
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="mt-auto fixed bottom-0 ">
            <div className="border-t flex p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`
              flex justify-between items-center
              overflow-hidden transition-all ${vis ? "w-0" : "w-40 ml-3"}
          `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">Admin</h4>
                  <span className="text-xs text-gray-600">{user.email}</span>
                </div>
                <LogOut
                  onClick={() => {
                    handleLogout();
                  }}
                  className="text-red-500"
                  size={30}
                />
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
