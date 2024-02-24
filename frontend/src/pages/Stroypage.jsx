import "../assets/css/storypage.css";
import StoryImg from "../assets/imgs/home_bg.png";
import DecisionImg from "../assets/imgs/sample_fear.png";


import Dinasour from "../assets/icons/dinasour.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Storypage() {
    const navigate = useNavigate();
    const [type, setType] = useState(1);

    // 1.if show story
    const renderPageStory = () => {
        return (
            <>
                <div className="story-page-left story-page-left-1">
                    <div className="story-page-img img-box boder-1">
                        <img src={StoryImg} alt="a sample img" className="story-page-img box-img"></img> 
                    </div>
                </div>

                <div className="story-page-right story-page-right-1">
                    <div className="right-type1-body boder-1 bg-color-pink-1">
                        <img className="story-decoration-img" src={Dinasour} alt="a cute dinasour"></img>
                        <div className="font-size-2-5 right-type1-title font-bold">Story</div>
                        <div className="font-size-2 right-type1-content scrobar-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus pariatur aut quo, laudantium ratione hic veniam asperiores deserunt animi iusto nihil perspiciatis non ipsam, dolorem doloremque quos vero. Eos, explicabo.</div>
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-2">Next</button>
                    </div>

                    
                </div>
            </>
        )
        
    }

    // 2.if show decision making
    const renderPageDecision = () => {
        return (
            <>
                <div className="story-page-left story-page-left-2">
                    <div className="story-page-img img-box boder-1">
                        <img src={DecisionImg} alt="a sample img" className="story-page-img box-img"></img> 
                    </div>
                </div>

                <div className="story-page-right story-page-right-2">
                    <div className="right-type2-body boder-1 bg-color-pink-1">
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-2">Next</button>
                    </div>

                    
                </div>
            </>
        )
        
    }

    const renderPage = () => {
        if(type === 0){
            return renderPageStory();
        }else if(type === 1){
            return renderPageDecision();
        }
    }

    return (  
        <div className="main">
            <div className="story-page bg-color-blue-1">
                {renderPage()}
            </div>


        </div>
    );
}

export default Storypage;