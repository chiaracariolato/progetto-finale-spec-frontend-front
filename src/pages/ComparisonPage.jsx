import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Rating from "../components/Rating";
import ComparisonTable from "../components/ComparisonTable";
import useSingleProduct from "../hooks/useSingleProduct";
import Loading from "../components/Loading";

export default function ComparisonPage() {
    const { products } = useContext(GlobalContext);
    const { product: productA, fetchSingleProduct: fetchProductA } = useSingleProduct();
    const { product: productB, fetchSingleProduct: fetchProductB } = useSingleProduct();

    useEffect(() => {
        if (!products.length) return;

        fetchProductA(products[0].id);
        fetchProductB(products[1].id)
    }, [products]);

    if (!productA || !productB) {
        return (
            <Loading />
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
                        value={productA.id}
                        onChange={(event) => fetchProductA(event.target.value)}
                    >
                        {products.map((product, index) => (
                            <option key={index} value={product.id}>
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
                        value={productB.id}
                        onChange={(event) => fetchProductB(event.target.value)}
                    >
                        {products.map((product, index) => (
                            <option key={index} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4 align-items-stretch">
                {[productA, productB].map((product, index) => (
                    <div key={index} className="col-md-6">
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