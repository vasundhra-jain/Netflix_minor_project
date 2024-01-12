import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderForm = () => {
    const {showSubmitError, errorMsg, username, password} = this.state
    return (
      <div className="login-page">
        <img
          src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/app_logo_bsm8pk.png"
          alt="login website logo"
          className="login-website-logo"
        />
        <div className="login-page-form-container">
          <form onSubmit={this.submitForm} className="login-page-form">
            <h1 className="login-page-heading">Login</h1>
            <div className="login-page-credential-container">
              <label htmlFor="username" className="login-page-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-page-input"
                onChange={this.onChangeUsername}
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="login-page-credential-container">
              <label htmlFor="password" className="login-page-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="login-page-input"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-page-signIn-button">
              Sign in
            </button>
            <button type="submit" className="login-page-login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return <>{this.renderForm()}</>
  }
}

export default LoginPage
