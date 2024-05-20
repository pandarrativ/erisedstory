import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Genre.css"
import genre_bg from '../../assets/imgs/Genre_bg.png'
import rectangle from '../../assets/imgs/Rectangle.png'
import Arrow from '../../assets/imgs/Arrow.png'

function Genre(props) {
    const navigate = useNavigate();

    return(
        
        <div className='genre'>
            <img src= {genre_bg} alt="genre bg" className='genre-bg'></img>

            <div className='genre-contain'>

                <div className='genre-cards'>
                    <div className='genre-card1'>
                        <div className='genre-card-title'>genre 1</div>
                        <img src= {rectangle} alt="genre bg" className='genre-card-img'></img>
                    </div>

                    <div className='genre-card2'>
                        <div className='genre-card-title'>genre 2</div>
                        <img src= {rectangle} alt="genre bg" className='genre-card-img'></img>
                    </div>

                    <div className='genre-card3'>
                        <div className='genre-card-title'>genre 3</div>
                        <img src= {rectangle} alt="genre bg" className='genre-card-img'></img>
                    </div>

                    <div className='genre-card4'>
                        <div className='genre-card-title'>+create your own</div>
                    </div>
                </div>

                <img src= {Arrow} alt="genre bg" className='genre-arrow' onClick={() => navigate("/Story")}></img>
            </div>
        
        </div>
    )
}

export default Genre;