import { createContext } from "react";
import useProducts from "../hooks/useProducts";

export const GlobalContext = createContext({
    products: [],
    favourites: [],
    setFavourites: () => { }
});

export function GlobalContextProvider({ children }) {
    const { products, favourites, setFavourites } = useProducts();

    return (
        <GlobalContext.Provider value={{ products, favourites, setFavourites }}>
            {children}
        </GlobalContext.Provider>
    );
}