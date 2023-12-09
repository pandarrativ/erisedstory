import React from 'react';
import "../assets/css/story.css"
import SampleAgentLeft from "../assets/imgs/sample-agent-l.svg"
import { useNavigate } from 'react-router-dom';

function NewStory(props) {
    const navigate = useNavigate();
    const nextPage = (e) => {
        e.preventDefault();
        navigate("/story-extract")
    }

    return (
        <div className='main'>
            <div className='newstory'>
                <div className='newstory-header font-h2'>Step 1: Enter your fear description</div>
                
                <div className='story-dashbord'>
                    <textarea className='newstory-input primary-border'></textarea>
                </div>

                <div className='story-bottom'>
                    <div className='story-agent-block'>
                        <img src={SampleAgentLeft} alt="a sample agent" className='box-img'></img>
                    </div>

                    <div className='story-content-block'>
                        <div className='story-content-block-top'>
                            <div className='primary-border agent-input'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias dolor provident repellat ut porro impedit cupiditate quam. Provident, error nostrum dolorem deserunt ea doloribus nesciunt nihil qui doloremque ad?</div>
                        </div>

                        <div className='story-content-block-btns'>
                            <button className='story-btn' onClick={nextPage}>Continue</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NewStory;