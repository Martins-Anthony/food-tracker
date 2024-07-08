import PropTypes from 'prop-types'
import defaultImage from '../../assets/bocaux.jpg'

function RoundedImage({ image }) {
  const imageSrc = image?.src || defaultImage
  const imageAlt = image?.alt || 'default image'

  return <img src={imageSrc} alt={imageAlt} className="roundedImage" />
}

RoundedImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  })
}

RoundedImage.defaultProps = {
  image: {
    src: defaultImage,
    alt: 'default image'
  }
}

export default RoundedImage
