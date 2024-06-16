import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'
import { iconsLibrary } from '../../Components/Icons/library'
import { Link } from 'react-router-dom'
import Spinners from '../../Components/Spinners'

function NavItems() {
  const storageData = useSelector(select.storage)

  if (!storageData || !storageData.data) {
    return <Spinners />
  }

  const storageArea = storageData.data

  return (
    <ul className="nav nav-tabs flex-column bg-light h-100 pt-5">
      <li className="nav-item dropdown">
        <div className="btn-group">
          <button
            className=" btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            role="button"
            aria-expanded="false">
            zone de stockage{' '}
            {storageArea && storageArea.length > 0 ? `( ${storageArea.length} )` : null}
          </button>
          <ul className="dropdown-menu text-center">
            {storageArea &&
              storageArea.map((storage, index) => {
                return (
                  <li className="dropdown-item" key={index}>
                    <button className="dropdown-item">{storage.name}</button>
                  </li>
                )
              })}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to={'/user/postStorages'}>
                {iconsLibrary.navbar[2].icon} ajouter zone
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default NavItems
