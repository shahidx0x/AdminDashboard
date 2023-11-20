/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SearchIcon, Settings } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  InputGroup,
  Message,
  Modal,
  Table,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import {
  deleteBrand,
  getBrands,
  getBrandsSearched,
} from "../../../api/BrandServices";
import { updateUser } from "../../../api/UserServices";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AllCompany() {
  const [loading, setLoading] = useState(false);
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [noData, setNoData] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [fillHeight, setFillHeight] = useState(false);
  const [hover, setHover] = useState(true);
  const user = useSelector((state) => state.user.user);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [show, setShow] = useState(null);
  const [search, setSearch] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
  const [forceUpdate, setForceUpdate] = useState(0);

  const { Column, HeaderCell, Cell } = Table;

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );
  const ImageCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <div className="flex justify-center -mt-2">
          <Avatar
            className=""
            src={
              rowData?.brand_image ||
              "https://avatars.githubusercontent.com/u/12592949"
            }
            alt="P"
          />
        </div>
      </Cell>
    );
  };

  const navigate = useNavigate();

  const { data, status, refetch } = useQuery(
    ["brands", page, user.jwt],
    getBrands,
    {
      cacheTime: 0,
    }
  );

  const BrandNameCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.brand_label}
        </p>
      </Cell>
    );
  };
  const ProductCountCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold items-center">
          {rowData?.productCount}
        </p>
      </Cell>
    );
  };

  const CategoryCountCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold items-center">
          {rowData?.categoryCount}
        </p>
      </Cell>
    );
  };

  const BrandDescriptionCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.brand_description}
        </p>
      </Cell>
    );
  };
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const mutation_delete = useMutation(deleteBrand);
  const handleOk = () => {
    mutation_delete.mutate(
      { deleteId, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Brand deleted successfully</Message>
          );
          refetch();
        },
        onError: (error) => {
          toaster.push(<Message type="error">Brand delete failed !</Message>);
        },
      }
    );
    setOpen(false);
    refetch();
  };
  const handleClose = () => setOpen(false);
  const BrandIdCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData?._id}</p>
      </Cell>
    );
  };

  const ActionsCell = ({ rowData, ...props }) => {
    const handleDelete = () => {
      handleOpen();
      setDeleteId(rowData._id);
    };
    const handleEdit = () => {
      navigate("edit", { state: { myData: rowData } });
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center gap-2">
          <button
            className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg "
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-red-500 border px-3 py-2 -mt-1 rounded-lg  hover:text-white hover:bg-red-500 "
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </Cell>
    );
  };

  const defaultColumns = [
    {
      key: "brand_image",
      label: "Company Image",
      cellRenderer: ImageCell,
      width: 200,
    },

    // {
    //   key: "_id",
    //   label: "Company Id",
    //   cellRenderer: BrandIdCell,
    //   width: 300,
    // },

    {
      key: "brand_label",
      label: "Company Name",
      cellRenderer: BrandNameCell,
      width: 250,
    },
    {
      key: "categoryCount",
      label: "Category Count",
      cellRenderer: CategoryCountCell,
      width: 150,
    },
    {
      key: "productCount",
      label: "Product Count",
      cellRenderer: ProductCountCell,
      width: 150,
    },
    {
      key: "brand_description",
      label: "Company Description",
      cellRenderer: BrandDescriptionCell,
      width: 400,
    },
    {
      key: "actions",
      label: "Actions",
      cellRenderer: ActionsCell,
      width: 200,
    },
  ];

  const mutation = useMutation(updateUser);
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
          toaster.push(<Message type="success">Updated successfully</Message>);
        },
        onError: (error) => {
          toaster.push(<Message type="error">Update failed !</Message>);
        },
      }
    );
    setOpen(false);
  };

  const mutation_search = useMutation(getBrandsSearched);

  const handleInputChange = (value) => {
    setInputValue(value);

    if (value === "") {
      refetch();
      setIsSearching(false);
    }
  };

  const handleButtonClick = () => {
    setIsSearching(true);
    toast.promise(
      mutation_search.mutateAsync({
        queryKey: ["user_search", inputValue, user.jwt],
      }),
      {
        loading: "Searching...",
        success: <b>Company found!</b>,
        error: <b>Company not found in the database!</b>,
      }
    );
  };

  const displayedData =
    isSearching && mutation_search?.data?.data[0]
      ? [mutation_search?.data?.data[0]]
      : data?.data?.data;

  const [columnKeys, setColumnKeys] = useState(
    defaultColumns.map((column) => column.key)
  );

  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.data?.meta?.total_page) {
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
  const [confirm, setConfirm] = useState(false);
  const handleConfirm = (e) => {
    if (e.target.value === "confirm") {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };
  return (
    <div>
      <Toaster />
      <Modal open={open} onClose={handleClose}>
        <Modal.Header className="p-5">
          <Modal.Title>Are you sure you want delete company ?</Modal.Title>
          <div className="flex flex-col gap-2">
            <p className="mt-2">
              All Category and Product will be deleted under this company
            </p>
            <Input
              onChange={(value, event) => handleConfirm(event)}
              placeholder="Type 'confirm' to delete"
            />
          </div>
        </Modal.Header>

        <Modal.Footer>
          <Button
            disabled={confirm ? false : true}
            onClick={handleOk}
            className="bg-blue-500 w-20"
            appearance="primary"
          >
            Confirm
          </Button>
          <Button className=" bg-red-500 text-white" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <hr />
        <div className="p-5">
          <div className="flex flex-col gap-5 2xl:flex-row 2xl:justify-between">
            <div className="">
              <TagPicker
                className="h-12"
                data={defaultColumns}
                labelKey="label"
                valueKey="key"
                value={columnKeys}
                onChange={setColumnKeys}
                cleanable={false}
              />
              <Dropdown className="" icon={<Settings />}>
                <Dropdown.Item>
                  <span className="flex justify-between">
                    <p>Compact：</p>
                    <Toggle
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      checked={compact}
                      onChange={setCompact}
                    />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="flex justify-between">
                    <p>Bordered：</p>
                    <Toggle
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      checked={bordered}
                      onChange={setBordered}
                    />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="flex justify-between">
                    Show Header：
                    <Toggle
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      checked={showHeader}
                      onChange={setShowHeader}
                    />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="flex justify-between">
                    Hover：
                    <Toggle
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      checked={hover}
                      onChange={setHover}
                    />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <span className="flex justify-between">
                    Auto Height：
                    <Toggle
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      checked={autoHeight}
                      onChange={setAutoHeight}
                    />
                  </span>
                </Dropdown.Item>
              </Dropdown>
            </div>

            <div>
              <div className=" ">
                <InputGroup>
                  <Input
                    placeholder="Search by Company Name"
                    onChange={(value) => handleInputChange(value)}
                  />
                  <InputGroup.Button
                    onClick={() => handleButtonClick()}
                    tabIndex={-1}
                  >
                    <SearchIcon className="text-indigo-500 font-bold" />
                  </InputGroup.Button>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="mt-5" style={{ height: autoHeight ? "auto" : 400 }}>
          <Table
            loading={status === "loading" ? true : false}
            height={300}
            hover={hover}
            fillHeight={fillHeight}
            showHeader={showHeader}
            autoHeight={autoHeight}
            data={noData ? [] : displayedData}
            bordered={bordered}
            cellBordered={bordered}
            headerHeight={compact ? 40 : 30}
            rowHeight={compact ? 56 : 30}
          >
            {columns.map((column) => {
              const { key, label, cellRenderer, ...rest } = column;
              return (
                <Column {...rest} key={key}>
                  <CustomHeaderCell>{label}</CustomHeaderCell>
                  {cellRenderer ? (
                    React.createElement(cellRenderer, {
                      dataKey: key,
                    })
                  ) : (
                    <CustomCell dataKey={key} />
                  )}
                </Column>
              );
            })}
          </Table>

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
                    pages : {page}/{data?.data?.meta?.total_page}
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
      </div>
    </div>
  );
}
