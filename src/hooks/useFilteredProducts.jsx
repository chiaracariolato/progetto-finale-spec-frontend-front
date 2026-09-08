import { useState, useContext } from 'react'

export default function useFilteredProducts() {
  const [filteredProducts, setFilteredProducts] = useState(null)

  const fetchFilteredProducts = (query, category) => {
    fetch(`http://localhost:3001/products?search=${query}&category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFilteredProducts(data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    filteredProducts,
    fetchFilteredProducts,
  }
}
