import React from 'react'
import './AnimeCard.css'

function AnimeCard(props) {
  return (
    <div className='anime-card'>
        <div className='anime_card_container'>
            <div className='anime_card_details'>
                <div className='ac_bg_img'>
                    <img src={props.data.images.jpg.image_url} alt='' />
                </div>
                <div className='ac_footer font-nunito'>
                    <div className='ac_title'>
                        <h1>{props.data.title}</h1>
                        <h2 className='azure'>{props.data.studios?.[0]?.name}</h2>

                    </div>
                    <div className='ac_info'>
                        <p>{props.data.year?props.data.year:"-----"}</p>
                        <p>episodes:{props.data.episodes}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AnimeCard