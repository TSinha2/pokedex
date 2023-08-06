import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Pokecard from './Pokecard';




export default function Home()
{
  let num = 21
  let pokemons = []
  for (let i = 1; i < num; i++)
  {
    pokemons.push(<Pokecard number={i}/>)
  }
  const [p, setP] = useState(pokemons)
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          // fetchData();
          console.log("TEST")
          let temp = []
          for (let i = num; i < num+21; i++)
          {
            temp.push(<Pokecard number={i}/>)
          }
          setP((prev) => [...prev, ...temp]);
          num += 21
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
 

  return(
  <div>
    <Navbar/>
    <div  className='grid grid-cols-2 gap-2 ml-2 mr-2'>
      {p}
    </div>
    <div ref={observerTarget}></div>
  </div>)
}