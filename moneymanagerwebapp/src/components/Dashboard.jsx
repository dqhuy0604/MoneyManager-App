import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const Dashboard = ({children, activeMenu}) =>{
    const {user} = useContext(AppContext);
    return(
        <div>
            <Menubar activeMenu={activeMenu}/>

            {user && (
                <div className="flex">
                    <div className="hidden lg:block shrink-0">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>

                    <main className="flex-1 min-w-0 px-8 py-5">
                        {children}
                    </main>
                </div>
            )}

        </div>


    )
}

export default Dashboard;