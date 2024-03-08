const EmploymentType = props => {
  const {EmploymentTypeDetails, renderJobType} = props
  const {label, employmentTypeId} = EmploymentTypeDetails
  const selectJob = event => {
    renderJobType(employmentTypeId)
  }
  return (
    <li>
      <input type="checkbox" id={employmentTypeId} onClick={selectJob} />
      <label htmlFor={employmentTypeId}>{label}</label> <br />
    </li>
  )
}
export default EmploymentType
