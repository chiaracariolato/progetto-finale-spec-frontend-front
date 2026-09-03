import { NavLink } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";

export default function Header() {
    const { favourites } = useContext(GlobalContext);

    return (
        <nav className="navbar bg-body-tertiary">
            <div className=" container container-fluid">

                <div className="d-flex align-items-center gap-3">
                    <NavLink className={({ isActive }) =>
                        `nav-link fs-6 ${isActive ? "text-primary text-decoration-underline fw-bold" : "fw-light"}`
                    } to="/">
                        Board Games
                    </NavLink>

                    <NavLink className={({ isActive }) =>
                        `nav-link fs-6 ${isActive ? "text-primary text-decoration-underline  fw-bold" : "fw-light"}`
                    } to="/comparison">
                        Compare games
                    </NavLink>
                </div>

                <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i className={favourites.length > 0 ? "bi bi-heart-fill" : "bi bi-heart"} />
                </button>
            </div>
        </nav>
    )
}

