import {formatCurrency} from "../util/util.js";
import CustomPieChart from "./CustomPieChart.jsx";


const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) =>{
    const COLORS=["#59168B", "#a0090e", "#016630"]

    const balanceData = [
        {name : "Total Balance", amount: totalBalance},
        {name : "Total Expense", amount: totalExpense},
        {name : "Total Income", amount: totalIncome}
    ]
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg"></h5>
            </div>

            <CustomPieChart
            data = {balanceData}
            label = "Total Balacne"
            totalAmount={`${formatCurrency(totalBalance)}đ`}
            colors={COLORS}
            showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;