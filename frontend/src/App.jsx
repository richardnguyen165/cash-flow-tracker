import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
