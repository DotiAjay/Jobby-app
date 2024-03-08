import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const LogOut = () => {
    console.log('called')
    const {history} = props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }
  return (
    <div className="headerContainer">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="headerImg"
        />
      </div>
      <ul type="none" className="HeaderList">
        <Link to="/">
          <li className="headerItem">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="headerItem">Jobs</li>
        </Link>
        <li>
          <Link to="/jobs">
            <button onClick={LogOut}>Logout</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
