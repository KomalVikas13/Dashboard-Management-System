import Categories from "./components/Categories"
import {Route, Routes} from "react-router-dom"
import AddWidget from "./components/AddWidget"


function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Categories></Categories>}></Route>
        <Route path="/addWidget/:categoryId" element={<AddWidget></AddWidget>}></Route>
      </Routes>
    </>
  )
}

export default App
