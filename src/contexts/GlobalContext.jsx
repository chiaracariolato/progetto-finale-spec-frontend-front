import { createContext } from "react";
import useProducts from "../hooks/UseProducts";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const { products } = useProducts();

    return (
        <GlobalContext.Provider value={{ products }}>
            {children}
        </GlobalContext.Provider>
    );
}