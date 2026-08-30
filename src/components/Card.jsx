import { Link } from "react-router-dom"
import { memo } from "react";

const Card = memo(({ product }) => {
    return (
        <div className="card"><div className="card-body d-flex justify-content-between align-items-start">

            <div>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.category}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-small">
                    Details
                </Link>
            </div>

        </div>
        </div>
    )
})

export default Card;