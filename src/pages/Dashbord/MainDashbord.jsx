/* eslint-disable react/prop-types */
import { ResponsivePie } from "@nivo/pie";
import { Badge, Divider, Panel, Progress } from "rsuite";

const style = {
  width: 120,
  display: "inline-block",
  marginRight: 10,
};
const data = [
  {
    id: "Android",
    label: "Android",
    value: 99,
    color: "hsl(325, 70%, 50%)",
  },
  {
    id: "Iphone",
    label: "Iphone",
    value: 100,
    color: "hsl(167, 70%, 50%)",
  },
];

export const MainDashbord = () => {
  return (
    <>
      <div className="container">
        <h3 className="text-4xl font-bold p-4">Dashbord</h3>
        <Divider />
        <div className="flex sm:flex-wrap justify-center items-center gap-2">
          <div>
            <Panel className="border w-[20rem] py-10 bg-gradient-to-r from-rose-400 to-red-500">
              <div className="flex flex-col gap-8 justify-between items-center">
                <div className="text-2xl font-bold  text-white">
                  User Registerd
                </div>
                <div className="text-white text-2xl font-bold font-mono">
                  281,358
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <Panel className="border w-[20rem]  py-10 bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="flex flex-col gap-8 justify-between items-center">
                <div className="text-2xl font-bold text-white">
                  Registerd Products
                </div>
                <div className="text-white text-2xl font-bold font-mono">
                  281,358
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <Panel className="border w-[20rem]  py-10 bg-gradient-to-r from-indigo-500 to-blue-500">
              <div className="flex flex-col gap-8 justify-between items-center">
                <div className="text-2xl font-bold text-white">
                  Registerd Company
                </div>
                <div className="text-white text-2xl font-bold font-mono">
                  281,358
                </div>
              </div>
            </Panel>
          </div>
          <div>
            <Panel className="border w-[20rem]  py-10 bg-gradient-to-r from-violet-500 to-purple-500">
              <div className="flex flex-col gap-8 justify-between items-center">
                <div className="text-2xl font-bold text-white">
                  Completed Orders
                </div>
                <div className="text-white text-2xl font-bold font-mono">
                  281,358
                </div>
              </div>
            </Panel>
          </div>
        </div>
        <Divider />
        <h3 className="text-2xl font-bold p-6">Server Status</h3>
        <div className=" flex gap-10 flex-wrap ">
          <div className="flex justify-start hover:shadow-lg items-center ml-4 gap-10 border shadow-sm 2xl:px-20 2xl:py-16 rounded-lg">
            <Badge content={"CPU"}>
              <div style={style}>
                <Progress.Circle
                  percent={100}
                  status="active"
                  strokeColor="#ffc107"
                />
              </div>
            </Badge>
            <Badge content={"Memory"}>
              <div style={style}>
                <Progress.Circle
                  percent={100}
                  status="active"
                  strokeColor="#ffc107"
                />
              </div>
            </Badge>
            <Badge content={"DISK"}>
              <div style={style}>
                <Progress.Circle
                  percent={100}
                  status="active"
                  strokeColor="#ffc107"
                />
              </div>
            </Badge>
          </div>
          <div className="flex  justify-center items-center border shadow-sm hover:shadow-lg  2xl:px-28 2xl:py-16 rounded-lg">
            <MyResponsivePie data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

const MyResponsivePie = ({ data }) => (
  <div className=" h-[20rem] w-[30rem]">
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={2}
      activeOuterRadiusOffset={10}
      borderColor={{
        from: "color",
        modifiers: [["brighter", "0.2"]],
      }}
      arcLinkLabelsSkipAngle={4}
      arcLinkLabelsTextOffset={11}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={1}
      arcLinkLabelsStraightLength={14}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={6}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", "2.1"]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "Android",
          },
          id: "dots",
        },
        {
          match: {
            id: "Iphone",
          },
          id: "dots",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 7,
          translateY: 25,
          itemsSpacing: 5,
          itemWidth: 63,
          itemHeight: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 14,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);
