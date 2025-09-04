export function ProductCard({ nom, prix, categorie, description , rating/*, commentaires, note */ }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{nom || 'Sans titre'}</h5>
        <p className="card-text mb-1"><strong>Prix :</strong> {prix ?? '—'}</p>
        <p className="card-text mb-1"><strong>Catégorie :</strong> {categorie || '—'}</p>
        <p className="card-text"><strong>Description :</strong> {description || '—'}</p>
       <p className="card-text"><strong>Note :</strong> {rating || '—'}</p>
      </div>
    </div>
  )
}
