/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { Loader, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Drawer,
  Input,
  Message,
  Modal,
  SelectPicker,
  Uploader,
  useToaster,
} from "rsuite";
import { getBrandsIdAndName } from "../../api/BrandServices";
import { getCategoryByBrandId } from "../../api/CategoryService";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../../api/ProductService";
import { CardPlaceHolder } from "../../components/CardPlaceHolder";
import { config } from "../../configs/api.config";
import { clearProduct, saveProduct } from "../../redux/slices/product.slice";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function previewFileOne(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

function Products() {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [search, setSearch] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    product_image: "",
  });

  const [uploadResponse, setUploadResponse] = useState([]);
  const [coverUploadResponse, setCoverUploadResponse] = useState(null);
  const [selectedBrandId, SetSelectedBrandId] = useState("brand");

  const { data, status, refetch } = useQuery(
    ["products", page, user.jwt],
    getProducts
  );

  const { data: brand, status: brand_status } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );

  const { data: category_data, status: category_status } = useQuery(
    ["categoryIdName", "", user.jwt, selectedBrandId, -1],
    getCategoryByBrandId
  );

  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id };
  });

  const cate_data = category_data?.data?.map((each) => {
    return { label: each?.category_label, value: each._id };
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

  const onSubmit = (data) => {
    data.fet_image = [...uploadResponse];
    data.product_image = coverUploadResponse;

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
    refetch();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.data?.meta?.total_pages) {
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

  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Products
            </p>
            <div>
              <button
                onClick={() => setOpenWithHeader(true)}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <p className="text-sm font-medium leading-none text-white">
                  Add Products
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-10 border p-10 ">
          {status === "loading"
            ? Array(8)
                .fill()
                .map((index) => <CardPlaceHolder key={index} />)
            : data?.data?.data.map((props) => (
                <BrandList
                  props={props}
                  key={props._id}
                  user={user}
                  refetch={refetch}
                  brand_f_data={brand_f_data}
                />
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
                  pages : 1/{data?.data?.meta?.total_pages}
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
      {/* Modal code */}

      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Drawer.Header>
            <Drawer.Title>Add Product</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div className="flex justify-center items-center mb-5">
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
                    />
                  ) : (
                    <img
                      src="https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png"
                      alt="profile_picture"
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

            <div className="flex flex-col gap-5 mt-5">
              <div>
                <p className="font-bold">Product Name</p>
                <Input required {...register("name")} />
              </div>
              <div>
                <p className="font-bold">Description</p>

                <Input
                  as="textarea"
                  required
                  {...register("des")}
                  rows={3}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex gap-5 mt-3">
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
                      onChange={(value) => {
                        field.onChange(value);
                        SetSelectedBrandId(value);
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
                      onChange={(value) => {
                        field.onChange(value);
                        console.log(value);
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
                <SelectPicker
                  searchable={false}
                  size="md"
                  data={["developing"]}
                  className="w-[14.5rem]"
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
            </div>
            <div className="flex gap-5 mt-3">
              <div>
                <p className="font-bold">Minimum Purchase</p>
                <Input
                  className="w-[14.5rem]"
                  required
                  {...register("min_purchease")}
                />
              </div>
              <div>
                <p className="font-bold">Maximum Purchase</p>
                <Input
                  className="w-[14.5rem]"
                  required
                  {...register("max_purchease")}
                />
              </div>
            </div>

            <div className="flex gap-5  mt-3 ">
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

            <Drawer.Actions className="mt-10">
              <Button
                appearance="ghost"
                onClick={() => setOpenWithHeader(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                aria-required
                onClick={() => setOpenWithHeader(false)}
                appearance="primary"
                className="bg-blue-600"
              >
                Add Product
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </form>
      </Drawer>
    </>
  );
}

export default Products;

function BrandList({ props, user, refetch, brand_f_data }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const toaster = useToaster();
  const dispatch = useDispatch();

  const { data, status } = useQuery(
    [["products-ind"], 1, user.jwt, props._id],
    getProducts,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const handleEdit = (data) => {
    dispatch(saveProduct(data.data.data[0]));
    setOpenEdit(true);
  };

  const handleDone = (data) => {
    dispatch(clearProduct());
    handleCloseEdit();
  };
  const mutation = useMutation(deleteProduct);
  const handleOk = (id) => {
    mutation.mutate(
      { id, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Product deleted successfully</Message>
          );
        },
        onError: (error) => {
          console.log(error);
          toaster.push(<Message type="error">Product delete failed !</Message>);
        },
      }
    );
    refetch();
    setOpen(false);
  };
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const product = useSelector((state) => state.product.product);
  console.log(product);
  return (
    <>
      <div className="mx-2 w-80  lg:mb-0  border-red-500 rounded-lg shadow-sm hover:shadow-xl mt-7 mb-8">
        <div className="border">
          <img src={props.product_image} className="w-full h-44 " />
        </div>
        <div className="bg-white">
          <div className="p-4">
            <div className="flex justify-between">
              <EditIcon
                onClick={() => handleEdit(data)}
                className="text-4xl border rounded hover:bg-indigo-200 hover:text-white"
              />

              <h2 className="text-lg font-semibold">{props?.name}</h2>

              <TrashIcon
                onClick={() => setOpen((prev) => !prev)}
                className="text-4xl border rounded hover:text-red-400"
              />
            </div>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title className=" text-xl ">
                Are you sure you want to delete{" "}
                <span className="text-indigo-400">{props?.name}</span> ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => handleOk(props._id)}
                className="border-2 bg-indigo-600 text-white "
              >
                Confirm
              </Button>
              <Button
                onClick={handleClose}
                className="border-2 bg-red-600 text-white"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal size={"lg"} open={openEdit} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Update Product Information</Modal.Title>
            </Modal.Header>
            <Divider />
            <Modal.Body>
              <div className="flex flex-wrap gap-5">
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Name</p>
                    <Input defaultValue={product?.name} />
                  </div>
                  <div>
                    <p>Description</p>
                    <Input defaultValue={product?.des} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Price</p>
                    <Input defaultValue={product?.price} />
                  </div>
                  <div>
                    <p>Base Price</p>
                    <Input defaultValue={product?.base_price} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Min Purchase</p>
                    <Input defaultValue={product?.min_purchease} />
                  </div>
                  <div>
                    <p>Max Purchase</p>
                    <Input defaultValue={product?.max_purchease} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Brand</p>
                    <SelectPicker data={brand_f_data} className="w-[14.7rem]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Category</p>
                    <SelectPicker searchable={false} className="w-[14.7rem]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Discount</p>
                    <Input defaultValue={product?.discount} />
                  </div>
                </div>
              </div>
              <Divider className="mt-4 font-bold">SKU Information</Divider>
              <div className="flex flex-wrap gap-5">
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Available</p>
                    <Input defaultValue={product?.sku[0]?.available || 0} />
                  </div>
                  <div>
                    <p>Ongoing</p>
                    <Input defaultValue={product?.sku[0]?.ongoing || 0} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Booked</p>
                    <Input defaultValue={product?.sku[0]?.booked || 0} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Stock</p>
                    <Input defaultValue={product?.sku[0]?.stock || 0} />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleCloseEdit}
                className="border-2 bg-red-600 text-white"
              >
                Cancel
              </Button>
              <Button
                // type="submit"
                onClick={() => handleDone(data)}
                className="border-2 bg-indigo-600 text-white "
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
