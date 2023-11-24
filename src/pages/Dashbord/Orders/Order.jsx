/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import axios from "axios";
import { Filter, SearchIcon, Settings } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  InputPicker,
  Message,
  Table,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import { getOrders, updateOrder } from "../../../api/OrderServices";
import { config } from "../../../configs/api.config";
const { Column, HeaderCell, Cell } = Table;
const rowKey = "_id";
const ExpandCell = ({ rowData, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key) => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);
const ItemRow = ({ props }) => {
  return (
    <>
      <li className="flex flex-col sm:flex-row sm:justify-between border-b pb-3">
        <div className="flex w-full space-x-2 sm:space-x-4">
          <img
            className="flex-shrink-0 w-20 h-20 object-cover border-transparent rounded outline-none  bg-gray-500"
            src={props.product_image}
            alt="PI"
          />
          <div className="flex flex-col justify-between w-full pb-4">
            <div className="flex justify-between w-full  ">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leadi sm:pr-8">
                  {props.product_name}
                </h3>
                <p className="text-sm text-gray-600">
                  Product Id :{props.product_id}
                </p>
                <p className="text-sm text-gray-600">Order Time :</p>
              </div>
              <div className="text-right mr-[8rem]">
                <p className="text-lg font-semibold">
                  {props.product_price} x {props.product_quantity} pcs
                </p>
                <p className="text-sm  text-gray-400">
                  {props.product_price * props.product_quantity} USD
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
const renderRowExpanded = (rowData) => {
  return (
    <div className="w-full rounded-md p-2">
      <div>
        <div className="rounded-md">
          <div className="flex flex-col   p-6 space-y-4 sm:p-10 border rounded-md  w-full text-gray-800 ">
            <ul className="flex flex-col gap-2 w-full  overflow-auto max-h-[20rem]">
              {rowData.items.map((item, index) => (
                <ItemRow key={index} props={item} />
              ))}
            </ul>
            <div className="flex justify-between">
              <div>
                <p className="font-bold underline">Additional Instruction</p>
                <p className="text-sm text-gray-600">
                  {rowData.additional_information || "No instruction provided"}
                </p>
              </div>
              <div className=" mr-[8rem]">
                <p>
                  Total amount:{" "}
                  <span className="font-semibold">
                    {rowData.totalCost || "Not Calculated"} USD
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function Order() {
  const toaster = useToaster();
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const {
    data,
    status,
    refetch: data_refetch,
  } = useQuery(["orders", page, user.jwt], getOrders, {
    cacheTime: 0,
  });
  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }

    setExpandedRowKeys(nextExpandedRowKeys);
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
        <p className="flex justify-center font-medium break-words whitespace-normal">
          {rowData[dataKey]}
        </p>
      </Cell>
    );
  };
  const CompanyCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-medium break-words whitespace-normal">
          {rowData.user_id.company}
        </p>
      </Cell>
    );
  };
  const AddressCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <div className="">
          <p className="text-xs font-medium break-words whitespace-normal">
            {rowData[dataKey]}
          </p>
        </div>
      </Cell>
    );
  };

  const ActionsCell = ({ rowData, ...props }) => {
    const mutation = useMutation(updateOrder);
    const payloadBase = {
      notification: {
        title: "Check this Mobile (title)",
        body: "Rich Notification testing (body)",
        mutable_content: true,
        sound: "Tri-tone",
        image: "https://firebase.google.com/images/social.png",
      },
      data: {
        title: "New Text Message",
        image: "https://firebase.google.com/images/social.png",
        message: "Hello how are you?",
      },
    };
    const handleUpdate = (data) => {
      mutation.mutate(
        { data: data, token: user.jwt, id: rowData._id },
        {
          onSuccess: (data) => {
            data_refetch();
          },

          onError: (error) => {
            console.log(error);
            toaster.push(
              <Message type="error">Order update failed ! Try Again.</Message>
            );
          },
        }
      );
    };
    const handleUpandInv = (data) => {
      if (data.order_status === 1) {
        handleUpdate(data);
        toast.promise(
          axios.post(
            config.endpoints.host + `/product/invoice/${rowData.user_email}`,
            { rowData }
          ),
          {
            loading: "loading...",
            success: () => {
              try {
                for (const token of rowData.user_id.firebaseFCM) {
                  console.log(token);
                  const payload = { ...payloadBase, to: token };
                  axios
                    .post("https://fcm.googleapis.com/fcm/send", payload, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `key=${config.endpoints.fcmKey}`,
                      },
                    })
                    .then((res) => console.log(res));
                }
              } catch (error) {
                toaster.push(
                  <Message type="error">App Notification failed!</Message>
                );
              }
            },
            error: <b>Something went wrong !</b>,
          }
        );
      } else if (data.order_status === 2) {
        handleUpdate(data);
        toast.promise(
          axios.post(
            config.endpoints.host +
              `/send/order-status?email=${rowData.user_email}&status=cancled`,
            { rowData }
          ),
          {
            loading: "loading...",
            success: <b>Order cancled and user notified !</b>,
            error: <b>Something went wrong !</b>,
          }
        );
      } else if (data.order_status === 3) {
        handleUpdate(data);

        toast.promise(
          axios
            .post(config.endpoints.host + `/create/transaction`, {
              user: rowData.user_name,
              user_id: rowData.user_id,
              email: rowData.user_email,
              invoice_id: rowData._id,
              address: rowData.user_address,
              items: [...rowData.items],
              amount: rowData.totalCost,
              deliveryStatus: "deliverd",
              purchaseStatus: "paid",
            })
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                return 0;
              } else {
                throw new Error("Transaction creation failed");
              }
            })
            .then((deleteRes) => {
              console.log("Order deleted successfully", deleteRes);
            }),
          {
            loading: "Processing...",
            success: <b>Transaction successful</b>,
            error: <b>Something went wrong!</b>,
          }
        );
      }
    };
    data_refetch();
    return (
      <Cell {...props}>
        <div className="flex justify-center gap-3">
          {rowData.order_status === 3 ? (
            <p className=" fontbold">paid & deliverd</p>
          ) : rowData?.order_status === 0 ? (
            <>
              <button
                className="text-white font-bold bg-indigo-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-900 rounded-lg"
                onClick={() => handleUpandInv({ order_status: 1 })}
              >
                Confirm
              </button>
              <button
                onClick={() => handleUpandInv({ order_status: 2 })}
                className="text-white font-bold bg-red-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-red-900 rounded-lg"
              >
                Cancle
              </button>
            </>
          ) : rowData.order_status === 2 ? (
            <>
              <p
                className="text-red-500 font-bold  rounded-lg"
                onClick={() => handleUpandInv({ order_status: 3 })}
              >
                order cancled
              </p>
            </>
          ) : (
            <>
              <button
                className="text-white font-bold bg-indigo-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-400 rounded-lg"
                onClick={() => handleUpandInv({ order_status: 3 })}
              >
                Mark as Deliverd
              </button>
            </>
          )}
        </div>
      </Cell>
    );
  };
  const OrderStatusCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center">
          <span>
            {rowData[dataKey] === 3 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-gray-400 text-white">
                Deliverd
              </span>
            ) : rowData[dataKey] === 0 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-yellow-400 text-white">
                Pending
              </span>
            ) : rowData[dataKey] === 1 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-green-400 text-white">
                Approved
              </span>
            ) : (
              rowData[dataKey] === 2 && (
                <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-red-400 text-white">
                  Cancled
                </span>
              )
            )}
          </span>
        </p>
      </Cell>
    );
  };
  const defaultColumns = [
    {
      key: "user_name",
      label: "Name",
      cellRenderer: (props) => <TextCell {...props} dataKey="user_name" />,
      width: 190,
    },
    {
      key: "company",
      label: "Company",
      cellRenderer: (props) => <CompanyCell {...props} dataKey="company" />,
      width: 200,
    },
    {
      key: "user_email",
      label: "Email",
      cellRenderer: (props) => <TextCell {...props} dataKey="user_email" />,
      width: 250,
    },
    {
      key: "user_address",
      label: "Delivery Address",
      cellRenderer: (props) => (
        <AddressCell {...props} dataKey="user_address" />
      ),
      width: 250,
    },
    {
      key: "order_status",
      label: "Order Status",
      cellRenderer: (props) => (
        <OrderStatusCell {...props} dataKey="order_status" />
      ),
      width: 150,
    },
    {
      key: "pickup_time",
      label: "Pickup Time",
      cellRenderer: (props) => <TextCell {...props} dataKey="pickup_time" />,
      width: 250,
    },

    {
      key: "actions",
      label: "Actions",
      cellRenderer: (props) => (
        <ActionsCell {...props} dataKey="actions" refetch={data_refetch} />
      ),
      width: 200,
    },
  ];
  const [columnKeys, setColumnKeys] = useState(
    defaultColumns.map((column) => column.key)
  );

  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = compact ? CompactCell : Cell;
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

  const mutation_search = useMutation(getOrders);

  const handleInputChange = (value, event) => {
    setInputValue(value);

    if (value === "") {
      data_refetch();
      setIsSearching(false);
    }
  };

  const [currentFilter, setCurrentFilter] = useState(null);
  const handleFilterChange = (filter, search) => {
    setCurrentFilter(filter);
    toast.promise(
      mutation_search.mutateAsync({
        queryKey: [`${filter}_filter`, filter.toLowerCase(), user.jwt, search],
      }),
      {
        loading: "loading...",
        error: <b>Something went wrong !</b>,
      }
    );
  };

  const input_picker = ["Approved", "Pending", "Cancled", "Deliverd"].map(
    (item) => ({ label: item, value: item })
  );
  const handleChnage = (value, event) => {
    console.log(value);
    handleFilterChange(value);
  };

  const displayedData =
    currentFilter && mutation_search?.data
      ? // eslint-disable-next-line no-unsafe-optional-chaining
        [...mutation_search?.data?.data]
      : [...(data?.data || [])];

  const handleButtonClick = () => {
    handleFilterChange();
  };
  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.meta?.totalPages) {
        return prevPage + 1;
      }
      return prevPage;
    });
    data_refetch();
  };

  const handleLoadPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    data_refetch();
  };
  data_refetch();
  return (
    <div>
      <Toaster />
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
            <div className="w-80 2xl:w-full">
              <InputGroup>
                <Input onChange={(value) => handleInputChange(value)} />
                <InputGroup.Button onClick={handleButtonClick} tabIndex={-1}>
                  <SearchIcon className="text-indigo-500 font-bold" />
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className="flex gap-2 mt-3">
              <Filter className="mt-2" />
              <InputPicker
                className="w-72 2xl:w-full"
                data={input_picker}
                onChange={(value, event) => handleChnage(value, event)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 ml-5" style={{ height: autoHeight ? "auto" : 400 }}>
        <Table
          shouldUpdateScroll={true}
          rowKey={rowKey}
          loading={status === "loading" ? true : false}
          height={600}
          hover={hover}
          fillHeight={fillHeight}
          showHeader={showHeader}
          data={noData ? [] : displayedData}
          bordered={bordered}
          cellBordered={bordered}
          headerHeight={compact ? 40 : 30}
          rowHeight={compact ? 56 : 30}
          rowExpandedHeight={500}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={renderRowExpanded}
        >
          <Column width={70} align="center">
            <HeaderCell>#</HeaderCell>
            <ExpandCell
              dataKey="id"
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpanded}
            />
          </Column>
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
      </div>
      {/* <div className="border-b">
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
                pages : {page}/{data?.meta?.totalPages}
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
      </div> */}
    </div>
  );
}
