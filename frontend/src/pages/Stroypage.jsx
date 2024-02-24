import "../assets/css/storypage.css";
import StoryImg from "../assets/imgs/home_bg.png";
import DecisionImg from "../assets/imgs/sample_fear.png";
import ConversationImg from "../assets/imgs/conversation.jpg";
import ConversationAvator from "../assets/imgs/con-bot.png";
import AudioIcon from "../assets/icons/audio-fill.svg";
import AudioCurrentIcon from "../assets/icons/audio.svg";

// import Dinasour from "../assets/icons/dinasour.svg";
import Dinasour from "../assets/icons/output.png";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { storyRouter } from "../config/routeConfig";


function Storypage() {
    // const navigate = useNavigate();
    // states
    const user_id = useSelector((state) => state.user.user_id);
    const storyPalyId = useSelector((state) => state.story.storyPalyId);
    const story = useSelector((state) => state.story.story);
    const atagonist = useSelector((state) => state.story.atagonist);
    const pages = useSelector((state) => state.story.pages);
    const nextTask = useSelector((state) => state.story.nextTask);
    const storyPlayData = useSelector((state) => state.story.storyPlayData);
    // the page that is currently showing
    // const [currentPage, setCurrentPage] = useState(0);



    /* 
    nextTask: 
        ASK_STORY: ask for a story description
        ASK_DECISION_MAKING: ask for decision making and three options
        ASK_CONVERSATION: ask for character
        CONTINUE_DECISION_MAKING: ask for story description after options
        END_CONVERSATION: ask for story description after conversation
    */

    const continueStory = () => {
        console.log(nextTask);

        if(nextTask === "ASK_STORY"){
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: storyPalyId,
                summary:"N/A",
            })
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((e) => alert(e));
        }
    }

    // combine all the data into a story prompt
    const getStoryPrompt = () => {
        let res = "";
        for(let i=0; i<pages; i++){
            if(storyPlayData[i].type === "story-description"){
                res += storyPlayData[i].story;
            }
        }
        console.log(res);
        return res;
    }



    // 1.if show story
    const renderPageStory = (dataShown) => {
        /* 
        data format:{
          "story": "In the enchanting world of magic, you step into the shoes of Harry Potter, the Boy Who Lived. Born on July 31, 1980, he hails from the non-magical Dursley family but is destined for greatness. An orphan raised by his cruel aunt and uncle, Harry discovered his extraordinary wizarding abilities on his 11th birthday when he received an acceptance letter from Hogwarts School of Witchcraft and Wizardry. With a lightning bolt scar on his forehead, he survived the dark wizard, Lord Voldemort, as a baby. As you embark on your journey, you'll learn about spells, potions, and the profound destiny that awaits you at Hogwarts. ",
          "type": "story-description",
          "order": 1,
          "timestamp": "2024-02-24T20:52:59.070248"
        }
        */
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
                        <div className="font-size-2 right-type1-content scrobar-1">{dataShown.story}</div>
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-2" onClick={continueStory}>Next</button>
                    </div>
                </div>
            </>
        )  
    }

    // 2.if show decision making
    const renderPageDecision = (dataShown) => {
        /* 
        data format:{
          question:
          option_1:
          option_2:
          option_3: 
          "type": "decision-making",
          "order": 1,
          "timestamp": "2024-02-24T20:52:59.070248"

          //below only shows in history data
          choice: <OPTION CONTENT>
        }
        */
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
                        <div className="right-type2-question font-size-2 scrobar-1">{dataShown.question}</div>

                        <div className="right-type2-choices">
                            <button className="btn-choices font-size-2">Anser 1</button>
                            <button className="btn-choices font-size-2">Anser 1</button>
                            <button className="btn-choices font-size-2">Anser 1</button>
                        </div>
                    </div>

                    <div className="page-right-btns">
                        <button className="btn-steps font-size-1-5" onClick={continueStory}>Next</button>
                    </div>     
                </div>
            </>
        )
    }

    // 3.if show conversation
    const renderPageConversation = (dataShown) => {
        /* 
        data format:{
          character_name:
          character_description:
          first_sentence: 
          "type": "conversation",
          "order": 1,
          "timestamp": "2024-02-24T20:52:59.070248",
          chat_background: ""

          //below only shows in history data
          messages [{role:assistant, content:""},{role:user, content:""]
        }
        */
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
                        <button className="btn-steps font-size-2" onClick={continueStory}>Next</button>
                    </div>
                </div>
            </>
        )  
    }

    const renderPage = () => {
        let dataShown = storyPlayData[storyPlayData.length -1]; // replace last page with currentPage
        if(dataShown.type === "story-description"){
            return renderPageStory(dataShown);
        }else if(dataShown.type === "decision-making"){
            return renderPageDecision(dataShown);
        }else if(dataShown.type === "conversation"){
            return renderPageConversation(dataShown);
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