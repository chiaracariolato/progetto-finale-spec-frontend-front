import { NavLink } from "react-router-dom"

export default function Header() {

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand mb-0 h1" to="/">Board Games Guru</NavLink>
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="bi bi-balloon-heart"></i></button>
            </div>
        </nav>
    )
}

