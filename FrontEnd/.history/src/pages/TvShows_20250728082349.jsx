import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import axios from "axios";


const TvShows = () => {

    const [shows, setShows] = useState([]);
    const [filters, setFilters] = useState({
        query: "",
        genre: "",
        country: "",
        year: "",
        sortBy: "",
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API_TOKEN = import.meta.env.VITE_API_KEY;
    const IMG_URL =
        import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";
    const headers = {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
    };

    use effect(() => {
        const fetchShows = async () => {
            const { query, genre, sortBy, year } = filters;

            let url = `https://api.themoviedb.org/3/discover/tv?language=vi&page=${page}`;





}