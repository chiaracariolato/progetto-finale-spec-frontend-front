import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">

                <div className="d-flex align-items-center gap-3">
                    <NavLink className={({ isActive }) =>
                        `nav-link fs-5 ${isActive ? "text-primary text-decoration-underline" : ""}`
                    } to="/">Board Games Guru</NavLink>
                    <NavLink className={({ isActive }) =>
                        `nav-link fs-5 ${isActive ? "text-primary text-decoration-underline" : ""}`
                    } to="/comparison">Compare products</NavLink>
                </div>
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="bi bi-balloon-heart"></i></button>
            </div>
        </nav>
    )
}

