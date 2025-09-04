import { ProductCard } from './ProductCard'

export function ProductList({ products = [], onAdd }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {products.map(product => (
        <div className="col" key={product.id}>
          <ProductCard product={product} onAdd={onAdd} />
        </div>
      ))}
    </div>
  )
}
