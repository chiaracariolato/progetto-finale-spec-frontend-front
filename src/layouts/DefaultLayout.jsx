import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
    return (
        <div>
            <Sidebar />
            <Header />
            <div className="container" style={{ "marginTop": "80px" }}>
                <Outlet />
            </div>
        </div >
    );
}