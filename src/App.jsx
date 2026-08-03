import { useState } from 'react'
import StepIndicator from './components/StepIndicator.jsx'
import FormStep1BusinessInfo from './components/FormStep1BusinessInfo.jsx'
import FormStep2OrderDetails from './components/FormStep2OrderDetails.jsx'
import FormStep3DeliveryPayment from './components/FormStep3DeliveryPayment.jsx'
import FormStep4Review from './components/FormStep4Review.jsx'
import { sanitizeInput } from './utils/sanitize.js'
import { logAnalyticsEvent } from './utils/analytics.js'
import {
  validateBusinessInfo,
  validateOrderDetails,
  validateDeliveryPayment,
} from './utils/validation.js'

const initialBusinessInfo = {
  businessName: '',
  contactPerson: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
}

const initialDelivery = {
  deliveryDate: '',
  paymentMethod: '',
  notes: '',
}

export default function App() {
  const [step, setStep] = useState(1)
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo)
  const [products, setProducts] = useState([])
  const [delivery, setDelivery] = useState(initialDelivery)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Controlled, sanitized field updates — never mutate state directly
  const updateBusinessField = (field, value) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: sanitizeInput(value) }))
  }

  const updateProducts = (nextProducts) => {
    const sanitized = nextProducts.map((p) => ({
      ...p,
      name: sanitizeInput(p.name),
    }))
    setProducts(sanitized)
  }

  const updateDeliveryField = (field, value) => {
    setDelivery((prev) => ({ ...prev, [field]: sanitizeInput(value) }))
  }

  const goNext = () => {
    let stepErrors = {}
    if (step === 1) stepErrors = validateBusinessInfo(businessInfo)
    if (step === 2) stepErrors = validateOrderDetails(products)
    if (step === 3) stepErrors = validateDeliveryPayment(delivery)

    setErrors(stepErrors)

    if (Object.keys(stepErrors).length > 0) {
      logAnalyticsEvent(`validation failed on step ${step}`)
      return
    }

    logAnalyticsEvent(`advanced from step ${step} to step ${step + 1}`)
    setStep((s) => Math.min(s + 1, 4))
  }

  const goBack = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    logAnalyticsEvent('order submitted')

    // Simulated network latency (spotty connection scenario)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1800)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Wholesale Distributor Application</h1>
        <p>Brewery Order Intake — internal floor staff tool</p>
      </header>

      <StepIndicator currentStep={step} />

      {step === 1 && (
        <FormStep1BusinessInfo data={businessInfo} errors={errors} onChange={updateBusinessField} />
      )}

      {step === 2 && (
        <FormStep2OrderDetails products={products} errors={errors} onProductsChange={updateProducts} />
      )}

      {step === 3 && (
        <FormStep3DeliveryPayment data={delivery} errors={errors} onChange={updateDeliveryField} />
      )}

      {step === 4 && (
        <FormStep4Review
          formData={{ businessInfo, products, delivery }}
          isSubmitting={isSubmitting}
          submitted={submitted}
          onSubmit={handleSubmit}
        />
      )}

      {!submitted && (
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={goBack}
            disabled={step === 1}
          >
            Back
          </button>
          {step < 4 && (
            <button type="button" className="btn btn-primary" onClick={goNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}