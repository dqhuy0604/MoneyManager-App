import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {validateEmail} from "../util/vaildation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);


    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let profileImageUrl="";
        setIsLoading(true);

        if(!fullName.trim()){
            setError("Vui lòng nhập họ và tên");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Vui lòng nhập mật khẩu");
            setIsLoading(false);
            return;
        }
        if(!validateEmail(email)){
            setError("Vui lòng nhập email hợp lệ");
            setIsLoading(false);
            return;
        }
        setError("");

        //sigup api call
        try{

            // Upload image if present
            if(profilePhoto){
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(API_ENDPOINT.REGISTER,{
                fullName,
                email,
                password,
                profileImageUrl
            })
            if(response.status === 201){
                toast.success("Đăng ký thành công. Vui lòng kiểm tra Email để kích hoạt tài khoản")
                navigate("/login");
            }
        }catch(err){
            console.error("Đăng ký thất bại", err);
            setError(err.message);
        }finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bn} alt ="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>

            <div className="ralative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2x1 p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Đăng ký tài khoản
                    </h3>

                    <p className="text-sm text-slate-700 text-center mb-8">
                        Vui lòng nhập thông tin của bạn để đăng ký
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage = {setProfilePhoto} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Họ và Tên"
                                placeholder="Nguyễn Văn A"
                                type ="text"
                                />
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                placeholder="NguyenVanA@Gmail.com"
                                type ="text"
                            />
                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Mật Khẩu"
                                    placeholder="***********"
                                    type ="password"
                                />
                            </div>
                        </div>
                        {error &&(
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full rounded-md bg-purple-900 py-3 text-sm font-medium flex items-center justify-center gap-2 text-white shadow-md hover:bg-purple-800 transition${isLoading ? 'opacity-60 cursor-not-allowed': ''} `} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Đăng đăng ký...
                                </>
                            ) : ("ĐĂNG KÝ"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Bạn đã có tài khoản ?
                            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Đăng Nhập</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup