import React, { useEffect, useState } from "react";
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
import { useAuth } from "../../Auth/AuthContext";

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
          data.newRating >= data.oldRating ? "+" : "-"
        } ${data.newRating - data.oldRating}`}</p>
        <p className="desc">{`New Rating: ${data.newRating}`}</p>
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
  const authContext = useAuth();
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    const formattedData = authContext.userRatingGraph.map((entry) => ({
      ...entry,
      date: timestamp
        .toDate(entry.ratingUpdateTimeSeconds)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
    }));

    setGraphData(formattedData);
  }, [authContext.userRatingGraph]);

  const fillOp = 1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
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
            <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#00000050" />
          </filter>
        </defs>

        {/* <CartesianGrid strokeDasharray="2 3" stroke="#403e41" /> */}
        {/* <ReferenceArea y1={0} y2={1200} strokeOpacity={0.3} fill="#bbbbbb" fillOpacity={fillOp}/> */}
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={0} y2={1200} fill="#cccccc" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={1200} y2={1400}  fill="#77ff77" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={1400} y2={1600} fill="#77ddbb" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={1600} y2={1900} fill="#9eb1ff" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={1900} y2={2100} fill="#e97ee9" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={2100} y2={2400} fill="#e9ac50" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={2400} y2={2600} fill="#e96e6e" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={2600} y2={3000} fill="#ff3333" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={3000} y2={3500} fill="#b22323" fillOpacity={fillOp}/>
        <ReferenceArea stroke="#54545430" strokeWidth={1.3} y1={3500} fill="#b22323" fillOpacity={fillOp}/>

        <CartesianGrid strokeDasharray="" stroke="#54545460" strokeWidth={1.3} horizontal={false} strokeOpacity={.5} />


        <XAxis dataKey="date" tick={{ fontSize: 12 }}  />
        <YAxis />
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
          strokeWidth={2}
          activeDot={{ r: 6 }}
          // dot={{ stroke: "#b1b1b1", fill: "#666666" }}
          dot={{ stroke: "#ecbe3f", fill: "#fff", r: 4, filter:"" }}
          filter="url(#shadow)"
        />
        {/* <Line type="linear" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
