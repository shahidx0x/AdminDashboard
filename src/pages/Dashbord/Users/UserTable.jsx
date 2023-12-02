/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { SearchIcon, Settings } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Avatar,
  Dropdown,
  Input,
  InputGroup,
  Table,
  TagPicker,
  Toggle,
} from "rsuite";
import { getUsers, getUsersByEmail } from "../../../api/UserServices";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function UserTable() {
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

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );

  const TextCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center break-words whitespace-normal">
          {rowData[dataKey]}
        </p>
      </Cell>
    );
  };
  const CompanyCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center font-bold break-words whitespace-normal">
          {rowData[dataKey]}
        </p>
        <p className="flex justify-center items-center break-words whitespace-normal">
          <span className="font-mono">Assigned By :</span>
          <span
            className={`${
              rowData["companyAssignedBy"] === "Admin" && "text-blue-500"
            } font-bold ml-2 font-mono`}
          >
            {rowData["companyAssignedBy"]}
          </span>
        </p>
      </Cell>
    );
  };
  const AccountStatusCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center">
          <span>
            {rowData[dataKey] === 0 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-yellow-400 text-white">
                Pending
              </span>
            ) : rowData[dataKey] === 1 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-green-400 text-white">
                Active
              </span>
            ) : (
              rowData[dataKey] === -1 && (
                <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-red-400 text-white">
                  Rejected
                </span>
              )
            )}
          </span>
        </p>
      </Cell>
    );
  };
  const NameCell = ({ rowData, ...props }) => {
    const fullName =
      rowData?.firstName && rowData?.lastName
        ? `${rowData.firstName} ${rowData.lastName}`
        : "";

    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{fullName}</p>
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
      navigate("edit", { state: { myData: rowData } });
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
      key: "cartNumber",
      label: "Carts",
      cellRenderer: (props) => <TextCell {...props} dataKey="cartNumber" />,
      width: 130,
    },
    {
      key: "company",
      label: "Company",
      cellRenderer: (props) => <CompanyCell {...props} dataKey="company" />,
      width: 200,
    },
    {
      key: "phoneNumber",
      label: "Contact",
      cellRenderer: (props) => <TextCell {...props} dataKey="phoneNumber" />,
      width: 150,
    },
    {
      key: "email",
      label: "Email",
      cellRenderer: (props) => <TextCell {...props} dataKey="email" />,
      width: 300,
    },
    // {
    //   key: "assignedBy",
    //   label: "Subscription",
    //   cellRenderer: (props) => <TextCell {...props} dataKey="subscription" />,
    //   width: 150,
    // },
    {
      key: "location",
      label: "Location",
      cellRenderer: (props) => <TextCell {...props} dataKey="location" />,
      width: 300,
    },
    // {
    //   key: "role",
    //   label: "Role",
    //   cellRenderer: (props) => <TextCell {...props} dataKey="role" />,
    //   width: 150,
    // },
    {
      key: "status",
      label: "Status",
      cellRenderer: (props) => (
        <AccountStatusCell {...props} dataKey="ac_status" />
      ),
      width: 150,
    },
    {
      key: "actions",
      label: "Actions",
      cellRenderer: ActionsCell,
      width: 100,
    },
  ];

  const { data, status, refetch, error } = useQuery(
    ["users", page, user.jwt],
    getUsers,
    {
      cacheTime: 0, // Data is not cached
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
  const settings = useSelector(state => state.settings);

  return (
    <div className="">
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
              <div className=" ">
                {/* <div className="flex space-x-4  rounded-md">
                  <div className="flex rounded-md overflow-hidden h-12 w-full">
                    <input
                      onChange={(event) => handleInputChange(event)}
                      type="text"
                      className="w-[20rem] border-2 text-md p-2 text-xl  rounded-md rounded-r-none"
                    />
                    <button
                      onClick={handleButtonClick}
                      className="bg-indigo-600 text-white px-6 text-lg font-semibold py-2 rounded-r-md"
                    >
                      Search
                    </button>
                  </div>
                </div> */}
                <InputGroup>
                  <Input
                    placeholder="Search by User Email"
                    onChange={(value) => handleInputChange(value)}
                  />
                  <InputGroup.Button onClick={handleButtonClick} tabIndex={-1}>
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
            className=""
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
            rowHeight={compact ? 70 : 30}
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
                    className={`text-sm ml-3 font-medium leading-none ${settings.theme === 'dark' && 'text-white'} `}
                  >
                    Previous
                  </p>
                </div>
                <div className="sm:flex hidden">
                  <p className={`text-sm font-bold leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2 ${settings.theme === 'dark' && 'text-white'}`}>
                    pages : {page}/{data?.meta?.total_page}
                  </p>
                </div>
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                  <p
                    onClick={handleLoadMore}
                    className={`text-sm font-medium leading-none mr-3 ${settings.theme === 'dark' && 'text-white'}`}
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
