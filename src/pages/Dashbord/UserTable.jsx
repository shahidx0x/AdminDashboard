/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Avatar,
  Dropdown,
  Message,
  Table,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import { getUsers, getUsersByEmail, updateUser } from "../../api/UserServices";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export const UserTable = () => {
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
  const [open, setOpen] = useState(false);
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const [show, setShow] = useState(null);
  const [search, setSearch] = useState(false);
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({ fileUrl: "" });
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
              rowData?.profilePicture ||
              "https://avatars.githubusercontent.com/u/12592949"
            }
            alt="P"
          />
        </div>
      </Cell>
    );
  };
  const NameCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.firstName + " " + rowData?.lastName}
        </p>
      </Cell>
    );
  };
  const CartCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.cartNumber}
        </p>
      </Cell>
    );
  };
  const CompanyCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData?.company}</p>
      </Cell>
    );
  };
  const ContactCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.phoneNumber}
        </p>
      </Cell>
    );
  };
  const RollCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData?.role}</p>
      </Cell>
    );
  };
  const SubscriptionCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.subscription}
        </p>
      </Cell>
    );
  };
  const LocationCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData?.location}</p>
      </Cell>
    );
  };
  const ZipCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData?.zipCode}</p>
      </Cell>
    );
  };
  const StatusCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData?.isAccountActive ? (
            <button className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg">
              Active
            </button>
          ) : (
            <button className="text-red-600 border border-red-400 px-2 py-2 -mt-1 hover:text-white hover:bg-red-500 rounded-lg">
              Not Active
            </button>
          )}
        </p>
      </Cell>
    );
  };
  const EmailCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData.email}</p>
      </Cell>
    );
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ActionsCell = ({ rowData, ...props }) => {
    const handleEdit = () => {
      navigate("edit", { state: { myData: rowData } });
      console.log("Edit clicked for:", rowData._id);
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center">
          <button
            className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </Cell>
    );
  };

  const defaultColumns = [
    {
      key: "profilePicture",
      label: "Profle Image",
      cellRenderer: ImageCell,
      width: 90,
    },

    {
      key: "name",
      label: "Name",
      cellRenderer: NameCell,
      width: 190,
    },

    {
      key: "cartNumber",
      label: "Carts",
      cellRenderer: CartCell,
      width: 130,
    },
    {
      key: "company",
      label: "Company",
      cellRenderer: CompanyCell,
      width: 140,
    },
    {
      key: "phoneNumber",
      label: "Contact",
      cellRenderer: ContactCell,
      width: 150,
    },
    {
      key: "email",
      label: "Email",
      cellRenderer: EmailCell,
      width: 200,
    },
    {
      key: "subscription",
      label: "Subscription",
      cellRenderer: SubscriptionCell,
      width: 150,
    },
    {
      key: "location",
      label: "Location",
      cellRenderer: LocationCell,
      width: 150,
    },
    {
      key: "zipCode",
      label: "ZipCode",
      cellRenderer: ZipCell,
      width: 150,
    },
    {
      key: "status",
      label: "Status",
      cellRenderer: StatusCell,
      width: 100,
    },

    {
      key: "actions",
      label: "Actions",
      cellRenderer: ActionsCell,
      width: 100,
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

  const dropdown = ["admin", "user"].map((item) => ({
    label: item,
    value: item,
  }));

  const dropdownSub = ["Gold", "Bronze"].map((item) => ({
    label: item,
    value: item,
  }));
  const { data, status, refetch, error } = useQuery(
    ["users", page, user.jwt],
    getUsers
  );

  const mutation_search = useMutation(getUsersByEmail);

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log("OnChnage : ", value);
    setInputValue(value);

    if (value === "") {
      refetch();
      setIsSearching(false);
    }
  };

  const handleButtonClick = () => {
    console.log("Input : ", user.jwt);
    setIsSearching(true);
    toast.promise(
      mutation_search.mutateAsync({
        queryKey: ["user_search", inputValue, user.jwt],
      }),
      {
        loading: "Searching...",
        success: <b>User found!</b>,
        error: <b>User not found in the database!</b>,
      }
    );
  };
  //

  const displayedData =
    isSearching && mutation_search?.data ? [mutation_search?.data] : data?.data;

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

  return (
    <div>
      <Toaster />
      <div>
        <hr />
        <div className="p-5">
          <div className="flex gap-3 flex-col 2xl:flex-row 2xl:justify-between">
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
              <Dropdown className="" title="Settings">
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
                {/* <div className="flex space-x-1 items-center mb-2 border-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-white text-lg font-semibold">
                    Please enter something
                  </p>
                </div> */}
                <div className="flex space-x-4  rounded-md">
                  <div className="flex rounded-md overflow-hidden h-12 w-full">
                    <input
                      onChange={(event) => handleInputChange(event)}
                      type="text"
                      className="w-[20rem] border-2 text-md  rounded-md rounded-r-none"
                    />
                    <button
                      onClick={handleButtonClick}
                      className="bg-indigo-600 text-white px-6 text-lg font-semibold py-2 rounded-r-md"
                    >
                      Search
                    </button>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
};
