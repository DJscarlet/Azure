import React from 'react'
import { useGlobalContext } from '../../contexts/global'
import {Link} from 'react-router-dom'
import AnimeCard from '../AnimeCard/AnimeCard'

function Search() {
    const {search}=useGlobalContext()
    const conditionalRender=()=>{
        return search.map((anime)=>{
            if(anime){
                return <Link to={`/anime_details/${anime.mal_id}`} key={anime.mal_id}>
                    <AnimeCard data={anime}/>
                </Link>
            }
        })
    }
  return (
    <div className=''>
        <div className='heading'><h2>Search results..</h2></div>
        <div className='p_anime_cards'>
            {
                conditionalRender()
            }
        </div>
    </div>
  )
}

export default Search