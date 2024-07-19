const LocationType = props => {
  const {LocationTypeDetails, renderJobLocation} = props
  const {label, locationId} = LocationTypeDetails
  const selectJob = event => {
    renderJobLocation(locationId)
  }
  return (
    <li>
      <input type="checkbox" id={locationId} onClick={selectJob} />
      <label htmlFor={locationId}>{label}</label> <br />
    </li>
  )
}
export default LocationType
