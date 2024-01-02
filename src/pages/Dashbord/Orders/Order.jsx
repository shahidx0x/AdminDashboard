/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import axios from "axios";
import {
  Filter,
  MoreHorizontalIcon,
  MoreVertical,
  SearchIcon,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Breadcrumb,
  Button,
  ButtonToolbar,
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  InputPicker,
  Message,
  Panel,
  Popover,
  Table,
  TagPicker,
  Toggle,
  Whisper,
  useToaster,
} from "rsuite";
import { getOrders, updateOrder } from "../../../api/OrderServices";
import { config } from "../../../configs/api.config";
import { Link } from "react-router-dom";
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
  const settings = useSelector((state) => state.settings);
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
                <h3
                  className={`text-lg font-semibold  sm:pr-8 ${
                    settings.theme === "dark" && "text-white"
                  }`}
                >
                  {props.product_name}
                </h3>
                <p
                  className={`text-sm text-gray-600 ${
                    settings.theme === "dark" && "text-white"
                  }`}
                >
                  Product Id :{props.product_id}
                </p>
                {/* <p className="text-sm text-gray-600">Order Time :</p> */}
              </div>
              <div className="text-right mr-[8rem]">
                <p
                  className={`text-lg font-semibold ${
                    settings.theme === "dark" && "text-white"
                  }`}
                >
                  {props.product_price} x {props.product_quantity} pcs
                </p>
                <p
                  className={`text-sm  text-gray-400 ${
                    settings.theme === "dark" && "text-white"
                  }`}
                >
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

export default function Order() {
  const toaster = useToaster();
  const user = useSelector((state) => state.user.user);
  const settings = useSelector((state) => state.settings);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const [fillHeight, setFillHeight] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
                  <p
                    className={`font-bold underline ${
                      settings.theme === "dark" && "text-white"
                    } `}
                  >
                    Additional Instruction
                  </p>
                  <p
                    className={`text-sm text-gray-600 ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    {rowData.additional_information ||
                      "No instruction provided"}
                  </p>
                </div>
                <div className=" mr-[8rem]">
                  <p className={`${settings.theme === "dark" && "text-white"}`}>
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

  const {
    data,
    status,
    refetch: data_refetch,
  } = useQuery(["orders", page, user.jwt], getOrders, {
    cacheTime: 0,
    manual: true,
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
          {rowData?.user_id?.company}
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

  const ActionCell = ({ rowData, dataKey, ...props }) => {
    const mutation = useMutation(updateOrder);
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
                  const payloadBase = {
                    notification: {
                      title: "Your Order is Approved",
                      body: `Your Order ID#${rowData._id} is approved and ready for shipping 😊`,
                      mutable_content: true,
                      sound: "Tri-tone",
                      image:
                        rowData.items[0]?.product_image ||
                        "https://www.everestkitchenpa.com/assets/images/menuShortCuts/momoShortCut.jpg",
                    },
                    data: {
                      title: "Your Order is Approved",
                      image:
                        rowData.items[0]?.product_image ||
                        "https://www.everestkitchenpa.com/assets/images/menuShortCuts/momoShortCut.jpg",
                      message: `Your Order ID#${rowData._id} is approved and ready for shipping 😊`,
                    },
                  };

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
                axios.post(config.endpoints.host + `/notifications`, {
                  message: `Your Order ID#${rowData._id} is Approved ! 😊. Click Here.`,
                  user_email: rowData.user_email,
                  category: "notification",
                  notify_category: "OrderInformation",
                  title: `Order Approved`,
                  data: {
                    imageUrl: rowData.items[0]?.product_image,
                    appUrl: `order/${rowData._id}`,
                  },
                  color: "#32CD32",
                  bgColor: "#FFBF00",
                  priority: 3,
                  isRecent: true,
                  read: false,
                });
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
            success: () => {
              axios.post(config.endpoints.host + `/notifications`, {
                message: `Your Order ID#${rowData._id} is Cancled ! 😓 . Click Here.`,
                user_email: rowData.user_email,
                category: "notification",
                notify_category: "OrderInformation",
                title: "Order Cancled",
                data: {
                  imageUrl: rowData.items[0]?.product_image,
                  appUrl: `order/${rowData._id}`,
                },
                color: "#fd0e35",
                bgColor: "#FFBF00",
                priority: 3,
                isRecent: true,
                read: false,
              });
              try {
                for (const token of rowData.user_id.firebaseFCM) {
                  const payloadBaseCancle = {
                    notification: {
                      title: "Your Order is Cancled",
                      body: `Your Order ID#${rowData._id} is Cancled ! 😓`,
                      mutable_content: true,
                      sound: "Tri-tone",
                      image:
                        rowData.items[0]?.product_image ||
                        "https://cdn-icons-png.flaticon.com/512/391/391045.png",
                    },
                    data: {
                      title: "Your Order is Cancled",
                      image:
                        rowData.items[0]?.product_image ||
                        "https://www.everestkitchenpa.com/assets/images/menuShortCuts/momoShortCut.jpg",
                      message: `Your Order ID#${rowData._id} is Cancled ! 😓`,
                    },
                  };
                  const payload = { ...payloadBaseCancle, to: token };
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
            success: () => {
              axios.post(config.endpoints.host + `/notifications`, {
                message: `Transaction Successdull`,
                user_email: rowData.user_email,
                category: "notification",
              });
            },
            error: <b>Something went wrong!</b>,
          }
        );
      }
    };
    data_refetch();
    const handleOrderDetails = () => {
      navigate(`/dashbord/order/details/${rowData?._id}`, {
        state: { rowData },
      });
    };
    return (
      <Cell {...props}>
        <div className="flex justify-center gap-3">
          <p
            className="text-indigo-500 cursor-pointer font-bold bg-indigo-200 border px-3 py-2 -mt-1 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg"
            onClick={() => handleOrderDetails()}
          >
            Details
          </p>
          {rowData.order_status === 3 ? (
            <p className="text-green-500 font-bold bg-green-200 border cursor-pointer px-6 flex items-center -mt-1 rounded-full hover:text-green-500 hover:bg-green-100 ">
              Paid & Deliverd
            </p>
          ) : rowData?.order_status === 0 ? (
            <>
              <p
                className="text-green-500 cursor-pointer font-bold bg-green-200 border px-3 py-2 -mt-1 hover:text-green-600 hover:bg-green-100 rounded-lg"
                onClick={() => handleUpandInv({ order_status: 1 })}
              >
                Confirm
              </p>
              <button
                onClick={() => handleUpandInv({ order_status: 2 })}
                className="text-red-400 font-bold bg-red-200 border px-3 py-2 -mt-1 hover:text-red-500 hover:bg-red-100 rounded-lg"
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
              <p
                className="text-gray-500 font-bold bg-gray-200 border cursor-pointer px-6 py-2 -mt-1 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
                onClick={() => handleUpandInv({ order_status: 3 })}
              >
                Mark as Deliverd
              </p>
            </>
          )}
        </div>
      </Cell>
    );
  };
  const ActionsCell = ({ rowData, ...props }) => {
    return <Cell {...props}></Cell>;
  };
  const OrderStatusCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center">
          <span>
            {rowData[dataKey] === 3 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-gray-200 text-gray-500">
                Deliverd
              </span>
            ) : rowData[dataKey] === 0 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-yellow-200 text-yellow-500">
                Pending
              </span>
            ) : rowData[dataKey] === 1 ? (
              <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-green-200 text-green-500">
                Shipping
              </span>
            ) : (
              rowData[dataKey] === 2 && (
                <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-red-200 text-red-500">
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
      width: 250,
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
      width: 350,
    },
    {
      key: "order_status",
      label: "Order Status",
      cellRenderer: (props) => (
        <OrderStatusCell {...props} dataKey="order_status" />
      ),
      width: 150,
    },
    // {
    //   key: "pickup_time",
    //   label: "Pickup Time",
    //   cellRenderer: (props) => <TextCell {...props} dataKey="pickup_time" />,
    //   width: 350,
    // },

    {
      key: "actions",
      label: "Actions",
      cellRenderer: (props) => <ActionCell {...props} dataKey="actions" />,
      width: 260,
    },
  ];
  const [columnKeys, setColumnKeys] = useState(
    defaultColumns.map((column) => column.key)
  );

  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = settings.compact ? CompactCell : Cell;
  const CustomHeaderCell = settings.compact ? CompactHeaderCell : HeaderCell;

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
    handleFilterChange(value);
  };

  const pending = data?.data.filter((i) => i.order_status === 0);
  const approved = data?.data.filter((i) => i.order_status === 1);
  const cancled = data?.data.filter((i) => i.order_status === 2);
  const deliverd = data?.data.filter((i) => i.order_status === 3);

  const displayedData =
    currentFilter && mutation_search?.data
      ? // eslint-disable-next-line no-unsafe-optional-chaining
        [...mutation_search?.data?.data]
      : [
          ...(pending || []),
          ...(approved || []),
          ...(cancled || []),
          ...(deliverd || []),
        ];

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

  setTimeout(() => {
    data_refetch();
  }, 30000);

  return (
    <Panel
      header={
        <div>
          <Breadcrumb className="text-sm font-mono">
            <Breadcrumb.Item as={Link} to="/dashbord">
              dashbord / Manage
            </Breadcrumb.Item>
          
            <Breadcrumb.Item active className="text-blue-400">
              orders
            </Breadcrumb.Item>
          </Breadcrumb>
          <h2 className="text-4xl font-bold">Orders</h2>
        </div>
      }
      bordered
    >
      <Toaster />
      <div className="">
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

      <div
        className="mt-5 ml-5"
        style={{ height: settings.autoHeight ? "auto" : 400 }}
      >
        <Table
          virtualized
          shouldUpdateScroll={false}
          rowKey={rowKey}
          loading={status === "loading" ? true : false}
          height={600}
          hover={settings.hover}
          fillHeight={fillHeight}
          showHeader={settings.header}
          data={noData ? [] : displayedData}
          bordered={settings.bordered}
          cellBordered={settings.bordered}
          headerHeight={settings.compact ? 40 : 30}
          rowHeight={settings.compact ? 56 : 30}
          rowExpandedHeight={500}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={renderRowExpanded}
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
      </div>
    </Panel>
  );
}
