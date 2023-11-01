/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Input,
  Loader,
  Message,
  Panel,
  Stack,
  Uploader,
  useToaster,
} from "rsuite";
import { createBrand } from "../../../api/BrandServices";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AddCompany() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });

  const location = useLocation();
  const myData = location.state?.myData;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(createBrand);

  const onSubmit = (data) => {
    if (uploadResponse.fileUrl !== "") {
      data.brand_image = uploadResponse.fileUrl;
    } else {
      data.brand_image = "";
    }
    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Company added successfully</Message>
          );
          reset();
          setFileInfo(null);
          setUploadResponse(null);
        },
        onError: (error) => {
          console.log(error);
          toaster.push(
            <Message type="error">Company Add failed ! Try Again.</Message>
          );
        },
      }
    );
  };

  const navigate = useNavigate();
  function UserTable() {
    navigate("/dashbord/all-company");
  }
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        className="mt-20 2xl:-mt-16 "
        style={{
          height: "100vh",
        }}
      >
        <Breadcrumb className="text-xl -mt-20 font-mono">
          <Breadcrumb.Item as={Link} to="/dashbord">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to="/dashbord/all-company">
            company-list
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-blue-400">
            company-creation
          </Breadcrumb.Item>
        </Breadcrumb>
        <Panel
          bordered
          className="shadow-md -mt-10 w-[50rem] border-gray-300"
          style={{ background: "#fff" }}
          header={
            <h3 className="font-bold p-8 bg-indigo-500 text-2xl text-white rounded-lg ">
              Add Company Information
            </h3>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mb-10">
              <Uploader
                fileListVisible={false}
                listType="picture"
                action={`${config.endpoints.host}/upload`}
                onUpload={(file) => {
                  setUploading(true);
                  previewFile(file.blobFile, (value) => {
                    setFileInfo(value);
                  });
                }}
                onSuccess={(response, file) => {
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
                <button type="button" style={{ width: 150, height: 150 }}>
                  {uploading && <Loader backdrop center />}
                  {fileInfo ? (
                    <img src={fileInfo} width="100%" height="150%" />
                  ) : (
                    <img src={myData?.profilePicture} alt="Company Profile" />
                  )}
                </button>
              </Uploader>
            </div>
            <div className="flex gap-5 justify-center">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-bold">Company Name</p>
                  <Input
                    {...register("brand_label")}
                    defaultValue={myData?.firstName}
                    className="w-96"
                  />
                </div>
                <div>
                  <p className="font-bold">Company Information</p>
                  <Input
                    defaultValue={myData?.description}
                    {...register("brand_description")}
                    as="textarea"
                    rows={3}
                  />
                </div>
                <div className="mb-20 flex gap-2">
                  <Button appearance="ghost" onClick={() => UserTable()}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    appearance="primary"
                    className="bg-blue-600"
                  >
                    Add Company
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Panel>
      </Stack>
    </>
  );
}
