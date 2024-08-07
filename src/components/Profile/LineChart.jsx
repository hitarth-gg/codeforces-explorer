import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import timestamp from "unix-timestamp";
import { ratingColor } from "../../utils/ratingColor";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Rank: ${data.rank}`}</p>
        <p className="label">
          {`Date: ${timestamp
            .toDate(data.ratingUpdateTimeSeconds)
            .toDateString()
            .slice(4)} 
          `}
        </p>
        <p className="intro">{`Contest Name: ${data.contestName}`}</p>
        <p className="delta">{`Delta: ${
          data.newRating >= data.oldRating ? "+" : ""
        } ${data.newRating - data.oldRating}`}</p>
        <p className="desc">{`New Rating: ${data.newRating}`}</p>
        <p className="totalProbs">{`Total Problems solved: ${data?.counts?.total}`}</p>
      </div>
    );
  }

  return null;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Example = () => {
  // const authContext = useAuth();
  const [graphData, setGraphData] = useState([]);

  const data = useSelector((store) => store.user.ratingGraph);
  const correctSubmissions = useSelector(
    (store) => store.user.correctSubmissions,
  );

  if(data.length === 0) throw new Error("No contest data to show here.\n User probably has not participated in any contests yet.");

  // reverse array
  const reversedSubmissions = [...correctSubmissions].reverse();
  const updatedData = data.map((entry) => ({ ...entry })); // Create a shallow copy of each object in data

  const counts = { total: 0 };
  let it = 0;

  for (let i = 0; i < reversedSubmissions.length; i++) {
    if (
      reversedSubmissions[i].creationTimeSeconds <=
      updatedData[it].ratingUpdateTimeSeconds
    ) {
      counts[reversedSubmissions[i].rating] = counts[
        reversedSubmissions[i].rating
      ]
        ? counts[reversedSubmissions[i].rating] + 1
        : 1;
      counts.total += 1;
    } else {
      updatedData[it].counts = { ...counts };
      it++;
      if (it >= updatedData.length) break;
    }
  }

  useEffect(() => {
    const formattedData = updatedData.map((entry) => ({
      ...entry,
      date: timestamp
        .toDate(entry.ratingUpdateTimeSeconds)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
    }));

    setGraphData(formattedData);
  }, [data, correctSubmissions]);

  const [bottomStatDisplay, setBottomStatDisplay] = useState({});
  const fillOp = 1;
  const interval =
    graphData.length > 10 ? Math.floor(graphData.length / 10) : 0;
  // const interval = 10;

  const currentRating = data[data.length - 1].newRating;
  const originalRatingsYAxis = [
    1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000,
  ];
  const defaultRatingsYAxis = originalRatingsYAxis.filter(
    (rating) => rating <= currentRating,
  );
  defaultRatingsYAxis.push(originalRatingsYAxis[defaultRatingsYAxis.length]);

  return (
    <div className="h-96 w-[100%]">
      <div className="font-spaceMono font-medium pb-2 border-b border-[#2e3135]"># Rating v/s Problems Solved Chart</div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="overflow-hidden"
      >
        <LineChart
          width={500}
          height={300}
          onMouseDown={(e) => {
            console.log(e);

            setBottomStatDisplay(e.activePayload[0].payload);
          }}
          // data={data}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <filter id="shadow" height="130%">
              <feDropShadow
                dx="3"
                dy="3"
                stdDeviation="2"
                floodColor="#00000050"
              />
            </filter>
          </defs>

          {/* <CartesianGrid strokeDasharray="2 3" stroke="#403e41" /> */}
          {/* <ReferenceArea y1={0} y2={1200} strokeOpacity={0.3} fill="#bbbbbb" fillOpacity={fillOp}/> */}
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={0}
            y2={1200}
            fill="#cccccc"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={1200}
            y2={1400}
            fill="#77ff77"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={1400}
            y2={1600}
            fill="#77ddbb"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={1600}
            y2={1900}
            fill="#9eb1ff"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={1900}
            y2={2100}
            fill="#e97ee9"
            fillOpacity={fillOp}
          />

          {/* <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 0, left: 20 }}> */}

          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={2100}
            y2={2300}
            fill="#e9ac50"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={2300}
            y2={2400}
            fill="#f7963c"
            fillOpacity={fillOp}
          />
          {/* </ScatterChart> */}

          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={2400}
            y2={2600}
            fill="#e96e6e"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={2600}
            y2={3000}
            fill="#ff3333"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={3000}
            y2={3500}
            fill="#b22323"
            fillOpacity={fillOp}
          />
          <ReferenceArea
            stroke="#54545430"
            strokeWidth={1.3}
            y1={3500}
            fill="#b22323"
            fillOpacity={fillOp}
          />

          <CartesianGrid
            strokeDasharray=""
            stroke="#54545460"
            strokeWidth={1.3}
            horizontal={false}
            strokeOpacity={0.5}
          />

          {/* <XAxis dataKey="counts.total" tick={{ fontSize: 12 }} interval={interval}  tickCount={10}/> */}
          <XAxis
            dataKey="counts.total"
            tick={{ fontSize: 12 }}
            interval={interval}
          />
          <YAxis ticks={defaultRatingsYAxis} tickCount={1} interval={0} fontSize={13} />
          <Tooltip
            layout={"vertical"}
            verticalAlign={"top"}
            wrapperStyle={{ color: "#000", fontSize: 12 }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Line
            type="linear"
            dataKey="newRating"
            // stroke="#ff8b00"
            stroke="#ecbe3f"
            name="Problems Solved"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            // dot={{ stroke: "#b1b1b1", fill: "#666666" }}
            dot={{ stroke: "#ecbe3f", fill: "#fff", r: 3.8, filter: "" }}
            filter="url(#shadow)"
          />
          {/* <Line type="linear" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center font-spaceMono">
        <div className="flex w-full justify-between sm:px-10">
          {bottomStatDisplay.rank && (
            <div className="flex-col justify-start">
              <p className="text-lg font-bold">
                {`Rank: ${bottomStatDisplay.rank}`}
              </p>
              <p className="text-sm">
                {`Date: ${timestamp
                  .toDate(bottomStatDisplay.ratingUpdateTimeSeconds)
                  .toDateString()
                  .slice(4)} 
                `}
              </p>
              <p className="text-sm">
                {`Contest Name: ${bottomStatDisplay.contestName}`}
              </p>
              <p className="text-sm">
                {`Delta: ${
                  bottomStatDisplay.newRating >= bottomStatDisplay.oldRating
                    ? "+"
                    : ""
                } ${bottomStatDisplay.newRating - bottomStatDisplay.oldRating}`}
              </p>
              <p className="text-sm">
                {`New Rating: ${bottomStatDisplay.newRating}`}
              </p>
              <p className="text-sm">
                {`Total Problems solved: ${bottomStatDisplay.counts.total}`}
              </p>
            </div>
          )}
          <div className="flex-col items-center justify-center">
            {bottomStatDisplay.counts ? (
              <div className="mb-2 text-nowrap border border-gray-500 text-center font-spaceMono font-bold">
                Total Problems Solved
              </div>
            ) : (
              <div className="font-spaceMono text-sm">
                Click on the dots to view detailed stats
              </div>
            )
            
            }
            <div className="grid grid-flow-col grid-cols-3 grid-rows-5 gap-x-6 text-nowrap">
              {bottomStatDisplay.counts &&
                Object.keys(bottomStatDisplay.counts).map((key) => {
                  if (key !== "total") {
                    return (
                      <div className="flex gap-x-1 text-sm">
                        {/* <p className={`text-[${ratingColor(key)}]`}>{`${key} :`}</p> */}
                        <p
                        className="font-medium"
                          style={{
                            color: ratingColor(key),
                          }}
                        >{`${key} :`}</p>
                        <p>{`${bottomStatDisplay.counts[key]}`}</p>
                      </div>
                    );
                  }

                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
