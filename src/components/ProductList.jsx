import { ProductCard } from './ProductCard'

export function ProductList({ products = [] }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {products.map(product => (
        <div className="col" key={product.id}>
          <ProductCard
            nom={product.title}
            prix={product.price}
            categorie={product.category}
            description={product.description}
            rating={product.rating}
          />
        </div>
      ))}
    </div>
  )
}
