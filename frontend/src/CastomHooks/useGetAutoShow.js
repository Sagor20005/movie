import { getMovies } from "../features/movies/moviesSlice"
import { useDispatch } from "react-redux"

function GetAutoShow(){
  const dispatch = useDispatch()
  dispatch(getMovies())
}

export default GetAutoShow