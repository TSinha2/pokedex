import {  useParams } from "react-router-dom"
import useSWR, { SWRConfig } from 'swr'
import Navbar from "./Navbar"



function MiscData(id)
{
  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading} = useSWR(`https://pokeapi.co/api/v2/pokemon-species/${id}`, fetcher);
  return {
    user: data,
    miscLoading: isLoading,
    isError: error
  }
}

function DataTable(props)
{
  return(
    <table className="width-screen	border-spacing-x-5	">
      <tbody>
        {props.data.map(
          i => <tr>
            <th>{i[0]}</th>
            <td>{i[1]}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

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


export default function PokeRoute()
{
  const { id } = useParams()
  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`, fetcher)
  let {user, miscLoading} = MiscData(id)
  console.log(user)
  console.log(data)

  if (!isLoading && !error)
  {
    return (
      <SWRConfig value={{ provider: localStorageProvider }}>
         <Navbar/> 
         <div className="flex flex-col items-center	gap-2">
           <img
              className="mt-6 w-60 h-60"
              src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default: data.sprites.front_default}
              /> 
                    <div className="flex gap-2 ml-2">
                        {data.types.map(i => formattedPokeType(i.type.name))}
                    </div>

                   <h1 className="text-5xl capitalize">{data.name}</h1>
                   <h1 className="text-1xl text-center">{!miscLoading ? user.flavor_text_entries[3].flavor_text: ''}</h1>
                   <h1 className="text-2xl">Weight: {data.weight / 10}kg ({((data.weight / 10) * 2.2).toFixed(1)} lbs)</h1>
                   <h1 className="text-2xl">Height: {data.height / 10}m ({((data.height / 10) * 3.281).toFixed(1)} ft)</h1>
                   <h1 className="text-2xl">{!miscLoading ? user.color.name: ''}</h1>
                   {/* <h1 className="text-2xl">{user.shape.name}</h1>
                   <h1 className="text-2xl">{user.generation.name}</h1> */}
                   <h1 className="text-2xl">{data.abilities.map(i => i.ability.name) }</h1>
                   <DataTable data={[['Weight',2], ['Height', 3]]}/>

         </div>
      </SWRConfig>
    )
  }
}