import axios from "axios";
import Story from "../Story/Story";
import Game from "../Game/Game";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import SageAgent from "../../components/SageAgent/SageAgent";
import { useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storyActions } from "../../reducers/StorySlice";
import { sageConversationRouter, storyRouter } from "../../configs/URL";
import { combineStoryPlay } from "../../utils/storyPlayUtils";

function Main() {
    // follow a MVVM pattern, this is view-model 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /////////////////////////   Variables  ///////////////////////////////////  
    const learning_goal = useSelector((state) => state.story.learning_goal);
    const personality_trait = useSelector((state) => state.story.personality_trait);
    const current_task = useSelector((state) => state.story.current_task);
    const storyPlayData = useSelector((state) => state.story.storyPlayData);
    
    const lastStorySection = storyPlayData[storyPlayData.length - 1];
    const storyText = lastStorySection.story;
    const paths = [
        lastStorySection.path_1,
        lastStorySection.path_2,
        lastStorySection.path_3,
    ]
    const sageSuggestion = lastStorySection.suggestion;
    const suggestedStory = lastStorySection.revised_story;



/////////////////////////   States  ///////////////////////////////////  
    const [isCloudVisible, setIsCloudVisible] = useState(false);
    const [showRespond, setShowRespond] = useState(false);
    const [transcript, setTranscript] = useState("");  // also the content user writes
    const [isListening, setIsListening] = useState(false);
    const [sageMesages, setSageMessages] = useState([
        {role:"system", content: `You are a sage agent who accompanies the user's story writing process. Your task is to give inspirations on ${learning_goal} and ${personality_trait} during the story writing process. Keep your response short within 15 words.`},
    ]);

    const getSageMessages = () => {
        axios.post(sageConversationRouter, {
            messages: sageMesages
        })
        .then((resp) => {
            setSageMessages([...sageMesages, {role:"assistant", content:resp.data}]);
            toastNotify(resp.data);
        })
        .catch((e) => console.log(e));
    }

    const dispatchUserSageMessage = (userInput) => {
        setSageMessages([...sageMesages, {role:"user", content: userInput}]);
    }

    /////////////////////////   Props  ///////////////////////////////////  

    // props for Game page
    const showPathPage = () => {
        dispatch(storyActions.setCurrentTask("PATH"));
    }

    // props for Story Page
    const handleClickPath = (path) => {
        dispatch(storyActions.updateStoryPlayData({path_selected: path}));
        // TBD:sage agent should give inspiration
        axios.post(sageConversationRouter, {
            messages: [...sageMesages, {role:"user", content:`This is the story I am trying to continue writing: ${combineStoryPlay(storyPlayData)} and I am frontend with three paths. 1.${paths[0]} 2.${paths[1]} 3.${paths[2]}. I choose: ${path}. What do you think of it? Do you have any suggestions?`}]
        })
        .then((resp) => {
            setSageMessages([...sageMesages, {role:"assistant", content:resp.data}]);
            toastNotify(resp.data);
        })
        .catch((e) => console.log(e));
        setIsCloudVisible(true); // show cloud
    }

    const handleSendInput = () => {
        // TBD
        axios.post(storyRouter, {
            // ask for suggestions
            TASK: "SUGGESTION",
            story: combineStoryPlay(storyPlayData),
            user_writting: transcript,
            personality_trait: personality_trait,
            learning_goal: learning_goal,
        })
        .then((resp) => {
            console.log(resp.data)
            // dispatch(storyActions.updateStoryPlayData({
            //     suggestion: resp.data,
            // }));
            dispatch(storyActions.updateStoryPlayData(resp.data));
        })
        .then(() => {
            document.getElementById('sage_confirm_modal').showModal();
        })
        .catch((e) => console.log(e));
    }

    const acceptChanges = () => {
        dispatch(storyActions.updateStoryPlayData({is_suggestion_accepted: true}));
        
        // TBD
        axios.post(storyRouter, {
            // ask for paths
            TASK: "PATH",
            story: combineStoryPlay(storyPlayData),
            personality_trait: personality_trait,
            learning_goal: learning_goal,
        })
        .then((resp) => {
            dispatch(storyActions.addStoryPlayData({
                story: suggestedStory ,
                path_1: resp.data.path1,
                path_2: resp.data.path2,
                path_3: resp.data.path3,
                suggestion: "",
                revised_story:"",
                is_suggestion_accepted: "",
                path_selected: "",
            }));
            setTranscript(""); // clean user story input
            setIsCloudVisible(false);
        })
        .then(() => dispatch(storyActions.setCurrentTask("STORY")))
        .catch((e) => console.log(e));
    }

    const declineChanges = () => {
        dispatch(storyActions.updateStoryPlayData({is_suggestion_accepted: false}));
        
        // TBD
        axios.post(storyRouter, {
            // ask for paths
            TASK: "PATH",
            story: combineStoryPlay(storyPlayData),
            personality_trait: personality_trait,
            learning_goal: learning_goal,
        })
        .then((resp) => {
            dispatch(storyActions.addStoryPlayData({
                story: transcript ,
                path_1: resp.data.path1,
                path_2: resp.data.path2,
                path_3: resp.data.path3,
                suggestion: "",
                revised_story:"",
                is_suggestion_accepted: "",
                path_selected: "",
            }));
            // dispatch(storyActions.setCurrentTask("STORY"));
            setTranscript(""); // clean user story input
            setIsCloudVisible(false);
        })
        .then(() => 
        dispatch(storyActions.setCurrentTask("STORY")))
        .catch((e) => console.log(e));
    }


    /////////////////////////   toastify  ///////////////////////////////////  

    const toastNotify = (toastMsg) => {
        toast(toastMsg ,{
          position: "bottom-right",
          autoClose: 50000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

    /////////////////////////   Page UI elements  ///////////////////////////////////  

    const renderPage = () => {
        if(current_task === "STORY"){
            return  <Story
                        showPathPage={showPathPage}
                        storyText={storyText}
                    ></Story>;
        }else if(current_task === "PATH"){
            return  <Game 
                        paths={paths}
                        handleClickPath={handleClickPath}
                        handleSendInput={handleSendInput}
                        acceptChanges={acceptChanges}
                        declineChanges={declineChanges}
                        isCloudVisible={isCloudVisible}
                        setIsCloudVisible={setIsCloudVisible}
                        transcript={transcript}
                        setTranscript={setTranscript}
                        isListening={isListening}
                        setIsListening={setIsListening}
                        sageSuggestion={sageSuggestion}         
                    ></Game>
        }
    }


    return ( 
        <div className="main">
            {renderPage()}


            {/* some hidden page elements */}
            <SageAgent sageMessages={sageMesages} dispatchUserSageMessage={dispatchUserSageMessage} getSageMessage={getSageMessages}/>

            <ToastContainer/>

            <button className="btn absolute top-4 right-4" style={{backgroundColor: "#a694ee"}} onClick={() => navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
     );
}

export default Main;