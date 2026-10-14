import {useEffect, useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import {Loader, LoaderCircle} from "lucide-react";

const AddIncomeForm = ({onAddIncome,categories}) => {
    const [income, setIncome] = useState({
        name: '',
        amount: '',
        date: '',
        icone: '',
        categoryId: ''
    })

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setIncome({...income, [key]: value});
    }
    const [loading, setLoading] = useState(false);

    const handleAddIncome = async () =>{
        setLoading(true);
        try{
            await onAddIncome(income);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        if(categories.length > 0 && !income.categoryId){
            setIncome((prev) => ({...prev, categoryId: categories[0].id}))
        }
    },[categories,income.categoryId]);

    return(
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                value={income.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Nguồn thu nhập"
                placeholder="Lương, Thưởng, Tăng ca"
                type="text"
            />

            <Input
                label="Danh Mục"
                value={income.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Số tiền"
                placeholder="500.000"
                type="number"
            />


            <Input
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Thời gian"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className="add-btn add-btn-fill">
                    {loading ? (
                        <>
                        <LoaderCircle className="w-4 h-2 animate-spin"/>Đang Thêm Thu Nhập...
                        </>
                    ):(
                        <>
                        Thêm Thu Nhập
                        </>
                    )}
                </button>

            </div>

        </div>
    )
}
export default AddIncomeForm;