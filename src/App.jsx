import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import { ResearchForm } from './components/ResearchForm'
import { ProductList } from './components/ProductList'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError('')

        const base = 'https://dummyjson.com'
        const url = query.trim()
          ? `${base}/products/search?q=${encodeURIComponent(query.trim())}`
          : `${base}/products`

        const res = await axios.get(url, { signal: controller.signal })
        const list = Array.isArray(res?.data?.products) ? res.data.products : []

        if (list.length === 0) {
          setProducts([])
          setError(query ? 'Aucun produit trouvé' : 'Aucun produit')
          return
        }

        // On garde seulement les champs utiles pour l’affichage
        const normalized = list.map(d => ({
          id: d.id,
          title: d.title ?? '',
          price: d.price ?? null,
          category: d.category ?? '',
          description: d.description ?? '',
          rating:d.rating ?? '',
        }))

        setProducts(normalized)
      } catch (e) {
        // Ignorer les annulations
        if (
          axios.isCancel?.(e) ||
          e?.code === 'ERR_CANCELED' ||
          e?.name === 'AbortError' ||
          e?.name === 'CanceledError'
        ) {
          return
        }
        setError('Erreur lors du chargement')
        setProducts([])
      } finally {
        setLoading(false)
      }
    })()

    return () => controller.abort()
  }, [query])

  function findProduct(nextQuery) {
    setQuery(nextQuery)
  }

  return (
    <div className="container py-4">
      <ResearchForm findProduct={findProduct} />

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border" role="status" aria-label="Chargement" />
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-warning mt-3">{error}</div>
      )}

      {!loading && !error && products.length > 0 && (
        <section className="py-3">
          <ProductList products={products} />
        </section>
      )}
    </div>
  )
}
