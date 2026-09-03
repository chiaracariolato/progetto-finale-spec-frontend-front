import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductPage() {

    const { product, fetchSingleProduct, isLoading, notFound, favourites, setFavourites } = useContext(GlobalContext);
    const { id } = useParams();

    const [isFavourite, setIsFavourite] = useState(favourites.some(product => product.id == id))

    const navigate = useNavigate();

    useEffect(() => {
        fetchSingleProduct(id);
    }, [id]);

    useEffect(() => {
        if (notFound) {
            navigate("/");
        }
    }, [notFound]);

    if (isLoading || !product) {
        return null;
    }

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
        <div className="container mt-5">
            <div className="row d-flex justify-content-between">
                <h2 className="mb-5 col-6">{product.title}</h2>
                <div className="mb-5 col-6 d-flex flex-row-reverse align-items-end">
                    <span className="h4">{product.price}€</span>
                </div></div>
            <div className="row">

                <div className="col-md-6 mb-4 d-flex align-items-center justify-content-center">
                    <div className="product-image-wrapper position-relative">
                        <img src={product.image} alt={product.title} className="rounded product-image" />

                        <button className="btn position-absolute top-0 end-0 m-2 favourite-btn"
                            onClick={() => handleFavourites(id)}>
                            <i className={
                                isFavourite ? "bi bi-balloon-heart-fill fs-3" : "bi bi-balloon-heart fs-3"
                            }></i>
                        </button>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row d-flex justify-content-between mb-2">
                        <div className="col-6">
                            <h5 className="mb-0">{product.title}</h5>
                            <p className="text-muted mb-4">{product.publisher} | {product.releaseYear}</p>
                        </div>
                        <div className="col-6 text-end">
                            <Rating rating={product.rating} /> / 5
                        </div>
                    </div>

                    <div className="row gx-3 align-items-start mb-4">
                        <div className="col-4">
                            <div className="bg-light rounded-3 px-3 py-2 text-center">
                                <p className="fw-bold mb-0">Players:</p>
                                <p className="mb-0">
                                    {product.minPlayers}-{product.maxPlayers}
                                </p>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="bg-light rounded-3 px-3 py-2 text-center">
                                <p className="fw-bold mb-0">Age:</p>
                                <p className="mb-0">
                                    {product.minAge}+
                                </p>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="bg-light rounded-3 px-3 py-2 text-center">
                                <p className="fw-bold mb-0">Play time:</p>
                                <p className="mb-0">
                                    {product.playTime} min
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5>Description:</h5>
                        <p className="mb-4">{product.description}</p>
                        <p>Category: <strong>{product.category}</strong></p>
                        <p className={
                            product.difficulty == "High"
                                ? 'badge rounded-pill text-bg-danger'
                                : product.difficulty == "Medium"
                                    ? 'badge rounded-pill text-bg-warning'
                                    : 'badge rounded-pill text-bg-info'
                        }>Difficulty: {product.difficulty}</p>
                    </div>

                </div>
            </div>
        </div >
    )
}