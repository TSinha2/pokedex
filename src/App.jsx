import './App.css';
import PokeRoute from './components/PokeRoute.jsx';
import Home from './components/Home';
import { Route, Routes } from "react-router-dom"


export default function App() {
  return (
      <div  className="w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokeRoute />} />
        </Routes>
      </div>
  )

}