/* eslint-disable react/prop-types */
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import React, { useState } from "react";
import toast, { Toaster, useToaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { IconButton, Panel, Table } from "rsuite";
import { searchProduct } from "../../../api/ProductService";
import { getTransaction } from "../../../api/TransactionService";
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

const renderRowExpanded = (rowData) => {
  return (
    <>
      <div className="w-full rounded-md p-2 border-2">
        <div>
          <div className="container p-2 mx-auto sm:p-4 text-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="">
                  <tr className="text-left">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Item Bougth</th>
                    <th className="p-3">Issued</th>
                    <th className="p-3">Due</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                    <td className="p-3">
                      <p>{rowData.invoice_id}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-bold ml-8">{rowData.items.length}</p>
                    </td>
                    <td className="p-3">
                      <p>14 Jan 2022</p>
                      <p className="text-gray-600">Friday</p>
                    </td>
                    <td className="p-3">
                      <p>01 Feb 2022</p>
                      <p className="text-gray-600">Tuesday</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Transaction() {
  const toaster = useToaster();
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [page, setPage] = useState(1);
  const [showHeader, setShowHeader] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true);
  const [hover, setHover] = useState(true);
  const user = useSelector((state) => state.user.user);

  const [inputValue, setInputValue] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [stockValue, setStockValue] = useState(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const {
    data,
    status,
    refetch: data_refetch,
  } = useQuery(["transaction", page, user.jwt], getTransaction, {
    cacheTime: 0,
  });
  const { data: search, refetch: search_refetch } = useQuery(
    ["search", inputValue],
    () => searchProduct({ queryKey: ["search", inputValue, user.jwt] }),
    {
      enabled: false,
    }
  );
  const handleExpanded = (rowData) => {
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
        <p className="flex justify-center font-bold">{rowData[dataKey]}</p>
      </Cell>
    );
  };

  const UserInfoCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold">{rowData[dataKey]}</p>
      </Cell>
    );
  };
  const AmountCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center font-bold font-mono">
          $ {rowData["amount"]}
        </p>
      </Cell>
    );
  };
  const CustomerCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <div className="flex flex-col">
          <p className="font-mono font-bold">{rowData["user"]}</p>
          <p className="font-mono">{rowData["email"]}</p>
        </div>
      </Cell>
    );
  };
  const ItemCell = ({ rowData, dataKey, ...props }) => {
    // const item = rowData.items.map((item) => item.product_name).join(", ");

    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold font-mono">
          {rowData["items"].length}
        </p>
      </Cell>
    );
  };

  const defaultColumns = [
    // {
    //   key: "id",
    //   label: "Order Id",
    //   cellRenderer: (props) => <TextCell {...props} dataKey="_id" />,
    //   width: 200,
    // },
    // {
    //   key: "invoice_id",
    //   label: "Invoice Id",
    //   cellRenderer: (props) => <TextCell {...props} dataKey="invoice_id" />,
    //   width: 250,
    // },
    {
      key: "name",
      label: "Reciver Info",
      cellRenderer: (props) => <CustomerCell {...props} dataKey="name" />,
      width: 250,
    },
    {
      key: "items",
      label: "Items",
      cellRenderer: (props) => <ItemCell {...props} dataKey="items" />,
      width: 100,
    },
    {
      key: "delevery_address",
      label: "Delevery Address",
      cellRenderer: (props) => <TextCell {...props} dataKey="address" />,
      width: 500,
    },
    {
      key: "amount",
      label: "Amount",
      cellRenderer: (props) => <AmountCell {...props} dataKey="amount" />,
      width: 150,
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

  // const { data: search, refetch: search_refetch } = useQuery(
  //   ["search", inputValue],
  //   () => searchProduct({ queryKey: ["search", inputValue, user.jwt] }),
  //   {
  //     enabled: false,
  //   }
  // );

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value === "") {
      data_refetch();
      setIsSearching(false);
    } else {
      setIsSearching(true);
      search_refetch();
    }
  };

  const handle_search_button = () => {
    toast.promise(search_refetch(), {
      loading: "Searching...",
      success: <b>Product found!</b>,
      error: <b>Product not found in the database!</b>,
    });
  };

  const displayedData =
    isSearching && search?.data
      ? // eslint-disable-next-line no-unsafe-optional-chaining
        [...(search?.data || [])]
      : [...(data?.data || [])];

  const handleLoadMore = () => {
    setPage((prevPage) => {
      if (prevPage < data?.meta?.total_pages) {
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

  return (
    <div>
      <Toaster />

      <div className="p-5">
        <div className="flex flex-wrap gap-2 ">
          <div className=" w-80 flex justify-center items-center">
            <div>
              <Panel className="border w-[20rem]   hover:bg-gradient-to-l ">
                <div className="flex flex-col gap-8 justify-between items-center">
                  <div className="text-2xl font-bold  text-black underline">
                    Total Sell
                  </div>
                  <div className="text-black text-5xl font-bold font-mono">
                    ${data?.meta.totals.totalSell}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
          <div className=" w-80 flex justify-center items-center">
            <div>
              <Panel className="border w-[20rem]   hover:bg-gradient-to-l ">
                <div className="flex flex-col gap-8 justify-between items-center">
                  <div className="text-2xl font-bold  text-black underline">
                    Today Sell
                  </div>
                  <div className="text-black text-5xl font-bold font-mono">
                    ${data?.meta.totals.totalSell}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
          <div className=" w-80 flex justify-center items-center">
            <div>
              <Panel className="border w-[20rem]   hover:bg-gradient-to-l ">
                <div className="flex flex-col gap-8 justify-between items-center">
                  <div className="text-2xl font-bold  text-black underline">
                    Weekly Sell
                  </div>
                  <div className="text-black text-5xl font-bold font-mono">
                    ${data?.meta.totals.totalSell}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
          <div className=" w-80 flex justify-center items-center">
            <div>
              <Panel className="border w-[20rem]   hover:bg-gradient-to-l ">
                <div className="flex flex-col gap-8 justify-between items-center">
                  <div className="text-2xl font-bold  text-black underline">
                    Monthly Sell
                  </div>
                  <div className="text-black text-5xl font-bold font-mono">
                    ${data?.meta.totals.totalSell}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-3 flex-col 2xl:flex-row 2xl:justify-between">
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
                <Input
                  placeholder="Search by Email Address"
                  onChange={(value) => handleInputChange(value)}
                />
                <InputGroup.Button
                  onClick={() => handle_search_button()}
                  tabIndex={-1}
                >
                  <SearchIcon className="text-indigo-500 font-bold" />
                </InputGroup.Button>
              </InputGroup>
            </div>
          </div>
        </div> */}
      </div>

      <div
        className="mt-5 ml-5 flex flex-col gap-2"
        style={{ height: autoHeight ? "auto" : 700 }}
      >
        <div className=" w-full">
          <Table
            shouldUpdateScroll={true}
            rowKey={rowKey}
            loading={status === "loading" ? true : false}
            height={600}
            hover={hover}
            showHeader={showHeader}
            autoHeight={false}
            data={displayedData}
            bordered={bordered}
            cellBordered={bordered}
            headerHeight={compact ? 40 : 30}
            rowHeight={70}
            rowExpandedHeight={150}
            expandedRowKeys={expandedRowKeys}
            renderRowExpanded={renderRowExpanded}
          >
            {/* <Column width={70} align="center">
              <HeaderCell>#</HeaderCell>
              <ExpandCell
                dataKey="id"
                expandedRowKeys={expandedRowKeys}
                onChange={handleExpanded}
              />
            </Column> */}
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
  );
}
