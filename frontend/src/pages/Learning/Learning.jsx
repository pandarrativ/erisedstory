import "./Learning.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/imgs/Arrow.png';
import Bubble from "../../assets/imgs/bubble_learning.png";
import { useSelector, useDispatch } from 'react-redux';
import { storyActions } from "../../reducers/StorySlice";
import { showMessageDialog } from "../../utils/modalUtils";

const learningGoals = [
    "Social Engagement", "Cooperation", "Self-Management", 
    "Emotional Resilience", "Innovation",
];

function Learning() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const learning_goal = useSelector((state) => state.story.learning_goal);

    
    const nextPage = (e) => {
        e.preventDefault();

        if(!learning_goal){
            showMessageDialog("Opps!", "Please select a learning goal first!")
            return;
        }
        navigate("/trait");
    }

    const onClickLearningGoal = (goal) => {
        dispatch(storyActions.setLearningGoal(goal))
    }


    return (
        <div className='learning'>
            <div className="learning-bubble">
                <img src= {Bubble} alt="learning title" className='learning-title'></img>
                {/* <div className="bubble-content">Please select one learning goal!</div> */}
            </div>
       
            
            <div className='learning-goal'>

                <div className='grid grid-cols-2 gap-x-8 pt-8 px-8'>

                    {
                        learningGoals.map((item, i) => {
                            return <button className={` goal-box font-bold ${learning_goal === item && "selected-goal"}`} key={i} onClick={() => onClickLearningGoal(item)}>
                                {item}
                            </button>
                        })
                    }
                   
 
                </div>
                
                <img src= {Arrow} alt="arrow" className='learning-arrow'  onClick={nextPage}></img>
 

            </div>
        </div>

        
    );
}

export default Learning;