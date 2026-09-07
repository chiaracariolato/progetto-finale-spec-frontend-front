import { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ComparisonTable from "../components/ComparisonTable";
import useSingleProduct from "../hooks/useSingleProduct";
import ComparisonCard from "../components/ComparisonCard";

export default function ComparisonPage() {
    const { products } = useContext(GlobalContext);
    const { product: productA, fetchSingleProduct: fetchProductA } = useSingleProduct();
    const { product: productB, fetchSingleProduct: fetchProductB } = useSingleProduct();

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Compare games</h4>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-6">
                    <label className="form-label">Choose game</label>
                    <select className="form-select" aria-label="Default select example" onChange={(event) => fetchProductA(event.target.value)}>
                        {!productA && <option value="Select a product">Select a product</option>}
                        {products.filter(product => !productB || product.id != productB.id)
                            .map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.title}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="second-product" className="form-label">Choose game</label>
                    <select className="form-select" aria-label="Default select example" onChange={(event) => fetchProductB(event.target.value)}>

                        {!productB && <option value="Select a product">Select a product</option>}
                        {products.filter(product => !productA || product.id != productA.id)
                            .map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.title}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="row g-4 align-items-stretch">
                {[productA, productB].map((product, index) => (
                    <ComparisonCard key={index} product={product} />
                ))}
            </div>

            {(productA && productB) ? <div className="card mt-3">
                <div className="card-body">
                    <ComparisonTable productA={productA} productB={productB} />
                </div>
            </div> :
                <>
                </>}
        </div>
    );
}