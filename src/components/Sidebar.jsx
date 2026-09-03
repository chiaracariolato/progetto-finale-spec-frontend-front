import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";

export default function Sidebar() {
    const { favourites = [] } = useContext(GlobalContext);

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel"><i className="bi bi-heart-fill px-2" />Favourites</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <ul className="list-group">
                    {favourites.map((product) => (
                        <li className="list-group-item" key={product.id}>{product.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}