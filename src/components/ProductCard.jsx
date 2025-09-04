export function ProductCard({ product, onAdd }) {
  const { title: nom, price: prix, category: categorie, description, rating } = product

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{nom || 'Sans titre'}</h5>
        <p className="card-text mb-1"><strong>Prix :</strong> {prix ?? '—'}</p>
        <p className="card-text mb-1"><strong>Catégorie :</strong> {categorie || '—'}</p>
        <p className="card-text"><strong>Description :</strong> {description || '—'}</p>
        <p className="card-text"><strong>Note :</strong> {rating ?? '—'}</p>
      </div>
      <div className="card-footer bg-transparent border-0">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onAdd?.(product, 1)}
          aria-label="Ajouter au panier"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
