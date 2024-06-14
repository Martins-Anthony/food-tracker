import PropTypes from 'prop-types'
import RoundedImage from '../RoundedImage'
import imageTest from '../../assets/bocaux.jpg'
import { iconList } from '../../Components/Icons/library'
function Cards({ title, type, items }) {
  let component = null
  const defaultImage = { src: imageTest, alt: 'default image' }

  switch (type) {
    case 'presentation':
      component = (
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="card">
            <img src="https://picsum.photos/300/150?random=2" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{items}</p>
            </div>
          </div>
        </div>
      )
      break
    case 'product':
      component = (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card">
            <div className="row align-items-center p-3">
              <div className="col">
                <RoundedImage image={defaultImage} />
              </div>
              <div className="col">
                <h5 className="card-title mt-4 mb-0">{title}</h5>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">{items}</ul>
              <button type="button" className="btn btn-outline-secondary me-4">
                {iconList.editIcon}
              </button>
              <button type="button" className="btn btn-outline-danger">
                {iconList.deleteIcon}
              </button>
            </div>
          </div>
        </div>
      )
      break
    default:
      break
  }

  if (!component) return null

  return component
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired
}

export default Cards
