import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Divider,
  Input,
  Loader,
  Message,
  Panel,
  Toggle,
  Uploader,
  toaster,
} from "rsuite";

import {
  setTableAutoHeight,
  setTableBordered,
  setTableCompact,
  setTableHeader,
  setTableHover,
} from "../../../redux/slices/settings.slice";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../../configs/api.config";
function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Settings = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const [uploadResponseTwo, setUploadResponseTwo] = useState({ fileUrl: "" });
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
                    <button type="button" style={{ width: 350, height: 450 }}>
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
                    <button type="button" style={{ width: 350, height: 450 }}>
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
              <Button
                type="submit"
                className="bg-blue-700 font-bold text-white mt-2"
              >
                Update
              </Button>
            </form>
          </div>

          <Divider />
        </div>
      </div>
    </Panel>
  );
};

export default Settings;
