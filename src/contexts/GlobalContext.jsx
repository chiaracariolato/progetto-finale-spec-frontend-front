import { createContext } from "react";
import useProducts from "../hooks/useProducts";

export const GlobalContext = createContext({
    products: [],
    product: null,
    fetchSingleProduct: () => { },
    isLoading: false,
    notFound: false,
    favourites: [],
    setFavourites: () => { }
});

export function GlobalContextProvider({ children }) {
    const { products, product, fetchSingleProduct, isLoading, notFound, favourites, setFavourites } = useProducts();

    return (
        <GlobalContext.Provider value={{ products, product, fetchSingleProduct, isLoading, notFound, favourites, setFavourites }}>
            {children}
        </GlobalContext.Provider>
    );
}