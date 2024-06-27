import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import PropTypes from 'prop-types'
import RoundedImage from '../RoundedImage'
import imageTest from '../../assets/bocaux.jpg'
import { iconList } from '../../Components/Icons/library'
import Buttons from '../Buttons'
import EditButton from '../Buttons/EditButton'
import { handleEditModeCard } from '../../Containers/EditMode/editModeSlice'
import ProductItem from '../ProductItem'
import Fields, { TYPE_FIELD } from '../Fields'
function Cards({ title, type, items, tag }) {
  const editMode = useSelector(select.editMode)

  const defaultImage = { src: imageTest, alt: 'default image' }

  const getComponent = () => {
    switch (type) {
      case 'presentation':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="card">
              <img
                src="https://picsum.photos/300/150?random=2"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{items}</p>
              </div>
            </div>
          </div>
        )
      case 'product':
        return (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
              <div className="row align-items-center p-3">
                <div className="col-auto">
                  <RoundedImage image={defaultImage} />
                </div>
                <div className="col-sm-5 col-md-6">
                  <h5 className="card-title mt-4 mb-0">
                    <Fields
                      type={TYPE_FIELD.INPUT_TEXT}
                      id="title"
                      defaultValue={title}
                      readOnly={!editMode.cardStatus}
                      aria-label={`titre du produits ${title}`}
                    />
                  </h5>
                </div>
              </div>
              <div className="card-body">
                <ProductItem item={items} />
                {editMode.status ? (
                  <div className="d-flex justify-content-around">
                    <EditButton
                      editMode={editMode.cardStatus}
                      toggleEditMode={handleEditModeCard}
                      icon={iconList}
                    />
                    {editMode.cardStatus ? (
                      <Buttons
                        type="modal"
                        className="btn btn-outline-danger"
                        tag={tag}
                        label={iconList.deleteIcon}
                        modalMessage={`Êtes-vous sûr de vouloir supprimer ${title} ?`}
                        modalId="deleteModalItem"
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return getComponent()
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  tag: PropTypes.string
}

export default Cards
