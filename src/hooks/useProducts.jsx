import { useState, useEffect } from 'react'

export default function useProducts() {

    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        fetch(`http://localhost:3001/products`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
        console.log("dati presi")
    }

    useEffect(fetchProducts, []);


    return {
        products,
    };
}

