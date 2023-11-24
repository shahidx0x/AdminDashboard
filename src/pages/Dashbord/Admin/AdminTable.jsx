/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Settings } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Avatar, Button, Dropdown, Table, TagPicker, Toggle } from "rsuite";
import { getAdmins } from "../../../api/AdminSignUp";
import { getUsersByEmail, removeUser } from "../../../api/UserServices";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function AdminTable() {
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [fillHeight, setFillHeight] = useState(false);
  const [hover, setHover] = useState(true);
  const user = useSelector((state) => state.user.user);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();
  const mutation = useMutation(removeUser);
  const handleRemoveAdmin = (id) => {
    toast.promise(
      mutation.mutateAsync({
        queryKey: ["user_remove", id, user.jwt],
      }),
      {
        loading: "removing...",
        success: <b>Admin removed!</b>,
        error: <b>Admin not found in the database!</b>,
      }
    );
  };

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );

  const TextCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center break-all ">
          {rowData[dataKey]}
        </p>
      </Cell>
    );
  };
  const NameCell = ({ rowData, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">
          {rowData["firstName"]}
        </p>
      </Cell>
    );
  };

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

  const ActionsCell = ({ rowData, ...props }) => {
    const handleEdit = () => {
      navigate("/dashbord/update-admin-info", { state: { myData: rowData } });
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center gap-2">
          {/* <button
            className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button> */}
          <button
            className="text-red-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg"
            onClick={() => handleRemoveAdmin(rowData._id)}
          >
            Remove
          </button>
        </div>
      </Cell>
    );
  };
  let defaultColumns;
  user.role === "super-admin"
    ? (defaultColumns = [
        {
          key: "profilePicture",
          label: "Profile Image",
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
          key: "phoneNumber",
          label: "Contact",
          cellRenderer: (props) => (
            <TextCell {...props} dataKey="phoneNumber" />
          ),
          width: 150,
        },
        {
          key: "email",
          label: "Email",
          cellRenderer: (props) => <TextCell {...props} dataKey="email" />,
          width: 300,
        },

        {
          key: "actions",
          label: "Actions",
          cellRenderer: ActionsCell,
          width: 200,
        },
      ])
    : (defaultColumns = [
        {
          key: "profilePicture",
          label: "Profile Image",
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
          key: "phoneNumber",
          label: "Contact",
          cellRenderer: (props) => (
            <TextCell {...props} dataKey="phoneNumber" />
          ),
          width: 150,
        },
        {
          key: "email",
          label: "Email",
          cellRenderer: (props) => <TextCell {...props} dataKey="email" />,
          width: 300,
        },
      ]);

  const { data, status, refetch, error } = useQuery(
    ["admins", page, user.jwt],
    getAdmins,
    {
      cacheTime: 0,
    }
  );

  const mutation_search = useMutation(getUsersByEmail);

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
        success: <b>User found!</b>,
        error: <b>User not found in the database!</b>,
      }
    );
  };

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
  refetch();
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
              <div className=" flex flex-col gap-2">
                <Button
                  onClick={() => {
                    navigate(`/dashbord/add-new-admin`);
                  }}
                  className="bg-indigo-600 w-60 text-white font-bold"
                >
                  Add Admin
                </Button>
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
}
