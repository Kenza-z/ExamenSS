import { useState } from 'react'

export function PanierForm({ selectProduct, id }) {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quantity<0) {
      setError('Veuillez entrée une valeur superieur à 0')
      return
    }
    setError('')
    selectProduct(quantity, id)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Ajouter un produit</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantité</label>
            <input
              id="quantity"
              className="form-control"
              value={quantity}
              onChange={e => {
                setResearch(e.target.value)
                if (error) setError('')
              }}
              placeholder="1"
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">Rechercher</button>
          </div>
        </form>
      </div>
    </div>
  )
}
