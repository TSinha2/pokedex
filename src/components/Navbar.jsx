import {React, useState} from 'react';
import Select from 'react-select';
import useSWR from 'swr'
import { useNavigate } from "react-router-dom";


// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]


function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function pokemonData()
{
  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon-species?limit=905`, fetcher)
  if (data)
  {
    console.log(data)
    let options = data.results.map(i => ({ value: i.url.split('/')[6] , label: capitalizeWord(i.name) }  ));
    return options;
  }
}



export default function Navbar() {
  const pokeNames = pokemonData();

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Navigate to the selected page using React Router
    if (selectedOption) {
      navigate(`/pokemon/${selectedOption.value}`);
    }
  };


  if (pokeNames){
    return (
          <nav className="flex items-center text-4xl pl-6 h-20 bg-red-600 font-sans font-bold text-white 		">
            <div className='mr-4'>Pokédex</div>
            <Select options={pokeNames}    
              className=' text-slate-500 text-xl  w-48 color-white  ml-auto mr-4'
              placeholder="Search..."           
              onChange={handleOptionChange}
              unstyled={false}
    
    />
      
          </nav>
    )};
}
