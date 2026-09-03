import { memo, useContext, useState } from "react";
import { Link } from "react-router-dom"
import { GlobalContext } from "../contexts/GlobalContext";

const ProductRow = memo(({ product }) => {

    const { favourites, setFavourites } = useContext(GlobalContext);

    const [isFavourite, setIsFavourite] = useState(favourites.some(element => element.id == product.id))

    function handleFavourites(id) {
        console.log(favourites)

        let newFavourites;

        if (isFavourite) {
            newFavourites = favourites.filter(product => product.id != id)
        } else {
            newFavourites = [...favourites, { id: id, title: product.title }]
        }

        setIsFavourite(!isFavourite)
        setFavourites(newFavourites)

    }

    return (
        <tr>
            <td className="px-3 align-middle" style={{ width: "5%" }}>
                <button className="btn favourite-btn"
                    onClick={() => handleFavourites(product.id)}>
                    <i className={
                        isFavourite ? "bi bi-heart-fill" : "bi bi-heart"
                    }></i>
                </button>

            </td>
            <td scope="row" className="px-3 align-middle" style={{ width: "40%" }}>
                <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-reset d-block">
                    {product.title}
                </Link>
            </td>
            <td className="px-3 align-middle" style={{ width: "40%" }}>
                <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-reset d-block">
                    {product.category}
                </Link>
            </td>
            <td className="text-end px-3 align-middle" style={{ width: "15%" }}>
                <Link to={`/product/${product.id}`}>
                    <i className="bi bi-arrow-right-short fs-3" style={{ color: "white" }} />
                </Link>
            </td>
        </tr >
    );
})

export default ProductRow;

