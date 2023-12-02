/* eslint-disable react/prop-types */

import React, { useState } from "react";
import  { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {  Panel, Table } from "rsuite";

import { getTransaction } from "../../../api/TransactionService";
const { Column, HeaderCell, Cell } = Table;
const rowKey = "_id";


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

  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user.user);
  const settings = useSelector((state) => state.settings);
  const [expandedRowKeys] = useState([]);

  const {
    data,
    status,
    refetch: data_refetch,
  } = useQuery(["transaction", page, user.jwt], getTransaction, {
    cacheTime: 0,
  });

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

  const AmountCell = ({ rowData, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center font-bold font-mono">
          $ {rowData["amount"]}
        </p>
      </Cell>
    );
  };
  const CustomerCell = ({ rowData, ...props }) => {
    return (
      <Cell {...props}>
        <div className="flex flex-col">
          <p className="font-mono font-bold">{rowData["user"]}</p>
          <p className="font-mono">{rowData["email"]}</p>
        </div>
      </Cell>
    );
  };
  const ItemCell = ({ rowData, ...props }) => {
   

    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold font-mono">
          {rowData["items"].length}
        </p>
      </Cell>
    );
  };

  const defaultColumns = [

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
  const [columnKeys] = useState(defaultColumns.map((column) => column.key));
  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = settings.compact ? CompactCell : Cell;
  const CustomHeaderCell = settings.compact ? CompactHeaderCell : HeaderCell;


  const displayedData = [...(data?.data || [])];

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
                  <div
                    className={`text-2xl font-bold  text-black underline ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    Total Sell
                  </div>
                  <div
                    className={`text-black text-5xl font-bold font-mono  ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
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
                  <div
                    className={`text-2xl font-bold  text-black underline ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    Total Sell
                  </div>
                  <div
                    className={`text-black text-5xl font-bold font-mono  ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
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
                  <div
                    className={`text-2xl font-bold  text-black underline ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    Total Sell
                  </div>
                  <div
                    className={`text-black text-5xl font-bold font-mono  ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
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
                  <div
                    className={`text-2xl font-bold  text-black underline ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    Total Sell
                  </div>
                  <div
                    className={`text-black text-5xl font-bold font-mono  ${
                      settings.theme === "dark" && "text-white"
                    }`}
                  >
                    ${data?.meta.totals.totalSell}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>

      
      </div>

      <div
        className="mt-5 ml-5 flex flex-col gap-2"
        style={{ height: settings.autoHeight ? "auto" : 700 }}
      >
        <div className=" w-full">
          <Table
            shouldUpdateScroll={true}
            rowKey={rowKey}
            loading={status === "loading" ? true : false}
            height={600}
            hover={settings.hover}
            showHeader={settings.header}
            autoHeight={false}
            data={displayedData}
            bordered={settings.bordered}
            cellBordered={settings.bordered}
            headerHeight={settings.compact ? 40 : 30}
            rowHeight={70}
            rowExpandedHeight={150}
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
                className={`text-sm ml-3 font-medium leading-none ${
                  settings.theme === "dark" && "text-white"
                } `}
              >
                Previous
              </p>
            </div>
            <div className="sm:flex hidden">
              <p
                className={`text-sm font-bold leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2 ${
                  settings.theme === "dark" && "text-white"
                }`}
              >
                pages : {page}/{data?.meta?.total_page}
              </p>
            </div>
            <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
              <p
                onClick={handleLoadMore}
                className={`text-sm font-medium leading-none mr-3 ${
                  settings.theme === "dark" && "text-white"
                }`}
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
