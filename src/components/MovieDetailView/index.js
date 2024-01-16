import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ContactSection from '../ContactSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SimilarMovie = props => {
  const {details} = props
  return (
    <li>
      <img
        src={details.backdrop_path}
        alt={details.title}
        className="similar-movie-image"
      />
    </li>
  )
}

const RenderDetails = props => {
  const {details} = props
  const {
    genres,
    spokenLanguages,
    voteAverage,
    voteCount,
    budget,
    releaseDate,
  } = details
  return (
    <ul className="movie-details-unordered-list">
      <li className="movie-details-list">
        <p className="movie-details-heading">Genres</p>
        <ul className="movie-details-para-unordered-list">
          {genres.map(each => (
            <li key={each.id}>
              <p className="movie-details-para">{each.name}</p>
            </li>
          ))}
        </ul>
      </li>
      <li className="movie-details-list">
        <p className="movie-details-heading">Audio Available</p>
        <ul className="movie-details-para-unordered-list">
          {spokenLanguages.map(each => (
            <li key={each.id}>
              <p className="movie-details-para">{each.english_name}</p>
            </li>
          ))}
        </ul>
      </li>
      <li className="movie-details-list">
        <p className="movie-details-heading">Rating Count</p>
        <p className="movie-details-para">{voteCount}</p>
        <p className="movie-details-heading">Rating Average</p>
        <p className="movie-details-para">{voteAverage}</p>
      </li>
      <li className="movie-details-list">
        <p className="movie-details-heading">Budget</p>
        <p className="movie-details-para">{budget}</p>
        <p className="movie-details-heading">Release Date</p>
        <p className="movie-details-para">{releaseDate}</p>
      </li>
    </ul>
  )
}

class MovieDetailView extends Component {
  state = {
    movieDetails: [],
    apiStatus: apiStatusConstants.initial,
    toggleHeader: false,
  }

  componentDidMount() {
    this.getMovieDetailsData()
  }

  getMovieDetailsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const recievedData = await response.json()
      const fetchedData = recievedData.movie_details
      console.log(fetchedData)
      const updatedData = {
        id: fetchedData.id,
        releaseDate: fetchedData.release_date,
        runtime: fetchedData.runtime,
        similarMovies: fetchedData.similar_movies,
        spokenLanguages: fetchedData.spoken_languages,
        voteAverage: fetchedData.vote_average,
        voteCount: fetchedData.vote_count,
        title: fetchedData.title,
        overview: fetchedData.overview,
        backdropPath: fetchedData.backdrop_path,
        posterPath: fetchedData.poster_path,
        budget: fetchedData.budget,
        adult: fetchedData.adult,
        genres: fetchedData.genres,
      }
      this.setState({
        movieDetails: updatedData,
        apiStatus: apiStatusConstants.success,
        toggleHeader: true,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderDetailView = () => {
    const {movieDetails} = this.state
    const {
      posterPath,
      backdropPath,
      title,
      overview,
      id,
      similarMovies,
    } = movieDetails
    console.log(posterPath, backdropPath)
    return (
      <>
        <div
          style={{backgroundImage: `url(${posterPath})`}}
          className="small-home-page-poster-container"
        >
          <Header />
          <div className="home-page-poster-content-container">
            <h1 className="home-page-poster-content-heading">{title}</h1>
            <p className="home-page-poster-content-para">{overview}</p>
            <button type="button" className="home-page-poster-content-button">
              Play
            </button>
          </div>
        </div>
        <div
          style={{backgroundImage: `url(${backdropPath})`}}
          className="large-home-page-poster-container"
        >
          <Header />
          <div className="home-page-poster-content-container">
            <h1 className="home-page-poster-content-heading">{title}</h1>
            <p className="home-page-poster-content-para">{overview}</p>
            <button type="button" className="home-page-poster-content-button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-detail-container">
          <RenderDetails details={movieDetails} key={id} />
          <h1 className="similar-movie-heading">More like this</h1>
          <ul className="similar-movie-unordered-list">
            {similarMovies.map(each => (
              <SimilarMovie details={each} key={each.id} />
            ))}
          </ul>
        </div>
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
        alt="error"
      />
      <p className="failure-view-para">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="failure-view-button"
        onClick={this.getMovieDetailsData}
      >
        Try Again
      </button>
    </div>
  )

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetailView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {toggleHeader} = this.state
    return (
      <div className="detail-page-background">
        <div>
          {toggleHeader ? '' : <Header />}
          {this.renderMovieDetails()}
        </div>
        <ContactSection />
      </div>
    )
  }
}

export default MovieDetailView
