import React from 'react';
import SampleImg from "../assets/imgs/home_bg.png";
import SampleAgentLeft from "../assets/imgs/sample-agent-l.svg"
import { useNavigate } from 'react-router-dom';

function StoryModify(props) {
    const navigate = useNavigate();
    const nextPage = (e) => {
        e.preventDefault();
        navigate("/story-extract")
    }
    const regenerate = (e) => {
        e.preventDefault();
    }

    return (
        <div className='main'> 
            <div className='story-modify'>
                <div className='story-modify-left'>
                    <div className='story-modify-left-title'>Bravery Visualization</div>
                    <div className='story-modify-left-body img-box primary-border'>
                        <img src={SampleImg} alt="a sample img" className='box-img'></img>
                    </div>
                </div>
                <div className='story-modify-right'>
                    <div className='story-modify-right-title'>Description Your Fear</div>

                    <div className='story-modify-dashbord'>
                        <textarea className='newstory-input primary-border'></textarea>
                    </div>

                    <div className='story-modify-bottom'>
                        <div className='story-modify-agent-block'>
                            <img src={SampleAgentLeft} alt="a sample agent" className='box-img'></img>
                        </div>

                        <div className='story-modify-content-block'>
                            <div className='story-modify-content-block-top'>
                                <div className='primary-border story-modify-agent-input'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias dolor provident repellat ut porro impedit cupiditate quam. Provident, error nostrum dolorem deserunt ea doloribus nesciunt nihil qui doloremque ad?</div>
                            </div>

                            <div className='story-modify-content-block-btns'>
                                <button className='story-btn' onClick={regenerate}>Regenerate</button>
                                <button className='story-btn' onClick={nextPage}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryModify ;