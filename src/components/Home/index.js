import Header from '../Header'
import './index.css'

const Home = () => {
  const FindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="HomeContainer">
      <Header />

      <div>
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p className="HomePara">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abitlites abd potential
        </p>
        <button className="HomeJobsBut" onClick={FindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
