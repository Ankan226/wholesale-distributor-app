export default function FormStep1BusinessInfo({ data, errors, onChange }) {
  const handle = (field) => (e) => onChange(field, e.target.value)

  return (
    <div className="card">
      <h2>Business Information</h2>

      <div className="field">
        <label htmlFor="businessName">Business Name</label>
        <input
          id="businessName"
          type="text"
          value={data.businessName}
          onChange={handle('businessName')}
          aria-invalid={!!errors.businessName}
          aria-describedby={errors.businessName ? 'businessName-error' : undefined}
        />
        {errors.businessName && (
          <p className="error-text" id="businessName-error">{errors.businessName}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="contactPerson">Contact Person</label>
        <input
          id="contactPerson"
          type="text"
          value={data.contactPerson}
          onChange={handle('contactPerson')}
          aria-invalid={!!errors.contactPerson}
          aria-describedby={errors.contactPerson ? 'contactPerson-error' : undefined}
        />
        {errors.contactPerson && (
          <p className="error-text" id="contactPerson-error">{errors.contactPerson}</p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={handle('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p className="error-text" id="email-error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone (10 digits)</label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={handle('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p className="error-text" id="phone-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="address">Street Address</label>
        <input
          id="address"
          type="text"
          value={data.address}
          onChange={handle('address')}
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && <p className="error-text" id="address-error">{errors.address}</p>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={data.city}
            onChange={handle('city')}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && <p className="error-text" id="city-error">{errors.city}</p>}
        </div>

        <div className="field">
          <label htmlFor="zipCode">ZIP Code</label>
          <input
            id="zipCode"
            type="text"
            value={data.zipCode}
            onChange={handle('zipCode')}
            aria-invalid={!!errors.zipCode}
            aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
          />
          {errors.zipCode && <p className="error-text" id="zipCode-error">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  )
}