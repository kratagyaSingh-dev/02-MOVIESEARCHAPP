import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function MovieDetails() {
  const data=useLoaderData();
  // poster;title;year;runtime(duration);Genre;Director;Actors;Plot;Language;Country;imdbRating(imdbVotes)
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black'>
      {/* Background Image and Overlay */}
      <div className='relative w-full'>
        <img
          className='w-full h-96 object-cover opacity-50 absolute top-0 left-0'
          src={data.Poster}
          alt={data.Title}
        />
        <div className='bg-black opacity-75 w-full h-96 absolute top-0'></div>
      </div>

      {/* data Details Content */}
      <div className='relative z-10 flex flex-col md:flex-row items-center justify-center w-4/5 mt-6 bg-black bg-opacity-75 p-6 rounded-lg shadow-lg'>
        {/* data Poster */}
        <div className='w-full md:w-1/3 flex justify-center mb-6 md:mb-0'>
          <img
            className='w-3/4 md:w-full rounded-lg shadow-md'
            src={data.Poster}
            alt={data.Title}
          />
        </div>

        {/* data Info */}
        <div className='w-full md:w-2/3 md:ml-8 text-white space-y-4'>
          <h2 className='text-4xl font-bold text-center md:text-left'>{data.Title}</h2>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Year: </span>{data.Year}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Runtime: </span>{data.Runtime}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Genre: </span>{data.Genre}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Director: </span>{data.Director}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Actors: </span>{data.Actors}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Language: </span>{data.Language}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>Country: </span>{data.Country}
          </p>
          <p className='text-lg text-gray-300'>
            <span className='font-semibold text-red-500'>IMDb Rating: </span>{data.imdbRating} 
            <span className='text-sm text-gray-400'> ({data.imdbVotes} votes)</span>
          </p>

          {/* Plot */}
          <div className='mt-4'>
            <h3 className='text-2xl font-semibold text-red-500'>Plot</h3>
            <p className='text-gray-300 mt-2'>{data.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
export const MovieDetailsLoader=async({request , params}) =>{
  const { imdbId } = params;
  try{
    const res=await fetch(`https://www.omdbapi.com/?apikey=f58270b1&i=${imdbId}`) ;
    if(!res.ok){
      throw new Error(`details not found: ${res.statusText}`)
    }
    const data=await res.json();
    if(data){
      return data;
    }
    
  } catch(error){
    console.error(`error fetching data: ${error}`);
  }
  

}
