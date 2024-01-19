import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'
import ContactSection from '../ContactSection'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieItem = props => {
  const {detail} = props
  return (
    <>
      <li className="small-devices-popular-list">
        <Link to={`/movies/${detail.id}`}>
          <img
            src={detail.poster_path}
            alt={detail.title}
            className="popular-page-image"
          />
        </Link>
      </li>
      <li className="large-devices-popular-list">
        <Link to={`/movies/${detail.id}`}>
          <img
            src={detail.backdrop_path}
            alt={detail.title}
            className="popular-page-image"
          />
        </Link>
      </li>
    </>
  )
}

class SearchComponent extends Component {
  state = {
    searchList: '',
    apiStatus: apiStatusConstants.initial,
    searchText: '',
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        results: fetchedData.results,
        total: fetchedData.total,
      }
      this.setState({
        searchList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSearchResultsView = () => {
    const {searchList} = this.state
    const {searchText} = this.state
    const {results} = searchList
    const isEmpty = results.length === 0
    return (
      <div className="search-result-container">
        {isEmpty ? (
          <>
            <img
              src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993953/Group_7394no-search-results_a1oxa7.png"
              alt="no movies"
            />
            <p className="search-result-para">
              Your search for {searchText} did not find any matches.
            </p>
          </>
        ) : (
          <ul className="popular-page-unordered-list">
            {results.map(each => (
              <MovieItem detail={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/alert-triangleerror_zmzmbl.png"
        alt="error"
      />
      <p className="failure-view-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.getSearchResults}
        className="failure-view-button"
      >
        Try Again
      </button>
    </div>
  )

  renderSearchResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchResultsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  searchInput = text => {
    this.setState(
      {
        searchText: text,
      },
      this.getSearchResults,
    )
  }

  render() {
    return (
      <div className="search-page-container">
        <Header searchInput={this.searchInput} />
        {this.renderSearchResults()}
        <ContactSection />
      </div>
    )
  }
}

export default SearchComponent
