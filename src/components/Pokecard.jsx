import { useState } from 'react'
import useSWR from 'swr'
// import axios from 'axios'


export default function Pokecard({sprite, name, number, gen}) {
    
  
    return (
        <div className="flex flex-col items-center bg-slate-50 border border-grey-500">
            <img className="w-3/5"src={sprite}/>
            <h2 className='text-3xl'>#{number}</h2>
            <h1 className="font-bold">{name}</h1>
            <h2>Generation {gen}</h2>
        </div>

    );
  }

  
  