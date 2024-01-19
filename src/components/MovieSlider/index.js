import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const MoviesItem = props => {
  const {detail} = props
  const {posterPath, title, id} = detail
  return (
    <li className="slider-list-item">
      <Link to={`/movies/${id}`} className="slider-image-link">
        <img src={posterPath} alt={title} className="slider-image" />
      </Link>
    </li>
  )
}

const MovieSlider = props => {
  const {moviesList} = props
  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  const largeDevicesSettings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  return (
    <div className="slider-container">
      <ul className="slider-unordered-list-item">
        <Slider {...settings}>
          {moviesList.map(each => (
            <MoviesItem detail={each} key={each.id} />
          ))}
        </Slider>
      </ul>
      <ul className="large-devices-slider-unordered-list-item">
        <Slider {...largeDevicesSettings}>
          {moviesList.map(each => (
            <MoviesItem detail={each} key={each.id} />
          ))}
        </Slider>
      </ul>
    </div>
  )
}

export default MovieSlider
