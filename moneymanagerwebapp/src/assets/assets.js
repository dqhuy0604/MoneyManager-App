import logo from "./logo.png";
import login_bn from "./login_bg.png"
import {Coins, FunnelPlus, LayoutDashboard, List, Wallet} from "lucide-react";

export const assets = {
    logo,
    login_bn,
}

export const SIDE_BAR_DATA = [
    {
        id : "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        name: "Tổng quan",
    },
    {
        id : "02",
        label: "Category",
        icon: List,
        path: "/category",
        name: "Danh mục",
    },
    {
        id : "03",
        label: "Income",
        icon: Wallet,
        path: "/income",
        name: "Thu nhập",
    },
    {
        id : "04",
        label: "Expense",
        icon: Coins,
        path: "/expense",
        name: "Chi tiêu",
    },
    {
        id : "05",
        label: "Filters",
        icon: FunnelPlus,
        path: "/filter",
        name: "Bộ lọc",
    },


]