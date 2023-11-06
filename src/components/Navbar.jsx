/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import NoticeIcon from "@rsuite/icons/Notice";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  List,
  Loader,
  Modal,
  Nav,
  Navbar,
  Popover,
  Stack,
  Whisper,
} from "rsuite";
import { logOut } from "../redux/slices/user.slices";

export default function NavbarHeader() {
  const trigger = useRef(null);
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
          <Whisper
            placement="bottomEnd"
            trigger="click"
            ref={trigger}
            speaker={renderNoticeSpeaker}
          >
            <IconButton
              icon={
                <Badge content={5}>
                  <NoticeIcon style={{ fontSize: 20 }} />
                </Badge>
              }
            />
          </Whisper>

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
          <span className="font-mono">Signed in as : </span>
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
                <p className="text-black-600 cursor-pointer hover:text-black hover:bg-indigo-100 hover:rounded-xl  text-md font-bold p-2 ">
                  Profile
                </p>
              </div>
              <div className="border-b"></div>
              <div
                onClick={handleOpen}
                className="text-red-600 cursor-pointer hover:text-red-500 text-md font-mono  hover:rounded-xl p-2 font-bold hover:bg-indigo-100"
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

const renderNoticeSpeaker = ({ onClose, left, top, className }, ref) => {
  const notifications = [
    [
      "7 hours ago",
      "The charts of the dashboard have been fully upgraded and are more visually pleasing.",
    ],
    [
      "13 hours ago",
      "The function of virtualizing large lists has been added, and the style of the list can be customized as required.",
    ],
    [
      "3 days ago",
      "Upgraded React Suite 5 to support TypeScript, which is more concise and efficient.",
    ],
    [
      "3 days ago",
      "Upgraded React Suite 5 to support TypeScript, which is more concise and efficient.",
    ],
  ];

  return (
    <Popover
      ref={ref}
      className={className}
      style={{ left, top, width: 300 }}
      title="Last updates"
    >
      <List>
        {notifications.map((item, index) => {
          const [time, content] = item;
          return (
            <List.Item key={index}>
              <Stack spacing={4}>
                <Badge /> <span style={{ color: "#57606a" }}>{time}</span>
              </Stack>

              <p>{content}</p>
            </List.Item>
          );
        })}
      </List>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button className="bg-gray-300" onClick={onClose}>
          More notifications
        </Button>
      </div>
    </Popover>
  );
};
