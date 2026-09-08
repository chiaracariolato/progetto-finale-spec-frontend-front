import { useState, useEffect } from 'react'
import useStorage from './useStorage';

export default function useProducts() {

    const [products, setProducts] = useState([]);
    const [favourites, setFavourites] = useStorage("favourites", []);

    const fetchProducts = () => {
        fetch(`http://localhost:3001/products`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }

    useEffect(fetchProducts, []);


    return {
        products,
        favourites,
        setFavourites
    };
}

