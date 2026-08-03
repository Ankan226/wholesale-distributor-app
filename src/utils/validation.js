export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[0-9]{10}$/,
  zip: /^[0-9]{5,6}$/,
  lettersOnly: /^[a-zA-Z\s.'-]+$/,
}

export function validateBusinessInfo(data) {
  const errors = {}
  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Business name is required (min 2 characters).'
  }
  if (!data.contactPerson || !REGEX.lettersOnly.test(data.contactPerson.trim())) {
    errors.contactPerson = 'Enter a valid contact person name (letters only).'
  }
  if (!data.email || !REGEX.email.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!data.phone || !REGEX.phone.test(data.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit phone number, no spaces or dashes.'
  }
  if (!data.address || data.address.trim().length < 5) {
    errors.address = 'Address is required (min 5 characters).'
  }
  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required.'
  }
  if (!data.zipCode || !REGEX.zip.test(data.zipCode.trim())) {
    errors.zipCode = 'Enter a valid ZIP/postal code (5-6 digits).'
  }
  return errors
}

export function validateOrderDetails(products) {
  const errors = {}
  if (!products || products.length === 0) {
    errors.products = 'Add at least one product to the order.'
    return errors
  }
  products.forEach((p, idx) => {
    if (!p.name || p.name.trim().length < 2) {
      errors[`product-${idx}-name`] = 'Product name is required.'
    }
    if (!p.quantity || isNaN(p.quantity) || Number(p.quantity) <= 0) {
      errors[`product-${idx}-quantity`] = 'Enter a valid quantity greater than 0.'
    }
  })
  return errors
}

export function validateDeliveryPayment(data) {
  const errors = {}
  if (!data.deliveryDate) {
    errors.deliveryDate = 'Delivery date is required.'
  } else {
    const selected = new Date(data.deliveryDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) {
      errors.deliveryDate = 'Delivery date cannot be in the past.'
    }
  }
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Select a payment method.'
  }
  return errors
}