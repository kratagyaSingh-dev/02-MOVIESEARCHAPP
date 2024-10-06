import React, { useEffect, useRef, useState } from 'react';
import backgroundImg from '../assets/backgroundImg.jpg';
import { Link } from 'react-router-dom';
const Home =() => {
  const [movieInput, setMovieInput] = useState("");
  const [movieData,setMovieData] = useState([]);
  const inputRef=useRef();

  useEffect(() =>{
    inputRef.current?.focus();
  },[])
// localStorage.clear()
  const localStorageFunction=() =>{
    const movieKey=movieInput.trim();
    const movie = localStorage.getItem(movieKey);
    // localStorage.clear()
    if(!movie){
      const timeStamp=Date.now();
    localStorage.setItem(movieInput.trim(),JSON.stringify({timeStamp,movieData}));
    }
  }
  const timeRecord=() =>{
    const currentTimeStamp=Date.now();
    const storedData=localStorage.getItem(movieInput.trim());
    if(storedData){
      const paresedData=JSON.parse(storedData);
      const prevTime=paresedData.timeStamp;
      if(currentTimeStamp-prevTime >10*1000){
      localStorage.removeItem(movieInput.trim());
      }
    }
  }
  // FOR SHOW MOVIE SUGGESTIONS WHEN THE USER STARTS TYPING
    const inputHandler=async() => {
      
      if(movieInput.length > 0){
        try{
          const res=await fetch(`https://www.omdbapi.com/?apikey=f58270b1&s=${movieInput}`);
          if(!res.ok) {
            throw new Error(`error fetching api`)
          }
          const data=await res.json();
          if(data){
            setMovieData(data.Search);
            
            timeRecord()


            localStorageFunction();
            
          }
          else{
            setMovieInput("")
          }
        } 
        catch(error){
          console.error("error encountered fetching data: "+ error)
        }
        }
      }

      // USING DEBOUNCE TO PERFORM FETCHFUNCITON CALL:
      useEffect(() => {
        if(movieInput.length>0){
          // WHEN THE USER STOPS TYPING FOR 500MS; THIS debouncedTimer IS CALLED INSTEAD OF THE API CALL BEING MADE AT EVERY WORD WRITTEN BY USER
          const debouncedTimer=setTimeout(() => {
            inputHandler();
          },300);
          // CLEANUP FUNCTION WHEN THE PAGE UNMOUNTS
          return () => clearTimeout(debouncedTimer);
        }
      },[movieInput])
 
  return (
    <div className='min-h-screen overflow-hidden relative'>
      <img className='w-full h-full object-cover absolute z-0' src={backgroundImg} alt="Image" />

      {/* TO MAKE THE OPACITY OF BG IMAGE A LITTLE FADED */}
      <div className='bg-black opacity-75 w-full h-full absolute'> </div>

      {/* input box and search button */}
      <div className='w-4/5 ml-36 mt-3 relative z-11 flex justify-center'>
        <input
        ref={inputRef}
          className='w-4/5 font-semibold relative z-11 text-white text-xl bg-black opacity-65 border rounded-tl-md rounded-bl-md p-4 outline-none'
          type="text"
          placeholder='Search for movies, webseries, TV Shows... '
          value={movieInput}
          onChange={(E)=>setMovieInput(E.target.value)}
        />
        {/* to dynamically show recommendations to the user */}
        {/* <Link to={`/?search=${encodeURIComponent(movieInput)}`} // Encode the movieInput to safely include it in the URL
        > */}

      { movieInput.length>0  ? 
      <button className='w-1/12 flex items-center justify-center bg-red-700 hover:bg-red-800 rounded-tr-md rounded-br-md z-11 border border-opacity-5 text-white text-xl font-semibold'
        onClick={(e) =>setMovieInput("")}>
        Clear
      </button> : null
      }
          
      </div>
      <div className='mt-3 p-2 sm:p-4 md:p-6 h-110 z-11 relative grid sm:grid-cols-3 md-grid cols-4 lg:grid-cols-5 gap-3 overflow-auto '>
       {
       movieData && movieData.length > 0 ? (
        movieData.
        filter((movie) => movie.Poster!=='N/A').
        map((movie) => (
          movie.Poster ?  <div key={movie.imdbID} className="flex justify-center items-center">
            <Link to={`/search/${movie.imdbID}`} >
          {<img loading="lazy" 
          src={movie.Poster} alt={movie.Title} className="h-auto object-cover w-full" /> }</Link>
            </div> : null
        ))
        ): <div>No movies found</div>
       }
      </div>
    </div>
  );
}
export default Home;

// Export the loader function
// export const basicMovieInfoLoader = async ({ request }) => {
//   const url=new URL(request.url);//CONVERTS STRING URL TO AN OBJECT URL which has searchParams also as a key 
//   console.log(url.searchParams);//CONTAINS THE QUERY AND ITS VALUE IN AN OBJECTR FORM

//   const movieInput=url.searchParams.get('search'); //gives the value of the search query
//   if(!movieInput){
//     return "Please enter any movies, webseries, TV Shows... "
//   }
//   try{
//     const res=await fetch(`https://www.omdbapi.com/?apikey=f58270b1&s=${movieInput}`);
//     if(!res.ok){
//       throw new Error(`error encountered fetching data:${res.statusText}`)
//     }
    
//     const data=await res.json();
//     if(data) return data;

//   } catch(error){
//     console.error(error);
//   }
 
  
//   // Further implementation can go here
// };
