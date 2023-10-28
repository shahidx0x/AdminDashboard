/* eslint-disable react/prop-types */

import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { Nav, Sidenav } from "rsuite";

import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { logOut } from "../redux/slices/user.slices";

const CustomSidenav = ({
  appearance,
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}) => {
  return (
    <div className="">
      <Sidenav
        className=" h-screen "
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body>
          <Sidenav.Toggle onToggle={onExpand} />
          <Nav {...navProps}>
            <Nav.Item
              className=" "
              eventKey="1"
              active
              icon={<DashboardIcon />}
            >
              <p className="w-[15rem]"> Dashboard</p>
            </Nav.Item>

            <Nav.Menu eventKey="3" title="Manage" icon={<MagicIcon />}>
              <Nav.Item as={Link} to="/dashbord/user-table" eventKey="3-1">
                Users
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="4" title="Company" icon={<GearCircleIcon />}>
              <Nav.Item as={Link} to="/dashbord/all-company/" eventKey="4-1">
                All Company
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/company/add" eventKey="4-2">
                Add Company
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="5" title="Category" icon={<GearCircleIcon />}>
              <Nav.Item as={Link} to="/dashbord/all-category/" eventKey="5-1">
                All Category
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/category/add" eventKey="5-2">
                Add Category
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="6" title="Product" icon={<GearCircleIcon />}>
              <Nav.Item as={Link} to="/dashbord/all-category/" eventKey="6-1">
                All Product
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/category/add" eventKey="6-2">
                Add Product
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
export default function SideNavigation() {
  const [activeKey, setActiveKey] = useState("1");
  const [openKeys, setOpenKeys] = useState(["3", "4"]);
  const [expanded, setExpand] = useState(true);
  const [vis, setVis] = useState(false);
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
      <CustomSidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
        expanded={expanded}
        onExpand={setExpand}
      />
    </div>
  );
}
