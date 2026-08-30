import { useState, useEffect } from 'react'

export default function useProducts() {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [favourites, setFavourites] = useState([])

    const fetchProducts = () => {
        fetch(`http://localhost:3001/products`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
        console.log("dati presi")
    }

    const fetchSingleProduct = (id) => {
        setIsLoading(true);
        setNotFound(false);
        fetch(`http://localhost:3001/products/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.product) {
                    setProduct(data.product);
                } else {
                    setNotFound(true);
                }
            })
            .catch(error => {
                console.error(error);
                setNotFound(true);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchProducts, []);


    return {
        products,
        product,
        fetchSingleProduct,
        isLoading,
        notFound,
        favourites,
        setFavourites
    };
}

