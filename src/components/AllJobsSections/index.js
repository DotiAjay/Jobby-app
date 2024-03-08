import {Component} from 'react'
import Cookies from 'js-cookie'
import Jobs from '../Job'
import Header from '../Header'
import Profile from '../profile'
import SalaryRange from '../SalaryRange'
import EmploymentType from '../EmploymentType'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const ApiConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsView extends Component {
  state = {
    jobList: [],
    userSearchInput: '',
    employmentType: [],
    minimumPackage: '',
    search: '',
    apiStatus: ApiConst.loading,
  }
  componentDidMount() {
    this.getJobs()
  }
  searchInput = event => {
    this.setState({userSearchInput: event.target.value})
  }
  renderJobType = type => {
    const {employmentType} = this.state
    this.setState({apiStatus: ApiConst.loading})
    const employment = [...employmentType, type]
    this.setState(
      {employmentType: employment, apiStatus: ApiConst.success},
      this.getJobs,
    )
  }
  renderSerchList = () => {
    const {jobList, userSearchInput} = this.state
    this.setState({apiStatus: ApiConst.loading})
    const searchList = jobList.filter(each =>
      each.title.toLowerCase().includes(userSearchInput.toLowerCase()),
    )
    this.setState(
      {
        jobList: searchList,
        search: userSearchInput,
        apiStatus: ApiConst.success,
      },
      this.getJobs,
    )
  }
  OnselectSalaryRange = id => {
    this.setState({apiStatus: ApiConst.loading})
    console.log(id)
    this.setState(
      {minimumPackage: id, apiStatus: ApiConst.success},
      this.getJobs,
    )
  }

  getJobs = async () => {
    const {minimumPackage, search, employmentType} = this.state
    const val = employmentType.join()

    const url = `https://apis.ccbp.in/jobs?employment_type=${val}&minimum_package=${minimumPackage}&search=${search}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,

        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,

        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobList: updatedData, apiStatus: ApiConst.success})
    } else {
      this.setState({jobList: updatedData, apiStatus: ApiConst.failure})
    }
  }

  renderLoading = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="blue" height="30px" />
      </div>
    )
  }
  render() {
    const {jobList, userSearchInput, apiStatus} = this.state
    return (
      <div>
        <Header />
        <div className="mainbg">
          <div className="sideBar">
            <div>
              <Profile />
            </div>
            <hr />
            <div className="text">
              <p>Type of Employment</p>
              <ul type="none" className="salaryItem">
                {employmentTypesList.map(each => (
                  <EmploymentType
                    EmploymentTypeDetails={each}
                    key={each.employmentTypeId}
                    renderJobType={this.renderJobType}
                  />
                ))}
              </ul>
              <hr />
              <h1>Salary Range</h1>
              <ul type="none">
                {salaryRangesList.map(each => (
                  <SalaryRange
                    salarydetails={each}
                    key={each.salaryRangeId}
                    OnselectSalaryRange={this.OnselectSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <input
              type="search"
              placeholder="Search"
              className="searchBar"
              onChange={this.searchInput}
              value={userSearchInput}
            />{' '}
            <button
              className="searchBut"
              type="button"
              onClick={this.renderSerchList}
              data-testid="searchButton"
            >
              <FaSearch className="text" />
            </button>
            <ul type="none">
              {jobList.length > 0 ? (
                jobList.map(eachItem => (
                  <Jobs jobDetails={eachItem} key={eachItem.id} />
                ))
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                    alt="no jobs"
                    className="noJobs"
                  />
                  <h1 className="text">No Jobs Found</h1>
                  <p className="text">
                    We could not find any jobs. Try other filters"
                  </p>
                  <button>Retry</button>
                </div>
              )}
              {apiStatus === 'LOADING' && this.renderLoading()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsView
