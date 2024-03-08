import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const SimilarJob = props => {
  const {simlar} = props
  const simlarUpdate = {
    companyLogoUrl: simlar.company_logo_url,

    employmentType: simlar.employment_type,

    jobDescription: simlar.job_description,
    location: simlar.location,

    rating: simlar.rating,

    title: simlar.title,
  }
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = simlarUpdate
  return (
    <li className="jobcard">
      <div className="jobMainBg ">
        <img
          src={companyLogoUrl}
          className="CompanyLogo"
          alt="similar job company logo"
        />
        <div>
          <h1 className="jobTitle ">{title}</h1>
          <p className="rating ">
            {' '}
            <FaStar className="star" />
            {rating}
          </p>
        </div>
      </div>
      <h1 className="text">Description</h1>
      <p className="text">{jobDescription}</p>
      <div className="locationCard ">
        <p className="text">
          {' '}
          <IoLocationSharp />
          {location}
        </p>
        <p className="text">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJob
