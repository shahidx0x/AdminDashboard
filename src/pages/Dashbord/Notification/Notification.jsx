/* eslint-disable react/prop-types */

import axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { Toaster, useToaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Table } from "rsuite";
import { getNotification } from "../../../api/Notification";
import { config } from "../../../configs/api.config";
const { Column, HeaderCell, Cell } = Table;
const rowKey = "_id";

export default function Notification() {
  const toaster = useToaster();
  const [compact, setCompact] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [page, setPage] = useState(1);
  const [autoHeight, setAutoHeight] = useState(true);
  const [hover, setHover] = useState(true);
  const user = useSelector((state) => state.user.user);

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
    const originalDate = rowData.date;
    const serverMoment = moment(originalDate);
    const localTime = serverMoment.tz("America/New_York");

    return (
      <Link to={rowData.link ? rowData.link : "/dashbord/user-table"}>
        <Cell
          onClick={() => {
            axios
              .patch(config.endpoints.host + `/notifications/${rowData._id}`, {
                isRecent: false,
                read: true,
              })
              .then((res) => console.log(res.data));
          }}
          className={
            rowData.isRecent && !rowData.read
              ? "bg-indigo-500 text-white font-mono font-bold rounded-lg "
              : "bg-gray-100 border-b-indigo-200 text-gray-500 font-mono rounded-lg border-1 font-bold"
          }
          {...props}
        >
          <div>
            <div className="flex flex-col">
              <span className={rowData.isRecent && !rowData.read && "hidden"}>
                {localTime.format("YYYY-MM-DD hh:mm:ss A")}
              </span>
              <Badge
                className={
                  rowData.isRecent && !rowData.read
                    ? "flex mr-10 mt-2"
                    : "hidden"
                }
                color="green"
                content="Recent"
              >
                <span className="">
                  {localTime.format("YYYY-MM-DD hh:mm:ss A")}
                </span>
              </Badge>
            </div>
          </div>

          <p className=" font-sans">{rowData[dataKey]}</p>
        </Cell>
      </Link>
    );
  };

  const defaultColumns = [
    {
      key: "notification",
      label: "Notification",
      cellRenderer: (props) => <TextCell {...props} dataKey="message" />,
      width: 775,
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
  data_refetch();
  return (
    <div>
      <Toaster />

      <div className="p-5">
        <div className="flex flex-wrap gap-2 "></div>
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
            hover={false}
            showHeader={true}
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
    </div>
  );
}
