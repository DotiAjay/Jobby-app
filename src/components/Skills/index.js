import './index.css'

const SKills = props => {
  console.log(props)
  const {skillDetails} = props
  const {image_url, name} = skillDetails
  return (
    <li className="list">
      <img src={image_url} alt={name} className="skillImg" />
      <p className="skillName">{name}</p>
    </li>
  )
}

export default SKills
