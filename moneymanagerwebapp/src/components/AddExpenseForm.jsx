import {useEffect, useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import {LoaderCircle} from "lucide-react";

const AddExpenseForm = ({onAddExpense,categories}) => {
    const [expense, setExpense] = useState({
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
        setExpense({...expense, [key]: value});
    }
    const [loading, setLoading] = useState(false);

    const handleAddExpense = async () =>{
        setLoading(true);
        try{
            await onAddExpense(expense);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        if(categories.length > 0 && !expense.categoryId){
            setExpense((prev) => ({...prev, categoryId: categories[0].id}))
        }
    },[categories,expense.categoryId]);

    return(
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                value={expense.name}
                onChange={({target}) => handleChange('name', target.value)}
                label="Nguồn chi tiêu"
                placeholder="Ăn uống, mua sắm, hóa đơn..."
                type="text"
            />

            <Input
                label="Danh Mục"
                value={expense.categoryId}
                onChange={({target}) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="Số tiền"
                placeholder="500.000"
                type="number"
            />


            <Input
                value={expense.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Thời gian"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleAddExpense}
                    disabled={loading}
                    className="add-btn add-btn-fill">
                    {loading ? (
                        <>
                        <LoaderCircle className="w-4 h-2 animate-spin"/>Đang Thêm...
                        </>
                    ):(
                        <>
                        Thêm Chi Tiêu
                        </>
                    )}
                </button>

            </div>

        </div>
    )
}
export default AddExpenseForm;