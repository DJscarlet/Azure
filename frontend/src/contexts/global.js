import {useContext, useEffect, useState, createContext, useReducer} from 'react'

export const GlobalContext=createContext();
const url='https://api.jikan.moe/v4'

//actions
const LOADING="LOADING"
const SEARCH="SEARCH"
const GET_POPULAR_ANIME="GET_POPULAR_ANIME"
const MENU="MENU"

//reducer
const reducer=(state,action)=>{
    switch(action.type){
        case LOADING:
            return{...state,loading:true}
        case GET_POPULAR_ANIME:
            return{...state,popularAnime:action.payload,loading:false}
        case SEARCH:
            return{...state,search:action.payload,loading:false}
        case MENU:
            return{...state,isMenu:action.payload}
        default:
            return state
    }
}

export const GlobalContextProvider=({children})=>{
    // const [popularAnime,setPopularAnime]=useState([])
    const [search,setSearch]=useState('')
    const [menu,setMenu]=useState(false)
    const initialState={
        popularAnime:[],
        upcomingAnime:[],
        search:[],
        isMenu:false,
        isSearch:false,
        loading:false
    }
    const [state,dispatch]=useReducer(reducer,initialState)
    
    const handleChange=(e)=>{
        setSearch(e.target.value)
        if(e.target.value===''){
            state.isSearch=false
        }
    }

     //handle submit
     const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }

    const handleMenu=()=>{
        dispatch({type:MENU,payload:!menu})
        setMenu(!menu)
    }

    const searchAnime=async(e)=>{
        dispatch({type:LOADING})
        let res=await fetch(`https://api.jikan.moe/v4/anime?q=${e}&limit=20`);
        res=await res.json()
        console.log("some thing",res)
        dispatch({type:SEARCH, payload:res.data})
    }

    const fetchPopularAnime=async()=>{
        dispatch({type:LOADING})
        const popularAnime=await fetch(`${url}/top/anime`)
        const data=await popularAnime.json()
        console.log(data)
        dispatch({type:GET_POPULAR_ANIME,payload:data.data})
    }
    useEffect(()=>{
        fetchPopularAnime()
    },[])
    return(
        <GlobalContext.Provider value={{ ...state,handleSubmit,searchAnime,handleChange,handleMenu }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}