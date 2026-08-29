import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";

export default function ProductsList() {
    const { products } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState("All categories")
    const [alphabeticOrder, setAlphabeticOrder] = useState(true)
    const [searchedProducts, setSearchedProducts] = useState([]);

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (category === "All categories" || product.category === category))
            .sort((a, b) => {
                const comparison = a.title.localeCompare(b.title);
                return alphabeticOrder ? comparison : -comparison;
            });
        setSearchedProducts(filteredProducts);

    }, [searchQuery, products, category, alphabeticOrder]);

    function changeOrder() {
        setAlphabeticOrder((prev) => !prev)
    }

    const filterList = ["categoria 1", "categoria 2", "categoria 3"]

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Our products</h4>

                <div className="d-flex align-items-center gap-2">
                    <input
                        className="form-control"
                        placeholder="Search product"
                        aria-label="Search product"
                        type='text'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />

                    <select className="form-select" aria-label="Default select example" onChange={e => setCategory(e.target.value)}>
                        <option value="All categories">All categories</option>
                        {
                            filterList.map((filter, i) => (
                                <option value={filter} key={i}>{filter}</option>
                            ))
                        }
                    </select>

                    <button onClick={changeOrder} className="btn btn-outline-secondary btn-sm flex-shrink-0">{alphabeticOrder ? "A-Z" : "Z-A"}</button>
                </div>


            </div>

            {searchedProducts.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div >
    )
}