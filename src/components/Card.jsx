import { Link } from "react-router-dom"
import { memo } from "react";

const Card = memo(({ product }) => {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{product.title}</h5>
                <p class="card-text">{product.category}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-small"> Details </Link>
            </div>
        </div>
    )
})

export default Card;