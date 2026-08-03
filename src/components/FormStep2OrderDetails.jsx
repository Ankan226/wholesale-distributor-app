import EmptyState from './EmptyState.jsx'

export default function FormStep2OrderDetails({ products, errors, onProductsChange }) {
  const addProduct = () => {
    onProductsChange([...products, { name: '', quantity: '', unit: 'cases' }])
  }

  const removeProduct = (idx) => {
    onProductsChange(products.filter((_, i) => i !== idx))
  }

  const updateProduct = (idx, field, value) => {
    const next = products.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    onProductsChange(next)
  }

  return (
    <div className="card">
      <h2>Order Details</h2>

      {products.length === 0 && (
        <EmptyState message="No products added yet. Click 'Add Product' to start the order." />
      )}

      {errors.products && <p className="error-text">{errors.products}</p>}

      {products.map((p, idx) => (
        <div className="product-row" key={idx}>
          <div className="field">
            <label htmlFor={`product-name-${idx}`}>Product Name</label>
            <input
              id={`product-name-${idx}`}
              type="text"
              value={p.name}
              onChange={(e) => updateProduct(idx, 'name', e.target.value)}
              aria-invalid={!!errors[`product-${idx}-name`]}
              aria-describedby={errors[`product-${idx}-name`] ? `product-name-error-${idx}` : undefined}
            />
            {errors[`product-${idx}-name`] && (
              <p className="error-text" id={`product-name-error-${idx}`}>
                {errors[`product-${idx}-name`]}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={`product-qty-${idx}`}>Quantity</label>
            <input
              id={`product-qty-${idx}`}
              type="number"
              min="1"
              value={p.quantity}
              onChange={(e) => updateProduct(idx, 'quantity', e.target.value)}
              aria-invalid={!!errors[`product-${idx}-quantity`]}
              aria-describedby={errors[`product-${idx}-quantity`] ? `product-qty-error-${idx}` : undefined}
            />
            {errors[`product-${idx}-quantity`] && (
              <p className="error-text" id={`product-qty-error-${idx}`}>
                {errors[`product-${idx}-quantity`]}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={`product-unit-${idx}`}>Unit</label>
            <select
              id={`product-unit-${idx}`}
              value={p.unit}
              onChange={(e) => updateProduct(idx, 'unit', e.target.value)}
            >
              <option value="cases">Cases</option>
              <option value="kegs">Kegs</option>
              <option value="pallets">Pallets</option>
              <option value="bottles">Bottles</option>
            </select>
          </div>

          <button
            type="button"
            className="remove-btn"
            onClick={() => removeProduct(idx)}
            aria-label={`Remove product row ${idx + 1}`}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-secondary" onClick={addProduct}>
        + Add Product
      </button>
    </div>
  )
}