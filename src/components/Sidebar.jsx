import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";

export default function Sidebar({ isOpen, onClose }) {
    const { favourites = [] } = useContext(GlobalContext);

    return (
        <div className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title"><i className="bi bi-heart-fill px-2" />Favourites</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {(favourites.length > 0) ?
                    <ul className="list-group">
                        {favourites.map((product) => (
                            <li className="list-group-item" key={product.id}>{product.title}</li>
                        ))}
                    </ul> :
                    <p>No favourites selected</p>}
            </div>
        </div>
    )
}