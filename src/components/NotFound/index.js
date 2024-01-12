import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found <br />
      Please go back to the homepage
    </p>
    <button type="button" className="not-found-button">
      Go to Home
    </button>
  </div>
)

export default NotFound
