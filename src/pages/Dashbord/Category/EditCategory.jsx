/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useMutation, useQuery } from "react-query";
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
  SelectPicker,
  Stack,
  Uploader,
  useToaster,
} from "rsuite";
import { getBrandsIdAndName } from "../../../api/BrandServices";
import { updateCategory } from "../../../api/CategoryService";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function EditCategory() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });

  const location = useLocation();
  const myData = location.state?.myData;
  console.log(location.state?.myData);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand_id: myData.brand_id,
    },
  });

  const mutation = useMutation(updateCategory);
  const [brandId, SetBrandId] = useState(null);
  const [brandName, SetBrandName] = useState(myData.brand_name);
  const onSubmit = (data) => {
    if (uploadResponse.fileUrl !== "") {
      data.image = uploadResponse.fileUrl || myData.image;
    } else {
      data.image = myData.image;
    }
    data.brand_id = brandId;
    data.brand_name = brandName;
    data.id = myData?._id;
    let id = myData?._id;
  
    mutation.mutate(
      { data: data, token: user.jwt, id },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Category updated successfully</Message>
          );
          navigate(-1);
        },
        onError: (error) => {
          console.log(error);
          toaster.push(
            <Message type="error">Category update failed ! Try Again.</Message>
          );
        },
      }
    );
    reset();
  };
  const { data: brand, status: brand_status } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );
  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id };
  });
  const brand_f_data = [...(brand_data || ["loading"])].map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  const navigate = useNavigate();
  function UserTable() {
    navigate("/dashbord/category/all");
  }
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        className="-mt-10"
        style={{
          height: "100vh",
        }}
      >
        <Breadcrumb className="text-xl font-mono ">
          <Breadcrumb.Item as={Link} to="/dashbord">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to="/dashbord/category/all">
            category-list
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-blue-400">
            category-update
          </Breadcrumb.Item>
        </Breadcrumb>
        <Panel
          bordered
          className="shadow-md w-[40rem] border-gray-400"
          style={{ background: "#fff" }}
          header={
            <h3 className="font-bold bg-indigo-500 text-white p-3 rounded-md text-2xl ">
              Edit Category Information
            </h3>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mb-8">
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
                    <img src={myData?.image} alt="Category Profile" />
                  )}
                </button>
              </Uploader>
            </div>
            <div className="flex gap-5 justify-center">
              <div className="flex flex-col gap-5">
                <div>
                  <div>
                    <p className="font-bold">Select Company</p>
                    <Controller
                      name="brand_id"
                      {...register("brand_id")}
                      control={control}
                      render={({ field }) => (
                        <SelectPicker
                          placeholder={myData?.brand_name}
                          searchable={true}
                          {...field}
                          size="md"
                          data={brand_f_data}
                          className="w-96"
                          onChange={(value, data) => {
                            field.onChange(value);
                            SetBrandName(data.target.innerHTML);

                            SetBrandId(value);
                          }}
                          onBlur={() => field.onBlur()}
                        />
                      )}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">Category Name</p>
                  <Input
                    {...register("category_label")}
                    defaultValue={myData?.category_label}
                    className="w-96"
                  />
                </div>
                <div>
                  <p className="font-bold">Category Type</p>
                  <Input
                    {...register("category_type")}
                    defaultValue={myData?.category_type}
                    className="w-96"
                  />
                </div>
                <div>
                  <p className="font-bold">Category Information</p>
                  <Input
                    defaultValue={myData?.category_description}
                    {...register("category_description")}
                    as="textarea"
                    rows={3}
                  />
                </div>

                <div className=" flex gap-2 mb-9">
                  <Button appearance="ghost" onClick={() => UserTable()}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    appearance="primary"
                    className="bg-blue-600"
                  >
                    Update Category
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
