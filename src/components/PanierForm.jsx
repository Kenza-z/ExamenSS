import { useState } from 'react'

export function PanierForm({ onAdd, productId, defaultQty = 1 }) {
  const [quantity, setQuantity] = useState(defaultQty)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const n = Number(quantity)
    if (!Number.isFinite(n) || n <= 0) {
      setError('Veuillez entrer une quantité supérieure à 0')
      return
    }
    setError('')
    onAdd?.(productId, n)
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="number"
        min="1"
        className="form-control"
        value={quantity}
        onChange={e => {
          setQuantity(e.target.value)
          if (error) setError('')
        }}
        aria-label="Quantité"
      />
      <button type="submit" className="btn btn-primary">Ajouter</button>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </form>
  )
}
