import './index.css'

const SalaryRange = props => {
  const {salarydetails, OnselectSalaryRange} = props
  const {salaryRangeId, label} = salarydetails
  const salaryRange = event => {
    OnselectSalaryRange(salaryRangeId)
  }
  return (
    <li className="salaryItem">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        onClick={salaryRange}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
