import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Pokecard from './components/Pokecard'
import useSWR from 'swr'

export default function App() {
  return (
      <div className="w-screen h-screen">
        <Navbar/>
        <div className='grid grid-cols-2'>
          <Pokecard sprite={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'} name="Bulbasaur" number={2}></Pokecard>
          <Pokecard sprite={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'} name="Bulbasaur" number={2}></Pokecard>

        </div>
      </div>
  )
}