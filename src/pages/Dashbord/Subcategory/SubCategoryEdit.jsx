/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
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
import { UpdateSubCategory } from "../../../api/SubCategoryServices";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function EditSubCategory() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  console.log(location.state.myData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(UpdateSubCategory);

  const onSubmit = (data) => {
    if (uploadResponse.fileUrl !== "") {
      data.image = uploadResponse.fileUrl;
    } else {
      data.image = "";
    }
    let cat_id = location.state.myData.category_id;
    let sub_cat_id = location.state.myData._id;
    mutation.mutate(
      { data: data, token: user.jwt, cat_id, sub_cat_id },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Sub Category updated successfully</Message>
          );
          navigate(-1);
        },
        onError: (error) => {
          console.log(error);
          toaster.push(
            <Message type="error">
              Sub Category update failed ! Try Again.
            </Message>
          );
        },
      }
    );
    reset();
  };

  function Return() {
    navigate(-1);
  }

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        className="mt-20 2xl:mt-[-3rem] "
        style={{
          height: "100vh",
        }}
      >
        <Breadcrumb className="text-xl font-mono ">
          <Breadcrumb.Item as={Link} to="/dashbord">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to="/dashbord/all-company">
            category-list
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="cursor-pointer hover:text-blue-500"
            onClick={() => {
              navigate(-1);
            }}
          >
            sub-category-list
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-blue-400">
            sub-category-update
          </Breadcrumb.Item>
        </Breadcrumb>
        <Panel
          bordered
          className="shadow-sm w-[50rem] border-gray-300"
          style={{ background: "#fff" }}
          header={
            <h3 className="font-bold bg-indigo-500 p-8 text-2xl text-white rounded-lg">
              Edit Sub Category Information
            </h3>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mb-10 ">
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
                    <img
                      src={location.state.myData.image}
                      alt="Category Profile"
                    />
                  )}
                </button>
              </Uploader>
            </div>
            <div className="flex  gap-5 justify-center">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-bold">Sub Category Name</p>
                  <Input
                    defaultValue={location.state.myData.subcategory_name}
                    {...register("subcategory_name")}
                    className="w-96"
                  />
                </div>

                <div>
                  <p className="font-bold">Sub Category Information</p>
                  <Input
                    defaultValue={location.state.myData.description}
                    {...register("description")}
                    as="textarea"
                    rows={3}
                  />
                </div>

                <div className="2xl:mb-4 flex gap-2">
                  <Button appearance="ghost" onClick={() => Return()}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    appearance="primary"
                    className="bg-blue-600"
                  >
                    Update Sub Category
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
