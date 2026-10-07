import {useState} from "react";
import Input from "./Input.jsx";

const AddCategoryForm = () => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    })

    const categoryTypeOptions = [
        {value:"income", label: "InCome"},
        {value:"expense", label: "Expense"},
    ]

    const handleChange = (key, value) =>{
        setCategory({...category, [key]: value})
    }

    return(
        <div className="p-4">
            <Input
            value={category.name}
            onChange={({target}) => handleChange("name", target.value)}
            label="Tên Danh Mục"
            placeholder="VD: Làm thêm, Lương, Ăn uống..."
            type="text"
            />

            <Input
                label="Loại Danh Mục"
                value={category.type}
                onChange={(target) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

        </div>
    )
}
export default AddCategoryForm;