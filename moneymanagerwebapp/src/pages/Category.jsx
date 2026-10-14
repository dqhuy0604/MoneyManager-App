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
    },[]);

    const handleAddCategory = async (category) =>{
        const {name, type, icon} = category;

        if(!name.trim()){
            toast.error("Vui lòng nhập tên danh mục")
            return;
        }
        //check if the category already exists
        const isDuplicate = categoryData.some((category) =>{
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if(isDuplicate){
            toast.error("Danh mục này đã tồn tại");
            return;
        }


        try{
            const response = await axiosConfig.post(API_ENDPOINT.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201){
                toast.success("Thêm danh mục thành công");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        }catch (error){
            console.log('Lỗi thêm danh mục', error);
            toast.error(error.response?.data?.message || "Thêm danh mục thất bại.");
        }
    }

    const handleEditCategory = (categoryToedit) =>{
        setSelectedCategory(categoryToedit);
        setOpenEditCategoryModal(true);
    }
    const handleUpdateCategory = async (updateCategory) => {
        const{id, name, type, icon} = updateCategory;
        if(!name.trim()){
            toast.error("Danh mục này đã tồn tại");
            return
        }

        if(!id){
            toast.error("ID Danh mục không hợp lệ");
            return;
        }
        const isDuplicate = categoryData.some((updateCategory) =>{
            return (
                String(updateCategory.id) !== String(id) &&
                updateCategory.name.trim().toLowerCase() === name.trim().toLowerCase()
            );
        })

        if(isDuplicate){
            toast.error("Tên daanh mục này đã tồn tại");
            return;
        }

        try{
            console.log("Update category:", updateCategory);
            const response = await axiosConfig.put(API_ENDPOINT.UPDATE_CATEGORY(id),{name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Cập nhật danh mục thành công");
            fetchCategoryDetails();
        }catch (error){
            console.error("Lỗi cập nhật danh mục", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Cập nhật danh mục thật bại.")
        }
    }


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
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/* Adding category modal*/}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Thêm Danh Mục"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>
                <Modal
                    onClose={() =>{
                        setOpenEditCategoryModal(false)
                        setSelectedCategory(null);
                }}
                    isOpen={openEditCategoryModal}
                    title="Cập Nhật"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />

                </Modal>
            </div>
        </Dashboard>
    )
}
export default Category;