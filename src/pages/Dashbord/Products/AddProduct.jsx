/* eslint-disable no-unused-vars */

import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RichTextEditor from "react-rte";
import {
  Breadcrumb,
  Button,
  Input,
  InputNumber,
  Loader,
  Message,
  SelectPicker,
  Uploader,
  useToaster,
} from "rsuite";
import { getBrandsIdAndName } from "../../../api/BrandServices";
import { getCategoryByBrandId } from "../../../api/CategoryService";
import { createProduct } from "../../../api/ProductService";
import { getSubCategoryByCategoryId } from "../../../api/SubCategoryServices";
import { config } from "../../../configs/api.config";
import { toolbarConfig } from "../../../configs/toolbar.config";
import { getUnit, getUnitInfo } from "../../../api/UnitType";

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
  const [selectedSubCatId, SetSelectedSubCatId] = useState("");

  const { data: brand } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );

  const { data: category_data } = useQuery(
    ["categoryIdName", "", user.jwt, selectedBrandId.split(",")[0], -1],
    getCategoryByBrandId
  );

  const { data: sub_category_data } = useQuery(
    ["subCategoryIdName", "", user.jwt, selectedCatId.split(",")[0], -1],
    getSubCategoryByCategoryId
  );
  const {
    data:data_unit,
    status,
    refetch: data_unit_refetch,
  } = useQuery(["unit-info", user.jwt], getUnitInfo, {
    cacheTime: 0,
  });
  const product_unit_type = [{label : "Pices",value:"Pices"}, ...(data_unit?.data || []).map(
    item => ({ label: item.quantity+"/"+item.label, value: item.label+"/"+item.quantity })
  )];

  
  const cate_data = category_data?.data?.map((each) => {
    return {
      label: each?.category_label,
      value: each._id,
      slug: each.category_slug,
    };
  });

  const sub_cat_data = sub_category_data?.data?.map((each) => {
    return {
      label: each?.subcategory_name,
      value: each._id + "," + each.subcategory_slug,
    };
  });

  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id, slug: each.slug };
  });
  const brand_f_data = [...(brand_data || ["loading"])].map((item) => ({
    label: item?.label,
    value: item?.value + "," + item?.slug,
  }));

  const category_f_data = [
    ...(cate_data || [{ label: "No Category", value: "no-category" }]),
  ].map((item) => ({
    label: item?.label,
    value: item?.value + "," + item?.slug,
  }));
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

 

  const handleChange = (value) => {
    if (value) {
      setEditorValue(value);
    }
  };
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const mutation = useMutation(createProduct);
  const [brandName, SetBrandName] = useState("No Brand");
  const [categoryName, SetCategoryName] = useState("No Category");
  const [subCategoryName, SetSubCategoryName] = useState("No Sub Category");
  const message_success = (
    <Message showIcon type="success" closable>
      Success : Product Added Successfully.
    </Message>
  );
  const message_error = (
    <Message showIcon type="error" closable>
      Error : Product Added Failed !.
    </Message>
  );
  const [productUnit, setProductUnit] = useState('Pices')
 
  const onSubmit = (data) => {
    const htmlContent = editorValue.toString("html");
    (data.brand_id = selectedBrandId.split(",")[0]),
      (data.subcategory_id = selectedSubCatId.split(",")[0]),
      (data.category_id = selectedCatId.split(",")[0]),
      (data.fet_image = [...uploadResponse]);
    data.product_image = coverUploadResponse;
    data.product_unit_type = productUnit.split("/")[0];
    data.product_unit_quantity = Number(productUnit.split("/")[1]) || 1;
    data.brand_name = brandName;
    data.category_name = categoryName;
    data.subcategory_name = subCategoryName;
    data.product_information = htmlContent;
    data.brand_slug = selectedBrandId.split(",")[1];
    data.category_slug = selectedCatId.split(",")[1];
    data.subcategory_slug = selectedSubCatId.split(",")[1];
    if (productUnit === 'Pices') data.unit_flag = 1;
    else data.unit_flag = 0;

  
    mutation.mutate(
      { data: data, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(message_success, {
            placement: "bottomStart",
            duration: 2000,
          });
          setFileInfo(null);
          setCoverUploadResponse(null);
          setUploadResponse(null);
        },
        onError: (error) => {
          toaster.push(message_error, {
            placement: "bottomStart",
            duration: 3000,
          });
        },
      }
    );
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNumberChange = (value) => {
    if (/^\d*$/.test(value)) {
      setPrice(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Only numeric values are allowed");
    }
  };
const settings = useSelector(state => state.settings) 
  return (
    <>
      <section className="p-6 bg-base-100 text-gray-900 h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12 "
        >
          <fieldset className=" grid grid-cols-4 gap-6 p-24 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <Breadcrumb className="text-sm">
                <Breadcrumb.Item as={Link} to="/dashbord">
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item as={Link} to="/dashbord/product/list">
                  product-list
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-blue-400">
                  product-creation
                </Breadcrumb.Item>
              </Breadcrumb>
              <p className={`font-thin text-3xl ${settings.theme === "dark" && 'text-white'} `}>Product & Feature Images</p>
            </div>
            <div className="flex  flex-col flex-wrap gap-4 col-span-full lg:col-span-3">
              <div className="flex flex-col 2xl:flex-row gap-10">
                <div className="col-span-full sm:col-span-3">
                  <p className={`font-thin text-sm underline ${settings.theme === "dark" && 'text-white'} `}>
                    Upload Product Image
                  </p>
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
                      toaster.push(
                        <Message type="error">Upload failed</Message>
                      );
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

                <div className="col-span-full">
                  <p className={`font-thin text-sm underline ${settings.theme === "dark" && 'text-white'} `}>
                    Upload Product Feature Image
                  </p>
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
          </fieldset>
          <fieldset className="  grid grid-cols-4 gap-6 px-16 2xl:px-24 py-5 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <Breadcrumb className="text-sm">
                <Breadcrumb.Item as={Link} to="/dashbord">
                  Home
                </Breadcrumb.Item>
                <Breadcrumb.Item as={Link} to="/dashbord/product/list">
                  product-list
                </Breadcrumb.Item>
                <Breadcrumb.Item active className="text-blue-400">
                  product-creation
                </Breadcrumb.Item>
              </Breadcrumb>
              <p className={`font-thin text-3xl  ${settings.theme === "dark" && 'text-white'} `}>Product Inormation</p>
            </div>
            <div className="flex flex-wrap gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3 flex flex-col gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Product Name</label>

                <Input
                  required
                  className="w-[12rem] 2xl:w-[14.5rem]"
                  {...register("name")}
                />
                <div data-lastpass-icon-root="true"></div>
              </div>
              <div className="col-span-full sm:col-span-3 flex flex-col gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Product Unit Type</label>
                <SelectPicker   className="w-[12rem] 2xl:w-[14.5rem]" onChange={(value,data) => setProductUnit(value)} searchable={false} data={product_unit_type} />
             
                <div data-lastpass-icon-root="true"></div>
              </div>
              <div className="flex flex-col col-span-full sm:col-span-3 gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Select Company</label>

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
                      className="w-[12rem] 2xl:w-[14.5rem]"
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
              <div className="flex flex-col col-span-full sm:col-span-3 gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Select Brand</label>
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
                      className="w-[12rem] 2xl:w-[14.5rem]"
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
              <div className="col-span-full flex flex-col gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Select Category</label>
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
                      className="w-[12rem] 2xl:w-[14.5rem]"
                      onChange={(value, data) => {
                        SetSubCategoryName(data.target.innerHTML);
                        field.onChange(value);
                        SetSelectedSubCatId(value);
                      }}
                      onBlur={() => field.onBlur()}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col col-span-full sm:col-span-2 gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Price</label>
                <InputNumber
                  className="w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 "
                  required
                 
                  {...register("price")}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2 flex flex-col gap-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Minimum Purchase</label>
                <InputNumber
                  className="w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 "
                  defaultValue={0}
                  {...register("min_purchease")}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2 flex flex-col gap-1">
                <label htmlFor="zip" className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>
                  Maximum Purchase
                </label>
                <InputNumber
                  className="w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 "
                  defaultValue={0}
              
                  {...register("max_purchease")}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>Discount</label>
                <InputNumber
                defaultValue={0}
                  className="w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200"
        
              
                  {...register("discount")}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="col-span-full sm:col-span-2 flex flex-col gap-1">
                <div className="flex flex-col gap-5">
                  <div className="2xl:w-[100vh]">
                    <label className={`font-bold text-sm  ${settings.theme === "dark" && 'text-white'} `}>
                      Product Information
                    </label>
                    <RichTextEditor
                      className="mt-2"
                      toolbarConfig={toolbarConfig}
                      value={editorValue}
                      onChange={handleChange}
                    />
                    <div className="flex gap-2 mt-10">
                      <Button className="2xl:w-[10rem]" appearance="ghost">
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        aria-required
                        appearance="primary"
                        className="bg-blue-600 font-bold 2xl:h-[3rem] 2xl:w-[10rem] "
                      >
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}
