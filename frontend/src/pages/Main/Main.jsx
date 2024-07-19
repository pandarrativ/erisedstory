import axios from "axios";
import Story from "../Story/Story";
import Game from "../Game/Game";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
import { storyActions } from "../../reducers/StorySlice";
import { AIMentorRouter, storyRouter } from "../../configs/URL";
import { combineStoryPlay } from "../../utils/storyPlayUtils";
import AIMentor from "../../components/AIMentor/AIMentor";

function Main() {
    // follow a MVVM pattern, this is view-model 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /////////////////////////   Variables  ///////////////////////////////////  
    const learning_goal = useSelector((state) => state.story.learning_goal);
    const personality_trait = useSelector((state) => state.story.personality_trait);
    const personality_description = useSelector((state) => state.story.personality_description);
    const life_story = useSelector((state) => state.story.life_story);
    const is_writting = useSelector((state) => state.story.is_writting);
    const user_writing =  useSelector((state) => state.story.user_writing);


    const current_task = useSelector((state) => state.story.current_task);
    const storyPlayData = useSelector((state) => state.story.storyPlayData);

    
    const lastStorySection = storyPlayData && storyPlayData[storyPlayData.length - 1];
    const selected_option = lastStorySection?.selected_option;
    const storyText = lastStorySection?.story;
    const options = [
        lastStorySection?.option1,
        lastStorySection?.option2,
        lastStorySection?.option3,
    ]

/////////////////////////   States  ///////////////////////////////////  
    const [transcript, setTranscript] = useState("");  
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(null);


    /////////////////////////   Props  ///////////////////////////////////  

    // props for Game page
    const showPathPage = () => {
        dispatch(storyActions.setCurrentTask("OPTIONS"))
    }

    // props for Story Page
    const handleClickPath = (option) => {
        dispatch(storyActions.updateStoryPlayData({selected_option: option}));
        
        // to be removed
        setTimeout(() => {
            dispatch(storyActions.setIsWritting(true));
        }, 3 * 1000);
        // dispatch(storyActions.setIsWritting(true));
    }

    const handleSendInput = async() => {
        console.log(selected_option);
        // first send to ask feedback
        const resp = await axios.post(AIMentorRouter, {
            TASK: "FEEDBACK",
            life_story: life_story,
            personality_description: personality_description,
            personality_trait: personality_trait,
            learning_goal: learning_goal,
            story: combineStoryPlay(storyPlayData),
            user_writing: transcript
        })
        dispatch(storyActions.updateStoryPlayData({feedback: resp.data}));
        // show message in 3 seconds
        setTimeout(() => {
            setMessage(resp.data);
            setShowMessage(true);
        }, 10 * 1000);
    }

    const handleUserClickSuggestions = () => {
        if(current_task !== "STORY") return ;

        console.log("click suggestions")
        console.log(lastStorySection.option1);

        axios.post(AIMentorRouter, {
            // ask for suggestions
            TASK: "SUGGESTION",
            life_story: life_story,
            personality_description: personality_description,
            personality_trait: personality_trait,
            learning_goal: learning_goal,


            story: combineStoryPlay(storyPlayData),
            option1: lastStorySection.option1,
            option2: lastStorySection.option2,
            option3: lastStorySection.option3,
        })
        .then((resp) => {
            console.log(resp.data)
            dispatch(storyActions.updateStoryPlayData({feedback:resp.data}));
            // show message
            setShowMessage(true);
            setMessage(resp.data);
        })
        .catch((e) => console.log(e));
    }

    const handleClickMentorBubble = async () => {
        if (is_writting) {
            await continueNextChapter();
        }
        setShowMessage(false);
        setMessage(null);
    }


    const continueNextChapter = async () => {

        axios.post(storyRouter, {
            TASK: "NARRATIVE",
            story: combineStoryPlay(storyPlayData),
            branch_option: selected_option,
            user_story: transcript,
            learning_goal:learning_goal,
        })
        .then((resp) => {
            console.log(resp.data);
            

            axios.post(storyRouter,{
                TASK: "OPTIONS",
                learning_goal: learning_goal,
                story: resp.data,
            })
            .then((resp2) => {
                console.log(resp2.data);
                dispatch(storyActions.setUserWritting(transcript));
                dispatch(storyActions.addStoryPlayData({story: resp.data}));
                dispatch(storyActions.updateStoryPlayData(resp2.data));
                dispatch(storyActions.setIsWritting(false));
                dispatch(storyActions.setCurrentTask("STORY"))
                setTranscript("");
            })
            .catch((e) => console.log(e))
           
        })
        .catch((e) => console.log(e));
    }



    /////////////////////////   Page UI elements  ///////////////////////////////////  

    const renderPage = () => {
        if(current_task === "STORY"){
            return  <Story
                        showPathPage={showPathPage}
                        storyText={storyText}
                        user_writing={user_writing}
                    ></Story>;
        }else if(current_task === "OPTIONS"){
            return  <Game 
                        options={options}
                        handleClickPath={handleClickPath}
                        handleSendInput={handleSendInput}
     
                        transcript={transcript}
                        setTranscript={setTranscript}
                        selected_option={selected_option} 
                        is_writting={is_writting}
                    ></Game>
        }
    }


    return ( 
        <div className="main">
            {renderPage()}


            {/* some hidden page elements */}
            <AIMentor handleClickMentorBubble={handleClickMentorBubble} message={message} showMessage={showMessage}  handleUserClickSuggestions={handleUserClickSuggestions}></AIMentor>

            <button className="btn absolute top-4 right-4" style={{backgroundColor: "#a694ee"}} onClick={() => navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
     );
}

export default Main;