import Categories from "./components/Categories"
import {Route, Routes} from "react-router-dom"
import AddWidget from "./components/AddWidget"
import AddCategory from "./components/AddCategory"

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Categories></Categories>}></Route>
        <Route path="/addWidget/:categoryId" element={<AddWidget></AddWidget>}></Route>
        <Route path="/addCategory" element={<AddCategory></AddCategory>}></Route>
      </Routes>
    </>
  )
}

export default App
