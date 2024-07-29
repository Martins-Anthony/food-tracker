import { select } from '../../App/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSidebar } from '../../Containers/Layouts/Sidebar/sidebarSlice'
import { useEffect } from 'react'

function Setting() {
  const storageArea = useSelector(select.storage).data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setShowSidebar(true))
    return () => {
      dispatch(setShowSidebar(false))
    }
  }, [dispatch])

  return (
    <section className="col p-2 m-2 mt-5">
      <div className="container border rounded-4">
        <div className="row my-4">
          <div className="col-auto">
            <h2 className="text-base">zone de stockage :</h2>
          </div>
          <div className="col-auto">
            <ul className="list-inline ">
              {Object.keys(storageArea).map((item) => {
                return <li key={item}>{storageArea[item].name}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Setting
