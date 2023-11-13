/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useMutation } from "react-query";
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
  Toggle,
  Uploader,
  useToaster,
} from "rsuite";
import { updateUser } from "../../../api/UserServices";
import { config } from "../../../configs/api.config";

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

  const mutation = useMutation(updateUser);

  const onSubmit = (data) => {
    if (uploadResponse.fileUrl !== "") {
      data.profilePicture = uploadResponse.fileUrl;
    } else {
      data.profilePicture = "";
    }

    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(<Message type="success">Updated successfully</Message>);
          navigate(-1);
        },
        onError: (error) => {
          toaster.push(<Message type="error">Update failed !</Message>);
        },
      }
    );
  };

  const dropdown = ["admin", "user"].map((item) => ({
    label: item,
    value: item,
  }));

  const dropdownSub = ["Gold", "Bronze"].map((item) => ({
    label: item,
    value: item,
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
                    <div className="">
                      <p className="font-bold">Subscription</p>
                      <Controller
                        name="subscription"
                        control={control}
                        defaultValue={myData?.subscription}
                        render={({ field }) => (
                          <SelectPicker
                            searchable={false}
                            {...field}
                            size="md"
                            data={dropdownSub}
                            className="w-56"
                            onChange={(value) => field.onChange(value)}
                            onBlur={() => field.onBlur()}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="font-bold">Role</p>
                    <Controller
                      name="role"
                      control={control}
                      defaultValue={myData?.role}
                      render={({ field }) => (
                        <SelectPicker
                          searchable={false}
                          {...field}
                          size="md"
                          data={dropdown}
                          className="w-56"
                          onChange={(value) => field.onChange(value)}
                          onBlur={() => field.onBlur()}
                        />
                      )}
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
                <div>
                  <p className="font-bold">Company</p>
                  <Input
                    {...register("company")}
                    defaultValue={myData?.company}
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
                  name="isAccountActive"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Toggle
                      defaultChecked={value}
                      onChange={onChange}
                      checkedChildren="Active"
                      unCheckedChildren="Not Active"
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
