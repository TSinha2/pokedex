import useSWR, { SWRConfig } from 'swr'
import { Link } from "react-router-dom"

function formattedPokeType(type)
{
    switch(type)
    {
        case 'normal':
            return <p className="bg-slate-400 rounded pl-1 pr-1 text-white">NORMAL</p>

        case 'fire':
            return <p className="bg-orange-500 rounded pl-1 pr-1 text-white">FIRE</p>

        case 'water':
            return <p className="bg-blue-500 rounded pl-1 pr-1 text-white">WATER</p>
            
        case 'electric':
            return <p className="bg-yellow-500 rounded pl-1 pr-1 text-white">ELECTRIC</p>

        case 'grass':
            return <p className="bg-green-500 rounded pl-1 pr-1 text-white">GRASS</p>

        case 'ice':
            return <p className="bg-cyan-400 rounded pl-1 pr-1 text-white">ICE</p>

        case 'fighting':
            return <p className="bg-red-800 rounded pl-1 pr-1 text-white">FIGHTING</p>
        
        case 'poison':
            return <p className="bg-purple-500 rounded pl-1 pr-1 text-white">POISON</p>

        case 'ground':
            return <p className="bg-amber-500 rounded pl-1 pr-1 text-white">GROUND</p>

        case 'flying':
            return <p className="bg-indigo-500 rounded pl-1 pr-1 text-white">FLYING</p>

        case 'psychic':
            return <p className="bg-pink-500 rounded pl-1 pr-1 text-white">PSYCHIC</p>

        case 'bug':
            return <p className="bg-lime-500 rounded pl-1 pr-1 text-white">BUG</p>

        case 'rock':
            return <p className="bg-yellow-700 rounded pl-1 pr-1 text-white">ROCK</p>
                
        case 'ghost':
            return <p className="bg-indigo-800 rounded pl-1 pr-1 text-white">GHOST</p>

        case 'dragon':
            return <p className="bg-indigo-600 rounded pl-1 pr-1 text-white">DRAGON</p>

        case 'dark':
            return <p className="bg-amber-900 rounded pl-1 pr-1 text-white">DARK</p>

        case 'steel':
            return <p className="bg-neutral-500 rounded pl-1 pr-1 text-white">STEEL</p>

        case 'fairy':
            return <p className="bg-fuchsia-400	 rounded pl-1 pr-1 text-white">FAIRY</p>
                    
    }

}

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

export default function Pokecard({number}) {
    
    const fetcher = (url) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${number}`, fetcher)
    const pokeLink = `pokemon\${number}`
    if (!isLoading && !error)
    {
        return (
        <SWRConfig value={{ provider: localStorageProvider }}>
            <Link to={`pokemon\\${number}`}>
                <div className="flex flex-col items-center bg-slate-50 border border-grey-500 pb-2">
                    <img
                        className="mt-6 w-20 h-20"
                        src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default: data.sprites.front_default}
                    />
                    <h2 className='text-3xl'>#{number}</h2>
                    <h1 className="capitalize text-3xl font-bold">{data.name}</h1>
                    <div className="flex justify-start w-full gap-2 ml-2">
                        {data.types.map(i => formattedPokeType(i.type.name))}
                    </div>
                    <h1> {data.weight} </h1>
                </div>
            </Link>
        </SWRConfig>

        );
    }

  }

  
  