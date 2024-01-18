import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'
import CredentialContext from '../../Context/CredentialContext'

class Header extends Component {
  state = {extend: false, showSearchBar: false, searchValue: ''}

  extendSearchBar = () => {
    this.setState({showSearchBar: true})
  }

  extendHeader = () => {
    this.setState({extend: true})
  }

  closeHeader = () => {
    this.setState({extend: false})
  }

  changeValue = event => {
    this.setState({searchValue: event.target.value})
  }

  showSearchResults = () => {
    const {history} = this.props
    history.push('/search')
  }

  renderHeader = () => (
    <CredentialContext.Consumer>
      {value => {
        const {extend, showSearchBar, searchValue} = this.state
        const {setSearchValue} = value
        const showSearchResults = () => {
          setSearchValue(searchValue)
          const {history} = this.props
          history.push('/search')
        }
        return (
          <>
            <div className="small-device-main-header-container">
              <div className="small-device-header-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/app_logo_bsm8pk.png"
                    alt="website logo"
                    className="small-device-website-logo"
                  />
                </Link>
                <div className="small-device-header-button-container">
                  {showSearchBar ? (
                    <div className="search-bar-container">
                      <input
                        type="search"
                        className="search-bar-input"
                        onChange={this.changeValue}
                        value={searchValue}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="device-header-button-extended"
                        onClick={showSearchResults}
                      >
                        <HiOutlineSearch className="search-icon-extended" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="device-header-button"
                      onClick={this.extendSearchBar}
                    >
                      <HiOutlineSearch className="search-icon" />
                    </button>
                  )}

                  <button
                    type="button"
                    className="device-header-button"
                    onClick={this.extendHeader}
                  >
                    <img
                      src="https://res.cloudinary.com/dz6uvquma/image/upload/v1705071256/add-to-queue_1queue_gf7zng.svg"
                      alt="addToQueue"
                    />
                  </button>
                </div>
              </div>
              {extend ? (
                <div className="small-device-header-container">
                  <ul className="small-device-extended-header-ul">
                    <li>
                      <Link
                        to="/"
                        className="small-device-extended-header-links"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/popular"
                        className="small-device-extended-header-links"
                      >
                        Popular
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/account"
                        className="small-device-extended-header-links"
                      >
                        Account
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="small-device-extended-header-close-button"
                        onClick={this.closeHeader}
                      >
                        <IoMdCloseCircle className="small-device-extended-header-close-icon" />
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
            <>
              <div className="large-device-header-container">
                <div className="large-device-header-sub-container-1">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/app_logo_bsm8pk.png"
                      alt="website logo"
                      className="large-device-website-logo"
                    />
                  </Link>

                  <Link
                    to="/popular"
                    className="large-device-extended-header-links"
                  >
                    Popular
                  </Link>

                  <Link
                    to="/account"
                    className="small-device-extended-header-links"
                  >
                    Account
                  </Link>
                </div>
                <div className="large-device-header-sub-container-2">
                  {showSearchBar ? (
                    <div className="search-bar-container">
                      <input
                        type="search"
                        className="search-bar-input"
                        onChange={this.changeValue}
                        value={searchValue}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="device-header-button-extended"
                        onClick={showSearchResults}
                      >
                        <HiOutlineSearch className="search-icon-extended" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="device-header-button"
                      onClick={this.extendSearchBar}
                    >
                      <HiOutlineSearch className="search-icon" />
                    </button>
                  )}
                  <Link to="/profile" className="large-device-profile-link">
                    <img
                      src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/Avatarperson_mxcqt1.png"
                      alt="profile"
                    />
                  </Link>
                </div>
              </div>
            </>
          </>
        )
      }}
    </CredentialContext.Consumer>
  )

  render() {
    return <>{this.renderHeader()}</>
  }
}

export default withRouter(Header)
