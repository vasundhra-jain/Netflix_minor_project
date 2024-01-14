import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import TrendingNow from '../TrendingNow'
import ContactSection from '../ContactSection'
import MovieSlider from '../MovieSlider'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePage extends Component {
  state = {
    originalsMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalsMovieData()
  }

  getOriginalsMovieData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
        originalsMovieList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPosterView = () => {
    const {originalsMovieList} = this.state
    const index = Math.ceil(Math.random() * originalsMovieList.length - 1)
    const movie = originalsMovieList[index]
    console.log(originalsMovieList)
    return (
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button type="button">Play</button>
      </div>
    )
  }

  renderOriginalsMovieView = () => {
    const {originalsMovieList} = this.state
    return (
      <>
        <MovieSlider moviesList={originalsMovieList} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dz6uvquma/image/upload/v1704993970/alert-triangleerror_zmzmbl.png"
        alt="error"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getOriginalsMovieData}>
        Try Again
      </button>
    </div>
  )

  renderPoster = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosterView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginals = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsMovieView()
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
      <div className="home-page-background">
        <div>
          <Header />
          {this.renderPoster()}
        </div>
        <div>
          <h1 className="home-page-heading">TrendingNow</h1>
          <TrendingNow />
        </div>
        <div>
          <h1 className="home-page-heading">Originals</h1>
          {this.renderOriginals()}
        </div>
        <ContactSection />
      </div>
    )
  }
}

export default HomePage
