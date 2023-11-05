/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
import { getCategoryByBrandId } from "../../../api/CategoryService";
import { createProduct } from "../../../api/ProductService";
import { getSubCategoryByCategoryId } from "../../../api/SubCategoryServices";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AddProduct() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();

  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    product_image: "",
  });
  const [uploadResponse, setUploadResponse] = useState([]);
  const [coverUploadResponse, setCoverUploadResponse] = useState(null);
  const [selectedBrandId, SetSelectedBrandId] = useState("brand");
  const [selectedCatId, SetSelectedCatId] = useState("");

  const { data: brand } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );

  const { data: category_data } = useQuery(
    ["categoryIdName", "", user.jwt, selectedBrandId, -1],
    getCategoryByBrandId
  );

  const { data: sub_category_data } = useQuery(
    ["subCategoryIdName", "", user.jwt, selectedCatId, -1],
    getSubCategoryByCategoryId
  );

  console.log(sub_category_data);

  const cate_data = category_data?.data?.map((each) => {
    return { label: each?.category_label, value: each._id };
  });

  const sub_cat_data = sub_category_data?.data?.map((each) => {
    return { label: each?.subcategory_name, value: each._id };
  });

  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id };
  });
  const brand_f_data = [...(brand_data || ["loading"])].map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  const category_f_data = [
    ...(cate_data || [{ label: "No Category", value: "no-category" }]),
  ].map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(createProduct);
  const [brandName, SetBrandName] = useState("No Brand");
  const [categoryName, SetCategoryName] = useState("No Category");
  const [subCategoryName, SetSubCategoryName] = useState("No Sub Category");

  const onSubmit = (data) => {
    data.fet_image = [...uploadResponse];
    data.product_image = coverUploadResponse;
    data.brand_name = brandName;
    data.category_name = categoryName;
    data.subcategory_name = subCategoryName;
    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Product added successfully</Message>
          );
        },
        onError: (error) => {
          console.log(error);
          toaster.push(<Message type="error">Product add failed !</Message>);
        },
      }
    );
    reset();
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
        className="mt-28 2xl:mt-5 "
        style={{
          height: "100vh",
        }}
      >
        <Breadcrumb className="text-xl font-mono ">
          <Breadcrumb.Item as={Link} to="/dashbord">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to="/dashbord/all-company">
            product-list
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-blue-400">
            product-creation
          </Breadcrumb.Item>
        </Breadcrumb>
        <Panel
          bordered
          className="shadow-sm w-[48.5rem]"
          style={{ background: "#fff" }}
          header={
            <h3 className="font-bold bg-indigo-700 p-8 text-2xl text-white rounded-lg">
              Add Product Information
            </h3>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex justify-center items-center mb-5 ">
                <Uploader
                  fileListVisible={false}
                  listType="picture"
                  action={`${config.endpoints.host}/upload`}
                  onUpload={(file) => {
                    setUploading(true);
                    previewFile(file.blobFile, (value) => {
                      setFileInfo((prevState) => ({
                        ...prevState,
                        product_image: value,
                      }));
                    });
                  }}
                  onSuccess={(response, file) => {
                    setUploading(false);
                    setCoverUploadResponse(response.fileUrl);
                  }}
                  onError={() => {
                    setFileInfo(null);
                    setUploading(false);
                    toaster.push(<Message type="error">Upload failed</Message>);
                  }}
                >
                  <button type="button" style={{ width: 150, height: 150 }}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (
                      <img
                        src={fileInfo.product_image}
                        width="100%"
                        height="150%"
                        alt="product_picture"
                      />
                    ) : (
                      <img
                        src="https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png"
                        alt="product_picture"
                      />
                    )}
                  </button>
                </Uploader>
              </div>

              <div className="mt-3">
                <div>
                  <p className="font-bold">Feature Image</p>
                  <div className="flex gap-5">
                    <Uploader
                      multiple
                      listType="picture"
                      action={`${config.endpoints.host}/upload`}
                      onSuccess={(value) =>
                        setUploadResponse((prev) => [...prev, value.fileUrl])
                      }
                    >
                      <button type="button">
                        <Plus />
                      </button>
                    </Uploader>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-3">
                <div>
                  <p className="font-bold">Product Name</p>
                  <Input
                    required
                    className="w-[14.5rem]"
                    {...register("name")}
                  />
                </div>
                <div>
                  <p className="font-bold">Select Company</p>
                  <Controller
                    name="brand_id"
                    {...register("brand_id")}
                    control={control}
                    render={({ field }) => (
                      <SelectPicker
                        searchable={true}
                        {...field}
                        size="md"
                        data={brand_f_data}
                        className="w-[14.5rem]"
                        onChange={(value, data) => {
                          field.onChange(value);
                          SetSelectedBrandId(value);
                          SetBrandName(data.target.innerHTML);
                        }}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>
                <div>
                  <p className="font-bold">Select Category</p>
                  <Controller
                    name="category_id"
                    {...register("category_id")}
                    control={control}
                    render={({ field }) => (
                      <SelectPicker
                        searchable={true}
                        {...field}
                        size="md"
                        data={category_f_data}
                        className="w-[14.5rem]"
                        onChange={(value, data) => {
                          field.onChange(value);
                          SetCategoryName(data.target.innerHTML);
                          SetSelectedCatId(value);
                        }}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                <div>
                  <p className="font-bold">Select Sub Category</p>
                  <Controller
                    name="sub_category_id"
                    {...register("subcategory_id")}
                    control={control}
                    render={({ field }) => (
                      <SelectPicker
                        searchable={true}
                        {...field}
                        size="md"
                        data={sub_cat_data}
                        className="w-[14.5rem]"
                        onChange={(value, data) => {
                          SetSubCategoryName(data.target.innerHTML);
                          field.onChange(value);
                        }}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>
                <div>
                  <p className="font-bold">Price</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    {...register("price")}
                  />
                </div>
                <div>
                  <p className="font-bold">Minimum Purchase</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    {...register("min_purchease")}
                  />
                </div>
              </div>

              <div className="flex gap-5  mt-3 ">
                <div>
                  <p className="font-bold">Maximum Purchase</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    {...register("max_purchease")}
                  />
                </div>
                <div>
                  <p className="font-bold">Base Price</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    {...register("base_price")}
                  />
                </div>
                <div>
                  <p className="font-bold">Discount</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    {...register("discount")}
                  />
                </div>
              </div>
              <div>
                <p className="font-bold mt-3">Description</p>

                <Input
                  as="textarea"
                  required
                  {...register("des")}
                  rows={3}
                  placeholder=""
                />
              </div>

              <div className="mt-10 flex gap-2">
                <Button appearance="ghost">Cancel</Button>

                <Button
                  type="submit"
                  aria-required
                  appearance="primary"
                  className="bg-blue-600 font-bold"
                >
                  Add Product
                </Button>
              </div>
            </div>
          </form>
        </Panel>
      </Stack>
    </>
  );
}
