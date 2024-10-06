import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Home/Home'
import MovieDetails, { MovieDetailsLoader } from './MovieDetails/MovieDetails'
import './index.css'
const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Home/>}/>
    <Route path='/search/:imdbId' element={<MovieDetails/>} loader={MovieDetailsLoader}/>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
