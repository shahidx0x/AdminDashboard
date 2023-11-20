/* eslint-disable react/prop-types */
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import { SearchIcon, Settings } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  Message,
  Table,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import {
  getProducts,
  searchProduct,
  updateProductStatus,
  updateSku,
} from "../../../api/ProductService";
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

export default function Inventory() {
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
  } = useQuery(["products", page, user.jwt], getProducts, {
    cacheTime: 0,
  });

  const update_mutation = useMutation(updateSku);

  const handle_update = (id) => {
    let stock = parseInt(stockValue, 10);
    if (typeof stock !== "number" || stock < 0 || isNaN(stock)) {
      toaster.push(
        <Message type="error">Negetive or empty value not accepted</Message>
      );
    } else {
      update_mutation.mutate(
        { data: { stock: stock }, token: user.jwt, id: id },
        {
          onSuccess: () => {
            toaster.push(
              <Message type="success">stock update successfully</Message>
            );
          },
          onError: (error) => {
            console.log(error);
            toaster.push(
              <Message type="error">stock update failed ! Try Again.</Message>
            );
          },
        }
      );
    }
  };
  const renderRowExpanded = (rowData) => {
    return (
      <div className="w-full rounded-md p-2">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-bold text-md">Udate Product Stock</p>
          </div>
          <div className=" w-80">
            <InputGroup>
              <Input
                onChange={(value) => setStockValue(value)}
                defaultValue={rowData.sku[0].stock}
              />
              <InputGroup.Button>
                <p
                  onClick={() => handle_update(rowData._id)}
                  className="font-bold hover:text-black text-blue-500"
                >
                  UPDATE
                </p>
              </InputGroup.Button>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  };
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

  const TextCellOngoing = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold">
          {rowData[dataKey][0].ongoing}
        </p>
      </Cell>
    );
  };
  const TextCellStock = ({ rowData, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center font-bold">
          {rowData[dataKey][0].stock}
        </p>
      </Cell>
    );
  };
  const ed_mutation = useMutation(updateProductStatus);
  const handle_enable_disable_product = (status, id) => {
    let mutation_data;
    let data;
    if (status == "enable") {
      data = { isDisable: true };
      mutation_data = { data: data, token: user.jwt, id };
    } else if (status == "disable") {
      data = { isDisable: false };
      mutation_data = { data: data, token: user.jwt, id };
    }
    console.log(status, id);
    console.log(mutation_data);
    ed_mutation.mutate(mutation_data, {
      onSuccess: () => {
        toaster.push(<Message type="success">Product Status Updated</Message>);
      },
      onError: (error) => {
        console.log(error);
        toaster.push(
          <Message type="error"> update failed ! Try Again.</Message>
        );
      },
    });
  };
  const ActionsCell = ({ rowData, ...props }) => {
    const handleEnable = () => {
      handle_enable_disable_product("disable", rowData._id);
    };
    const handleDisable = () => {
      handle_enable_disable_product("enable", rowData._id);
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center gap-2">
          {rowData.isDisable ? (
            <p
              className="text-red-500  border px-3 cursor-pointer py-2 -mt-1  rounded-lg"
              onClick={() => handleEnable()}
            >
              Disabled
            </p>
          ) : (
            <p
              type="button"
              onClick={() => handleDisable()}
              className="text-green-500 border px-3 cursor-pointer py-2 -mt-1 rounded-lg"
            >
              Enabled
            </p>
          )}
        </div>
      </Cell>
    );
  };
  const defaultColumns = [
    {
      key: "name",
      label: "Product Name",
      cellRenderer: (props) => <TextCell {...props} dataKey="name" />,
      width: 300,
    },
    {
      key: "brand_name",
      label: "Company",
      cellRenderer: (props) => <TextCell {...props} dataKey="brand_name" />,
      width: 250,
    },
    {
      key: "category_name",
      label: "Category",
      cellRenderer: (props) => <TextCell {...props} dataKey="category_name" />,
      width: 250,
    },
    {
      key: "subcategory_name",
      label: "Subcategory",
      cellRenderer: (props) => (
        <TextCell {...props} dataKey="subcategory_name" />
      ),
      width: 150,
    },

    {
      key: "ongoing",
      label: "Ongoing",
      cellRenderer: (props) => <TextCellOngoing {...props} dataKey="sku" />,
      width: 150,
    },
    {
      key: "stock",
      label: "Stock",
      cellRenderer: (props) => <TextCellStock {...props} dataKey="sku" />,
      width: 150,
    },
    {
      key: "action",
      label: "Action",
      cellRenderer: (props) => <ActionsCell {...props} />,
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

  const { data: search, refetch: search_refetch } = useQuery(
    ["search", inputValue],
    () => searchProduct({ queryKey: ["search", inputValue, user.jwt] }),
    {
      enabled: false,
    }
  );

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

  search_refetch();

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
                <Input
                  placeholder="Search by Product Name"
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
        </div>
      </div>

      <div className="mt-5 ml-5" style={{ height: autoHeight ? "auto" : 700 }}>
        <Table
          shouldUpdateScroll={true}
          rowKey={rowKey}
          loading={status === "loading" ? true : false}
          height={800}
          hover={hover}
          showHeader={showHeader}
          autoHeight={true}
          data={displayedData}
          bordered={bordered}
          cellBordered={bordered}
          headerHeight={compact ? 40 : 30}
          rowHeight={compact ? 56 : 30}
          rowExpandedHeight={100}
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
                pages : {page}/{data?.meta?.total_pages}
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
