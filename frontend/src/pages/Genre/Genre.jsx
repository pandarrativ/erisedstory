import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Genre.css"
import genre_bg from '../../assets/imgs/Genre_bg.png'
import Arrow from '../../assets/imgs/Arrow.png'
import { useSelector, useDispatch } from 'react-redux';
import { storyActions } from "../../reducers/StorySlice";
import { showMessageDialog } from "../../utils/modalUtils";


const traits = ["Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness"]

function Genre(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const personality_trait = useSelector((state) => state.story.personality_trait);

    
    const nextPage = (e) => {
        e.preventDefault();

        if(!personality_trait){
            showMessageDialog("Opps!", "Please select a personality trait first!")
            return;
        }

        dispatch(storyActions.initStoryPlay());
        navigate("/main");
    }

    const onClickTrait = (goal) => {
        dispatch(storyActions.setSageTrait(goal))
    }

    return(
        
        <div className='genre min-w-[500px]'>
            <img src= {genre_bg} alt="genre bg" className='genre-bg'></img>

            <div className='flex flex-col justify-between z-3 absolute w-3/4 mx-auto'>
                <div className='text-h2 font-semibold mt-12'>Pick a Big Five personality trait for your sage agent!</div>

                <div className='genre-cards grid grid-cols-2 gap-y-4 gap-x-8 mx-auto mt-8'>
                    {
                        traits.map((item, i) => {
                            return <div className='flex items-center justify-center' key={i}><button className={`btn trait-card ${personality_trait === item && "selected-trait"}`} onClick={() => onClickTrait(item)}>{item}</button></div>
                        })
                    }

                </div>

                <button className='w-[200px] mx-auto'><img src= {Arrow} alt="genre bg" className='genre-arrow' onClick={nextPage}></img></button>
            </div>
        
        </div>
    )
}

export default Genre;