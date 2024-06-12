import PropTypes from 'prop-types'

function RoundedImage({ image }) {
  return <img src={image.src} alt={image.alt} className="roundedImage" />
}

RoundedImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired
}

export default RoundedImage
