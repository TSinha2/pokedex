import { data } from "autoprefixer";
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

function Data(id)
{
  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`, fetcher)
  const abilities = []
  let { data: abs } = useSWR( (data && data.abilities.length > 0) ? data.abilities[0].ability.url : null, fetcher)
  let { data: abs_b } = useSWR( (data && data.abilities.length > 1) ? data.abilities[1].ability.url : null, fetcher)
  let { data: abs_c } = useSWR( (data && data.abilities.length > 2) ? data.abilities[2].ability.url : null, fetcher)
  // console.log(abs)
  // console.log(abs_b)
  // console.log(abs_c)
  abilities.push(abs, abs_b, abs_c)
  console.log(abilities)
  // if (data && abs) return { data, error, isLoading, abs}
  return { data, error, isLoading, abs, abilities }
}

function AbilitiesProcess(abilitiesList)
{
  const processedAbilities = abilitiesList.map(i => 
    {
      console.log(i)
      if (i)
      {
        return(
        <div>
          <h1 className="font-bold">{i.name}</h1>
          <p>{i.flavor_text_entries[0].flavor_text}</p>
        </div>)
      }
    })
    return processedAbilities;
}


function DataTable(props)
{
  return(
    <table className="width-screen ">
      <tbody>
        {props.data.map(
          i => <tr className="border first:border-t-0 last:border-b-0 border-x-0 ">
            <th key={i[0]} className="text-xl px-12 pb-4 ">{i[0]}</th>
            <td key={i[1]} className="text-xl px-12 pb-4">{i[1]}</td>
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
  const { data, error, isLoading, abs, abilities } = Data(id)
  let {user, miscLoading} = MiscData(id)
  console.log(data)
  console.log(user)
  console.log(abs)
  // getAbilities(data.abilities)
  if (data && user && abilities)
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
                   <h1 className="text-xl text-center">{!miscLoading ? user.flavor_text_entries[0].flavor_text: ''}</h1>
                   {/* <h1 className="text-2xl">{data.abilities.map(i => i.ability.name) }</h1> */}
                   <DataTable data={[ ['Pokédex №',  `#${data.id}`],
                                     ['Introduced', `${!miscLoading ? user.generation.name.split('-')[0][0].toUpperCase() + user.generation.name.split('-')[0].slice(1) + ' ' +  user.generation.name.split('-')[1].toUpperCase(): ''}`],
                                     ['Weight', `${data.weight / 10}kg (${((data.weight / 10) * 2.2).toFixed(1)} lbs)`] , 
                                     ['Height', `${data.height / 10}m (${((data.height / 10) * 3.281).toFixed(1)} ft)`],
                                     ['Color', `${!miscLoading ? user.color.name[0].toUpperCase() + user.color.name.slice(1): ''}`],
                                     ['Shape', `${user.shape ? user.shape.name[0].toUpperCase() + user.shape.name.slice(1): ''}`],
                                    //  ['Abilities', `${abs.flavor_text_entries? abs.flavor_text_entries[0].flavor_text: ''}`],
                                      ['Test', AbilitiesProcess(abilities)]
                                      ]}/>

         </div>
      </SWRConfig>
    )
  }
}