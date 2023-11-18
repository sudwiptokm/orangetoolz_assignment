import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartDataType } from "../../utils/interface";

type Props = {
  data: ChartDataType[];
};

const LineChartComponent = ({ data }: Props) => {
  return (
    <div className="p-4 relative mb-10 flex-1">
      {/* Line Chart */}
      {data && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart height={300} data={data}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="labels.condition"
              xAxisId={1}
              allowDataOverflow={true}
            />
            <XAxis
              dataKey="labels.humidity"
              xAxisId={0}
              allowDataOverflow={true}
              tickLine={false}
              axisLine={false}
              tickSize={10}
            />
            <XAxis
              dataKey="labels.windSpeed"
              xAxisId={2}
              tickLine={false}
              axisLine={false}
              tickSize={10}
            />
            <XAxis
              dataKey="labels.time"
              xAxisId={3}
              tickLine={false}
              axisLine={false}
              tickSize={10}
              orientation="top"
              label={{ color: "white" }}
            />
            <YAxis domain={["dataMin-2", "dataMax"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="absolute inset-0 bg-black/60 shadow-lg rounded-md -z-50"></div>
    </div>
  );
};

export default LineChartComponent;
