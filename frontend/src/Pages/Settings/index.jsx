import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'

function Setting() {
  const storageArea = useSelector(select.storage).data.storageArea

  return (
    <section className="col p-2 m-2 mt-5">
      <div className="container bg-light border rounded-4">
        <div className="row my-4">
          <div className="col">
            <h2 className="text-base">zone de stockage :</h2>
          </div>
          <div className="col">
            <ul className="list-inline ">
              {storageArea.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Setting
