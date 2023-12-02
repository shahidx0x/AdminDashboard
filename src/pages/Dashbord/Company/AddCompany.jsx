/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import RichTextEditor from "react-rte";
import {
  Breadcrumb,
  Button,
  Input,
  Loader,
  Message,  
  Uploader,
  useToaster,
} from "rsuite";
import { createBrand } from "../../../api/BrandServices";
import { config } from "../../../configs/api.config";
import { toolbarConfig } from "../../../configs/toolbar.config";


function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AddCompany() {
  const user = useSelector((state) => state.user.user);
  const settings = useSelector((state) => state.settings);
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
    console.table(data);
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
          toaster.push(
            <Message type="error">
              {error.response.data.message || error.message}
            </Message>
          );
        },
      }
    );
  };

  const navigate = useNavigate();
  function UserTable() {
    navigate("/dashbord/all-company");
  }
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  const handleChange = (value) => {
    if (value) {
      setEditorValue(value);
    }
  };
  return (
    <>
  
    
      <section className="p-6 bg-base-100 text-gray-900 h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12 "
        >
          <fieldset className=" grid grid-cols-4 gap-6 p-24 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <Breadcrumb className="text-sm  font-mono">
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
              <p className={`font-thin text-3xl ${settings.theme === 'dark' && 'text-white'}`}>Add Company</p>
            </div>
            <div className="flex  flex-col flex-wrap gap-4 col-span-full lg:col-span-3">
              <div className="flex gap-10">
                <div className="col-span-full sm:col-span-3">
                  <p className={`font-bold text-sm underline ${settings.theme === 'dark' && 'text-white'}`}>
                    Upload Company Logo
                  </p>
                  <div className="flex flex-col 2xl:flex-row gap-10">
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
                            src={myData?.profilePicture}
                            alt="Company Profile"
                          />
                        )}
                      </button>
                    </Uploader>
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className={`font-bold ${settings.theme === 'dark' && 'text-white'}`}> Name</p>
                        <Input
                          {...register("brand_label")}
                          className="2xl:w-96"
                        />
                      </div>
                      <div>
                        <p className={`font-bold ${settings.theme === 'dark' && 'text-white'}`}> Email</p>
                        <Input
                          {...register("brand_email")}
                          className="2xl:w-96"
                        />
                      </div>
                      <div>
                        <p className={`font-bold ${settings.theme === 'dark' && 'text-white'}`}>Address</p>
                        <Input
                          {...register("brand_address")}
                          className="2xl:w-96"
                        />
                      </div>
                      <div>
                        <p className={`font-bold ${settings.theme === 'dark' && 'text-white'}`}>Information</p>
                        <RichTextEditor
                          className={`mt-2  `}
                          toolbarConfig={toolbarConfig}
                          value={editorValue}
                          onChange={handleChange}
                        />
                      </div>
                      <div className=" flex gap-2">
                        <Button
                          appearance="ghost"
                          className="font-bold"
                          onClick={() => UserTable()}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          appearance="primary"
                          className="bg-blue-600 font-bold"
                        >
                          Add Company
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div data-lastpass-icon-root="true"></div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
     
    </>
  );
}
