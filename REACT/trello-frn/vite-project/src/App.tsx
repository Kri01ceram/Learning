import { BrowserRouter, Route, Routes } from "react-router"
import { Auth } from "./screens/Auth"
import { Board } from "./screens/Board"
import { Dashboard } from "./screens/Dahboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
