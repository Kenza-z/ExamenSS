import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

import './App.css'
import { ResearchForm } from './components/ResearchForm'
import { ProductList } from './components/ProductList'
import { Panier } from './components/Panier'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])

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

        const normalized = list.map(d => ({
          id: d.id,
          title: d.title ?? '',
          price: d.price ?? null,
          category: d.category ?? '',
          description: d.description ?? '',
          rating: typeof d.rating === 'number' ? d.rating : null,
        }))

        setProducts(normalized)
      } catch (e) {
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

 
  function addToCart(product, qty = 1) {
    if (!product?.id || !Number.isFinite(product.price)) return
    setCart(prev => {
      const i = prev.findIndex(p => p.id === product.id)
      if (i === -1) return [...prev, { id: product.id, title: product.title, price: product.price, qty: Math.max(1, qty) }]
      const next = [...prev]
      next[i] = { ...next[i], qty: next[i].qty + Math.max(1, qty) }
      return next
    })
  }

  function setQty(id, qty) {
    const n = Number(qty)
    if (!Number.isFinite(n)) return
    setCart(prev => {
      if (n <= 0) return prev.filter(p => p.id !== id)
      return prev.map(p => (p.id === id ? { ...p, qty: n } : p))
    })
  }

  function incQty(id) {
    setCart(prev => prev.map(p => (p.id === id ? { ...p, qty: p.qty + 1 } : p)))
  }

  function decQty(id) {
    setCart(prev =>
      prev
        .map(p => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter(p => p.qty > 0)
    )
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  )

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
          <ProductList products={products} onAdd={addToCart} />
        </section>
      )}

      {/*Panier */}
      <section className="py-4">
        <Panier
          cart={cart}
          total={total}
          onInc={incQty}
          onDec={decQty}
          onRemove={removeFromCart}
          onSetQty={setQty}
        />
      </section>
    </div>
  )
}
