import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', userPassword: '', isloginFailure: false, errorMsg: ''}

  onUSerInput = event => {
    this.setState({userName: event.target.value})
  }
  onUserPass = event => {
    this.setState({userPassword: event.target.value})
  }
  SucessfullLogin = jwt_token => {
    const {history} = this.props
    Cookies.set('jwtToken', jwt_token, {expires: 30})
    history.replace('/')
  }
  failureLogin = msg => {
    this.setState({isloginFailure: true, errorMsg: msg})
  }

  getJobDetails = async event => {
    event.preventDefault()

    const {userName, userPassword} = this.state
    const userDetails = {
      username: userName,
      password: userPassword,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.SucessfullLogin(data.jwt_token)
    } else {
      this.failureLogin(data.error_msg)
    }
  }
  render() {
    const {userName, userPassword, isloginFailure, errorMsg} = this.state
    const jwt = Cookies.get('jwtToken')

    if (jwt !== undefined) {
      ;<Redirect to='/' />
    }

    return (
      <div>
        <div className='loginBG'>
          <form className='inputCard' onSubmit={this.getJobDetails}>
            <img
              src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
              alt='website logo'
              className='loginLogo'
            />{' '}
            <br />
            <div>
              <label htmlFor='userName' className='formLabel'>
                USERNAME
              </label>{' '}
              <br />
              <input
                type='text'
                id='userName'
                placeholder='Username'
                className='userInput'
                onChange={this.onUSerInput}
              />{' '}
              <br />
              <label htmlFor='UserPass' className='formLabel'>
                PASSWORD
              </label>{' '}
              <br />
              <input
                type='password'
                id='UserPass'
                placeholder='Password'
                className='userInput'
                onChange={this.onUserPass}
              />{' '}
              <br />
              <button type='submit' className='loginButton'>
                Login
              </button>
              {isloginFailure && <p>{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
