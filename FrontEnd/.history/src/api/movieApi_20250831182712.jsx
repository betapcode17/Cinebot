import axios from "axios";

const API_BASE = "";

export const getAllMovies = async() =>{
    const res = await  axios.get(API_BASE);
    return res.data;
}

export const getMovieByID = async (id){
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data
}