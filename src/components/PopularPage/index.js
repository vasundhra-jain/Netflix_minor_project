import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import ContactSection from '../ContactSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieItem = props => {
  const {detail} = props
  const {id, backdropPath, posterPath, title} = detail
  return (
    <>
      <li className="small-devices-popular-list">
        <Link to={`/movies/${id}`}>
          <img src={posterPath} alt={title} className="popular-page-image" />
        </Link>
      </li>
      <li className="large-devices-popular-list">
        <Link to={`/movies/${id}`}>
          <img src={backdropPath} alt={title} className="popular-page-image" />
        </Link>
      </li>
    </>
  )
}

class PopularPage extends Component {
  state = {
    popularMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovieData()
  }

  getPopularMovieData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(each => ({
        id: each.id,
        title: each.title,
        overview: each.overview,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({
        popularMovieList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPopularMoviesView = () => {
    const {popularMovieList} = this.state
    return (
      <div>
        <ul className="popular-page-unordered-list">
          {popularMovieList.map(each => (
            <MovieItem detail={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="popular-failure-view-container">
      <img
        src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/alert-triangleerror_zmzmbl.png"
        alt="error"
      />
      <p className="failure-view-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.getPopularMovieData}
        className="failure-view-button"
      >
        Try Again
      </button>
    </div>
  )

  renderPopularMovies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-page-background">
        <Header />
        {this.renderPopularMovies()}
        <ContactSection />
      </div>
    )
  }
}

export default PopularPage
