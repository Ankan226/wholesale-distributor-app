# Wholesale Distributor Application

An internal digital ordering tool built for a brewery client to replace manual paper systems and Excel-based order tracking. Built for floor staff to log wholesale distributor orders quickly and reliably, even on unstable network connections.

**Ticket:** ENG-72018 | **Epic:** Core Infrastructure Overhaul | **Priority:** P1 (High) | **Story Points:** 5

**Live Link:-** https://wholesale-distributor-app-eta.vercel.app/

---

## Overview

Brewery floor staff previously tracked wholesale distributor orders using paper forms and Excel sheets, leading to data loss and operational slowdowns. This application digitizes that workflow into a clean, guided, multi-step form that:

- Captures business, order, and delivery/payment details
- Validates input in real time with clear, inline error messaging
- Works reliably under poor connectivity (simulated slow-network handling)
- Meets enterprise-grade accessibility and security standards

## Features

- **4-step guided form** — Business Info → Order Details → Delivery & Payment → Review & Submit
- **Real-time validation** using custom regex (no external validation library)
- **Dynamic product line items** — add/remove products for an order on the fly
- **Empty state handling** — no blank screens, ever
- **Slow-connection simulation** — visible loading indicator on submit
- **Accessible by design** — ARIA labels, keyboard navigation, visible focus states
- **XSS-safe inputs** — all text sanitized before entering React state
- **Simulated analytics** — console-logged telemetry on key user actions
- **Monochromatic corporate design system** — consistent 16px/32px spacing, no rogue colors

## Screenshots

 1. Business Info

    <img width="910" height="882" alt="image" src="https://github.com/user-attachments/assets/611ce7ed-3e0f-401a-8adc-85896c6b7f6b" />


 2. Order Details (empty state) 

    <img width="911" height="608" alt="image" src="https://github.com/user-attachments/assets/9be30e0d-e9df-4426-9f35-f9f8a7dae63a" />


 3. Order Details (with products)

    <img width="935" height="652" alt="image" src="https://github.com/user-attachments/assets/21444d29-9a79-4b0b-b7e8-a724c288915b" />


 4. Validation errors
    
    <img width="934" height="845" alt="image" src="https://github.com/user-attachments/assets/d321e33a-8450-4faa-9803-7c19787210ad" />


 5. Delivery & Payment
    
   <img width="924" height="824" alt="image" src="https://github.com/user-attachments/assets/23bd52d4-c63c-4b92-928f-66eb809bc220" />


 6. Review & Submit
     
   <img width="866" height="873" alt="image" src="https://github.com/user-attachments/assets/497d3bc0-dd80-4105-9023-b4be8762a0ac" />


 7. Success confirmation
     
    <img width="912" height="434" alt="image" src="https://github.com/user-attachments/assets/88a2c34a-ec49-43e1-9802-5e7d9ac2802e" />



### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes bundled with Node.js)

### Installation

```bash
git clone https://github.com/yourusername/wholesale-distributor-app.git
cd wholesale-distributor-app
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).


## Form Flow

1. **Business Information** — business name, contact person, email, phone, address, city, ZIP
2. **Order Details** — add/remove products with quantity and unit (cases, kegs, pallets, bottles)
3. **Delivery & Payment** — delivery date, payment method, optional notes
4. **Review & Submit** — read-only summary of all entered data, then submit

Each step is validated before the user can advance; invalid fields are flagged inline and the user cannot proceed until they're corrected.

## Edge Case Handling

Per the ticket's "Unhappy Path" requirements:

- **Empty states** — if the order has zero products, an `EmptyState` component is shown instead of a blank screen
- **Bad connectivity** — order submission simulates network latency (1.8s) with a visible `LoadingSpinner`, so the UI never appears frozen
- **Invalid inputs** — malformed or missing fields block submission and are highlighted in red with an inline error message (`aria-invalid` + `.error-text`)

## Accessibility

- Every input has an associated `<label htmlFor>`
- Invalid fields use `aria-invalid="true"` and `aria-describedby` pointing to their error text
- Radio group uses a semantic `<fieldset>`/`<legend>`
- All interactive elements are native `<button>`, `<input>`, `<select>` — keyboard-navigable by default
- Step indicator uses `aria-current="step"` for the active step
- Loading and success states use `role="status"` / `aria-live="polite"` so screen readers announce changes

Target: 100% Lighthouse accessibility score.

## Security

- All free-text input is passed through `sanitizeInput()` (`src/utils/sanitize.js`) before being stored in React state, escaping `< > & " ' \``
- No real API keys, secrets, or PII are hardcoded anywhere in the source
- Form submission is simulated client-side only (`setTimeout`) — no live network calls are made

> When wiring this up to a real backend, store your API endpoint and any keys in a `.env` file (already excluded via `.gitignore`) and never commit them.

## Deployment

This is a static Vite app and deploys cleanly to Vercel, Netlify, or GitHub Pages.

**Vercel / Netlify:**
1. Import this repository
2. Build command: `npm run build`
3. Output directory: `dist`

**Manual build:**
```bash
npm run build
npm run preview
```

## Author

**Ankan Pal** — [PDIT-INT-1187]
Assigned by Amit Sharma (Module Lead) · Ticket [ENG-72018]
