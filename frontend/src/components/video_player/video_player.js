import React,{useState,useEffect} from 'react'
import './video_player.css'
import { useParams } from 'react-router-dom'
import Recommendations from '../recommendations/Recommendations';

function Video_player() {
  const [anime, setAnime] = useState({});
  const [videos,setVideos] = useState([])
  const [comments,setComments] = useState([])

  const { id } = useParams();

  const getAnimeDetails = async (id) => {
    let res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    let json = await res.json();
    console.log("New",json.data,id)
    setAnime(json.data);
  };
  const getAnimeEpisodes=async(id)=>{
    let res = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos/episodes`)
    let json = await res.json()
    setVideos(json.data)
  };
  // const getAnimeComments=async(id)=>{
  //   let res = await fetch(`http://localhost:8000/anime/comments`)
  //   let json = await res.json()
  //   setComments(json)
  // }

  useEffect(() => {
    getAnimeDetails(id);
    getAnimeEpisodes(id);
    // getAnimeComments(id);
  }, [id]);
  const {trailer,title,episodes,duration}=anime
  return (
    <div className="video_wrapper">
      <main className="video_container">
        <section className="main-video">
          {trailer?<iframe
            src={trailer? trailer.embed_url : ""}
            title="Inline Frame Example"
            class="responsive-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loop
          ></iframe>:
          <h3>Video not available</h3>}
        </section>
        <section className="video-playlist">
          <h3 className="title">{title}</h3>
          <p>{episodes?episodes:'----'} Episodes &nbsp;. &nbsp; Each episode: {duration}</p>
          <div className="videos">
            {
              videos.map((video)=>{
                const {episode,title}=video
                return(
                  <div className='v-item'>
                    <h3>{episode}&nbsp;&nbsp;</h3>
                    <p>{title}</p>
                  </div>
                )
              })
            }
          </div>
        </section>
      </main>
      <section className='comments-section'>
          <h3>Comments</h3>
          <div className='comments'>
            {
              comments.map((comments)=>{
                const {user,comment}=comments
                return(
                  <div>
                    {/* <h1>{user}</h1>
                    <p>{comment}</p> */}
                    <h1>Scarlet</h1>
                    <p>Very good anime</p>
                  </div>
                )
              })
            }
          </div>
        </section>
        <Recommendations id={id}/>
    </div>
  );
}

export default Video_player;