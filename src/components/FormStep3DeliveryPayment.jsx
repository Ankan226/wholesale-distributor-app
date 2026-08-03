export default function FormStep3DeliveryPayment({ data, errors, onChange }) {
  const handle = (field) => (e) => onChange(field, e.target.value)

  return (
    <div className="card">
      <h2>Delivery & Payment</h2>

      <div className="field">
        <label htmlFor="deliveryDate">Delivery Date</label>
        <input
          id="deliveryDate"
          type="date"
          value={data.deliveryDate}
          onChange={handle('deliveryDate')}
          aria-invalid={!!errors.deliveryDate}
          aria-describedby={errors.deliveryDate ? 'deliveryDate-error' : undefined}
        />
        {errors.deliveryDate && (
          <p className="error-text" id="deliveryDate-error">{errors.deliveryDate}</p>
        )}
      </div>

      <fieldset className="field" style={{ border: 'none', padding: 0 }}>
        <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
          Payment Method
        </legend>
        {['Cash on Delivery', 'Bank Transfer', 'Credit Terms'].map((method) => (
          <label key={method} style={{ display: 'block', fontWeight: 400, marginBottom: 6 }}>
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={data.paymentMethod === method}
              onChange={handle('paymentMethod')}
              style={{ width: 'auto', marginRight: 8 }}
            />
            {method}
          </label>
        ))}
        {errors.paymentMethod && <p className="error-text">{errors.paymentMethod}</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="notes">Delivery Notes (optional)</label>
        <textarea
          id="notes"
          rows={3}
          value={data.notes}
          onChange={handle('notes')}
        />
      </div>
    </div>
  )
}