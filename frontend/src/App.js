import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
//importing the root layout
import RootLayout from './rootLayout'       
//importing the anime_details layout
import AnimeDetails from './components/anime_details/anime_details'      
import VideoPlayer from './components/video_player/video_player'   
import Home from './components/home/home'
import Menu from './components/menu/menu'
import Popular from './components/popular/popular'
import Search from './components/search/Search';
import 'bootstrap/dist/css/bootstrap.min.css'

import {useGlobalContext} from './contexts/global'

function App() {
  const browserRouter=createBrowserRouter([
    {
      path:'',
      element:<RootLayout />,
      children:[
        {
          path:'/popular',
          element:<Popular />
        },
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/anime_details/:id',
          element:<AnimeDetails />
        },
        {
          path:'/video_player/:id',
          element:<VideoPlayer />
        },
        {
          path:'/menu',
          element:<Menu />
        },{
          path:'/search',
          element:<Search />
        }
      ]
    }
  ])
  const global=useGlobalContext();
  console.log(global)
  return (
    <div className="App">
      <RouterProvider router={browserRouter}/>
    </div>
  );
}

export default App;
