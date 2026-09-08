function debounce(callback, delay) {
  let timer
  return (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

import { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import ProductRow from '../components/ProductRow'
import useFilteredProducts from '../hooks/useFilteredProducts'

export default function ProductsList() {
  const { products } = useContext(GlobalContext)

  const { filteredProducts, fetchFilteredProducts } = useFilteredProducts()

  const [category, setCategory] = useState('All categories')
  const [filterList, setFilterList] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')
  const debouceSearch = useCallback(debounce(setSearchQuery, 1000), [])

  useEffect(() => {
    const noFilterActive = searchQuery === '' && category === 'All categories'

    if (noFilterActive) return

    const categoryParam = category === 'All categories' ? '' : category
    fetchFilteredProducts(searchQuery, categoryParam)
  }, [searchQuery, category])

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1)
    } else {
      setSortBy(column)
      setSortOrder(1)
    }
  }

  const searchedProducts = useMemo(() => {
    const noFilterActive = searchQuery === '' && category === 'All categories'
    const source = noFilterActive ? products : (filteredProducts ?? [])

    const sorted = [...source]

    sorted.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'title') comparison = a.title.localeCompare(b.title)
      if (sortBy === 'category') comparison = a.category.localeCompare(b.category)
      return comparison * sortOrder
    })

    return sorted
  }, [products, filteredProducts, searchQuery, category, sortBy, sortOrder])

  useEffect(() => {
    const newFilterList = []

    for (let i = 0; i < products.length; i++) {
      if (!newFilterList.includes(products[i].category)) newFilterList.push(products[i].category)
    }

    setFilterList(newFilterList)
  }, [products])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Our products</h4>

        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control"
            placeholder="Search product"
            aria-label="Search product"
            type="text"
            onChange={(e) => debouceSearch(e.target.value)}
          />

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All categories">All categories</option>
            {filterList.map((filter, i) => (
              <option value={filter} key={i}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th />
              <th
                scope="col"
                onClick={() => handleSort('title')}
                className={sortBy == 'title' ? 'text-primary' : 'black'}
                style={{
                  textDecoration: sortBy == 'title' && 'underline',
                  cursor: 'pointer',
                }}
              >
                Title{' '}
                {sortBy == 'title' && (
                  <i
                    className={sortOrder === 1 ? 'bi bi-sort-alpha-down' : 'bi bi-sort-alpha-up'}
                  />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSort('category')}
                className={sortBy == 'category' ? 'text-primary' : 'black'}
                style={{
                  textDecoration: sortBy == 'category' ? 'underline' : '',
                  cursor: 'pointer',
                }}
              >
                Category{' '}
                {sortBy == 'category' && (
                  <i
                    className={sortOrder === 1 ? 'bi bi-sort-alpha-down' : 'bi bi-sort-alpha-up'}
                  />
                )}
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {searchedProducts.length > 0 ? (
              searchedProducts.map((product) => <ProductRow key={product.id} product={product} />)
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
