import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Trait.css"
import Bubble from "../../assets/imgs/bubble_personality.png";
import Panel from "../../assets/imgs/bg-login.png";
import Mentor from "../../assets/imgs/Mentor_select.svg";
import { useSelector, useDispatch } from 'react-redux';
import { storyActions } from "../../reducers/StorySlice";
import { showMessageDialog } from "../../utils/modalUtils";
import axios from 'axios';
import { storyRouter } from '../../configs/URL';


const traits = ["Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness"]

function Genre() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const learning_goal = useSelector((state) => state.story.learning_goal);
    const personality_trait = useSelector((state) => state.story.personality_trait);

    
    const nextPage = (e) => {
        e.preventDefault();

        if(!personality_trait){
            showMessageDialog("Opps!", "Please select a personality trait first!")
            return;
        }

        axios.post(storyRouter,{
            TASK: "NEW_STORY",
            learning_goal: learning_goal,
            personality_trait:personality_trait,
        })
        .then( (resp) => {
            dispatch(storyActions.addStoryPlayData({story: resp.data["story"], current_task:"STORY"}));
            dispatch(storyActions.setTraitDescriptionAndLifeStory({personality_description: resp.data["personality_description"], life_story: resp.data["life_story"]}))
            console.log(resp.data)

            axios.post(storyRouter,{
                TASK: "OPTIONS",
                learning_goal: learning_goal,
                story: resp.data["story"],
            })
            .then((resp2) => {
                console.log(resp2.data);
                dispatch(storyActions.updateStoryPlayData(resp2.data));
                navigate("/main");
            })
            .catch((e) => console.log(e))
        })
        .catch((e) => {
            console.log(e)
        })

    }

    const onClickTrait = (goal) => {
        dispatch(storyActions.setSageTrait(goal))
    }

    return(
        
        <div className='genre min-w-[500px] flex flex-row'>
            <div className='trait-left flex flex-col'>
                <div className="trait-bubble">
                    <img src= {Bubble} alt="learning title" className='trait-title'></img>
                </div>

                <img src={Mentor} alt="ai mentor" className='trait-mentor'></img>
            </div>

            <div className='trait-right'>
                <img src={Panel} alt="panel" className='trait-right-bg'></img>

                <div className='w-full h-full py-16 flex flex-col justify-between z-10 absolute items-center'>
                    {
                        traits.map((item, i) => {
                            return <div className='flex items-center justify-center px-8' key={i}><button className={`trait-card font-semibold ${personality_trait === item && "selected-trait"}`} onClick={() => onClickTrait(item)}>{item}</button></div>
                        })
                    }
                    <button className='trait-continue-btn' onClick={nextPage}>Start the Journey!</button>
                </div>

            </div>


        </div>
    )
}

export default Genre;