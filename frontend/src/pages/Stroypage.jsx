import "../assets/css/storypage.css";
import StoryImg from "../assets/imgs/home_bg.png";
import DecisionImg from "../assets/imgs/sample_fear.png";
import ConversationImg from "../assets/imgs/conversation.jpg";
import ConversationAvator from "../assets/imgs/con-bot.png";
import AudioIcon from "../assets/icons/audio-fill.svg";
import AudioCurrentIcon from "../assets/icons/audio.svg";

import Dinasour from "../assets/icons/dinasour.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { conversationRouter, storyRouter } from "../config/routeConfig";
import { storyActions } from "../redux/StorySlice";
import { useEffect, useState } from "react";


function Storypage() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();


    // states
    const scriptplay_id = useSelector((state) => state.story.scriptplay_id);
    const story = useSelector((state) => state.story.story);
    const atagonist = useSelector((state) => state.story.atagonist);
    const pages = useSelector((state) => state.story.pages);
    const nextTask = useSelector((state) => state.story.nextTask);
    const storyPlayData = useSelector((state) => state.story.storyPlayData);
    // the page that is currently showing
    // const [currentPage, setCurrentPage] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(-1);
    const setDecisionChoice = (n) => {
        // add logic here to prevent following code if it is history page

        setSelectedChoice(n);
    }
    const [messages, setMessages] = useState([]);
    const [userMsg, setUserMsg] = useState("");


    /* 
    nextTask: 
        ASK_STORY: ask for a story description
        ASK_DECISION_MAKING: ask for decision making and three options
        ASK_CONVERSATION: ask for character
        CONTINUE_DECISION_MAKING: ask for story description after options
        END_CONVERSATION: ask for story description after conversation
    */

    const continueStory = () => {
        // console.log(nextTask);
        // 1.
        if(nextTask === "ASK_STORY"){
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: scriptplay_id,
                summary:"N/A",
            })
            .then((resp) => {
                // You can change next task to conversation/decision/story here
                // dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"ASK_DECISION_MAKING"}));
                dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"ASK_CONVERSATION"}));
            })
            .catch((e) => alert(e));
        // 2.
        }else if(nextTask === "ASK_DECISION_MAKING"){
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: scriptplay_id,
                summary:"N/A",
            })
            .then((resp) => {
                dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"CONTINUE_DECISION_MAKING"}));
            })
            .catch((e) => alert(e));
        // 3.
        }else if(nextTask === "CONTINUE_DECISION_MAKING"){
            // check if choice is maked first
            if(selectedChoice === -1){
                alert("Let's make a choice first!")
                return
            }
            // send request
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: scriptplay_id,
                summary:"N/A",
                choice: storyPlayData[pages-1][`option_${selectedChoice}`],
            })
            .then((resp) => {
                setSelectedChoice(-1);
                // You can change next task to conversation/decision/story here
                dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"ASK_CONVERSATION"}));
            })
            .catch((e) => alert(e));
        // 4.
        }else if(nextTask === "ASK_CONVERSATION"){
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: scriptplay_id,
                summary:"N/A",
            })
            .then((resp) => {
                dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"END_CONVERSATION"}));
                setMessages([{role:"assistant", content:resp.data.first_sentence}]);
            })
            .catch((e) => alert(e));
        // 5.
        }else if(nextTask === "END_CONVERSATION"){
            axios.post(storyRouter, {
                script_name: story,
                task: nextTask,
                prompt: getStoryPrompt(),
                order:pages + 1,
                scriptplay_id: scriptplay_id,
                summary:"N/A",
                messages: messages,
                character_name: atagonist,
            })
            .then((resp) => {
                // clean messages
                setMessages([]);
                dispatch(storyActions.addStoryPlayData({data:resp.data, nextTask:"ASK_DECISION_MAKING"}));
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

                        <div className="right-type2-choices scrobar-1">
                            <button 
                                className={`btn-choices font-size-2 ${selectedChoice === 1 ? "btn-choices-selected":""}`} 
                                onClick={() => setDecisionChoice(1)}
                            >{dataShown.option_1}</button>
                            <button 
                                className={`btn-choices font-size-2 ${selectedChoice === 2 ? "btn-choices-selected":""}`} 
                                onClick={() => setDecisionChoice(2)}
                            >{dataShown.option_2}</button>
                            <button 
                                className={`btn-choices font-size-2 ${selectedChoice === 3 ? "btn-choices-selected":""}`} 
                                onClick={() => setDecisionChoice(3)}
                            >{dataShown.option_3}</button>
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
                            <div className="ch-name font-size-1">{dataShown.character_name}</div>
                        </div>
                        <div className="type-3-msg-body bubble bubble-bottom-left">
                           <p className="scrobar-1">{messages.length > 0 ? messages[messages.length - 1].content: ""}</p>
                        </div>
                    </div>
                </div>

                <div className="story-page-right story-page-right-3">
                    <div className="right-type3-body boder-1 bg-color-blue-2">
                        <div className="font-size-2-5 right-type1-title font-bold">Talk</div>
                        {/* <div className="font-size-2 right-type1-content scrobar-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus pariatur aut quo, laudantium ratione hic veniam asperiores deserunt animi iusto nihil perspiciatis non ipsam, dolorem doloremque quos vero. Eos, explicabo.</div> */}
                        <input className="font-size-2 right-type1-content scrobar-1" type="text" value={userMsg} onChange={(e) => setUserMsg(e.target.value)}></input>
                        <div className="right-type3-audio">
                            <button onClick={chat}>
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

    
    // user input and send to chat
    const chat = () =>{
        let newMessages = messages;
        newMessages.push({role:"user", content:userMsg});

        axios.post(conversationRouter, {
            username: atagonist,
            prompt: getStoryPrompt(),
            character_name:storyPlayData[pages -1].character_name,
            character_description:storyPlayData[pages -1].character_description,
            messages: newMessages,
        })
        .then((resp) => {
            // console.log(resp.data);
            setUserMsg("");
            setMessages([...messages, {role:"assistant", content:resp.data}])
        })
        .catch((e) => alert(e));
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