import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'
import { iconsLibrary } from '../../Components/Icons/library'
import { NavLink } from 'react-router-dom'
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
              <NavLink className="dropdown-item" to={'/user/storages/name/post'}>
                {iconsLibrary.navbar[2].icon} ajouter zone
              </NavLink>
            </li>
          </ul>
        </div>
      </li>
      {storageData.data.length > 0 ? (
        <li className="mt-3">
          <button className="btn btn-primary">
            <NavLink
              className="dropdown-item"
              to={iconsLibrary.navbar[2].link}
              data-bs-placement="top"
              title={iconsLibrary.navbar[2].name}
              data-bs-toggle={iconsLibrary.navbar[2].dataBsToggle}
              data-bs-target={iconsLibrary.navbar[2].dataBsTarget}>
              {iconsLibrary.navbar[2].icon} ajout produit
            </NavLink>
          </button>
        </li>
      ) : null}
    </ul>
  )
}

export default NavItems
