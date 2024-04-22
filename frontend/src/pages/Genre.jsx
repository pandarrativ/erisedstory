import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/Genre.css"
import genre_bg from '../assets/imgs/Genre_bg.png'
import rectangle from '../assets/imgs/Rectangle.png'
import Arrow from '../assets/imgs/Arrow.png'
import { fetchGenre } from '../services';


function Genre(props) {
    const navigate = useNavigate();
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetchGenre()
            .then(data => setGenre(data))
            .catch(error => console.error('Error fetching genre:', error));
    } , []);

    return(
        
        <div className='genre'>
            <img src= {genre_bg} alt="genre bg" className='genre-bg'></img>

            <div className='genre-contain'>

            <div className='genre-cards'>
                    {genre.map(genre => (
                        <div key={genre.id} className='genre-card'>
                            <div className='genre-card-title'>{genre.title}</div>
                            <img src={rectangle} alt="genre bg" className='genre-card-img'></img>
                        </div>
                    ))}
                </div>

                <img src= {Arrow} alt="genre bg" className='genre-arrow' onClick={() => navigate("/Story")}></img>
            </div>
        
        </div>
    )
}

export default Genre;