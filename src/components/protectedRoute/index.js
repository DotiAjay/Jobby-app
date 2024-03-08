import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
const ProtectedRoute = props => {
  const JWTCookie = Cookies.get('jwtToken')
  if (JWTCookie === undefined) {
    return <Redirect to="/login" />
  } else {
    return <Route {...props} />
  }
}
export default ProtectedRoute
