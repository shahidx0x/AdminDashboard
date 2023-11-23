/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Badge,
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
import { updateUser } from "../../../api/UserServices";
import { config } from "../../../configs/api.config";
import axios from "axios";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function UserInfoEdit() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const location = useLocation();
  const myData = location.state?.myData;
  const [brandSlug, setBrandSlug] = useState(undefined);
  const [brandName, setBrandName] = useState(undefined);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isAccountActive: myData?.isAccountActive,
    },
  });
  const isAccountActive = watch("isAccountActive");
  const { data: brand, status: brand_status } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );
  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id, slug: each.slug };
  });
  const brand_f_data = [...(brand_data || ["loading"])].map((item) => ({
    label: item?.label,
    value: item?.value + "," + item.slug,
  }));

  const mutation = useMutation(updateUser);

  // const onSubmit = (data) => {
  //   if (uploadResponse.fileUrl !== "") {
  //     data.profilePicture = uploadResponse.fileUrl;
  //   } else {
  //     data.profilePicture = "";
  //   }
  //   data.company = brandName;
  //   const initialAcStatus = myData.ac_status;
  //   console.log("initial :", initialAcStatus);
  //   const newAcStatus = data.ac_status;
  //   console.log("new :", newAcStatus);
  //   const statusChanged = initialAcStatus !== newAcStatus;
  //   console.log(statusChanged);
  //   if (data.ac_status === undefined) data.ac_status = 0;
  //   if (brandSlug) {
  //     data.company_slug = brandSlug.split(",")[1];
  //     data.companyAssignedBy = "Admin";
  //   }
  //   if (data.company === undefined) data.company = myData.company;
  //   if (newAcStatus === 1) data.isAccountActive = true;

  //   // mutation.mutate(
  //   //   { data: data, token: user.jwt },
  //   //   {
  //   //     onSuccess: (responseData) => {
  //   //       toaster.push(<Message type="success">Updated successfully</Message>);
  //   //       if (statusChanged) {
  //   //         const status =
  //   //           newAcStatus === 1
  //   //             ? "accept"
  //   //             : newAcStatus === -1
  //   //             ? "reject"
  //   //             : null;
  //   //         if (status) {
  //   //           axios
  //   //             .post(
  //   //               `${config.endpoints.host}/notify/user/${
  //   //                 data.email || myData.email
  //   //               }/${status}`
  //   //             )
  //   //             .then((response) => {
  //   //               toaster.push(
  //   //                 <Message type="success">User Notified!</Message>
  //   //               );
  //   //             })
  //   //             .catch((error) => {
  //   //               toaster.push(
  //   //                 <Message type="error">Notification failed!</Message>
  //   //               );
  //   //             });
  //   //         }
  //   //       }
  //   //       navigate(-1);
  //   //     },
  //   //     onError: (error) => {
  //   //       toaster.push(<Message type="error">Update failed!</Message>);
  //   //     },
  //   //   }
  //   // );
  // };
  const onSubmit = (data) => {
    // Set profile picture URL
    if (uploadResponse.fileUrl !== "") {
      data.profilePicture = uploadResponse.fileUrl;
    } else {
      data.profilePicture = "";
    }

    data.company = brandName;
    // if (data.ac_status === undefined) data.ac_status = 0;

    if (brandSlug) {
      data.company_slug = brandSlug.split(",")[1];
      data.companyAssignedBy = "Admin";
    }
    if (data.company === undefined) data.company = myData.company;

    const initialAcStatus = myData.ac_status;
    const newAcStatus = data.ac_status;

    const statusChanged = initialAcStatus !== newAcStatus;
    const explicitStatusChange =
      statusChanged && (newAcStatus === 1 || newAcStatus === -1);
    if (newAcStatus === 1) data.isAccountActive = true;
    console.log(explicitStatusChange);
    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (responseData) => {
          toaster.push(<Message type="success">Updated successfully</Message>);
          if (explicitStatusChange) {
            const status = newAcStatus === 1 ? "accept" : "reject";
            axios
              .post(
                `${config.endpoints.host}/notify/user/${
                  data.email || myData.email
                }/${status}`
              )
              .then((response) => {})
              .catch((error) => {
                toaster.push(
                  <Message type="error">Notification failed!</Message>
                );
              });
          }

          navigate(-1);
        },
        onError: (error) => {
          toaster.push(<Message type="error">Update failed!</Message>);
        },
      }
    );
  };

  const dropdown = [
    { label: "Active", value: 1 },
    { label: "Reject", value: -1 },
  ].map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const navigate = useNavigate();
  function UserTable() {
    navigate("/dashbord/user-table");
  }
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        className="mt-14 2xl:-ml-28 px-8 w-full"
      >
        <Panel
          bordered
          className="shadow-sm -mt-10 border-l-8 border-l-indigo-400"
          style={{ background: "#fff" }}
          header={
            <>
              <Breadcrumb className="text-sm font-mono">
                <Breadcrumb.Item as={Link} to="/dashbord">
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item as={Link} to="/dashbord/user-table">
                  user-list
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-blue-400">
                  user-information-edit
                </Breadcrumb.Item>
              </Breadcrumb>
              <h3 className="font-bold p-5 text-2xl bg-indigo-500 rounded-lg text-white">
                Update User Information
              </h3>
            </>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  flex-col justify-center items-center mb-10">
              <Badge
                color={uploadResponse?.fileUrl !== "" ? "green" : "red"}
                content={uploadResponse?.fileUrl !== "" && "uploaded"}
              >
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
                      <img src={myData?.profilePicture} alt="Profile Picture" />
                    )}
                  </button>
                </Uploader>
              </Badge>
            </div>
            <div className="">
              <div className="flex  p-5">
                <div className="flex flex-col 2xl:flex-row gap-5">
                  <div>
                    <p className="font-bold">First Name</p>
                    <Input
                      {...register("firstName")}
                      defaultValue={myData?.firstName}
                      className="w-56"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Last Name</p>
                    <Input
                      {...register("lastName")}
                      defaultValue={myData?.lastName}
                      className="w-56"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Email</p>
                    <Input
                      value={myData?.email}
                      {...register("email")}
                      className="w-56"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Phone Number</p>
                    <Input
                      {...register("phoneNumber")}
                      defaultValue={myData?.phoneNumber || "Not Available"}
                      className="w-56"
                    />
                  </div>
                </div>
              </div>
              <div className="flex  p-5 flex-col 2xl:flex-row gap-5">
                <div>
                  <p className="font-bold">Cart Number</p>
                  <Input
                    {...register("cartNumber")}
                    defaultValue={myData?.cartNumber}
                    className="w-56"
                  />
                </div>
                <div>
                  <p className="font-bold">Zip Code</p>
                  <Input
                    {...register("zipCode")}
                    defaultValue={myData?.zipCode}
                    className="w-56"
                  />
                </div>
                <div className="">
                  <p className="font-bold">Company</p>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <SelectPicker
                        placeholder={myData?.company}
                        searchable={true}
                        {...field}
                        size="md"
                        data={brand_f_data}
                        className="w-56"
                        onChange={(value, data) => {
                          field.onChange(value);
                          setBrandName(data.target.innerHTML);
                          setBrandSlug(value);
                        }}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>

                <div className="flex gap-5">
                  <div>
                    <p className="font-bold">Location</p>
                    <Input
                      {...register("location")}
                      defaultValue={myData?.location}
                      className="w-56"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-5">
                <p className="font-bold">Account Activation Status :</p>
                <Controller
                  name="ac_status"
                  control={control}
                  render={({ field }) => (
                    <SelectPicker
                      searchable={false}
                      placeholder={
                        myData?.ac_status === 0
                          ? "Pending"
                          : myData?.ac_status === 1
                          ? "Active"
                          : "Rejected"
                      }
                      {...field}
                      size="md"
                      data={dropdown}
                      className="w-56 -mt-2"
                      onChange={(value) => field.onChange(value)}
                      onBlur={() => field.onBlur()}
                    />
                  )}
                />
              </div>
              <div className="mt-5 flex gap-5">
                <Button appearance="ghost" onClick={() => UserTable()}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  appearance="primary"
                  className="bg-blue-600"
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Panel>
      </Stack>
    </>
  );
}
