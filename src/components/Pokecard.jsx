import { useState } from 'react'
import useSWR, { SWRConfig } from 'swr'
// import axios from 'axios'

function localStorageProvider() {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
   
    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
      const appCache = JSON.stringify(Array.from(map.entries()))
      localStorage.setItem('app-cache', appCache)
    })
   
    // We still use the map for write & read for performance.
    return map
  }

export default function Pokecard({sprite, name, number, gen}) {
    
    const fetcher = (url) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${number}`, fetcher)
    console.log(data)
    console.log()
    if (!isLoading && !error)
    {
        return (
        <SWRConfig value={{ provider: localStorageProvider }}>
            <div className="flex flex-col items-center bg-slate-50 border border-grey-500">
                <img className="mt-6 w-20" src={data.sprites.other.dream_world.front_default}/>
                <h2 className='text-3xl'>#{number}</h2>
                <h1 className="capitalize text-3xl font-bold">{data.name}</h1>
            </div>
        </SWRConfig>

        );
    }

  }

  
  