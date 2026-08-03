import LoadingSpinner from './LoadingSpinner.jsx'

export default function FormStep4Review({ formData, isSubmitting, submitted, onSubmit }) {
  const { businessInfo, products, delivery } = formData

  if (submitted) {
    return (
      <div className="card success-box" role="status">
        <h2>Application Submitted</h2>
        <p>Thank you, {businessInfo.contactPerson}. The order for {businessInfo.businessName} has been recorded.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Review & Submit</h2>

      <div className="review-section">
        <h3>Business Info</h3>
        <div className="review-row"><span>Business</span><span>{businessInfo.businessName}</span></div>
        <div className="review-row"><span>Contact</span><span>{businessInfo.contactPerson}</span></div>
        <div className="review-row"><span>Email</span><span>{businessInfo.email}</span></div>
        <div className="review-row"><span>Phone</span><span>{businessInfo.phone}</span></div>
        <div className="review-row"><span>Address</span><span>{businessInfo.address}, {businessInfo.city} {businessInfo.zipCode}</span></div>
      </div>

      <div className="review-section">
        <h3>Order</h3>
        {products.length === 0 ? (
          <p>No products in this order.</p>
        ) : (
          products.map((p, idx) => (
            <div className="review-row" key={idx}>
              <span>{p.name}</span>
              <span>{p.quantity} {p.unit}</span>
            </div>
          ))
        )}
      </div>

      <div className="review-section">
        <h3>Delivery & Payment</h3>
        <div className="review-row"><span>Delivery Date</span><span>{delivery.deliveryDate}</span></div>
        <div className="review-row"><span>Payment</span><span>{delivery.paymentMethod}</span></div>
        {delivery.notes && <div className="review-row"><span>Notes</span><span>{delivery.notes}</span></div>}
      </div>

      {isSubmitting ? (
        <LoadingSpinner label="Submitting order, please wait (simulating slow connection)..." />
      ) : (
        <button type="button" className="btn btn-primary" onClick={onSubmit}>
          Submit Order
        </button>
      )}
    </div>
  )
}