import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {formatCurrency} from "../util/util.js";
import InfoCard from "../components/InfoCard.jsx";
import {Coins, Wallet, WalletCards} from "lucide-react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const [ dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(dashboardData);
    const fetchDashboardData = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINT.DASHBOARD_DATA)
            if(response.status === 200){
                setDashboardData(response.data);
            }
            console.log(dashboardData)
        }catch (error){
            console.error("Lỗi khi tải dữ liệu trang chủ",error);
            toast.error("Lỗi trang chủ")
        }finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchDashboardData();
        return () =>{};
    }, []);


    return(
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCards />}
                            label="Tổng thu chi"
                            value={formatCurrency(dashboardData?.totalBalance || 0)}
                            color="bg-purple-800"
                        />
                        <InfoCard
                            icon={<Wallet />}
                            label="Tổng thu nhập"
                            value={formatCurrency(dashboardData?.totalIncome || 0)}
                            color="bg-green-800"
                        />
                        <InfoCard
                            icon={<Coins />}
                            label="Tổng chi tiêu"
                            value={formatCurrency(dashboardData?.totalExpense || 0)}
                            color="bg-red-800"
                        />

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                        />

                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Chi Tiêu Gần Đây"
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Thu Nhập Gần Đây"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
export default Home;