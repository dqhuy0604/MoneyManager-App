// export const BASE_URL = "https://moneymanager-app-server.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0"
const CLOUDINARY_CLOUD_NAME = "gmunfc9c";



export const API_ENDPOINT = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}