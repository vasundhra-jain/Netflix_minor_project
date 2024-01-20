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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
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
    </div>
  )
}

export default MovieSlider
