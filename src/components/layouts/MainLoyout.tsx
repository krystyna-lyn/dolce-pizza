import { Outlet } from "react-router-dom";
import Header from "../Header.tsx";

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