import PropTypes from 'prop-types'
import imageDefault from '../../../../assets/bocaux.jpg'

function Presentation({ onClick, hoverActive, items, productName }) {
  const renderImage = () => {
    const image = items?.image?.src ? (
      <img src={items.image.src} className="card-img-top custom-img-size" alt={items.image.alt} />
    ) : (
      <img src={imageDefault} alt="default image" className="card-img-top" />
    )
    return image
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4" onClick={onClick}>
      <div className={`card ${hoverActive}`}>
        {items?.image ? (
          renderImage()
        ) : (
          <img src="https://picsum.photos/300/150?random=2" className="card-img-top" alt="..." />
        )}
        <div className="card-body">
          <h5 className="card-title">{items?.title || productName}</h5>
          <p className="card-text">{items?.brands || items?.text || 'No brand information'}</p>
        </div>
      </div>
    </div>
  )
}

Presentation.propTypes = {
  onClick: PropTypes.func,
  hoverActive: PropTypes.string,
  items: PropTypes.object,
  productName: PropTypes.string
}

Presentation.defaultProps = {
  onClick: () => {},
  hoverActive: '',
  items: {},
  productName: ''
}

export default Presentation
