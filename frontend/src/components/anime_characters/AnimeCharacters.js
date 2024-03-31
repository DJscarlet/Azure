import React, { useEffect, useState } from 'react'
import './anime_characters.css'

function AnimeCharacters(props) {
  let [character,setCharacter]=useState([])
  const getAnimeCharacter=async(id)=>{
    let res=await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
    res=await res.json()
    setCharacter(await res.data)
  }
  useEffect(()=>{
    getAnimeCharacter(props.id)
  },[])
  return (
    <div className='anime_characters_container'>
      <h2>Characters</h2>
      <div className='anime_characters_list'>
          {
            character?.map((character)=>{
                const {role} = character;
                const {images,name,mal_id}=character.character
                return(
                    <div className='character center'>
                        <img src={images?.jpg.image_url} alt=''/>
                        <h4>{name}</h4>
                        <p>{role}</p>
                    </div>
                )
            })
          }
      </div>
    </div>
  )
}

export default AnimeCharacters