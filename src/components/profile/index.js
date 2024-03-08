import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
const profileStatusConst = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {profileObj: {}, profileStatus: profileStatusConst.loading}
  componentDidMount() {
    this.getProfile()
  }
  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    //Retry
    const profileData = await fetch(url, options)

    const data = await profileData.json()
    if (profileData.ok === true) {
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileObj: updateData,
        profileStatus: profileStatusConst.success,
      })
    } else {
      this.setState({profileStatus: profileStatusConst.failure})
    }
  }
  ReloadProfile =()=>{
    this.getProfile();
  }

  renderFailureProfileView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for"</p>
      <button onClick={this.ReloadProfile}>Retry</button>
    </div>
  )
  renderSuccessProfileView = () => {
     const {profileObj,profileStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileObj
    return (
      <div className="profile">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profileName">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
  render() {
    const {profileObj,profileStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileObj
    switch (profileStatus){
      case profileStatusConst.success:
          return this.renderSuccessProfileView();
      case profileStatusConst.failure :
           return this.renderFailureProfileView()
      default :
          return null
    }
  }
}
export default Profile
