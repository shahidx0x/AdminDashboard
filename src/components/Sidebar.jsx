/* eslint-disable react/prop-types */

import GridIcon from "@rsuite/icons/Grid";
import SiteIcon from "@rsuite/icons/Site";
import ThreeColumnsIcon from "@rsuite/icons/ThreeColumns";
import TreemapIcon from "@rsuite/icons/Treemap";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineInventory,
} from "react-icons/md";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";

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
        className="h-[100vh] 2xl:h-screen  "
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body className="">
          <Sidenav.Toggle onToggle={onExpand} />
          <Nav {...navProps}>
            <Nav.Item
           
              as={Link}
              to="/dashbord/status"
              className="font-bold  "
              eventKey="1"
              icon={<DashboardIcon />}
            >
              <p className="w-[13rem]  "> Dashboard</p>
            </Nav.Item>

            <Nav.Menu
              eventKey="3"
              className="font-bold"
              title="Manage"
              icon={<ThreeColumnsIcon />}
            >
              <Nav.Item as={Link} to="/dashbord/user-table" eventKey="3-1">
                <div className="flex gap-2">
                  <HiOutlineUsers className="text-xl" />
                  <p className="font-bold">Users</p>
                </div>
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/admin-table" eventKey="3-2">
                <div className="flex gap-2">
                  <MdOutlineAdminPanelSettings className="text-xl" />
                  <p className="font-bold">Admins</p>
                </div>
              </Nav.Item>
              <Nav.Item
                as={Link}
                to="/dashbord/manage/inventory"
                eventKey="3-3"
              >
                <div className="flex gap-2">
                  <MdOutlineInventory className="text-xl" />
                  <p className="font-bold">Inventory</p>
                </div>
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/manage/orders" eventKey="3-4">
                <div className="flex gap-2">
                  <PiShoppingCartSimple className="text-xl" />
                  <p className="font-bold">Orders</p>
                </div>
              </Nav.Item>
              {/* <Nav.Item
                as={Link}
                to="/dashbord/notification-list"
                eventKey="3-5"
              >
                <div className="flex gap-2">
                  <IoNotificationsOutline className="text-xl" />
                  <p className="font-bold">Notifications</p>
                </div>
              </Nav.Item> */}
              <Nav.Item
                as={Link}
                to="/dashbord/manage/transaction"
                eventKey="3-6"
              >
                <div className="flex gap-2">
                  <FaRegMoneyBillAlt className="text-xl" />
                  <p className="font-bold">Transactions</p>
                </div>
              </Nav.Item>
            </Nav.Menu>
            {/* */}
            <Nav.Menu
              eventKey="4"
              className="font-bold"
              title="Company"
              icon={<TreemapIcon />}
            >
              <Nav.Item as={Link} to="/dashbord/all-company/" eventKey="4-1">
                <div className="flex gap-2">
                  <BsListUl className="text-xl font-bold" />
                  <p className="font-bold ">All company</p>
                </div>
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/company/add" eventKey="4-2">
                <div className="flex gap-2">
                  <AiOutlineFileAdd className="text-xl  font-bold" />
                  <p className="font-bold">Add company</p>
                </div>
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              eventKey="5"
              className="font-bold"
              title="Category"
              icon={<SiteIcon />}
            >
              <Nav.Item as={Link} to="/dashbord/category/all" eventKey="5-1">
                <div className="flex gap-2">
                  <BsListUl className="text-xl font-bold" />
                  <p className="font-bold ">All category</p>
                </div>
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/category/add" eventKey="5-2">
                <div className="flex gap-2">
                  <AiOutlineFileAdd className="text-xl  font-bold" />
                  <p className="font-bold">Add category</p>
                </div>
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              eventKey="6"
              className="font-bold"
              title="Product"
              icon={<GridIcon />}
            >
              <Nav.Item as={Link} to="/dashbord/product/list" eventKey="6-1">
                <div className="flex gap-2">
                  <BsListUl className="text-xl font-bold" />
                  <p className="font-bold ">All product</p>
                </div>
              </Nav.Item>
              <Nav.Item as={Link} to="/dashbord/product/add" eventKey="6-2">
                <div className="flex gap-2">
                  <AiOutlineFileAdd className="text-xl  font-bold" />
                  <p className="font-bold">Add product</p>
                </div>
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
