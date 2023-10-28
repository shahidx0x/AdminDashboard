/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import EmailIcon from "@rsuite/icons/Email";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import IdInfoIcon from "@rsuite/icons/IdInfo";
import WarningRoundIcon from "@rsuite/icons/WarningRound";
import { PhoneIcon, Shield, ShieldCheck, ShieldX, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Drawer,
  Input,
  InputPicker,
  Loader,
  Message,
  Placeholder,
  SelectPicker,
  Uploader,
  useToaster,
} from "rsuite";
import { getUsers, getUsersByEmail, updateUser } from "../../api/UserServices";
import { config } from "../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function Users() {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data, status, refetch, error } = useQuery(
    ["users", page, user.jwt],
    getUsers
  );

  const mutation = useMutation(getUsersByEmail);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === "") {
      refetch();
      setIsSearching(false);
    }
  };

  const handleButtonClick = () => {
    setIsSearching(true);
    toast.promise(
      mutation.mutateAsync({ queryKey: ["user_search", inputValue, user.jwt] }),
      {
        loading: "Searching...",
        success: <b>User found!</b>,
        error: <b>User not found in the database!</b>,
      }
    );
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data.meta?.total_page) {
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

  const displayedData =
    isSearching && mutation.data ? [mutation.data] : data?.data;

  return (  
    <>
      <Toaster />
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Users
            </p>
            <div className="form-control border   border-indigo-200 rounded-md">
              <div className="input-group">
                <input
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Search by Email"
                  className="input input-bordered"
                />
                <button onClick={handleButtonClick} className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow    px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800 border-b border-b-indigo-300">
                <th className="font-bold text-left pl-4">UID</th>
                <th className="font-bold text-left pl-12">Name</th>
                <th className="font-bold text-left pl-12">Carts & Company</th>
                <th className="font-bold text-left pl-12">Location</th>
                <th className="font-bold text-left pl-10">Contact</th>
                <th className="font-bold text-left pl-10">Verify Status</th>
                <th className="font-bold text-left pl-10">Role</th>
                <th className="font-bold text-left pl-10">Account Status</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {status === "loading"
                ? Array(4)
                    .fill()
                    .map((index) => <TableRowPlaceHolder key={index} />)
                : displayedData?.map((user, index) => (
                    <User key={index} props={user} userRefetch={refetch()} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="">
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
                pages : {page}/{data?.meta?.total_page}
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
    </>
  );
}
export default Users;

// eslint-disable-next-line react/prop-types
function User({ props, userRefetch }) {
  const [open, setOpen] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [show, setShow] = useState(null);
  const [search, setSearch] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const mutation = useMutation(updateUser);
  const user = useSelector((state) => state.user.user);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          console.log(data);
          toaster.push(<Message type="success">Updated successfully</Message>);
        },
        onError: (error) => {
          console.log(error);
          toaster.push(<Message type="error">Update failed !</Message>);
        },
      }
    );
    setOpen(false);
  };

  useEffect(() => {
    if (props?.data?._id) {
      setSearch(true);
    }
  }, [props?.data]);
  const dropdown = ["admin", "user"].map((item) => ({
    label: item,
    value: item,
  }));

  const dropdownSub = ["Gold", "Bronze"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <>
      <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
        <td className="pl-4 cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <IdInfoIcon className="text-4xl mt-1" />
            </div>
            <div className="pl-2">
              <p className="font-medium font-mono">
                {props?._id || props?.data._id}
              </p>
            </div>
          </div>
        </td>
        <td className="pl-4 cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={
                  props?.profilePicture ||
                  props?.profilePicture ||
                  "https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                }
              />
            </div>
            <div className="pl-4">
              <p className="font-bold">
                {search
                  ? props?.data?.firstName + " " + props?.data?.lastName
                  : props.firstName + " " + props.lastName}
              </p>
              <p className="text-xs leading-3 text-gray-600 pt-2 flex gap-1">
                <EmailFillIcon className="font-bold" />
                <p>{props?.email || props?.data.email}</p>
              </p>
            </div>
          </div>
        </td>
        <td className="pl-12">
          <p className="text-sm font-bold font-mono leading-none text-gray-800">
            {props?.cartNumber || props?.data.cartNumber}
          </p>
          <p>{props?.company || props?.data.company}</p>
        </td>
        <td className="pl-12">
          <p className="font-bold">{props?.location || props?.data.location}</p>
          <p className="flex gap-2">
            <EmailIcon className="text-md" />

            <p>{props?.zipCode || props?.data.zipCode}</p>
          </p>
        </td>
        <td className="pl-10 ">
          <div className="flex gap-2">
            <PhoneIcon color="indigo" className="-mt-1" />
            <p className="font-bold font-mono">
              {props?.phoneNumber ||
                props?.data?.phoneNumber ||
                "not available"}
            </p>
          </div>
        </td>
        <td className="pl-20">
          <p className="font-medium">
            {search ? (
              props?.data?.isAccountVerified ? (
                <div className="tooltip" data-tip="verified">
                  <ShieldCheck color="green" />
                </div>
              ) : (
                <div className="tooltip" data-tip="not-verified">
                  <ShieldX color="red" />
                </div>
              )
            ) : props.isAccountVerified ? (
              <ShieldCheck color="green" />
            ) : (
              <ShieldX color="red" />
            )}
          </p>
        </td>
        <td className="pl-12">
          <p className="font-medium">
            {search ? (
              props?.data?.role === "admin" ? (
                <Shield color="blue" />
              ) : (
                <User2 color="green" />
              )
            ) : props.role === "admin" ? (
              <Shield color="blue" />
            ) : (
              <User2 color="green" />
            )}
          </p>
        </td>
        <td className="pl-14">
          <p className="flex justify-center">
            {search ? (
              props?.data.isActive ? (
                <WarningRoundIcon className="text-2xl  text-red-500" />
              ) : (
                <CheckRoundIcon className="text-2xl  text-green-500" />
              )
            ) : props.isActive ? (
              <WarningRoundIcon className="text-2xl  text-red-500" />
            ) : (
              <CheckRoundIcon className="text-2xl text-green-500" />
            )}
          </p>
        </td>
        <td className="px-3 2xl:px-0">
          {show == 0 ? (
            <button
              onClick={() => setShow(null)}
              className="focus:outline-none pl-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setShow(0)}
              className="focus:outline-none pl-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                  stroke="#A1A1AA"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {show == 0 && (
            <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
              <div
                onClick={() => setOpenWithHeader(true)}
                className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
              >
                <p>Edit</p>
              </div>
            </div>
          )}
        </td>
      </tr>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Drawer.Header>
            <Drawer.Title> {props?.email || props?.data.email}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div className="flex justify-center items-center mb-10">
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
                        src={
                          props?.profilePicture || props?.data?.profilePicture
                        }
                        alt="profile_picture"
                      />
                    )}
                  </button>
                </Uploader>
              </Badge>
            </div>
            <div className="flex gap-5">
              <div>
                <p className="font-bold">Email</p>
                <Input
                  value={search ? props?.data?.email : props.email}
                  {...register("email")}
                />
              </div>
              <div>
                <div className="">
                  <p className="font-bold">Subscription</p>
                  <Controller
                    name="subscription"
                    control={control}
                    defaultValue={
                      props?.subscription || props?.data.subscription
                    }
                    render={({ field }) => (
                      <InputPicker
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
            </div>
            <div className="flex gap-5 mt-5">
              <div>
                <p className="font-bold">First Name</p>
                <Input
                  defaultValue={
                    search ? props?.data?.firstName : props.firstName
                  }
                  {...register("firstName")}
                />
              </div>
              <div>
                <p className="font-bold">Last Name</p>
                <Input
                  defaultValue={search ? props?.data?.lastName : props.lastName}
                  {...register("lastName")}
                />
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div>
                <p className="font-bold">Cart Number</p>
                <Input
                  defaultValue={props?.cartNumber || props?.data.cartNumber}
                  {...register("cartNumber")}
                />
              </div>
              <div>
                <p className="font-bold">Company</p>
                <Input
                  defaultValue={props?.company || props?.data.company}
                  {...register("company")}
                />
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div>
                <p className="font-bold">Location</p>
                <Input
                  defaultValue={props?.location || props?.data.location}
                  {...register("location")}
                />
              </div>
              <div>
                <p className="font-bold">Phone Number</p>
                <Input
                  defaultValue={props?.phoneNumber || props?.data?.phoneNumber}
                  {...register("phoneNumber")}
                />
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div>
                <p className="font-bold">Zip Code</p>
                <Input
                  defaultValue={props?.zipCode || props?.data.zipCode}
                  {...register("zipCode")}
                />
              </div>
              <div className="">
                <p className="font-bold">Role</p>
                <Controller
                  name="role"
                  control={control}
                  defaultValue={props?.role || props?.data.role}
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
            <div className="gap-5 mt-5 hidden">
              <div>
                <p className="font-bold">Payment Method</p>
                <Input
                  value={props?.paymentMethod || props?.data.paymentMethod}
                  {...register("paymentMethod")}
                />
              </div>
              <div className="">
                <div>
                  <p className="font-bold">Card Number</p>
                  <Input
                    value={props?.cardNumber || props?.data.cardNumber}
                    {...register("cardNumber")}
                  />
                </div>
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
                Update
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </form>
      </Drawer>
    </>
  );
}

function TableRowPlaceHolder() {
  return (
    <>
      <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
        <td className="pl-4 cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <IdInfoIcon className="text-4xl mt-1" />
            </div>
            <div className="pl-2">
              <p className="font-medium font-mono">
                <Placeholder.Paragraph className="w-full" />
              </p>
            </div>
          </div>
        </td>
        <td className="pl-4 cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <Placeholder.Paragraph />
            </div>
            <div className="pl-4">
              <p className="font-bold">
                <Placeholder.Paragraph />
              </p>
              <p className="text-xs leading-3 text-gray-600 pt-2 flex gap-1">
                <EmailFillIcon className="font-bold" />
                <p>
                  <Placeholder.Paragraph />
                </p>
              </p>
            </div>
          </div>
        </td>
        <td className="pl-12">
          <p className="text-sm font-bold font-mono leading-none text-gray-800">
            <Placeholder.Paragraph />
          </p>
          <p>
            <Placeholder.Paragraph />
          </p>
        </td>
        <td className="pl-12">
          <p className="font-bold">
            <Placeholder.Paragraph />
          </p>
          <p className="flex gap-2">
            <EmailIcon className="text-md" />

            <p>
              <Placeholder.Paragraph />
            </p>
          </p>
        </td>
        <td className="pl-10 ">
          <div className="flex gap-2">
            <PhoneIcon color="indigo" className="-mt-1" />
            <p className="font-bold font-mono">
              <Placeholder.Paragraph />
            </p>
          </div>
        </td>
        <td className="pl-20">
          <p className="font-medium">
            <Placeholder.Paragraph />
          </p>
        </td>
        <td className="pl-12">
          <p className="font-medium">
            <Placeholder.Paragraph />
          </p>
        </td>
        <td className="pl-14">
          <p className="flex justify-center">
            <Placeholder.Paragraph />
          </p>
        </td>
        <td className="px-3 2xl:px-0">
          <Placeholder.Paragraph />
        </td>
      </tr>
    </>
  );
}
