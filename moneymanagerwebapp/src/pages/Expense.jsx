import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show : false,
        data : null,
    });
    console.log(expenseData);

    const fetchExpenseDetails = async () =>{
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_EXPENSES);
            if(response.status === 200){
                console.log('Expense categories', response.data);
                setExpenseData(response.data);
            }
        }catch (error){
            console.error("Tải dữ liệu chi tiêu thất bại",error);
            toast.error(error.response?.data?.message || "Tải dữ liệu chi tiêu thất bại")
        }finally {
            setLoading(false);
        }
    }

    const fetchExpenseCategories = async () =>{
        try{
            const response = await axiosConfig.get(API_ENDPOINT.CATEGORY_BY_TYPE("expense"))
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch(error){
            console.log('Failed to fetch expense categories', error);
            toast.error(error.data?.message || "Failed to fetch expense categories")
        }
    }

    const handleAddExpense = async (expense) =>{
        const {name, amount, date, icon, categoryId} = expense;

        if(!name.trim()){
            toast.error("Vui lòng nhập thêm nguồn chi tiêu");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <=0){
            toast.error("Số tiền chưa hợp lệ, vui lòng nhập lại");
            return;
        }

        if(!date){
            toast.error("Vui lòng chọn ngày");
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        if(date > today){
            toast.error('Không thể nhập ngày chưa đến!')
            return;
        }
        if(!categoryId){
            toast.error("Vui lòng chọn danh mục");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINT.ADD_EXPENSE,{
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })
            if(response.status === 201){
                setOpenAddExpenseModal(false);
                toast.success("Thêm chi tiêu thành công");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        }catch (error){
            console.log("Thêm chi tiêu thất bại",);
            toast.error(error.response?.data?.message || "Thêm chi tiêu thất bại");

        }

    }

    const deleteExpense = async (id) =>{
        try {
            await axiosConfig.delete(API_ENDPOINT.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Chi tiêu đã được xóa thành công");
            fetchExpenseDetails();
        }catch(error) {
            console.log('Xóa chi tiêu thất bại', error);
            toast.error(error.response?. data?.message || "Xóa chi tiêu thất bại");
        }
    }

    const handleDownLoadExpenseDetails = async () =>{
        try{
            const response = await axiosConfig.get(API_ENDPOINT.EXPENSE_EXCEL_DOWNLOAD, {responseType :"blob"});
            let filename = "expense_details.xlxs";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Tải xuống chi tiết chi tiêu thành công");
        }catch (error){
            console.error('Tải xuống chi tiết chi tiêu thất bại', error);
            toast.error(error.response?.data?.message || "Tải xuống chi tiết chi tiêu thất bại");

        }

    }

    const handleEmailExpenseDetails = async () => {

        try{
            const response = await axiosConfig.get(API_ENDPOINT.EMAIL_EXPENSE);
            if(response.data === 200){
                toast.success("Chi tiết chi tiêu đã được gửi qua mail thành công")
            }
        }catch (error){
            console.error("Gửi chi tiết chi tiêu qua mail thất bại",error);
            toast.error(error.response?.data?.message || "Gửi chi tiết chi tiêu qua mail thất bại")
        }
    }


    useEffect(() =>{
        fetchExpenseDetails();
        fetchExpenseCategories()
    }, []);

    return(
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)}/>
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload = {handleDownLoadExpenseDetails}
                        onEmail = {handleEmailExpenseDetails}
                    />

                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() =>setOpenAddExpenseModal(false)}
                        title="Thêm chi tiêu"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show :false, data: null})}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Bạn có chắc là muốn xóa cái chi tiêu này không?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}
export default Expense;