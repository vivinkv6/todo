import {create} from 'zustand';

type State={
    movies:{
        id:number,
        movieName:string,
        directorName:string
    }[]
}

type Action={
    addMovie:(movie:{
        id:number,
        movieName:string,
        directorName:string
    })=>void,
    deleteMovie:(id:number)=>void
}

export const useMovieStore=create<State&Action>((set)=>({
    movies:[],
    addMovie:(movie)=>{
       set((state)=>({
        movies:[...state.movies,movie]
       }))
    },
    deleteMovie:(id)=>{
       set((state)=>({
        movies:state.movies.filter((movie)=>movie.id!==id)
       }))
    }
}))