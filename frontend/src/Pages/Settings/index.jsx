import FoodNewCategory from '../../Containers/Forms/FoodCategory/FoodNewCategory'
import Sidebar from '../../Containers/Layouts/Sidebar'
import NewStorageArea from '../../Containers/Storage/Post/NewStorageArea'

function Setting() {
  return (
    <div className="d-flex flex-grow-1">
      <div className="col-2 p-0">
        <Sidebar />
      </div>
      <section className="col p-2">
        <NewStorageArea />
        <FoodNewCategory />
      </section>
    </div>
  )
}

export default Setting
