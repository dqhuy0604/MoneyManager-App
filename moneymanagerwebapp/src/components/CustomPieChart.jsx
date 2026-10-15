import {PieChart, Pie, Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

import CustomLegend from "./CustomLegend.jsx";
import {formatCurrency} from "../util/util.js";


const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor = false}) => {
    const chartData = data.map(item => ({
        ...item,
        amount: Math.max(0, Number(item.amount) || 0)
    }));

    return (
        <div className="w-full h-[450px] relative">

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={120}
                        outerRadius={155}
                        paddingAngle={1}
                        stroke="none"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                            fontSize: "13px"
                        }}
                    />

                    <Legend
                        content={<CustomLegend />}
                        verticalAlign="bottom"
                        align="center"
                    />

                </PieChart>
            </ResponsiveContainer>

            {showTextAnchor && (
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">

                    <p className="text-base font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="text-2xl font-bold text-gray-900 mt-1">
                        {totalAmount}
                    </p>

                </div>
            )}

        </div>
    );
};

export default CustomPieChart;