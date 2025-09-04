import { useState } from 'react'

export function ResearchForm({ findProduct }) {
  const [research, setResearch] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!research.trim()) {
      setError('Veuillez renseigner un produit')
      return
    }
    setError('')
    findProduct(research.trim())
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Rechercher un produit</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="research" className="form-label">Nom</label>
            <input
              id="research"
              className="form-control"
              value={research}
              onChange={e => {
                setResearch(e.target.value)
                if (error) setError('')
              }}
              placeholder="Ex. phone, laptop, shoes…"
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
