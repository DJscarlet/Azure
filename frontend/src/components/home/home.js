import React, {useEffect, useState} from 'react'
import './home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios';
import SwiperCore from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function Home() {
  const [slide, setSlide] = useState([]);
  const [trending,setTrending] = useState([]);
  const [search,setSearch]=useState("Naruto");

  useEffect(() => {
    async function fetchData() {
        // setIsLoading(true); // Set loading state to true
        // setError(null); // Clear any previous errors
        try {
            const response = await axios.get('http://localhost:5000/home/slide_data'); // Replace with your backend URL
            setSlide(response.data);
            console.log("slide",response);
        } catch (error) {
            console.error('Error fetching slide data:', error);
            //setError(error); // Store error for display
        } finally {
            //setIsLoading(false); // Set loading state to false after fetching (success or failure)
        }
    }
    async function  getTrendings(){
        const response=await axios.get('http://localhost:5000/home/trending_anime_data_retrieve');
        setTrending(response.data);
        console.log("Trending:\n",response);
    }
    fetchData();
    getTrendings();
}, []);

  return (
    <div className='Slider'>
      <div className='slider-container anima'>
          <div className='slider swiper-container'>
              <div className='swiper-wrapper'>
                  <Swiper
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      loop
                  >
                      {slide.map((item, index) => (
                          <SwiperSlide key={index}>
                              <div className='swiper-slide item-qtiq center'>
                                  <div className='deslide-item'>
                                      <div className='deslide-cover'>
                                          <div className='deslide-cover-img'>
                                              <img src={`/images/${item.imageid}`} alt={item.name} />
                                          </div>
                                      </div>
                                      <div className='deslide-item-content'>
                                          <div className='desi-sub-text'>{item.spotlight}</div>
                                          <div className='desi-title'>{item.name}</div>
                                          <div className='sc-details'>
                                              <div className='scd-item'>
                                                  <i className='bx bx-play-circle'></i>
                                                  {item.mode}
                                              </div>
                                              <div className='scd-item'>
                                                  <i className='bx bx-time-five'></i>
                                                  {item.ep_time}
                                              </div>
                                              <div className='scd-item'>
                                                  <i className='bx bxs-calendar'></i>
                                                  {item.realease_date}
                                              </div>
                                              <div className='scd-item'>
                                                  <span className='quality'>{item.quality}</span>
                                              </div>
                                          </div>
                                          <div className='desi-description'>{item.description}</div>
                                          <div className='desi-buttons'>
                                              <Link to={`/video_player/${item.mal_id}`}>
                                                <button className='desi-button'>
                                                    <i className='bx bx-play-circle'></i>Watch Now
                                                </button>
                                              </Link>
                                              <Link to={`/anime_details/${item.mal_id}`} className="btn2 center desi-button">
                                                Detail<i className='bx bx-chevron-right'></i>
                                              </Link>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </SwiperSlide>
                      ))}
                  </Swiper>
              </div>
          </div>
      </div>
      <div id="anime-trending">
                <div className="trending-container">
                    <section className="block_area block_area_trending">
                        <div className="block_area-header">
                            <div className="bah-heading">
                                <h2 className="cat-heading">Trending</h2>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="block_area-content">
                            <div className="trending-list anima">
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    navigation={{
                                        nextEl: '.navi-next',
                                        prevEl: '.navi-prev',
                                    }}
                                >
                                    {trending.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="swiper-slide item-qtip" data-id={item.id}>
                                                <Link to={`/anime_details/${item.mal_id}`}>
                                                    <div className="item">
                                                        <div className="number">
                                                            <span>{item.number}</span>
                                                            <div className="film-title">{item.name}</div>
                                                        </div>
                                                        <img src={`wallpapers/${item.imageid}`} alt={item.name} />
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="trending-navi">
                                    <div className="navi-next"><i className='bx bx-chevron-right'></i></div>
                                    <div className="navi-prev"><i className='bx bx-chevron-left'></i></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
  </div>
  )
}

export default Home