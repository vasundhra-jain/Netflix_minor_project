import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoMdCloseCircle} from 'react-icons/io'
import './index.css'

class Header extends Component {
  state = {extend: false, showSearchBar: false, searchValue: ''}

  extendSearchBar = () => {
    const {history} = this.props
    history.push('/search')
    this.setState({showSearchBar: true})
  }

  extendHeader = () => {
    this.setState({extend: true})
  }

  closeHeader = () => {
    this.setState({extend: false})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    const {searchValue} = this.state
    if (event.key === 'Enter') {
      searchInput(searchValue)
    }
  }

  showSearchResults = () => {
    const {searchInput} = this.props
    const {searchValue} = this.state
    searchInput(searchValue)
  }

  handleSearchInputChange = event => {
    this.setState({searchValue: event.target.value})
  }

  renderHeader = () => {
    const {extend, showSearchBar, searchValue} = this.state
    return (
      <>
        <div className="device-header-container">
          <div className="header-container-1">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/app_logo_bsm8pk.png"
                alt="website logo"
                className="device-website-logo"
              />
            </Link>
            <div className="extra-container">
              <Link to="/" className="device-extended-header-links">
                Home
              </Link>

              <Link to="/popular" className="device-extended-header-links">
                Popular
              </Link>
            </div>
          </div>
          <div className="small-device-header-button-container">
            {showSearchBar ? (
              <div className="search-bar-container">
                <input
                  type="search"
                  className="search-bar-input"
                  onChange={this.handleSearchInputChange}
                  onKeyDown={this.onChangeSearchInput}
                  value={searchValue}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="device-header-button-extended"
                  onClick={this.showSearchResults}
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
              className="device-header-extend-button"
              onClick={this.extendHeader}
            >
              <img
                src="https://res.cloudinary.com/dz6uvquma/image/upload/v1705071256/add-to-queue_1queue_gf7zng.svg"
                alt="addToQueue"
              />
            </button>
            <Link to="/account" className="large-device-profile-link">
              <img
                src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/Avatarperson_mxcqt1.png"
                alt="profile"
              />
            </Link>
          </div>
        </div>
        {extend ? (
          <div className="device-header-container">
            <ul className="small-device-extended-header-ul">
              <li>
                <Link to="/" className="device-extended-header-links">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/popular" className="device-extended-header-links">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/account" className="device-extended-header-links">
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
      </>
    )
  }

  render() {
    return <>{this.renderHeader()}</>
  }
}

export default withRouter(Header)
