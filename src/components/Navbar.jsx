import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Avatar, Button, Divider, Modal, Nav, Navbar } from "rsuite";
import { logOut } from "../redux/slices/user.slices";

export default function NavbarHeader() {
  const user = useSelector((state) => state.user.user);
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
          <Modal.Title>Are you sure you want to logout ?</Modal.Title>
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

        <Nav pullRight className="mt-3">
          <Nav.Menu
            className=" -ml-28"
            title={
              <Avatar
                circle
                src="https://avatars.githubusercontent.com/u/12592949"
                alt="@superman66"
              />
            }
          >
            <Nav.Item>
              <p className="font-bold">Signed in as Administrator</p>
              <p className="font-mono">{user.email}</p>
            </Nav.Item>
            <Divider />

            <Nav.Item className="">Profile / Account</Nav.Item>
            <Nav.Item
              onClick={handleOpen}
              className="text-red-600 hover:text-red-600"
            >
              Logout
            </Nav.Item>
          </Nav.Menu>
          <Nav.Item></Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}
