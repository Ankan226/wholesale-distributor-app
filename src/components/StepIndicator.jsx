const STEPS = ['Business Info', 'Order Details', 'Delivery & Payment', 'Review & Submit']

export default function StepIndicator({ currentStep }) {
  return (
    <ol className="step-indicator" aria-label="Form progress">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1
        const isCurrent = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        return (
          <li
            key={label}
            aria-current={isCurrent ? 'step' : undefined}
            className={isCompleted ? 'completed' : ''}
          >
            {stepNum}. {label}
          </li>
        )
      })}
    </ol>
  )
}