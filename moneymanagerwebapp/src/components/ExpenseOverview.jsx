
import { useMemo } from "react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareExpenseLineChartData } from "../util/util.js";
import {Plus} from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense}) => {
    const chartData = useMemo(() => {
        return prepareExpenseLineChartData(transactions);
    }, [transactions]);

    return (
        <div className="card ">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold text-gray-800">
                        Tổng quan chi tiêu
                    </h5>

                    <p className="text-sm text-gray-400 mt-1">
                        Theo dõi và phân tích xu hướng chi tiêu theo thời gian.
                    </p>
                </div>
                <button className="add-btn flex items-center gap-2" onClick={(onAddExpense)}>
                    <Plus size={15} className="text-lg"/> Thêm Chi Tiêu
                </button>
            </div>
            <div className="mt-8 w-full min-w-0">
                {chartData.length > 0 ? (
                    <CustomLineChart data={chartData} />
                ) : (
                    <div className="h-80 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">
                            Chưa có dữ liệu chi tiêu
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseOverview;
