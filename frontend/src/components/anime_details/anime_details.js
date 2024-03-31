import { useState, useEffect } from 'react'
import AnimeCharacters from '../anime_characters/AnimeCharacters'
import './anime_details.css'
import { Link, useParams } from 'react-router-dom'
import Recommendations from '../recommendations/Recommendations'

function AnimeDetails() {
  const [anime,setAnime]=useState({})
  const [showMore,setShowMore]=useState(false)

  const {id} = useParams();

  const {aired,season,duration,episodes,images,status,rating,score,synopsis,title,title_japanese,title_synonyms,type,year}=anime

  const getAnimeDetails=async(id)=>{
    let res=await fetch(`https://api.jikan.moe/v4/anime/${id}`)
    let json=await res.json()
    console.log("New" ,json.data)
    setAnime(json.data)
  }
  useEffect(()=>{
    getAnimeDetails(id)
  },[id])

  return (
    <div className='anime-detail'>
    <div className='bg-wallpaper'>
      {images?<img src={images.jpg.image_url}/>:''}
    </div>
    <div className='anime_details'>
      <div className='info'>
        <div className='details'>
          <div className='img_container center'>
            <div className='image'>
              {images?<img src={images.jpg.image_url} alt=''/>:<p>Loading...</p>}
            </div>
          </div>
          <div className='details_container'>
            <div className='title'>
              {title}
            </div>
            <div className='anime-details'>
              <div className='ad-item'><span className='quality'>{type}</span></div>
              <div className='ad-item'><span className='quality'>CC :{episodes}</span></div>
              <Link to={`/video_player/${id}`}><div className='ad-item'><span className='quality'><button className='play_button'><i class='bx bx-play-circle'></i>Watch Now</button></span></div></Link>
            </div>
            <div className='anime-description'>{showMore?synopsis:synopsis?.substring(0,500)+' ...'}
            <button className='show_button' onClick={()=>setShowMore(!showMore)}>{showMore?'show Less':'Show More'}</button></div>
          </div>
          <div className='moreDetails_container'>
            <div className='md-item'><span><b>Japanaese: </b></span><span>{title_japanese}</span></div>
            <div className='md-item'><span><b>Aired: </b></span>{aired?.string}<span></span></div>
            <div className='md-item'><span><b>Synonyms: </b></span><span>{title_synonyms}</span></div>
            <div className='md-item'><span><b>Rating: </b></span><span>{rating}</span></div>
            <div className='md-item'><span><b>Premiered: </b></span><span>{season} {year}</span></div>
            <div className='md-item'><span><b>Duration: </b></span><span>{duration}</span></div>
            <div className='md-item'><span><b>Status: </b></span><span>{status}</span></div>
            <div className='md-item'><span><b>Score: </b></span><span>{score}</span></div>
          </div>
        </div>
        <AnimeCharacters  id={id} />
        <Recommendations  id={id} />
      </div>
    </div>
    </div>
  )
}

export default AnimeDetails