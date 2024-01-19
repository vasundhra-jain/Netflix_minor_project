import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const ContactSection = () => (
  <div className="contact-section-container">
    <div className="contact-section-content-container">
      <ul className="contact-section-unordered-list">
        <li>
          <FaGoogle />
        </li>
        <li>
          <FaTwitter />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaYoutube />
        </li>
      </ul>
      <p>Contact us</p>
    </div>
  </div>
)

export default ContactSection
