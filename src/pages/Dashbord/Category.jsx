/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import EditIcon from "@rsuite/icons/Edit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Drawer,
  Input,
  Loader,
  Message,
  Uploader,
  useToaster,
} from "rsuite";
import {
  createCategory,
  getCategoryByBrandId,
} from "../../api/CategoryService";
import { CardPlaceHolder } from "../../components/CardPlaceHolder";
import { config } from "../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function Category() {
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
  const params = useParams();

  const { data, status, refetch, error } = useQuery(
    ["category", page, user.jwt, params.brand_id],
    getCategoryByBrandId
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(createCategory);
  const onSubmit = (data) => {
    data.brand_id = params.brand_id;
    if (uploadResponse.fileUrl !== "") {
      data.image = uploadResponse.fileUrl;
    } else {
      data.image = "";
    }
    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Category added successfully</Message>
          );
        },
        onError: (error) => {
          console.log(error);
          toaster.push(<Message type="error">Category Add failed !</Message>);
        },
      }
    );
    refetch();
  };
  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.meta?.total_page) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };

  const handleLoadPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              {params.brand_name} Category
            </p>
            <div>
              <button
                onClick={() => setOpenWithHeader(true)}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Add Category
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
            : data?.data.map((props) => (
                <CategoryList props={props} key={props._id} />
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
                  pages : 1/{data?.meta?.total_page}
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
      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Drawer.Header>
            <Drawer.Title>Add Category</Drawer.Title>
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
              <div>
                <p className="font-bold">Category label</p>
                <Input {...register("category_label")} />
              </div>
              <div>
                <p className="font-bold">Category Type</p>
                <Input {...register("category_type")} />
              </div>
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
                Add Category
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </form>
      </Drawer>
    </>
  );
}
function CategoryList({ props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-2 w-80 lg:mb-0 border rounded-lg shadow-sm hover:shadow-xl mt-7 mb-8">
        <div className="border">
          <img src={props?.image} className="w-full h-44 " />
        </div>
        <div className="bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <EditIcon className="text-4xl border rounded hover:bg-indigo-200 hover:text-white" />
              <h2 className="text-lg font-semibold">{props?.category_label}</h2>
              <Link
                onClick={() => {
                  navigate(
                    `/dashbord/${props?.category_label}/categories/${props?._id}`
                  );
                }}
              >
                <ArrowRightLineIcon className="text-4xl border rounded hover:bg-indigo-200 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
