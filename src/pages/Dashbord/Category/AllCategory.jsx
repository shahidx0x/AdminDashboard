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
  Button,
  Dropdown,
  Input,
  InputGroup,
  Message,
  Modal,
  Table,
  TagPicker,
  Toggle,
  useToaster,
} from "rsuite";
import { deleteCategory, getAllCategory } from "../../../api/CategoryService";

export default function AllCategory() {
  const [loading, setLoading] = useState(false);
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

  const [search, setSearch] = useState(false);
  const toaster = useToaster();

  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;

  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );

  const { data, status, refetch } = useQuery(
    ["category", page, user.jwt],
    getAllCategory,
    {
      cacheTime: 0, // Data is not cached
    }
  );

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const mutation_delete = useMutation(deleteCategory);
  const handleOk = () => {
    mutation_delete.mutate(
      { deleteId, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Category deleted successfully</Message>
          );
          refetch();
          setOpen(false);
        },
        onError: (error) => {
          console.log(error.response);
          toaster.push(
            <Message type="error">Category delete failed !</Message>
          );
        },
      }
    );
    refetch();
  };
  const handleClose = () => setOpen(false);

  const GenericCell = ({ content, ...props }) => (
    <Cell {...props}>
      <p className="flex justify-center items-center">{content}</p>
    </Cell>
  );

  const ProductCountCell = ({ content, rowData, ...props }) => (
    <Cell {...props}>
      <p className="flex justify-center items-center font-bold">
        {rowData.productCount}
      </p>
    </Cell>
  );
  const ImageCell = ({ rowData, ...props }) => (
    <Cell {...props}>
      <div className="flex justify-center -mt-2">
        <Avatar
          src={
            rowData?.image || "https://avatars.githubusercontent.com/u/12592949"
          }
          alt="P"
        />
      </div>
    </Cell>
  );

  const CategoryNameCell = ({ rowData, ...props }) => {
    const handleSubCategories = () => {
      navigate(
        `/dashbord/subcategory/list/${rowData?.category_label}/${rowData?._id}`,
        { state: { rowData } }
      );
    };

    return (
      <Cell {...props}>
        <p
          onClick={handleSubCategories}
          className="flex justify-center items-center text-blue-500 underline cursor-pointer font-bold hover:underline hover:cursor-pointer"
        >
          {rowData?.category_label}
        </p>
      </Cell>
    );
  };

  const ActionsCell = ({ rowData, ...props }) => {
    const handleDelete = () => {
      handleOpen();
      setDeleteId(rowData._id);
    };
    const handleEdit = () => {
      navigate("/dashbord/category/edit", { state: { myData: rowData } });
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-red-500 border px-3 py-2 -mt-1 rounded-lg hover:text-white hover:bg-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Cell>
    );
  };

  const defaultColumns = [
    {
      key: "image",
      label: "Brand Image",
      cellRenderer: ImageCell,
      width: 100,
    },
    // {
    //   key: "brand_id",
    //   label: "Brand Id",
    //   cellRenderer: (props) => (
    //     <GenericCell {...props} content={props.rowData?.brand_id} />
    //   ),
    //   width: 200,
    // },

    // {
    //   key: "_id",
    //   label: "Category Id",
    //   cellRenderer: (props) => (
    //     <GenericCell {...props} content={props.rowData?._id} />
    //   ),
    //   width: 200,
    // },
    {
      key: "category_label",
      label: "Brand Name",
      cellRenderer: CategoryNameCell,
      width: 200,
    },
    {
      key: "product_count",
      label: "Product Count",
      cellRenderer: ProductCountCell,
      width: 200,
    },

    {
      key: "category_label",
      label: "Category Count",
      cellRenderer: (props) => (
        <GenericCell
          {...props}
          content={props.rowData?.subCategories.length || 0}
          className="font-bold"
        />
      ),
      width: 150,
    },
    {
      key: "brand_name",
      label: "Company Name",
      cellRenderer: (props) => (
        <GenericCell {...props} content={props.rowData?.brand_name} />
      ),
      width: 250,
    },

    {
      key: "actions",
      label: "Actions",
      cellRenderer: ActionsCell,
      width: 200,
    },
  ];

  const mutation_search = useMutation(getAllCategory);

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
        queryKey: ["user_search", page, user.jwt, inputValue],
      }),
      {
        loading: "Searching...",
        success: <b>Category found!</b>,
        error: <b>Category not found in the database!</b>,
      }
    );
  };

  const displayedData =
    isSearching && mutation_search?.data?.data[0]
      ? [mutation_search?.data?.data[0]]
      : data?.data;

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
      if (prevPage < data?.meta?.total_pages) {
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
  const [confirm, setConfirm] = useState(false);
  const handleConfirm = (e) => {
    if (e.target.value === "confirm") {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };
  const settings = useSelector(state => state.settings);
  return (
    <div>
      <Toaster />
      <Modal open={open} onClose={handleClose}>
        <Modal.Header className="p-5">
          <Modal.Title className="font-bold font-mono">
            Are you sure ?
          </Modal.Title>
          <div className="flex flex-col gap-2">
            <p>
              All subcategory and product under this category will be deleted !
            </p>
            <Input
              className="border-red-300"
              onChange={(value, event) => handleConfirm(event)}
              placeholder="Type 'confirm' to delete"
            />
          </div>
        </Modal.Header>

        <Modal.Footer>
          <Button
            disabled={confirm ? false : true}
            onClick={handleOk}
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
      <div>
        <hr />
        <div className="p-5">
          <div className="flex flex-col 2xl:flex-row gap-3 2xl:justify-between">
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
              <div className=" ">
                <InputGroup>
                  <Input
                    placeholder="Search by Category Name"
                    onChange={(value) => handleInputChange(value)}
                  />
                  <InputGroup.Button
                    onClick={() => handleButtonClick()}
                    tabIndex={-1}
                  >
                    <SearchIcon className="text-indigo-500 font-bold" />
                  </InputGroup.Button>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div
          className="mt-5 ml-4"
          style={{ height: settings.autoHeight ? "auto" : 400 }}
        >
          <Table
            loading={status === "loading" ? true : false}
            height={300}
            hover={settings.hover}
            fillHeight={fillHeight}
            showHeader={settings.header}
            autoHeight={settings.autoHeight}
            data={noData ? [] : displayedData}
            bordered={settings.bordered}
            cellBordered={settings.bordered}
            headerHeight={settings.compact ? 40 : 30}
            rowHeight={settings.compact ? 56 : 30}
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
                    pages : {page}/{data?.meta?.total_pages}
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
