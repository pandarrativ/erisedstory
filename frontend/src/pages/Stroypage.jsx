import "../assets/css/storypage.css";
import StoryImg from "../assets/imgs/home_bg.png";
import DecisionImg from "../assets/imgs/sample_fear.png";
import ConversationImg from "../assets/imgs/conversation.jpg";
import ConversationAvator from "../assets/imgs/con-bot.png";
import AudioIcon from "../assets/icons/audio-fill.svg";
import AudioCurrentIcon from "../assets/icons/audio.svg";

import Dinasour from "../assets/icons/dinasour.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Storypage() {
    const navigate = useNavigate();
    const [type, setType] = useState(3);


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
                    <div className="right-type2-body boder-1 bg-color-green-1">
                        <div className="right-type2-qs font-size-2-5 font-bold">Decision Making</div>
                        <div className="right-type2-question font-size-2 scrobar-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum accusamus doloremque voluptatibus delectus quas quo eligendi enim soluta incidunt, veritatis quam itaque debitis veniam minima eum at, sint inventore! Saepe?</div>

                        <div className="right-type2-choices">
                            <button className="btn-choices font-size-2">Anser 1</button>
                            <button className="btn-choices font-size-2">Anser 1</button>
                            <button className="btn-choices font-size-2">Anser 1</button>
                        </div>
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-1-5">Next</button>
                    </div>     
                </div>
            </>
        )
    }

    // 3.if show conversation
    const renderPageConversation = () => {
        return (
            <>
                <div className="story-page-left story-page-left-3">
                    <div className="story-page-img img-box boder-1">
                        <img src={ConversationImg} alt="a sample img" className="story-page-img box-img"></img> 
                    </div>

                    <div className="left-type-3-msg">
                        <div className="type-3-msg-avatar ">
                            <img src={ConversationAvator} alt="a chat bot"></img>
                        </div>
                        <div className="type-3-msg-body bubble bubble-bottom-left">
                           <p className="scrobar-1"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id omnis animi voluptate nesciunt eveniet eos nemo corrupti ab voluptatum harum earum sint rerum ipsa, voluptatem quam mollitia aspernatur numquam quaerat.</p>
                        </div>
                    </div>
                </div>

                <div className="story-page-right story-page-right-3">
                    <div className="right-type3-body boder-1 bg-color-blue-2">
                        <div className="font-size-2-5 right-type1-title font-bold">Talk</div>
                        <div className="font-size-2 right-type1-content scrobar-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus pariatur aut quo, laudantium ratione hic veniam asperiores deserunt animi iusto nihil perspiciatis non ipsam, dolorem doloremque quos vero. Eos, explicabo.</div>
                        <div className="right-type3-audio">
                            <button >
                                <img src={AudioIcon} alt="click button for audio input"></img>
                            </button>
                        </div>
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-2">Next</button>
                    </div>
                </div>
            </>
        )  
    }

    const renderPage = () => {
        if(type === 1){
            return renderPageStory();
        }else if(type === 2){
            return renderPageDecision();
        }else if(type === 3){
            return renderPageConversation();
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