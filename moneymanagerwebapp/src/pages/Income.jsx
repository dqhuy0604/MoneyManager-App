import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show : false,
        data : null,
    });
    console.log(incomeData);

    const fetchIncomeDetails = async () =>{
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_INCOMES);
            if(response.status === 200){
                console.log('income categories', response.data);
                setIncomeData(response.data);
            }
        }catch (error){
            console.error("Tải dữ liệu thu nhập thất bại",error);
            toast.error(error.response?.data?.message || "Tải dữ liệu thu nhập thất bại")
        }finally {
            setLoading(false);
        }
    }

    const fetchIncomeCategories = async () =>{
        try{
            const response = await axiosConfig.get(API_ENDPOINT.CATEGORY_BY_TYPE("income"))
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch(error){
            console.log('Failed to fetch income categories', error);
            toast.error(error.data?.message || "Failed to fetch income categories")
        }
    }

     const handleAddIncome = async (income) =>{
        const {name, amount, date, icon, categoryId} = income;

        if(!name.trim()){
            toast.error("Vui lòng nhập thêm nguồn thu nhập");
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
            const response = await axiosConfig.post(API_ENDPOINT.ADD_INCOME,{
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            })
            if(response.status === 201){
                setOpenAddIncomeModal(false);
                toast.success("Thêm thu nhập thành công");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        }catch (error){
            console.log("Lỗi thêm thu nhập",);
            toast.error(error.response?.data?.message || "Thêm thu nhập thất bại");

        }

     }

     const deleteIncome = async (id) =>{
         try {
             await axiosConfig.delete(API_ENDPOINT.DELETE_INCOME(id));
             setOpenDeleteAlert({show: false, data: null});
             toast.success("Thu nhập đã được xóa thành công");
             fetchIncomeDetails();
         }catch(error) {
             console.log('Xóa thu nhật thất bại', error);
             toast.error(error.response?. data?.message || "Xóa thu nhật thất bại");
         }
     }

     const handleDownLoadIncomeDetails = async () =>{
        try{
           const response = await axiosConfig.get(API_ENDPOINT.INCOME_EXCEL_DOWNLOAD, {responseType :"blob"});
           let filename = "income_details.xlxs";
           const url = window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement("a");
           link.href = url;
           link.setAttribute("download", filename);
           document.body.appendChild(link);
           link.click();
           link.parentNode.removeChild(link);
           window.URL.revokeObjectURL(url);
           toast.success("Tải xuống chi tiết thu nhập thành công");
        }catch (error){
            console.error('Tải xuống chi tiết thu nhập thất bại', error);
            toast.error(error.response?.data?.message || "Tải xuống chi tiết thu nhập thất bại");

        }

     }

     const handleEmailIncomeDetails = async () => {

        try{
            const response = await axiosConfig.get(API_ENDPOINT.EMAIL_INCOME);
            if(response.data === 200){
                toast.success("Chi tiết thu nhập đã được gửi qua mail thành công")
            }
        }catch (error){
            console.error("Gửi chi tiết thu nhập qua mail thất bại",error);
            toast.error(error.response?.data?.message || "Gửi chi tiết thu nhập qua mail thất bại")
        }
     }


    useEffect(() =>{
        fetchIncomeDetails();
        fetchIncomeCategories()
    }, []);

    return(
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)}/>
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload = {handleDownLoadIncomeDetails}
                        onEmail = {handleEmailIncomeDetails}
                    />

                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() =>setOpenAddIncomeModal(false)}
                        title="Thêm thu nhập"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show :false, data: null})}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Bạn có chắc là muốn xóa cái thu nhập này không?"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
        )
}
export default Income;