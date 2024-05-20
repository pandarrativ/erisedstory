import "./Learning.css"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import learning_title from '../../assets/imgs/Learning_title.png';
import Arrow from '../../assets/imgs/Arrow.png';

function Learning(props) {

    const navigate = useNavigate();

    const learningGoals = [
        "learning goal 1", "learning goal 2", "learning goal 3", 
        "learning goal 4", "learning goal 5", "learning goal 6"
    ];

    return (
        <div className='learning'>
            <img src= {learning_title} alt="learning title" className='learning-title'></img>
            
            <div className='learning-goal'>

                <div className='goals-container'>
                   
                    <div className='column'>
                        {learningGoals.slice(0, 3).map((goal, index) => (
                            <div key={index} className='goal-box'>{goal}</div>
                        ))}
                    </div>

                    <div className='column'>
                        {learningGoals.slice(3).map((goal, index) => (
                            <div key={index + 3} className='goal-box'>{goal}</div> 
                        ))}
                    
                    </div>
 
                </div>
                
                <img src= {Arrow} alt="arrow" className='learning-arrow'  onClick={() => navigate("/Genre")}></img>
 

            </div>
        </div>

        
    );
}

export default Learning;