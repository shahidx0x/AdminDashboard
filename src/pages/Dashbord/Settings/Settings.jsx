import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Divider,
  Input,
  Loader,
  Message,
  Modal,
  Panel,
  Toggle,
  Uploader,
  useToaster,
} from "rsuite";

import {
  disableMaintain,
  enableMaintain,
  setTableAutoHeight,
  setTableBordered,
  setTableCompact,
  setTableHeader,
  setTableHover,
} from "../../../redux/slices/settings.slice";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../configs/api.config";
import axios from "axios";
import { getSettings } from "../../../api/Settings";
import { useQuery } from "react-query";
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Settings = () => {
  const settings = useSelector((state) => state.settings);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [maintain, SetMaintain] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [uploadingOfferBanner, setUploadingOfferBanner] = useState(false);
  const [offerText, SetOfferText] = useState(null);
  const { data } = useQuery(["settings", user.jwt], getSettings, {
    cacheTime: 0,
  });

  const [fileInfo, setFileInfo] = useState(null);
  const [fileInfoTwo, setFileInfoTwo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({
    fileUrl: data?.data[0].popup_image,
  });
  const [uploadResponseTwo, setUploadResponseTwo] = useState({
    fileUrl: data?.data[0].offer_banner,
  });

  const [popup, setPopup] = useState(data?.data[0].adv_popup);
  const [banner, setBanner] = useState(data?.data[0].adv_banner);

  const handleUpdate = () => {
    let payload = {};
    if (uploadResponse) {
      payload.popup_image = uploadResponse.fileUrl;
    }
    if (uploadResponseTwo) {
      payload.offer_banner = uploadResponseTwo.fileUrl;
    }
    if (offerText) {
      payload.offer_text = offerText;
    }
    if (popup) {
      payload.adv_popup = true;
    } else {
      payload.adv_popup = false;
    }
    if (banner) {
      payload.adv_banner = true;
    } else {
      payload.adv_banner = false;
    }
    axios
      .patch(config.endpoints.host + "/app/settings", payload)
      .then((res) =>
        res.status === 200
          ? toaster.push(<Message type="success">settings updated</Message>)
          : toaster.push(<Message type="error">something went wrong</Message>)
      );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleDone = () => {
    axios
      .patch(config.endpoints.host + "/app/settings", {
        app_maintenance: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(enableMaintain());
          setOpen(false);
        } else {
          toaster.push(<Message type="error">Something went wrong</Message>);
        }
      });
  };
  useEffect(() => {
    if (maintain) {
      handleOpen();
    } else {
      axios
        .patch(config.endpoints.host + "/app/settings", {
          app_maintenance: false,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(disableMaintain());
            setOpen(false);
          } else {
            toaster.push(<Message type="error">Something went wrong</Message>);
          }
        });
    }
    data?.data[0].adv_popup ? setPopup(true) : setPopup(false);
    data?.data[0].adv_banner ? setBanner(true) : setBanner(false);
  }, [maintain, dispatch, data?.data]);
  const handleClose = () => {
    SetMaintain(false);
    setOpen(false);
  };
  const handleRemove = (event) => {
    if (event === "popup") {
      axios
        .patch(config.endpoints.host + "/app/settings", { popup_image: null })
        .then((res) =>
          res.status === 200
            ? toaster.push(<Message type="success">Popup removed</Message>)
            : toaster.push(<Message type="error">Something went wrong</Message>)
        );
    }
    if (event === "offer") {
      axios
        .patch(config.endpoints.host + "/app/settings", { offer_banner: null })
        .then((res) =>
          res.status === 200
            ? toaster.push(<Message type="success">Banner removed</Message>)
            : toaster.push(<Message type="error">Something went wrong</Message>)
        );
    }
    window.location.reload();
  };

  return (
    <Panel
      header={
        <div>
          <Breadcrumb className="text-sm font-mono">
            <Breadcrumb.Item as={Link} to="/dashbord/status">
              dashbord
            </Breadcrumb.Item>

            <Breadcrumb.Item active className="text-blue-400">
              settings
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      }
      bordered
    >
      <Modal
        backdrop="static"
        role="alertdialog"
        open={open}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          Once maintainance mode enabled app users cant access the app. Are you
          sure ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-indigo-200 text-indigo-500 "
            onClick={handleDone}
            appearance="primary"
          >
            Confirm
          </Button>
          <Button
            className="bg-red-200 text-red-500 "
            onClick={handleClose}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="">
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
        <div className="">
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
                  checked={maintain}
                  onChange={() => SetMaintain((prev) => !prev)}
                />
              </span>
            </div>
            <Divider />
            <div>
              <div>
                <p className="font-bold text-lg">Offer / Banner Settings</p>
                <Divider />
              </div>
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
                    <button type="button" style={{ width: 350, height: 450 }}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? (
                        <img
                          src={fileInfo || data?.data[0].popup_image}
                          width="100%"
                          height="150%"
                        />
                      ) : (
                        <img
                          src={
                            uploadResponse?.fileUrl || data?.data[0].popup_image
                          }
                          alt="popup image"
                        />
                      )}
                    </button>
                  </Uploader>
                  <Button
                    onClick={() => handleRemove("popup")}
                    className="bg-red-200 text-red-500"
                  >
                    Remove
                  </Button>
                </div>
                <div className="flex flex-col">
                  <p>Offer Banner :</p>
                  <Uploader
                    className="mt-3"
                    fileListVisible={false}
                    listType="picture"
                    action={`${config.endpoints.host}/upload`}
                    onUpload={(file) => {
                      setUploadingOfferBanner(true);
                      previewFile(file.blobFile, (value) => {
                        setFileInfoTwo(value);
                      });
                    }}
                    onSuccess={(response) => {
                      setUploadingOfferBanner(false);
                      toaster.push(<Message type="success"></Message>);
                      setUploadResponseTwo(response);
                    }}
                    onError={() => {
                      setFileInfoTwo(null);
                      setUploadingOfferBanner(false);
                      toaster.push(<Message type="error"></Message>);
                    }}
                  >
                    <button type="button" style={{ width: 350, height: 450 }}>
                      {uploadingOfferBanner && <Loader backdrop center />}
                      {fileInfoTwo ? (
                        <img
                          src={fileInfoTwo || data?.data[0].offer_banner}
                          width="100%"
                          height="150%"
                        />
                      ) : (
                        <img
                          src={
                            uploadResponseTwo?.fileUrl ||
                            data?.data[0].offer_banner
                          }
                          alt="offer image"
                        />
                      )}
                    </button>
                  </Uploader>
                  <Button
                    onClick={() => handleRemove("offer")}
                    className="bg-red-200 text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div></div>
                <Checkbox
                  checked={popup}
                  onChange={(value, event) => setPopup(event)}
                >
                  <span className="font-bold">
                    Advertise Popup image to user ?
                  </span>
                </Checkbox>

                <Checkbox
                  checked={banner}
                  onChange={(value, event) => setBanner(event)}
                >
                  <span className="font-bold">
                    Advertise Offer banner to user ?
                  </span>
                </Checkbox>
              </div>

              <div className="flex flex-col mt-2">
                <p>Offer Text :</p>
                <Input
                  value={data?.data[0].offer_text}
                  onChange={(text) => SetOfferText(text)}
                  as="textarea"
                  rows={3}
                  placeholder=""
                />
              </div>
              <Button
                onClick={() => handleUpdate()}
                className="bg-blue-700 font-bold text-white mt-2"
              >
                Update Banner / Offer settings
              </Button>
            </div>
          </div>

          <Divider />
        </div>
      </div>
    </Panel>
  );
};

export default Settings;
