import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductPage() {

    const { product, fetchSingleProduct, isLoading, notFound, favourites, setFavourites } = useContext(GlobalContext);
    const { id } = useParams();

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

    const handleFavourites = (id) => {
        const safeFavourites = Array.isArray(favourites) ? favourites : [];
        const isFavourite = safeFavourites.some((favourite) => favourite?.id === Number(id));

        const newFavourites = isFavourite
            ? safeFavourites.filter((fav) => fav?.id !== Number(id))
            : [...safeFavourites, product];

        console.log(newFavourites)

        setFavourites(newFavourites);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <img src={product.image} alt={product.title} className="img-fluid rounded mb-3 product-image" />
                </div>

                <div className="col-md-6">
                    <h2 className="mb-3">{product.title}</h2>
                    <span className="badge text-bg-info">{product.minAge}+ years</span>
                    <p>{product.category}</p>
                    <p className="text-muted mb-4">{product.publisher} | {product.releaseYear}</p>
                    <div className="mb-3">
                        <span className="h4 me-2">{product.price}€</span>
                    </div>
                    <div className="mb-3">
                        <Rating rating={product.rating} />
                    </div>
                    <div className="mb-4">
                        <h5>Description:</h5>
                        <p><strong>{product.minPlayers}-{product.maxPlayers} players</strong></p>
                        <p>Play time: {product.playTime} min</p>
                        <p className="mb-4">{product.description}</p>
                        <p style={{
                            backgroundColor: product.difficulty == "High"
                                ? 'lightcoral'
                                : product.difficulty == "Medium"
                                    ? 'lightyellow'
                                    : 'lightgreen',
                            borderRadius: "8px"
                        }}>{product.difficulty}</p>
                    </div>

                    <button className="btn btn-outline-secondary btn-lg mb-3" onClick={() => handleFavourites(id)}>
                        <i className="bi bi-balloon-heart"></i> Add to Favourites
                    </button>

                </div>
            </div>
        </div>
    )
}