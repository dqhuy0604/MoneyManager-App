import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {validateEmail} from "../util/vaildation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINT} from "../util/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import {LoaderCircle} from "lucide-react";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);


    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true);

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

        try{
            const response = await axiosConfig.post(API_ENDPOINT.LOGIN,{
                email,
                password
            });
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch (error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            }else{
                console.error("Đăng nhập thất bại", error);
                setError(error.message);
            }

        }finally{
            setIsLoading(false);
        }

    }
    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bn} alt ="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>

            <div className="ralative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2x1 p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Đăng nhập tài khoản
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Vui lòng nhập thông tin của bạn để đăng nhập
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                placeholder="NguyenVanA@Gmail.com"
                                type ="text"
                            />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Mật Khẩu"
                                    placeholder="***********"
                                    type ="password"
                                />

                        {error &&(
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full rounded-md bg-purple-900 py-3 text-sm font-medium flex items-center justify-center gap-2 text-white shadow-md hover:bg-purple-800 transition${isLoading ? 'opacity-60 cursor-not-allowed': ''} `} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Đăng đăng nhập...
                                </>
                            ) : ("ĐĂNG NHẬP"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Bạn chưa có tài khoản?
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Đăng Ký</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;