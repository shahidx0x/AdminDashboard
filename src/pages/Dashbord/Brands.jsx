/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FileEdit, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Drawer,
  Input,
  Loader,
  Message,
  Modal,
  Uploader,
  useToaster,
} from "rsuite";
import { createBrand, getBrands } from "../../api/BrandServices";
import { CardPlaceHolder } from "../../components/CardPlaceHolder";
import { config } from "../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function Brands() {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [search, setSearch] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });

  const { data, status, refetch, error } = useQuery(
    ["brands", page, user.jwt],
    getBrands
  );
  const {
    register,
    control,
    handleSubmit,
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
            <Message type="success">Brand added successfully</Message>
          );
        },
        onError: (error) => {
          console.log(error);
          toaster.push(<Message type="error">Update failed !</Message>);
        },
      }
    );
    refetch();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.data?.meta?.total_page) {
        return prevPage + 1;
      }
      return prevPage;
    });
    refetch();
  };

  const handleLoadPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    refetch();
  };

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Company
            </p>
            <div>
              <button
                onClick={() => setOpenWithHeader(true)}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Add Company
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-10 border p-10">
          {status === "loading"
            ? Array(8)
                .fill()
                .map((index) => <CardPlaceHolder key={index} />)
            : data?.data?.data.map((props) => (
                <BrandList props={props} key={props._id} />
              ))}
        </div>

        <div className="border-b">
          <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <svg
                  width={14}
                  height={8}
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.1665 4H12.8332"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.1665 4L4.49984 7.33333"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.1665 4.00002L4.49984 0.666687"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  onClick={handleLoadPrevious}
                  className="text-sm ml-3 font-medium leading-none "
                >
                  Previous
                </p>
              </div>
              <div className="sm:flex hidden">
                <p className="text-sm font-bold leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">
                  pages : 1/{data?.data?.meta?.total_page}
                </p>
              </div>
              <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                <p
                  onClick={handleLoadMore}
                  className="text-sm font-medium leading-none mr-3"
                >
                  Next
                </p>
                <svg
                  width={14}
                  height={8}
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.1665 4H12.8332"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 7.33333L12.8333 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 0.666687L12.8333 4.00002"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal code */}

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Drawer.Header>
            <Drawer.Title>Add Company</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
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
                  toaster.push(
                    <Message type="success">Uploaded successfully</Message>
                  );
                  setUploadResponse(response);
                }}
                onError={() => {
                  setFileInfo(null);
                  setUploading(false);
                  toaster.push(<Message type="error">Upload failed</Message>);
                }}
              >
                <button style={{ width: 150, height: 150 }}>
                  {uploading && <Loader backdrop center />}
                  {fileInfo ? (
                    <img src={fileInfo} width="100%" height="150%" />
                  ) : (
                    <img
                      src="https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png"
                      alt="profile_picture"
                    />
                  )}
                </button>
              </Uploader>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-bold">Company</p>
                <Input className="w-[28rem]" {...register("brand_label")} />
              </div>
              {/* <div className="hidden">
                <p className="font-bold">Compnay Slug</p>
                <Input {...register("brand_slug")} />
              </div> */}
            </div>

            <Drawer.Actions className="mt-10">
              <Button
                appearance="ghost"
                onClick={() => setOpenWithHeader(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                onClick={() => setOpenWithHeader(false)}
                appearance="primary"
                className="bg-blue-600"
              >
                Add Company
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </form>
      </Drawer>
    </>
  );
}

export default Brands;

function BrandList({ props }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });

  const handleDelete = (id) => {
    

  }
  return (
    <>
      <div className="mx-2 w-80 lg:mb-0 border rounded-lg shadow-sm hover:shadow-xl mt-7 mb-8">
        <div
          onClick={() => {
            navigate(`/dashbord/${props.brand_label}/categories/${props._id}`);
          }}
          className="border"
        >
          <img src={props.brand_image} className="w-full h-44 " />
        </div>
        <div className="bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <div className="flex">
                <FileEdit
                  onClick={() => setOpen(true)}
                  className="text-4xl border rounded hover:bg-indigo-200 hover:text-white"
                />
              </div>
              <h2 className="text-lg font-semibold">{props.brand_label}</h2>
              <button>
                <Trash className="text-4xl border rounded hover:bg-indigo-200 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
        <Modal size={"sm"} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Update Company Information</Modal.Title>
          </Modal.Header>
          <Divider />
          <Modal.Body>
            <div className="flex flex-wrap gap-5 ">
              <div className="flex flex-col gap-2">
                <div className="flex justify-center">
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
                      toaster.push(
                        <Message type="success">Uploaded successfully</Message>
                      );
                      setUploadResponse(response);
                    }}
                    onError={() => {
                      setFileInfo(null);
                      setUploading(false);
                      toaster.push(
                        <Message type="error">Upload failed</Message>
                      );
                    }}
                  >
                    <button style={{ width: 150, height: 150 }}>
                      {uploading && <Loader backdrop center />}
                      {fileInfo ? (
                        <img src={fileInfo} width="100%" height="150%" />
                      ) : (
                        <img
                          src="https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png"
                          alt="profile_picture"
                        />
                      )}
                    </button>
                  </Uploader>
                </div>
                <div className=" w-80">
                  <p className="">Name</p>
                  <Input />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleClose}
              className="border-2 bg-red-600 text-white"
            >
              Cancel
            </Button>
            <Button
              // type="submit"
              onClick={() => handleDone(data)}
              className="border-2 bg-indigo-600 text-white "
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
