import './Amount.css'

function Amount({ amount } : { amount: number }) {
  return (
    <div className="amount-container">
      <p>Found: { amount }</p>
    </div>
  )
}

export default Amount