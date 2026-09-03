import './App.css'
import ProductsList from './pages/ProducsList';
import ProductPage from './pages/ProductPage';
import ComparisonPage from './pages/ComparisonPage';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from './contexts/GlobalContext';

import DefaultLayout from "./layouts/DefaultLayout";

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
