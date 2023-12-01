/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";
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
  SelectPicker,
  Table,
  TagPicker,
  Toggle,
  toaster,
} from "rsuite";
import { getBrandsIdAndName } from "../../../api/BrandServices";
import { getCategoryByBrandId } from "../../../api/CategoryService";
import {
  deleteProduct,
  filterProduct,
  getProducts,
  searchProduct,
} from "../../../api/ProductService";
import { getSubCategoryByCategoryId } from "../../../api/SubCategoryServices";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}
function HtmlContentRenderer({ htmlContent }) {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}

export default function ProductList() {
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
  const [selectedBrandId, SetSelectedBrandId] = useState("brand");
  const [selectedCatId, SetSelectedCatId] = useState("");
  const [selectedSubCatId, SetSelectedSubCatId] = useState("");
  const { data: brand } = useQuery(
    ["brandsIdName", user.jwt],
    getBrandsIdAndName
  );

  const { data: category_data } = useQuery(
    ["categoryIdName", "", user.jwt, selectedBrandId?.split(",")[0], -1],
    getCategoryByBrandId
  );

  const { data: sub_category_data } = useQuery(
    ["subCategoryIdName", "", user.jwt, selectedCatId?.split(",")[0], -1],
    getSubCategoryByCategoryId
  );
  
  const cate_data = category_data?.data?.map((each) => {
    return { label: each?.category_label, value: each._id+","+each.category_slug  };
  });

  const sub_cat_data = sub_category_data?.data?.map((each) => {
    return { label: each?.subcategory_name, value: each._id};
  });
  
  const brand_data = brand?.data?.map((each) => {
    return { label: each?.name, value: each.id +","+each.slug };
  });

  const brand_f_data = [...(brand_data || [])].map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  const category_f_data = [
    ...(cate_data || [{ label: "No Category", value: "no-category" }]),
  ].map((item) => ({
    label: item?.label,
    value: item?.value,
  }));

  


  const { Column, HeaderCell, Cell } = Table;
  const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
  const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }}>
      <div className="flex justify-center font-bold">{props.children}</div>
    </HeaderCell>
  );

  const TextCell = ({ rowData, icon, dataKey, ...props }) => {
    let PriceIcon = "";
    if (icon) PriceIcon = icon;

    return (
      <Cell {...props}>
        <p
          className={
            PriceIcon
              ? `flex justify-center items-center  font-mono font-bold`
              : `flex justify-center items-center`
          }
        >
          {dataKey === "discount"
            ? rowData[dataKey] + " " + PriceIcon
            : PriceIcon + " " + rowData[dataKey]}
        </p>
      </Cell>
    );
  };
  const AfterDiscountCell = ({ rowData, icon, dataKey, ...props }) => {
    return (
      <Cell {...props}>
        <p className={`flex justify-center items-center`}>{rowData[dataKey]}</p>
      </Cell>
    );
  };

  const NameCell = ({ rowData, ...props }) => {
    return (
      <Cell {...props}>
        <p className="flex justify-center items-center">{rowData.name}</p>
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
              rowData?.product_image ||
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
      navigate("/dashbord/product/edit", { state: { myData: rowData } });
    };
    const handleDelete = () => {
      handleOpen();
      setDeleteId(rowData._id);
    };

    return (
      <Cell {...props}>
        <div className="flex justify-center gap-3">
          <button
            className="text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-red-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-red-500 rounded-lg"
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
      key: "product_image",
      label: "Product Image",
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
      key: "brand_name",
      label: "Brand Name",
      cellRenderer: (props) => <TextCell {...props} dataKey="brand_name" />,
      width: 150,
    },
    {
      key: "category_name",
      label: "Category",
      cellRenderer: (props) => <TextCell {...props} dataKey="category_name" />,
      width: 150,
    },
    {
      key: "subcategory_name",
      label: "Sub Category",
      cellRenderer: (props) => (
        <TextCell {...props} dataKey="subcategory_name" />
      ),
      width: 150,
    },

    {
      key: "price",
      label: "Price",
      cellRenderer: (props) => <TextCell {...props} dataKey="price" icon="$" />,
      width: 100,
    },
    {
      key: "discount",
      label: "Discount",
      cellRenderer: (props) => (
        <TextCell {...props} dataKey="discount" icon="%" />
      ),
      width: 100,
    },
    {
      key: "after_discount",
      label: "After Discount",
      cellRenderer: (props) => (
        <TextCell {...props} dataKey="afterDiscount" icon="$" />
      ),
      width: 150,
    },
    {
      key: "min_purchease",
      label: "Min Purchase",
      cellRenderer: (props) => <TextCell {...props} dataKey="min_purchease" />,
      width: 100,
    },

    {
      key: "max_purchease",
      label: "Max Purchase",
      cellRenderer: (props) => <TextCell {...props} dataKey="max_purchease" />,
      width: 100,
    },
    // {
    //   key: "product_information",
    //   label: "Description",
    //   cellRenderer: (props) => (
    //     <DesCell {...props} dataKey="product_information" />
    //   ),
    //   width: 200,
    // },

    {
      key: "actions",
      label: "Actions",
      cellRenderer: ActionsCell,
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

  const { data, status, refetch, error } = useQuery(
    ["products", page, user.jwt],
    getProducts,
    {
      cacheTime: 0,
    }
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const mutation_delete = useMutation(deleteProduct);
  const handleOk = () => {
    mutation_delete.mutate(
      { id: deleteId, token: user.jwt },
      {
        onSuccess: (data) => {
          toaster.push(
            <Message type="success">Product deleted successfully</Message>
          );
          refetch();
        },
        onError: (error) => {
          toaster.push(<Message type="error">Product delete failed !</Message>);
        },
      }
    );
    setOpen(false);
    refetch();
  };

  const mutation_search = useMutation(searchProduct);
  
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
        queryKey: ["product_search", inputValue, user.jwt],
      }),
      {
        loading: "Searching...",
        success: <b>Product found!</b>,
        error: <b>Product not found in the database!</b>,
      }
    );
  };

  const filter_mutation = useMutation(filterProduct);

  const handleFilterChange = (brand = "", category = "", subcategory = "") => {

    if (brand === "" && category === "" && subcategory === "") {
      refetch();
      return;
    }

    toast.promise(
      filter_mutation.mutateAsync({
        queryKey: ['filter', user.jwt,brand,category,subcategory],
      }),
      {
        loading: "loading...",
        error: <b>Something went wrong !</b>,
      }
    );
  };

  const handleCompanyChange = (value) => {
    if (value === "" || value === null) {
      filter_mutation.reset();
      refetch();
      return;
    }
  
    const brand = value === "" || value === null ? "" : value.split(",")[1];
    handleFilterChange(brand);
  }
  const handleCategoryChange = (value) => {
    if (value === "" || value === null) {
      filter_mutation.reset();
      refetch();
      return;
    }
  
    const category = value === "" || value === null ? "" : value.split(",")[1];
    handleFilterChange(selectedBrandId?.split(",")[1],category);
  }
  const handleSubCategoryChange = (value) => {
  
    if (value === "" || value === null) {
      filter_mutation.reset();
      refetch();
      return;
    }
  
    const subcategory = value;
    console.log(subcategory);
    handleFilterChange(selectedBrandId?.split(",")[1],selectedCatId?.split(",")[1],subcategory);
  }
  const displayedData =
    filter_mutation.data ? [...filter_mutation.data.data ] : isSearching && mutation_search?.data
      ? [...(mutation_search?.data?.data || [])]
      : data?.data || [];

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
  const handleClose = () => setOpen(false);
  refetch();
  return (
    <div>
      <Toaster />
      <Modal open={open} onClose={handleClose}>
        <Modal.Header className="p-5">
          <Modal.Title>Are you sure you want delete this product ?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
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

            <div className="flex flex-col gap-2">
              <div className=" ">
                <InputGroup>
                  <Input
                    placeholder="Search by Product Name"
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
              <div className="flex gap-2">
                <SelectPicker
                  placeholder="filter by brand"
                  searchable={true}
                  size="md"
                  data={brand_f_data}
                  className="w-[12rem] 2xl:w-[14.5rem]"
                  onChange={(value, data) => {
                    SetSelectedBrandId(value);
                    handleCompanyChange(value);
                    
                  }}
                />
                <SelectPicker
                  placeholder="filter by category"
                  searchable={true}
                  size="md"
                  data={category_f_data}
                  className="w-[12rem] 2xl:w-[14.5rem]"
                  onChange={(value, data) => {
                    SetSelectedCatId(value);
                    handleCategoryChange(value)
                  }}
                />
                <SelectPicker
                  placeholder="filter by subcategory"
                  searchable={true}
                  size="md"
                  data={sub_cat_data}
                  className="w-[12rem] 2xl:w-[14.5rem]"
                  onChange={(value, data) => {
                    SetSelectedSubCatId(value);
                    handleSubCategoryChange(data.target.innerHTML);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-5 ml-5"
          style={{ height: autoHeight ? "auto" : 400 }}
        >
          <Table
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
            rowHeight={compact ? 56 : 30}
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
      </div>
    </div>
  );
}
