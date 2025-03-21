import { Outlet } from "react-router-dom";
import Header from "../Header";

const MainLoyout = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLoyout