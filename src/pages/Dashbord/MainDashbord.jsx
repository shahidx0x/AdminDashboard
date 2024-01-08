/* eslint-disable react/prop-types */
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {  FlexboxGrid, Panel } from "rsuite";
import { getInventoryStatus } from "../../api/DashbordService";
import Notification from "./Notification/Notification";


// const style = {
//   width: 120,
//   display: "inline-block",
//   marginRight: 10,
//   marginLeft: 20,
// };

export default function MainDashbord() {
  const user = useSelector((state) => state.user.user);
  // const { data: server_data, refetch } = useQuery(
  //   ["server-status", user.jwt],
  //   getServerStatus,
  //   {
  //     refetchInterval: 5000,
  //     staleTime: 0,
  //   }
  // );
  // const { data: users_device } = useQuery(
  //   ["users-device", user.jwt],
  //   getUsersDevice
  // );

  const { data: inventory_status } = useQuery(
    ["inventory-status", user.jwt],
    getInventoryStatus
  );

  // const data = [
  //   {
  //     id: "Android",
  //     label: "Android",
  //     value: users_device?.android_user + 10,
  //     color: "hsl(325, 70%, 50%)",
  //   },
  //   {
  //     id: "Iphone",
  //     label: "Iphone",
  //     value: users_device?.ios_user + 10,
  //     color: "hsl(167, 70%, 50%)",
  //   },
  // ];
  // refetch();

  return (
    <Panel>
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={12}>
          {" "}
          <h3 className="text-2xl font-bold p-6">Notification</h3>
          <Notification />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <h3 className="text-2xl font-bold p-6">Summary</h3>

          <div className="ml-5">
            <div className="flex gap-5 flex-wrap">
              <div>
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
                  <img
                    src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
                  />
                  <div className="space-y-4 text-center divide-y divide-gray-300">
                    <div className="my-2 space-y-1">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Users
                      </h2>
                    </div>

                    <h2 className="text-xl">
                      {inventory_status?.meta.totalUsers}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
                  />
                  <div className="space-y-4 text-center divide-y divide-gray-300">
                    <div className="my-2 space-y-1">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Products
                      </h2>
                    </div>

                    <h2 className="text-xl">
                      {inventory_status?.meta.totalProducts}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
                  <img
                    src="https://icon-library.com/images/corporate-icon-png/corporate-icon-png-8.jpg"
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
                  />
                  <div className="space-y-4 text-center divide-y divide-gray-300">
                    <div className="my-2 space-y-1">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Company
                      </h2>
                    </div>
                    <h2 className="text-xl">
                      {inventory_status?.meta.totalCompany}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
                  <img
                    src="https://icon-library.com/images/new-order-icon/new-order-icon-21.jpg"
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full  aspect-square"
                  />
                  <div className="space-y-4 text-center divide-y divide-gray-300">
                    <div className="my-2 space-y-1">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        Orders
                      </h2>
                    </div>
                    <h2 className="text-xl">
                      {inventory_status?.meta.totalCompany}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
}

// const MyResponsivePie = ({ data }) => (
//   <div className=" h-[20rem] w-[30rem]">
//     <ResponsivePie
//       data={data}
//       margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//       innerRadius={0.5}
//       padAngle={2}
//       activeOuterRadiusOffset={10}
//       borderColor={{
//         from: "color",
//         modifiers: [["brighter", "0.2"]],
//       }}
//       arcLinkLabelsSkipAngle={4}
//       arcLinkLabelsTextOffset={11}
//       arcLinkLabelsTextColor="#333333"
//       arcLinkLabelsOffset={1}
//       enableArcLabels={false}
//       arcLinkLabelsStraightLength={14}
//       arcLinkLabelsThickness={2}
//       arcLinkLabelsColor={{ from: "color" }}
//       arcLabelsSkipAngle={6}
//       arcLabelsTextColor={{
//         from: "color",
//         modifiers: [["darker", "2.1"]],
//       }}
//       defs={[
//         {
//           id: "dots",
//           type: "patternDots",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           size: 4,
//           padding: 1,
//           stagger: true,
//         },
//         {
//           id: "lines",
//           type: "patternLines",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           rotation: -45,
//           lineWidth: 6,
//           spacing: 10,
//         },
//       ]}
//       fill={[
//         {
//           match: {
//             id: "Android",
//           },
//           id: "dots",
//         },
//         {
//           match: {
//             id: "Iphone",
//           },
//           id: "dots",
//         },
//       ]}
//       legends={[
//         {
//           anchor: "bottom",
//           direction: "row",
//           justify: false,
//           translateX: 7,
//           translateY: 25,
//           itemsSpacing: 5,
//           itemWidth: 63,
//           itemHeight: 10,
//           itemTextColor: "#999",
//           itemDirection: "left-to-right",
//           itemOpacity: 1,
//           symbolSize: 14,
//           symbolShape: "circle",
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemTextColor: "#000",
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   </div>
// );
{
  /* <div className="  ">
          <div className="flex flex-wrap  2xl:p-0 justify-start hover:shadow-lg items-center ml-4 gap-2 border-2 2xl:w-[80%] shadow-sm  rounded-lg">
            <div className="mt-5 2xl:mt-0">
              <Badge content={"CPU"}>
                <div style={style}>
                  <Progress.Circle
                    percent={server_data?.cpuUsage || 0}
                    status="active"
                    strokeColor="#03fc0b"
                  />
                </div>
              </Badge>
              <Badge content={"Memory"}>
                <div style={style}>
                  <Progress.Circle
                    percent={server_data?.memoryUsage || 0}
                    status="active"
                    strokeColor="#4454fc"
                  />
                </div>
              </Badge>
              <Badge content={"Disk"}>
                <div style={style}>
                  <Progress.Circle
                    percent={server_data?.diskUsage || 0}
                    status="active"
                    strokeColor="#c016f0"
                  />
                </div>
              </Badge>
            </div>
            <MyResponsivePie className="" data={data} />
          </div>
        </div> */
}
{
  /* <div>
<Panel className="border  py-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-indigo-500 hover:delay-75 hover:animate-pulse">
  <div className="flex flex-col gap-8 justify-between items-center">
    <div className="text-2xl font-bold text-white">
      Registerd Products
    </div>
    <div className="text-white text-5xl font-bold font-mono">
      {inventory_status?.meta.totalProducts}
    </div>
  </div>
</Panel>
</div>
<div>
<Panel className="border   py-10 bg-gradient-to-r from-indigo-500 to-blue-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-indigo-500 hover:delay-75 hover:animate-pulse">
  <div className="flex flex-col gap-8 justify-between items-center">
    <div className="text-2xl font-bold text-white">
      Registerd Company
    </div>
    <div className="text-white text-5xl font-bold font-mono">
      {inventory_status?.meta.totalCompany}
    </div>
  </div>
</Panel>
</div>
<div>
<Panel className="border py-10 bg-gradient-to-r from-violet-500 to-purple-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-indigo-500 hover:delay-75 hover:animate-pulse">
  <div className="flex flex-col gap-8 justify-between items-center">
    <div className="text-2xl font-bold text-white">
      Completed Orders
    </div>
    <div className="text-white text-5xl font-bold font-mono">
      0
    </div>
  </div>
</Panel>
</div> */
}
{
  /* <Panel className="border  py-10 bg-gradient-to-r from-rose-400 to-red-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-indigo-500 hover:delay-75 hover:animate-pulse">
<div className="flex flex-col gap-8 justify-between items-center">
  <div className="text-2xl font-bold  text-white">
    User Registerd
  </div>
  <div className="text-white text-5xl font-bold font-mono">
    {inventory_status?.meta.totalUsers}
  </div>
</div>
</Panel>
<Panel className="border  py-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l hover:from-blue-400 hover:to-indigo-500 hover:delay-75 hover:animate-pulse">
<div className="flex flex-col gap-8 justify-between items-center">
  <div className="text-2xl font-bold text-white break-word whitespace-normal ">
    Registerd Products
  </div>
  <div className="text-white text-5xl font-bold font-mono">
    {inventory_status?.meta.totalProducts}
  </div>
</div>
</Panel> */
}
