import axios from "axios";
import {
  Building,
  CalendarRangeIcon,
  Car,
  ListOrdered,
  User2Icon,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Breadcrumb, Divider, Input, Panel } from "rsuite";
import { config } from "../../../configs/api.config";
import { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { useSelector } from "react-redux";

export const OrderDetails = () => {
  const location = useLocation();
  const data = location.state.rowData;
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState(null);
  useEffect(() => {
    axios
      .get(
        config.endpoints.host +
          `/brand/search?brand_slug=${data.user_id.company_slug}`
      )
      .then((res) => {
        setCompanyInfo(res.data.data[0]);
      });
  }, [data.user_id.company_slug]);

  console.log(data);
  function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };

    return originalDate.toLocaleString("en-US", options);
  }
  const settings = useSelector((state) => state.settings);
  console.log(settings);

  return (
    <div>
      <Panel
        className=""
        header={
          <div>
            <Breadcrumb className="text-sm font-mono">
              <Breadcrumb.Item as={Link} to="/dashbord">
                dashbord
              </Breadcrumb.Item>
              <Breadcrumb.Item as={Link} to="/dashbord/manage/orders">
                orders
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-blue-400">
                orders-details
              </Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-4xl font-bold">Order Details</h2>
            <p className="font-mono mt-2">Details for order id : {data._id}</p>
          </div>
        }
        bordered
      >
        <div>
          <p className="flex gap-2">
            <CalendarRangeIcon size={40} />{" "}
            <div className="flex flex-col gap-1 font-medium font-mono">
              <span>Order Time : {formatDateString(data.createdAt)}</span>
              <span>Pickup Time : {data.pickup_time}</span>
            </div>
          </p>

          <div className="flex gap-2 flex-row-reverse">
            <button
              onClick={() =>
                navigate(`/dashbord/order/details/invoice/${data._id}`, {
                  state: { data: { data, companyInfo } },
                })
              }
              className="p-2 bg-indigo-200 flex gap-2 items-center text-gray-500  font-bold hover:bg-red-100"
            >
              <FaFileInvoice className="text-indigo-500" />
              <span className="text-indigo-500">Invoice</span>
            </button>
            <button
              onClick={() =>
                navigate(`/dashbord/order/details/track/order/${data._id}`, {
                  state: { data },
                })
              }
              className="p-2 flex gap-2 items-center -ml-2 bg-green-200 text-green-500  font-bold hover:bg-green-100"
            >
              <Car className="text-green-500" />{" "}
              <span className="text-green-500">Track Order</span>
            </button>
          </div>
        </div>
        <Divider />
        <Panel>
          <div className="flex justify-evenly gap-52 ">
            <div className="-mt-14">
              {companyInfo?.brand_image ? (
                <img className="" src={companyInfo.brand_image}></img>
              ) : (
                <Building size={40} className="bg-gray-200 p-2 rounded-full" />
              )}
              <div className="flex justify-center flex-col items-center -mt-10">
                <p className={settings.theme === "dark" && "text-black"}>
                  <span className="font-bold "></span>
                  {companyInfo?.brand_label || "loading"}
                </p>

                <p className={settings.theme === "dark" && "text-black mt-1"}>
                  <span className="font-bold font-mono"> </span>
                  <span className="font-bold">
                    {companyInfo?.brand_address || "loading"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <User2Icon size={40} className="bg-gray-200 p-2 rounded-full" />
              <h1 className="font-bold text-lg ">Customer Information</h1>
              <p className="">
                {data.user_id.firstName + " " + data.user_id.lastName}
              </p>
              <p className="-mt-0">{data.user_id.email}</p>
              <p className="-mt-0">{data.user_id.phoneNumber}</p>
              <p
                onClick={() => {
                  navigate(
                    `/dashbord/order/details/${data.user_id.email}/${data._id}`
                  );
                }}
                className="font-bold font-mono text-blue-400 underline -mt-0 cursor-pointer"
              >
                view previous orders
              </p>
            </div>
            <div>
              <ListOrdered size={40} className="bg-gray-200 p-2 rounded-full" />
              <h1 className="font-bold text-lg ">Order Information</h1>
              <p className="mt-1 ">
                <span className="font-bold font-mono">Shipping :</span>
                {data.user_address}
              </p>
              <p className="mt-1">
                {" "}
                <span className="font-bold font-mono">Pay Method : </span>
                <span className="font-bold">CASH</span>
              </p>
              <p className="mt-1">
                {" "}
                <span className="font-bold font-mono flex gap-1">
                  Status :{" "}
                  <p>
                    <span>
                      {data.order_status === 3 ? (
                        <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-gray-200 text-gray-500">
                          Deliverd
                        </span>
                      ) : data.order_status === 0 ? (
                        <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-yellow-200 text-yellow-500">
                          Pending
                        </span>
                      ) : data.order_status === 1 ? (
                        <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-green-200 text-green-500">
                          Shipping
                        </span>
                      ) : (
                        data.order_status === 2 && (
                          <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-red-200 text-red-500">
                            Cancled
                          </span>
                        )
                      )}
                    </span>
                  </p>{" "}
                </span>
              </p>
            </div>
          </div>
        </Panel>
        <Divider />
        <div className="flex gap-2 ">
          <Panel bordered className=" w-2/3">
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <colgroup>
                    <col />
                    <col className="w-32 " />
                    <col className="w-32  " />
                    <col className="w-20" />
                  </colgroup>
                  <thead
                    className={
                      settings.theme === "dark" ? "bg-black" : "bg-gray-300"
                    }
                  >
                    <tr className="text-left">
                      <th
                        className={
                          settings.theme === "dark" ? "text-white" : "p-3 "
                        }
                      >
                        Product
                      </th>
                      <th
                        className={
                          settings.theme === "dark" ? "text-white" : "p-3 "
                        }
                      >
                        Unit Price
                      </th>
                      <th
                        className={
                          settings.theme === "dark" ? "text-white" : "p-3 "
                        }
                      >
                        Quantity
                      </th>
                      <th
                        className={
                          settings.theme === "dark"
                            ? "text-white text-right p-3"
                            : "p-3  text-right"
                        }
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, index) => (
                      <>
                        <tr
                          key={index}
                          className={
                            settings.theme === "dark"
                              ? "border-b border-opacity-20 border-gray-300 bg-black-50 text-white"
                              : "border-b border-opacity-20 border-gray-300 bg-gray-50"
                          }
                        >
                          <td className="p-3">
                            <div className="flex gap-2  items-center">
                              <img
                                src={item.product_image}
                                alt=""
                                width="50px"
                              />

                              <p>{item.product_name}</p>
                            </div>
                          </td>
                          <td className="p-3  ">
                            <p className="ml-4">${item.product_price}</p>
                          </td>
                          <td className="p-3">
                            <p className="ml-5">x{item.product_quantity}</p>
                          </td>
                          <td className="p-3 text-right">
                            <p>${item.product_price * item.product_quantity}</p>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Panel bordered>
              <div>
                <h2 className="   font-medium font-mono text-lg text-right">
                  Sub total : ${data.totalCost}
                </h2>
                <h2 className="   font-medium font-mono text-lg text-right">
                  Shipping cost : ${10}
                </h2>
                <Divider />
                <h2 className=" -mt-0  font-mono font-bold text-lg text-right">
                  Grand total :{" "}
                  <span className="font-bold text-4xl">
                    ${data.totalCost + 10}
                  </span>
                </h2>
                <p className="mt-1 flex justify-end">
                  {" "}
                  <span className="font-bold font-mono flex gap-1">
                    Status :{" "}
                    <p>
                      <span>
                        {data.order_status === 3 ? (
                          <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-gray-200 text-gray-500">
                            Deliverd
                          </span>
                        ) : data.order_status === 0 ? (
                          <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-yellow-200 text-yellow-500">
                            Pending
                          </span>
                        ) : data.order_status === 1 ? (
                          <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-green-200 text-green-500">
                            Shipping
                          </span>
                        ) : (
                          data.order_status === 2 && (
                            <span className="px-5 py-1 font-bold text-xs rounded-full border-1 bg-red-200 text-red-500">
                              Cancled
                            </span>
                          )
                        )}
                      </span>
                    </p>{" "}
                  </span>
                </p>
              </div>
            </Panel>
          </Panel>
          <Panel
            bordered
            className="w-1/3"
            header={
              <h1 className="font-bold text-md">Additional Instruction</h1>
            }
          >
            <Input
              className="-mt-5"
              value={data.additional_information}
              as="textarea"
              rows={6}
              placeholder="Instruction from customer will be shown here"
            />
          </Panel>
        </div>
      </Panel>
    </div>
  );
};
