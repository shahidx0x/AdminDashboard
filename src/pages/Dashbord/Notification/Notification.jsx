/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Toaster, useToaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Table } from "rsuite";
import { getNotification } from "../../../api/Notification";
const { Column, HeaderCell, Cell } = Table;
const rowKey = "_id";

export default function Notification() {
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
  } = useQuery(["notification", page, user.jwt], getNotification, {
    cacheTime: 0,
  });

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );

  const TextCell = ({ rowData, dataKey, ...props }) => {
    console.log(rowData);
    return (
      <Cell {...props}>
        <div>
          <div className="flex flex-col">
            <p>
              Date : <span>{rowData.date}</span>
            </p>
          </div>
        </div>
        <p className="font-bold font-mono">{rowData[dataKey]}</p>
      </Cell>
    );
  };

  const defaultColumns = [
    {
      key: "notification",
      label: "Notification",
      cellRenderer: (props) => <TextCell {...props} dataKey="message" />,
      width: 500,
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

  const displayedData = [...(data?.data || [])];

  //   const handleLoadMore = () => {
  //     setPage((prevPage) => {
  //       if (prevPage < data?.meta?.total_pages) {
  //         return prevPage + 1;
  //       }
  //       return prevPage;
  //     });
  //     data_refetch();
  //   };

  //   const handleLoadPrevious = () => {
  //     setPage((prevPage) => Math.max(prevPage - 1, 1));
  //     data_refetch();
  //   };

  return (
    <div>
      <Toaster />

      <div className="p-5">
        <div className="flex flex-wrap gap-2 "></div>

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

            <div></div>
            </div> */}
      </div>

      <div
        className=" -mt-10 ml-5 flex flex-col gap-2"
        style={{ height: autoHeight ? "auto" : 700 }}
      >
        <div className=" w-full">
          <Table
            shouldUpdateScroll={true}
            rowKey={rowKey}
            loading={status === "loading" ? true : false}
            height={600}
            hover={hover}
            showHeader={false}
            autoHeight={false}
            data={displayedData}
            bordered={bordered}
            cellBordered={bordered}
            headerHeight={compact ? 40 : 30}
            rowHeight={70}
            rowExpandedHeight={150}
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
      </div> */}
    </div>
  );
}
