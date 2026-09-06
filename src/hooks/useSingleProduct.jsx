import { useState, useEffect } from 'react'

export default function useSingleProduct() {

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

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


    return {
        product,
        fetchSingleProduct,
        isLoading,
        notFound
    };
}

