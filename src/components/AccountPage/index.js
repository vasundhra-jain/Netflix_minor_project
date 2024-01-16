import Cookies from 'js-cookie'
import Header from '../Header'
import ContactSection from '../ContactSection'
import CredentialContext from '../../Context/CredentialContext'
import './index.css'

const AccountPage = props => (
  <CredentialContext.Consumer>
    {value => {
      const {username, password} = value
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      return (
        <div className="account-page-background">
          <Header />
          <div className="account-page-content-container">
            <h1 className="account-page-heading">Account</h1>
            <hr />
            <div className="account-page-detail-container">
              <p className="account-page-detail-heading">Member ship</p>
              <div>
                <p className="account-page-detail-para">{username}</p>
                <p className="account-page-detail-password-para">
                  Password:
                  <input
                    type="password"
                    value={password}
                    className="mask-password"
                  />
                </p>
              </div>
            </div>
            <hr />
            <div className="account-page-detail-container">
              <p className="account-page-detail-heading">Plan details</p>
              <div className="account-page-detail-container">
                <p className="account-page-detail-para">Premium</p>
                <p className="account-page-detail-ultra-para">Ultra HD</p>
              </div>
            </div>
            <hr />
            <div className="account-page-btn-container">
              <button
                type="button"
                onClick={onClickLogout}
                className="account-page-btn"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="account-page-btn-container">
            <ContactSection />
          </div>
        </div>
      )
    }}
  </CredentialContext.Consumer>
)

export default AccountPage
