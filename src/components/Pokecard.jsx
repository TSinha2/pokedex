import { useState } from 'react'
import useSWR from 'swr'
// import axios from 'axios'


export default function Pokecard({sprite, name, number, gen}) {
    
  
    return (
        <div className="flex flex-col items-center bg-slate-50 border border-grey-500">
            <img className="mt-6 w-20"src={sprite}/>
            <h2 className='text-3xl'>#{number}</h2>
            <h1 className="text-3xl font-bold">{name}</h1>
            <h2 className="text-xl">Generation {gen}</h2>
        </div>

    );
  }

  
  