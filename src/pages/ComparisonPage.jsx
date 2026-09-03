import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Rating from "../components/Rating";
import ComparisonTable from "../components/ComparisonTable";

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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Compare games</h4>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <label htmlFor="first-product" className="form-label">Choose game</label>
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
                    <label htmlFor="second-product" className="form-label">Choose game</label>
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
                        <div className="card h-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top p-3 object-fit-contain"
                                style={{ height: "260px" }}
                            />
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <h4 className="card-title">{product.title}</h4>
                                    <div className="col-6 text-end">
                                        <Rating rating={product.rating} /> / 5
                                    </div>
                                </div>
                                <p className="card-text text-secondary">{product.description}</p>
                                <p className="h5 mb-3">{product.price}€</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-5">
                <div className="card-body">
                    <ComparisonTable productA={productA} productB={productB} />
                </div>
            </div>
        </div>
    );
}