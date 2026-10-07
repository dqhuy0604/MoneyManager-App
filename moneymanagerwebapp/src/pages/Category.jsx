import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () =>{
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINT.GET_ALL_CATEGORIES);
            if(response.status ===200){
                console.log('categories', response.data);
                setCategoryData(response.data);
            }
        }catch(error){
            console.error('Có lỗi xảy ra. Vui lòng thử lại', error);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    },[])


    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category*/}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-semibold">Tất Cả Danh Mục</h2>
                    <button
                        onClick={() =>setOpenAddCategoryModal(true)}
                        className="add-btn flex items-center gap-1">
                        <Plus size={15} />
                        Thêm Danh Mục
                    </button>
                </div>
                {/* Category List*/}
                <CategoryList categories={categoryData}/>

                {/* Adding category modal*/}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Thêm Danh Mục"
                >
                    <AddCategoryForm/>
                </Modal>
            </div>
        </Dashboard>
    )
}
export default Category;