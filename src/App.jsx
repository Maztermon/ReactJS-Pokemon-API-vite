import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

//  Components
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {

    let abortController = new AbortController();

    const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data)
        setError("")

      } catch(error) {
        setError("Something went wrong", error)
    } finally {
      setLoading(false);    
      }
    }

    loadPoke()
    

    return () => abortController.abort();

  }, [number])

  const prevPoke = () => {
    setNumber((number) => number - 1)
  }

  const nextPoke = () => {
    setNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };

  console.log(poke)
  console.log(fav);

  return (
    <div className="max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 poke-card"
      style={{ textAlign: "center" }}
    >
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
      <div>
      {loading ? (
            <ClipLoader />
          ) : (
      <>
      <h1>{poke?.name} </h1>
      <button onClick={addFav}>Add to favourite</button>
      <br />
      <img src={poke?.sprites?.other.home.front_default} alt={poke?.name} />
      <ul>
        {poke?.abilities?.map((abil, idx) => (
          <li key={idx}>{abil.ability.name}</li>
        ))}
      <br />
      </ul>
        <button onClick={prevPoke}>Previous</button>
        <button onClick={nextPoke}>Next</button>
      </>
       )}
      
      </div>

     {/* FavPoke Components  */}

      <div> 
      <h3 className="font-bold"> Your Favourite Pokemon </h3>
          {fav.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p>No favourite pokemon...</p>
            </div>
          ) : (
            <>
              <FavPoke fav={fav} />
            </>
          )}
      </div>
    </div>
    </div>
  )
}

export default App
