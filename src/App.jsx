import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Pokecard from './components/Pokecard'
import useSWR from 'swr'

export default function App() {
  let pokemons = []
  for (let i = 1; i < 21; i++)
  {
    pokemons.push(<Pokecard number={i}/>)
  }

  return (
      <div className="w-screen h-screen">
        <Navbar/>
        <div className='grid grid-cols-2 gap-2 ml-2 mr-2'>
          {pokemons}
        </div>
      </div>
  )
}