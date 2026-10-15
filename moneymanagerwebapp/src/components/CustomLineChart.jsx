
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { formatCurrency } from "../util/util.js";

const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}`;
};

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-w-48">
            <p className="font-semibold text-gray-800 mb-2">
                Ngày {formatDate(data.date)}
            </p>

            <p className="text-sm font-bold text-violet-700">
                Tổng: {formatCurrency(data.amount)}
            </p>

            <div className="border-t border-gray-200 mt-3 pt-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                    Chi tiết thu nhập:
                </p>

                {data.details?.map((item, index) => (
                    <div
                        key={item.id ?? index}
                        className="flex justify-between gap-4 text-xs mb-2"
                    >
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-700">
                                {item.name}
                            </span>
                            <span className="text-gray-400">
                                {item.categoryName}
                            </span>
                        </div>

                        <span className="font-semibold whitespace-nowrap">
                            {formatCurrency(item.amount)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const CustomLineChart = ({ data = [] }) => {
    return (
        <div className="w-full h-80 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 15, left: 5, bottom: 5 }}
                >
                    <defs>
                        <linearGradient
                            id="incomeGradient"
                            x1="0" y1="0" x2="0" y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#7C3AED"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#7C3AED"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f3f4f6"
                    />

                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                    />

                    <YAxis
                        tickFormatter={(value) =>
                            new Intl.NumberFormat("vi-VN", {
                                notation: "compact"
                            }).format(value)
                        }
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        width={65}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        fill="url(#incomeGradient)"
                        dot={{
                            r: 4,
                            fill: "#7C3AED",
                            stroke: "#ffffff",
                            strokeWidth: 2
                        }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;
