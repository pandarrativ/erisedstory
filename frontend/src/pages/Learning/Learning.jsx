import "./Learning.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import learning_title from '../../assets/imgs/Learning_title.svg';
import Arrow from '../../assets/imgs/Arrow.png';
import { useSelector, useDispatch } from 'react-redux';
import { storyActions } from "../../reducers/StorySlice";
import { showMessageDialog } from "../../utils/modalUtils";

const learningGoals = [
    "Social Engagement", "Cooperation", "Self-Management", 
    "Emotional Resilience", "Innovation",
];

function Learning(props) {
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
            <img src= {learning_title} alt="learning title" className='learning-title'></img>
            
            <div className='learning-goal'>

                <div className='grid grid-cols-2 gap-x-8 gap-y-4 pt-8 px-8'>

                    {
                        learningGoals.map((item, i) => {
                            return <button className={` goal-box font-semibold ${learning_goal === item && "selected-goal"}`} key={i} onClick={() => onClickLearningGoal(item)}>
                                {item}
                            </button>
                        })
                    }
                   
                    {/* <div className='column'>
                        {learningGoals.slice(0, 3).map((goal, index) => (
                            <div key={index} className='goal-box'>{goal}</div>
                        ))}
                    </div>

                    <div className='column'>
                        {learningGoals.slice(3).map((goal, index) => (
                            <div key={index + 3} className='goal-box'>{goal}</div> 
                        ))}
                    
                    </div> */}
 
                </div>
                
                <img src= {Arrow} alt="arrow" className='learning-arrow'  onClick={nextPage}></img>
 

            </div>
        </div>

        
    );
}

export default Learning;