/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import NoticeIcon from "@rsuite/icons/Notice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Loader,
  Modal,
  Nav,
  Navbar,
  Popover,
  Whisper,
} from "rsuite";
import { logOut } from "../redux/slices/user.slices";

export default function NavbarHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <Modal.Title className="font-mono font-bold text-lg">
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
          <NotificationComponent placement="bottomEnd" handleOpen={handleOpen}>
            <Badge>
              <NoticeIcon className="text-xl " />
            </Badge>
          </NotificationComponent>
          <MenuComponent placement="bottomEnd" handleOpen={handleOpen}>
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/12592949"
              alt="@superman66"
            />
          </MenuComponent>
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
          <span className="font-mono">Signed in as</span> <br />{" "}
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
const NotificationPopover = React.forwardRef(({ content, ...props }, ref) => {
  return (
    <Popover
      ref={ref}
      title={<p className="font-bold">Notification</p>}
      {...props}
    >
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
                <p className="text-black-600 cursor-pointer hover:text-black hover:bg-indigo-100  text-md font-mono p-1 font-bold ">
                  Profile
                </p>
              </div>
              <div
                onClick={handleOpen}
                className="text-red-600 cursor-pointer hover:text-black text-md font-mono p-1 font-bold hover:bg-indigo-100"
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

const NotificationComponent = ({ placement, loading, children }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      loading ? (
        <PopoverWithLoader />
      ) : (
        <NotificationPopover
          content={
            <div className="flex flex-col gap-2">
              <div className="flex gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-50 text-gray-800 divide-gray-300">
                <div className="flex flex-1 flex-col p-4 border-l-4 border-violet-600">
                  <span className="text-md font-mono font-bold">
                    #Order Request From
                  </span>
                  <span className="text-xs text-gray-600">
                    Vitae nulla eligendi dignissimos culpa doloribus.
                  </span>
                </div>
              </div>
              <div className="flex gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-50 text-gray-800 divide-gray-300">
                <div className="flex flex-1 flex-col p-4 border-l-4 border-violet-600">
                  <span className="text-md font-mono font-bold">
                    #Order Request From
                  </span>
                  <span className="text-xs text-gray-600">
                    Vitae nulla eligendi dignissimos culpa doloribus.
                  </span>
                </div>
              </div>
              <div className="flex gap-6 rounded-lg overflow-hidden divide-x max-w-2xl bg-gray-50 text-gray-800 divide-gray-300">
                <div className="flex flex-1 flex-col p-4 border-l-4 border-violet-600">
                  <span className="text-md font-mono font-bold">
                    #Order Request From
                  </span>
                  <span className="text-xs text-gray-600">
                    Vitae nulla eligendi dignissimos culpa doloribus.
                  </span>
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <Link
                  className="text-blue-500 underline font-bold font-mono"
                  to="/login"
                >
                  see all notification
                </Link>
              </div>
            </div>
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
