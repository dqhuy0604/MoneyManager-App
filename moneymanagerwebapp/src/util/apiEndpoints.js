// export const BASE_URL = "https://moneymanager-app-server.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0"
const CLOUDINARY_CLOUD_NAME = "gmunfc9c";



export const API_ENDPOINT = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY : "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE : (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME : (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD : "excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}