import { PanierForm } from './PanierForm'
import { PanierCard } from './ProductCard'

export function Panier({ products = [] }) {

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {products.map(product => (
        <div className="col" key={product.id}>
          <PanierCard
            nom={product.title}
            prix={product.price}
          />
          <button>Supprimer</button>
          <PanierForm />

        </div>
      ))}
    </div>
  )
}
