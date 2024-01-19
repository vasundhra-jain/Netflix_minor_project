import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import MovieSlider from '../MovieSlider'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    trendingMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovieData()
  }

  getTrendingMovieData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingMovieList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTrendingMovieView = () => {
    const {trendingMovieList} = this.state
    return (
      <>
        <MovieSlider moviesList={trendingMovieList} />
      </>
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
        alt="failure view"
      />
      <p className="failure-view-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.getTrendingMovieData}
        className="failure-view-button"
      >
        Try Again
      </button>
    </div>
  )

  renderTrending = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingMovieView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderTrending()}</>
  }
}

export default TrendingNow
