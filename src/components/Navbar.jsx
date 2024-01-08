/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticeIcon from "@rsuite/icons/Notice";
import { useNavigate } from "react-router";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  Loader,
  Modal,
  Nav,
  Navbar,
  Popover,
  Whisper,
} from "rsuite";
import { logOut } from "../redux/slices/user.slices";


import { Icon } from "@rsuite/icons";

import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";
import { setThemeDark, setThemeLight } from "../redux/slices/settings.slice";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUnreadNotification } from "../api/Notification";

export default function NavbarHeader() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const {
    data,
    refetch
  } = useQuery(["notification", user.jwt], getUnreadNotification, {
    cacheTime: 0,
  });
  refetch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className=" font-bold text-lg">
            Are you sure you want to logout ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleLogout}
            className="bg-blue-600 w-20"
            appearance="primary"
          >
            Ok
          </Button>
          <Button
            onClick={handleClose}
            className="bg-red-600 text-white w-20"
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar className="h-20">
        <Navbar.Brand className="text-4xl font-bold" href="#">
          FGY-Y2J
        </Navbar.Brand>

        <Nav pullRight className="mt-3 mr-3">
          <MenuComponent placement="bottomEnd" handleOpen={handleOpen}>
            <Avatar
              circle
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png"
              alt="avater"
            />
          </MenuComponent>
        </Nav>
        <Nav as={Link} to="/dashbord/status" pullRight className="mt-4 ">
          <IconButton
            icon={
              <Badge content={data?.unread} className="">
                <NoticeIcon style={{ fontSize: 25, fontWeight: "bolder" }} />{" "}
              </Badge>
            }
          />
        </Nav>


        <Nav pullRight className="mt-4 ">
          <IconButton
            icon={
              <Icon
                as={
                  settings.theme === "light"
                    ? MdOutlineNightlight
                    : MdOutlineLightMode
                }
                style={{ fontSize: 25, fontWeight: "bolder" }}
              />
            }
            onClick={() => {
              settings.theme === "light"
                ? dispatch(setThemeDark())
                : dispatch(setThemeLight());
            }}
          />
        </Nav>
      
      </Navbar>
    </>
  );
}

// eslint-disable-next-line react/display-name, react/prop-types
const DefaultPopover = React.forwardRef(({ content, ...props }, ref) => {
  const user = useSelector((state) => state.user.user);
  return (
    <Popover
      ref={ref}
      title={
        <p className="font-bold">
          <span className="font-mono">Signed in as : </span>
          <br />
          <span className="font-mono">{user.email}</span>
        </p>
      }
      {...props}
    >
      <Divider />

      <p>{content}</p>
    </Popover>
  );
});

const PopoverWithLoader = React.forwardRef((props, ref) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Popover ref={ref} {...props}>
      {loading ? (
        <Loader content="Loading..." />
      ) : (
        <div>
          <p>This is a Popover.</p>
          <p>The loading content is loaded.</p>
        </div>
      )}
    </Popover>
  );
});

const MenuComponent = ({ placement, loading, children, handleOpen }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      loading ? (
        <PopoverWithLoader />
      ) : (
        <DefaultPopover
          content={
            <>
              <div>
                <p className="text-black-600 cursor-pointer hover:text-white hover:bg-indigo-500  font-bold p-2 ">
                  Profile
                </p>
              </div>
              <div className="border-b"></div>
              <div
                onClick={handleOpen}
                className="text-red-600 cursor-pointer hover:text-white text-md font-mono  p-2 font-bold hover:bg-indigo-500"
              >
                Logout
              </div>
            </>
          }
        />
      )
    }
  >
    <Button className="border-2" appearance="subtle">
      {children}
    </Button>
  </Whisper>
);
