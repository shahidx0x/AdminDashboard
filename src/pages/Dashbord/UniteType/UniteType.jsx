/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Message,
  Modal,
  SelectPicker,
  Table,
  toaster,
} from "rsuite";

import {
  createUnit,
  createUnitInfo,
  deleteUnit,
  deleteUnitInfo,
  getUnit,
  getUnitInfo,
} from "../../../api/UnitType";
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

export default function UniteType() {
  const user = useSelector((state) => state.user.user);
  const settings = useSelector((state) => state.settings);
  const [expandedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleClose = () => setOpen(false);
  const [unitValue, setUnitValue] = useState(null);
  const [unitLabel, setUnitLabel] = useState(null);
  const handleConfirm = (e) => {
    if (e.target.value === "confirm") {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenUnit = () => {
    setOpen(true);
  };

  const { data, status, refetch } = useQuery(["units", user.jwt], getUnit, {
    cacheTime: 0,
  });

  const {
    data: utinfo,
    refetch: utinfo_refetch,
  } = useQuery(["unit-info", user.jwt], getUnitInfo, {
    cacheTime: 0,
  });

  const unit_type = data?.data.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const mutation_delete = useMutation(deleteUnit);
  const mutation_delete_unitinfo = useMutation(deleteUnitInfo);
  const handleUnitDelete = () => {
    mutation_delete_unitinfo.mutate(
      { deleteId, token: user.jwt },
      {
        onSuccess: () => {
          toaster.push(
            <Message type="success">Unit deleted successfully</Message>
          );
          utinfo_refetch();
        },
        onError: () => {
          toaster.push(<Message type="error">Unit delete failed !</Message>);
        },
      }
    );
    setOpen(false);
    utinfo_refetch();
  };




  const mutation_create = useMutation(createUnit);
  const handleAddUnit = () => {
    mutation_create.mutate(
      { data: { label: unitValue, value: unitValue }, token: user.jwt },
      {
        onSuccess: () => {
          toaster.push(
            <Message type="success">Unit added successfully</Message>
          );
          refetch();
        },
        onError: (error) => {
          console.log(error);
          toaster.push(
            <Message type="error">{error.response.data.message}</Message>
          );
        },
      }
    );
    refetch();
  };
  const mutation_create_unit_info = useMutation(createUnitInfo);
  const handleAddUnitInfo = () => {
    mutation_create_unit_info.mutate(
      { data: { label: unitLabel, quantity: unitValue }, token: user.jwt },
      {
        onSuccess: () => {
          toaster.push(
            <Message type="success">Unit added successfully</Message>
          );
          utinfo_refetch();
        },
        onError: (error) => {
          console.log(error);
          toaster.push(
            <Message type="error">{error.response.data.message}</Message>
          );
        },
      }
    );
    utinfo_refetch();
  };

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );
  const CustomCell = settings.compact ? CompactCell : Cell;
  const CustomHeaderCell = settings.compact ? CompactHeaderCell : HeaderCell;

  const TextCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold">{rowData[dataKey]}</p>
      </Cell>
    );
  };
  const ActionsCell = ({ rowData, ...props }) => {
    const id = rowData?._id;
    const handleOk = () => {
      mutation_delete.mutate(
        { id, token: user.jwt },
        {
          onSuccess: () => {
            toaster.push(
              <Message type="success">Unit deleted successfully</Message>
            );
            refetch();
          },
          onError: () => {
            toaster.push(<Message type="error">Unit delete failed !</Message>);
          },
        }
      );
      refetch();
    };
    return (
      <Cell {...props}>
        <div onClick={handleOk} className="flex justify-center gap-3">
          <div className="text-red-500 border w-36 font-bold border-red-500 px-3 py-2 -mt-1 hover:text-white hover:bg-red-500 rounded-lg cursor-pointer">
            Delete
          </div>
        </div>
      </Cell>
    );
  };
  const UnitActionsCell = ({ rowData, ...props }) => {
    const handleDelete = () => {
      console.log("btn-1");
      setDeleteId(rowData._id);
      handleOpenUnit();
      
    };

    return (
      <Cell {...props}>
        <div onClick={() => handleDelete()} className="flex justify-center gap-3">
          <div className="text-red-500 border w-36 font-bold border-red-500 px-3 py-2 -mt-1 hover:text-white hover:bg-red-500 rounded-lg cursor-pointer">
            Delete
          </div>
        </div>
      </Cell>
    );
  };

  const defaultColumns = [
    {
      key: "label",
      label: "Unit Type",
      cellRenderer: (props) => <TextCell {...props} dataKey="label" />,
      width: 250,
    },
    {
      key: "value",
      label: "Value",
      cellRenderer: (props) => <TextCell {...props} dataKey="quantity" />,
      width: 250,
    },
    {
      key: "action",
      label: "Action",
      cellRenderer: UnitActionsCell,
      width: 250,
    },
  ];

  const defaultColumnsUnit = [
    {
      key: "label",
      label: "Unit Type",
      cellRenderer: (props) => <TextCell {...props} dataKey="label" />,
      width: 140,
    },
    {
      key: "action",
      label: "Action",
      cellRenderer: ActionsCell,
      width: 100,
    },
  ];





  const [columnKeysUnit] = useState(
    defaultColumnsUnit.map((column) => column.key)
  );

  const columnsUnit = defaultColumnsUnit.filter((column) =>
    columnKeysUnit.some((key) => key === column.key)
  );

  const [UnitcolumnKeys] = useState(
    defaultColumns.map((column) => column.key)
  );

  const columnsUnitInfo = defaultColumns.filter((column) =>
    UnitcolumnKeys.some((key) => key === column.key)
  );



  const displayedData = [...(data?.data || [])];
  const displayedDataUnitInfo = [...(utinfo?.data || [])];
  refetch();
  utinfo_refetch();

  return (
    <div>
      <Toaster />
      {/* <Modal open={openUnit} onClose={handleClose}>
        <Modal.Header className="p-5">
          <Modal.Title>
            Are you sure you want delete this unit type ?
          </Modal.Title>
          <div className="flex flex-col gap-2">
            <p className="mt-2">
              All Category and Product will be deleted under this unit
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
            onClick={() => handleOk()}
            className="bg-blue-500 w-20"
            appearance="primary"
          >
            Confirm
          </Button>
          <Button className=" bg-red-500 text-white" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal open={open} onClose={handleClose}>
        <Modal.Header className="p-5">
          <Modal.Title>
            Are you sure you want delete this unit information?
          </Modal.Title>
          <div className="flex flex-col gap-2">
            <p className="mt-2">
              All Category and Product will be deleted under this unit information
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
            onClick={handleUnitDelete}
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

      {/* <TagPicker
        className="h-12"
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      /> */}
      <div className="flex gap-2">
        <div
          className="mt-5 ml-5 flex flex-col gap-2"
          style={{ height: settings.autoHeight ? "auto" : 700 }}
        >
          <div className=" w-[47rem]">
            <Table
              shouldUpdateScroll={true}
              rowKey={rowKey}
              loading={status === "loading" ? true : false}
              height={600}
              hover={settings.hover}
              showHeader={settings.header}
              autoHeight={false}
              data={displayedDataUnitInfo}
              bordered={settings.bordered}
              cellBordered={settings.bordered}
              headerHeight={settings.compact ? 40 : 30}
              rowHeight={50}
              rowExpandedHeight={150}
              expandedRowKeys={expandedRowKeys}
              renderRowExpanded={renderRowExpanded}
            >
              {columnsUnitInfo.map((column) => {
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
        <div className="mt-5 ml-5 flex flex-col gap-2 w-60">
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
            rowHeight={50}
            rowExpandedHeight={150}
            expandedRowKeys={expandedRowKeys}
            renderRowExpanded={renderRowExpanded}
          >
            {columnsUnit.map((column) => {
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
        <div className="mt-5 flex flex-col gap-2">
          <Input
            onChange={(value) => setUnitValue(value)}
            className="w-60"
            placeholder="enter unit type"
          />

          <Button
            onClick={() => handleAddUnit()}
            className="bg-blue-500 w-full font-bold"
            appearance="primary"
          >
            Add Unit Type
          </Button>
          <SelectPicker
            data={unit_type}
            onChange={(value) => setUnitLabel(value)}
            className="w-60"
            placeholder="select unit type"
          />
          <Input
            onChange={(value) => setUnitValue(value)}
            className="w-60"
            placeholder="enter a value"
          />

          <Button
            onClick={() => handleAddUnitInfo()}
            className="bg-blue-500 w-full font-bold"
            appearance="primary"
          >
            Add New Unit
          </Button>
        </div>
      </div>
    </div>
  );
}
