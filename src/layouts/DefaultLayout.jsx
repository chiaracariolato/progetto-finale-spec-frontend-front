import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function DefaultLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <Header onOpenSidebar={() => setIsSidebarOpen(true)}/>
            
            <div className="container" style={{ "marginTop": "80px" }}>
                <Outlet />
            </div>

            {createPortal(
            <>
                {isSidebarOpen && (
                    <div
                        className="offcanvas-backdrop fade show"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </>,
            document.body
            )}
        </div >
    );
}