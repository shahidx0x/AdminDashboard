/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
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
import { updateProduct } from "../../../api/ProductService";
import { getSubCategoryByCategoryId } from "../../../api/SubCategoryServices";
import { config } from "../../../configs/api.config";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function EditProduct() {
  const user = useSelector((state) => state.user.user);
  const toaster = useToaster();
  const location = useLocation();
  const editData = location.state.myData;

  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    product_image: editData?.product_image,
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
  } = useForm({});

  const mutation = useMutation(updateProduct);
  const [brandName, SetBrandName] = useState("No Brand");
  const [categoryName, SetCategoryName] = useState("No Category");
  const [subCategoryName, SetSubCategoryName] = useState("No Sub Category");

  const onSubmit = (data) => {
    data.fet_image = [...uploadResponse];
    data.product_image = coverUploadResponse;
    data.brand_name = brandName;
    data.category_name = categoryName;
    data.subcategory_name = subCategoryName;
    let id = editData._id;
    console.table(data);
    mutation.mutate(
      { data: data, token: user.jwt, id: id },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Product updated successfully</Message>
          );
          setFileInfo(null);
          setCoverUploadResponse(null);
          setUploadResponse(null);
          navigate(-1);
        },
        onError: (error) => {
          toaster.push(<Message type="error">Product update failed !</Message>);
        },
      }
    );
    reset();
  };

  const fileList = editData.fet_image.map((url, index) => ({
    name: `${index}.png`,
    fileKey: index + 1,
    url: url,
  }));

  const navigate = useNavigate();
  const [updatedFetImage, setUpdatedFetImage] = useState(null);
  const handleImageDelete = (image) => {
    axios
      .delete(`${config.endpoints.host}/delete-image/${image}`)
      .then((res) =>
        axios
          .patch(
            `${config.endpoints.host}/update/products/fet-img/${editData._id}?imageUrl=${config.endpoints.host}/uploads/${image}`
          )
          .then((res) => console.log("image deleted from product", res))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

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
        <Panel
          bordered
          className="shadow-sm w-[48.5rem]"
          style={{ background: "#fff" }}
          header={
            <h3 className="font-bold bg-indigo-700 p-8 text-2xl text-white rounded-lg">
              Upadte Product Information
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
                        src={editData?.product_image}
                        alt="product_picture"
                      />
                    )}
                  </button>
                </Uploader>
              </div>

              <div className="mt-3">
                <div>
                  <p className="font-bold">Feature Image</p>
                  <div className="flex">
                    <Uploader
                      disabled={false}
                      listType="picture"
                      defaultFileList={fileList}
                      action={`${config.endpoints.host}/upload`}
                      onSuccess={(value) =>
                        setUploadResponse((prev) => [...prev, value.fileUrl])
                      }
                      onRemove={(e) => {
                        handleImageDelete(e.url.split("/")[4]);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-3">
                <div>
                  <p className="font-bold">Product Name</p>
                  <Input
                    required
                    defaultValue={editData.name}
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
                        placeholder={editData.brand_name}
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
                        placeholder={editData.category_name}
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
                        placeholder={editData.subcategory_name}
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
                    defaultValue={editData?.price}
                    {...register("price")}
                  />
                </div>
                <div>
                  <p className="font-bold">Minimum Purchase</p>
                  <Input
                    className="w-[14.5rem]"
                    defaultValue={editData?.min_purchease}
                    {...register("min_purchease")}
                  />
                </div>
              </div>

              <div className="flex gap-5  mt-3 ">
                <div>
                  <p className="font-bold">Maximum Purchase</p>
                  <Input
                    className="w-[14.5rem]"
                    defaultValue={editData?.max_purchease}
                    {...register("max_purchease")}
                  />
                </div>
                {/* <div>
                  <p className="font-bold">Base Price</p>
                  <Input
                    className="w-[14.5rem]"
                    required
                    defaultValue={editData?.base_price}
                    {...register("base_price")}
                  />
                </div> */}
                <div>
                  <p className="font-bold">Discount</p>
                  <Input
                    className="w-[14.5rem]"
                    defaultValue={editData?.discount}
                    {...register("discount")}
                  />
                </div>
              </div>
              <div>
                <p className="font-bold mt-3">Description</p>

                <Input
                  as="textarea"
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
                  Update Product
                </Button>
              </div>
            </div>
          </form>
        </Panel>
      </Stack>
    </>
  );
}
