/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingIcon from "@rsuite/icons/Setting";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  Loader,
  Message,
  Modal,
  Nav,
  Navbar,
  Popover,
  Toggle,
  Uploader,
  Whisper,
  toaster,
} from "rsuite";
import { logOut } from "../redux/slices/user.slices";

import { Icon } from "@rsuite/icons";

import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";
import {
  setTableAutoHeight,
  setTableBordered,
  setTableCompact,
  setTableHeader,
  setTableHover,
  setThemeDark,
  setThemeLight,
} from "../redux/slices/settings.slice";
import { config } from "../configs/api.config";
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
export default function NavbarHeader() {
  const settings = useSelector((state) => state.settings);

  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const [uploadResponseTwo, setUploadResponseTwo] = useState({ fileUrl: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
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
              alt="@superman66"
            />
          </MenuComponent>
        </Nav>
        <Nav pullRight className="mt-6 px-2">
          <SettingIcon
            onClick={() => setOpenSettings(true)}
            className="text-3xl"
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

      <Drawer
        size="md"
        placement={"right"}
        backdrop={false}
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      >
        <Drawer.Header>
          <Drawer.Title className="font-bold">Settings</Drawer.Title>
          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <div className=" -ml-12">
            <div>
              <p className="font-bold text-lg">Table Settings</p>
              <Divider />
            </div>
            <div className="flex flex-col gap-3 font-bold">
              <div>
                <span className="flex justify-between">
                  <p>Compact：</p>
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.compact}
                    onChange={() => dispatch(setTableCompact())}
                  />
                </span>
              </div>
              <div>
                <span className="flex justify-between">
                  <p>Bordered：</p>
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.bordered}
                    onChange={() => dispatch(setTableBordered())}
                  />
                </span>
              </div>
              <div>
                <span className="flex justify-between">
                  Show Header：
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.header}
                    onChange={() => dispatch(setTableHeader())}
                  />
                </span>
              </div>
              <div>
                <span className="flex justify-between">
                  Hover：
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.hover}
                    onChange={() => dispatch(setTableHover())}
                  />
                </span>
              </div>
              <div>
                <span className="flex justify-between">
                  Auto Height：
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.autoHeight}
                    onChange={() => dispatch(setTableAutoHeight())}
                  />
                </span>
              </div>
            </div>
            <Divider />
          </div>
          <div className=" -ml-12">
            <div>
              <p className="font-bold text-lg">App Settings</p>
              <Divider />
            </div>
            <div className="flex flex-col gap-3 font-bold">
              <div>
                <div className="flex justify-between">
                  <p>
                    App Version：
                    <span className="text-xs font-medium font-mono">
                      1.0.0-Beta{" "}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div>
                <span className="flex justify-between">
                  <p>Maintainance Mode ：</p>
                  <Toggle
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={settings.bordered}
                    onChange={() => dispatch(setTableBordered())}
                  />
                </span>
              </div>
              <Divider />
              <form action="">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <p>Popup Image :</p>
                    <Uploader
                      className="mt-3"
                      fileListVisible={false}
                      listType="picture"
                      action={`${config.endpoints.host}/upload`}
                      onUpload={(file) => {
                        setUploading(true);
                        previewFile(file.blobFile, (value) => {
                          setFileInfo(value);
                        });
                      }}
                      onSuccess={(response) => {
                        setUploading(false);
                        toaster.push(<Message type="success"></Message>);
                        setUploadResponse(response);
                      }}
                      onError={() => {
                        setFileInfo(null);
                        setUploading(false);
                        toaster.push(<Message type="error"></Message>);
                      }}
                    >
                      <button type="button" style={{ width: 350, height: 150 }}>
                        {uploading && <Loader backdrop center />}
                        {fileInfo ? (
                          <img src={fileInfo} width="100%" height="150%" />
                        ) : (
                          <img
                            src={uploadResponse?.profilePicture}
                            alt="popup image"
                          />
                        )}
                      </button>
                    </Uploader>
                  </div>
                  <div className="flex flex-col">
                    <p>Offer Banner :</p>
                    <Uploader
                      className="mt-3"
                      fileListVisible={false}
                      listType="picture"
                      action={`${config.endpoints.host}/upload`}
                      onUpload={(file) => {
                        setUploading(true);
                        previewFile(file.blobFile, (value) => {
                          setFileInfo(value);
                        });
                      }}
                      onSuccess={(response) => {
                        setUploading(false);
                        toaster.push(<Message type="success"></Message>);
                        setUploadResponseTwo(response);
                      }}
                      onError={() => {
                        setFileInfo(null);
                        setUploading(false);
                        toaster.push(<Message type="error"></Message>);
                      }}
                    >
                      <button type="button" style={{ width: 350, height: 150 }}>
                        {uploading && <Loader backdrop center />}
                        {fileInfo ? (
                          <img src={fileInfo} width="100%" height="150%" />
                        ) : (
                          <img
                            src={uploadResponseTwo?.profilePicture}
                            alt="popup image"
                          />
                        )}
                      </button>
                    </Uploader>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>Offer Text :</p>
                  <Input as="textarea" rows={3} placeholder="" />
                </div>
                <Button type="submit" className="bg-blue-700 font-bold text-white mt-2">
                  Update
                </Button>
              </form>
            </div>

            <Divider />
          </div>
        </Drawer.Body>
      </Drawer>
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
