import './App.css'
import ProductsList from './pages/ProducsList';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from './contexts/GlobalContext';

import DefaultLayout from "./layouts/DefaultLayout";

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <div className="container" style={{ minHeight: '100vh' }}>
          <div className="container mt-0">
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route index element={<ProductsList />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div >
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
