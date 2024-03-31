import React,{useContext} from 'react'
import { useGlobalContext } from '../../contexts/global'
import { Link } from 'react-router-dom'
import AnimeCard from '../AnimeCard/AnimeCard'
import './popular.css'

function Popular() {
    const {popularAnime}=useGlobalContext()
    const conditionalRender=()=>{
        return popularAnime.map((anime)=>{
            return <Link to={`/anime_details/${anime.mal_id}`} key={anime.mal_id}>
                <AnimeCard data={anime}/>
            </Link>
        })
    }
  return (
    <div className='popular_anime'>
        <div className='popular_anime_container'>
            <div className='heading azure '>
                <h1>Popular Anime</h1>
            </div>
            <div className='p_anime_cards'>
                {
                    conditionalRender()
                }
            </div>
        </div>
    </div>
  )
}

export default Popular