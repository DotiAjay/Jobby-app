import {Link, withRouter} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const Jobs = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,

    employmentType,
    id,
    jobDescription,
    location,

    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div className="Bg">
          <div>
            <div className="jobMainBg">
              <img
                src={companyLogoUrl}
                className="CompanyLogo"
                alt="company logo"
              />
              <div>
                <h1 className="jobTitle">{title}</h1>
                <p className="rating">
                  {' '}
                  <FaStar className="star" />
                  {rating}
                </p>
              </div>
            </div>
            <div className="locationCard">
              <div className="location">
                <p className="locationText">
                  {' '}
                  <IoLocationSharp />
                  {location}
                </p>
                <p className="locationText">{employmentType}</p>
              </div>
              <div>
                <p className="locationText">{packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div className="text">
              <h1>Description</h1>
              <p>{jobDescription}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Jobs
