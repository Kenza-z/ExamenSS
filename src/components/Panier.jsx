export function Panier({ cart = [], total = 0, onInc, onDec, onRemove, onSetQty }) {
  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="m-0">Panier</h5>
        <span className="badge text-bg-secondary">{cart.length} produit(s)</span>
      </div>

      <div className="card-body p-0">
        {cart.length === 0 ? (
          <div className="p-3 text-muted">Votre panier est vide.</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th className="text-end">Prix</th>
                  <th style={{width: 160}}>Quantité</th>
                  <th className="text-end">Sous-total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td className="text-end">{item.price.toFixed(2)} €</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => onDec?.(item.id)} aria-label="Diminuer">−</button>
                        <input
                          type="number"
                          min="1"
                          className="form-control form-control-sm text-center"
                          value={item.qty}
                          onChange={e => onSetQty?.(item.id, e.target.value)}
                          style={{maxWidth: 72}}
                          aria-label="Quantité"
                        />
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => onInc?.(item.id)} aria-label="Augmenter">+</button>
                      </div>
                    </td>
                    <td className="text-end">{(item.price * item.qty).toFixed(2)} €</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove?.(item.id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={3} className="text-end">Total</th>
                  <th className="text-end">{total.toFixed(2)} €</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
