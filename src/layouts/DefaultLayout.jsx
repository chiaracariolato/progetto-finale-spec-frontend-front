import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout() {
    return (
        <div>
            <Sidebar />
            <Header />
            <div className="container" style={{ "margin-top": "80px" }}>
                <Outlet />
            </div>
        </div >
    );
}