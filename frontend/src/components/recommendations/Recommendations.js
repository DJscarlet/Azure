import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './recommendations.css'

function Recommendations(props) {
    const [recommendations,setRecommendations]=useState([])
    const id=props.id
    const getAnimeRecommendations=async(id)=>{
        let res=await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations?q=${id}&limit=20`)
        let json=await res.json()
        setRecommendations(json.data)
    }
    
    console.log(recommendations)
    useEffect(()=>{
        getAnimeRecommendations(id)
    },[id])

  return (
    <div className='recommendations'>
        <div className='recommendations-container'>
            <div className='r-heading'>
                <div className='r-title'>Recommended for you...</div>
            </div>
            <div className='r-body'>
                <div  className="r-body-container center">
                    {
                        recommendations.map((recommendation)=>{
                            let {entry}=recommendation
                            let {mal_id,images,title}=entry
                            return(
                                <div className='card-wrapper'>
                                        <Link to={`/anime_details/${mal_id}`}>
                                            <img src={images.jpg.image_url} alt=''/>
                                            <h1>{title}</h1>
                                        </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recommendations