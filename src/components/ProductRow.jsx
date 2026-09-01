import { memo } from "react";
import { Link } from "react-router-dom"

const ProductRow = memo(({ product }) => {

    return (
        <tr>
            <td scope="row" className="px-3 align-middle" style={{ width: "40%" }}>{product.title}</td>
            <td className="px-3 align-middle" style={{ width: "40%" }}>{product.category}</td>
            <td className="text-end px-3 align-middle" style={{ width: "20%" }}><Link to={`/product/${product.id}`}><i className="bi bi-arrow-right-short fs-3" style={{ color: "black" }}></i></Link></td>
        </tr >
    );
})

export default ProductRow;

