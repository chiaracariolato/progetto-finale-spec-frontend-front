import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext";

const ProductRow = memo(({ product }) => {

    const { favourites, setFavourites } = useContext(GlobalContext);

    const [isFavourite, setIsFavourite] = useState(favourites.some(element => element.id == product.id))

    function handleFavourites(id) {

        let newFavourites;

        if (isFavourite) {
            newFavourites = favourites.filter(product => product.id !== id)
        } else {
            newFavourites = [...favourites, { id: id, title: product.title }]
        }

        setIsFavourite(!isFavourite)
        setFavourites(newFavourites)

    }

    return (
        <tr>
            <td className="px-3 align-middle" style={{ width: "10%" }}><button className="btn favourite-btn"
                onClick={() => handleFavourites(product.id)}>
                <i className={
                    isFavourite ? "bi bi-balloon-heart-fill" : "bi bi-balloon-heart"
                }></i>
            </button></td>
            <td scope="row" className="px-3 align-middle" style={{ width: "35%" }}>{product.title}</td>
            <td className="px-3 align-middle" style={{ width: "35%" }}>{product.category}</td>
            <td className="text-end px-3 align-middle" style={{ width: "20%" }}><Link to={`/product/${product.id}`}><i className="bi bi-arrow-right-short fs-3" style={{ color: "black" }}></i></Link></td>
        </tr >
    );
})

export default ProductRow;

