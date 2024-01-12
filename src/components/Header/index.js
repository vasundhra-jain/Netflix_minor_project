import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="small-device-header-container">
        <img
          src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/app_logo_bsm8pk.png"
          alt="website logo"
          className="small-device-website-logo"
        />
        <div>
          <button
            type="button"
            data-testid="searchButton"
            className="small-device-header-button"
          >
            <HiOutlineSearch className="search-icon" />
          </button>
          <button type="button" className="small-device-header-button">
            <img
              src="https://res.cloudinary.com/dz6uvquma/image/upload/v1705071256/add-to-queue_1queue_gf7zng.svg"
              alt="addToQueue"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default Header
