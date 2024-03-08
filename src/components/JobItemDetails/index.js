import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import SimilarJob from '../similarJobs'
import SKills from '../Skills'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
const ApiConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class jobDetails extends Component {
  state = {
    jd: {},
    reqSkills: [],
    aboutCompany: {},
    similarItem: [],
    JobDetailsApiStatus: ApiConst.loading,
  }
  componentDidMount() {
    this.getJobDetails()
  }
  retry = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const jwt = Cookies.get('jwtToken')
    console.log(jwt)
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const JobUpdate = {
        companyLogoUrl: data.job_details.company_logo_url,

        companyWebsiteUrl: data.job_details.company_website_url,

        employmentType: data.job_details.employment_type,

        id: data.job_details.id,

        jobDescription: data.job_details.job_description,

        lifeAtCompany: data.job_details.life_at_company,

        location: data.job_details.location,

        packagePerAnnum: data.job_details.package_per_annum,

        rating: data.job_details.rating,

        skills: data.job_details.skills,

        title: data.job_details.title,
      }
      this.setState({
        jd: JobUpdate,
        reqSkills: JobUpdate.skills,
        aboutCompany: JobUpdate.lifeAtCompany,
        similarItem: data.similar_jobs,
        JobDetailsApiStatus: ApiConst.success,
      })
    } else {
      this.setState({JobDetailsApiStatus: ApiConst.failure})
    }
  }
  renderFailuerJob = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.retry}>Retry</button>
    </div>
  )

  renderSuccess = () => {
    console.log('called')
    const {jd, reqSkills, aboutCompany, similarItem} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,

      employmentType,
      id,
      jobDescription,
      location,

      packagePerAnnum,
      skills,
      lifeAtCompany,
      rating,
      title,
    } = jd
    const {description, image_url} = aboutCompany
    return (
      <div>
        <Header />
        <div className="jobBg">
          <div className="jobMainBg">
            <img
              src={companyLogoUrl}
              className="CompanyLogo"
              alt="job details company logo"
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
          <div>
            <h1 className="text">Skills</h1>
            <ul type="none" className="list ">
              {reqSkills.map(each => (
                <SKills skillDetails={each} key={each.name} />
              ))}
            </ul>
          </div>
          <div>
            <p className="text">Life of Company</p>
            <div className="aboutCompanyCard">
              <p className="text">{description}</p>
              <img src={image_url} className="aboutCompanyImg" />
            </div>
          </div>
          <div>
            <h1 className="text">Similar Jobs</h1>
            <ul type="none" className="list">
              {similarItem.map(eachItem => (
                <SimilarJob simlar={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  renderLoading = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="blue" height="30px" />
      </div>
    )
  }

  render() {
    const {jd, reqSkills, aboutCompany, similarItem, JobDetailsApiStatus} =
      this.state

    switch (JobDetailsApiStatus) {
      case ApiConst.success:
        return this.renderSuccess()
      case ApiConst.failure:
        return this.renderFailuerJob()
      case ApiConst.loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}
export default jobDetails
