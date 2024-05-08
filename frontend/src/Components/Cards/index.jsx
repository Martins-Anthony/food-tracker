import PropTypes from 'prop-types'
function Cards({ title, text }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="card">
        <img src="https://picsum.photos/300/150?random=2" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  )
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Cards
