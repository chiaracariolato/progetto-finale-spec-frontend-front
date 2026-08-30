import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function ComparisonPage() {
    const { products } = useContext(GlobalContext);

    const [firstProductId, setFirstProductId] = useState("");
    const [secondProductId, setSecondProductId] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([null, null]);

    useEffect(() => {
        if (!products.length) return;

        setFirstProductId((current) => current || String(products[0].id));
        setSecondProductId((current) => current || String(products[1]?.id ?? products[0].id));
    }, [products]);

    useEffect(() => {
        if (!firstProductId) return;

        fetch(`http://localhost:3001/products/${firstProductId}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedProducts((previous) => {
                    const next = [...previous];
                    next[0] = data.product ?? data;
                    return next;
                });
            })
            .catch((error) => console.error("Error fetching first product", error));
    }, [firstProductId]);

    useEffect(() => {
        if (!secondProductId) return;

        fetch(`http://localhost:3001/products/${secondProductId}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedProducts((previous) => {
                    const next = [...previous];
                    next[1] = data.product ?? data;
                    return next;
                });
            })
            .catch((error) => console.error("Error fetching second product", error));
    }, [secondProductId]);

    const productA = useMemo(
        () => selectedProducts[0] ?? products.find((product) => Number(product.id) === Number(firstProductId)) ?? null,
        [selectedProducts, products, firstProductId]
    );

    const productB = useMemo(
        () => selectedProducts[1] ?? products.find((product) => Number(product.id) === Number(secondProductId)) ?? null,
        [selectedProducts, products, secondProductId]
    );


    if (!productA || !productB) {
        return (
            <div className="container mt-4">
                <div className="alert alert-info">Loading product details...</div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="mb-0">Compare products</h2>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <label htmlFor="first-product" className="form-label">Choose product 1</label>
                    <select
                        id="first-product"
                        className="form-select"
                        value={firstProductId}
                        onChange={(event) => setFirstProductId(event.target.value)}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="second-product" className="form-label">Choose product 2</label>
                    <select
                        id="second-product"
                        className="form-select"
                        value={secondProductId}
                        onChange={(event) => setSecondProductId(event.target.value)}
                    >
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4 align-items-stretch">
                {[productA, productB].map((product) => (
                    <div key={product.id} className="col-md-6">
                        <div className="card h-100 shadow-sm border-0">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top p-3 object-fit-contain"
                                style={{ height: "260px", objectFit: "contain" }}
                            />
                            <div className="card-body">
                                <span className="badge text-bg-info mb-2">{product.category}</span>
                                <h4 className="card-title">{product.title}</h4>
                                <p className="text-muted mb-3">{product.publisher} · {product.releaseYear}</p>
                                <p className="h5 mb-3">{product.price}€</p>
                                <div className="mb-3">
                                    <i className="bi bi-star-fill text-warning" />
                                    <span className="ms-2">{product.rating}</span>
                                </div>
                                <p className="card-text text-secondary">{product.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-5 shadow-sm border-0">
                <div className="card-body">
                    <h4 className="mb-4">Comparison table</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "30%" }}>Feature</th>
                                    <th scope="col">{productA.title}</th>
                                    <th scope="col">{productB.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Category</th>
                                    <td>{productA.category}</td>
                                    <td>{productB.category}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>{productA.price} €</td>
                                    <td>{productB.price} €</td>
                                </tr>
                                <tr>
                                    <th scope="row">Players</th>
                                    <td>{productA.minPlayers} - {productA.maxPlayers}</td>
                                    <td>{productB.minPlayers} - {productB.maxPlayers}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Play time</th>
                                    <td>{productA.playTime} min</td>
                                    <td>{productB.playTime} min</td>
                                </tr>
                                <tr>
                                    <th scope="row">Min age</th>
                                    <td>{productA.minAge}+</td>
                                    <td>{productB.minAge}+</td>
                                </tr>
                                <tr>
                                    <th scope="row">Publisher</th>
                                    <td>{productA.publisher}</td>
                                    <td>{productB.publisher}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Release year</th>
                                    <td>{productA.releaseYear}</td>
                                    <td>{productB.releaseYear}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Difficulty</th>
                                    <td>{productA.difficulty}</td>
                                    <td>{productB.difficulty}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Rating</th>
                                    <td><i className="bi bi-star-fill text-warning" />{productA.rating}/5</td>
                                    <td><i className="bi bi-star-fill text-warning" />{productB.rating}/5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}