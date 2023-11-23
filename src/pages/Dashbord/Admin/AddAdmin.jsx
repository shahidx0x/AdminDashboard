/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useForm } from "react-hook-form";

import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Input,
  InputGroup,
  Loader,
  Message,
  Panel,
  Stack,
  Uploader,
  useToaster,
} from "rsuite";
import { createUser } from "../../../api/UserServices";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AddAdmin() {
  const styles = {
    width: 300,
  };
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const toast = useToaster();

  const handleChangeCon = () => {
    setVisible(!visible);
  };
  const [visiblePass, setVisiblePass] = useState(false);

  const handleChangePass = () => {
    setVisiblePass(!visiblePass);
  };
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(createUser);
  const signup_data = {
    cartNumber: "1",
    company: "A",
    company_slug: "a",
    isAccountVerified: false,
    isEmailVerified: false,
    cardVerified: false,
    isAccountActive: true,
    location: "City, Country",
    zipCode: "12345",
    paymentMethod: "C",
    cardNumber: "1",
    firebaseFCM: ["device_token_1"],
    role: "admin",
  };
  // const onSubmit = (data) => {
  //   if (uploadResponse.fileUrl !== "") {
  //     data.image = uploadResponse.fileUrl;
  //   } else {
  //     data.image = "";
  //   }
  //   if (data.password !== data.con_password) {
  //     toast.push(<Message type="error">Password is not matched !</Message>);
  //   }
  //   data.firstName = data.name;
  //   data.phoneNumber = data.contact;

  //   const f_data = {
  //     ...signup_data,
  //     ...data,
  //   };

  //   mutation.mutate(
  //     { data: f_data, token: user.jwt },
  //     {
  //       onSuccess: (data) => {
  //         toaster.push(
  //           <Message type="success">Admin added successfully</Message>
  //         );
  //         navigate(-1);
  //         axios.post(config.endpoints.host + "/notify/new/admin", {
  //           email: data.email,
  //           password: data.password,
  //         });
  //       },
  //       onError: (error) => {
  //         console.log(error);
  //         toaster.push(
  //           <Message type="error">
  //             {error.response.data.message || error.message}
  //           </Message>
  //         );
  //       },
  //     }
  //   );
  //   reset();
  // };
  const onSubmit = (data) => {
    data.profilePicture = uploadResponse.fileUrl || "";

    if (data.password !== data.con_password) {
      toast.push(<Message type="error">Password is not matched!</Message>);
      return;
    }

    data.firstName = data.name;
    data.phoneNumber = data.contact;

    const f_data = { ...signup_data, ...data };

    mutation.mutate(
      { data: f_data, token: user.jwt },
      {
        onSuccess: (response) => {
          axios
            .post(config.endpoints.host + "/notify/new/admin", {
              email: data.email,
              password: data.password,
            })
            .then((res) => {
              toaster.push(
                <Message type="success">
                  Email notification sent successfully
                </Message>
              );
              navigate(-1);
            })
            .catch((error) => {
              console.log(error);
              toaster.push(
                <Message type="error">Error sending email notification</Message>
              );
            });
        },
        onError: (error) => {
          console.log(error);
          const errorMessage = error.response?.data.message || error.message;
          toaster.push(<Message type="error">{errorMessage}</Message>);
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
        className="mt-20 2xl:mt-[-3rem] w-full "
        style={{
          height: "100vh",
        }}
      >
        <Panel
          bordered
          className="shadow-sm w-[70rem] border-gray-300"
          style={{ background: "#fff" }}
          header={
            <>
              <Breadcrumb className="text-xs font-mono ">
                <Breadcrumb.Item as={Link} to="/dashbord/admin-table">
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item as={Link} to="/dashbord/admin-table">
                  Admins
                </Breadcrumb.Item>

                <Breadcrumb.Item active className="text-blue-400">
                  Admin-creation
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="font-bold bg-indigo-500 p-8 text-2xl text-white rounded-lg">
                Add A New Admin
              </div>
              <Message showIcon type="info" header="Informational">
                An automated email will be sent to the registered email account
                with credentials.
              </Message>
            </>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 justify-center ">
              <div className="flex  mb-10 ">
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
                      <img src={fileInfo} alt="Category Profile" />
                    )}
                  </button>
                </Uploader>
              </div>
              <div className="flex  gap-5 justify-center">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-bold">Name</p>
                    <Input {...register("name")} className="w-96" required />
                  </div>
                  <div>
                    <p className="font-bold">Email</p>
                    <Input {...register("email")} className="w-96" required />
                  </div>
                  <div>
                    <p className="font-bold">Contact</p>
                    <Input {...register("contact")} className="w-96" required />
                  </div>
                  <div>
                    <p className="font-bold">Password</p>
                    <InputGroup inside required>
                      <Input
                        {...register("password")}
                        type={visiblePass ? "text" : "password"}
                      />
                      <InputGroup.Button onClick={handleChangePass}>
                        {visiblePass ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                  </div>
                  <div>
                    <p className="font-bold">Confirm Password</p>
                    <InputGroup inside required>
                      <Input
                        {...register("con_password")}
                        type={visible ? "text" : "password"}
                      />
                      <InputGroup.Button onClick={handleChangeCon}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
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
                      Add Admin
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center"></div>
            </div>
          </form>
        </Panel>
      </Stack>
    </>
  );
}
