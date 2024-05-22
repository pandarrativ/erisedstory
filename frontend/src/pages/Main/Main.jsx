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

/////////////////////////   States  ///////////////////////////////////  
    const [isCloudVisible, setIsCloudVisible] = useState(false);
    const [showRespond, setShowRespond] = useState(false);
    const [transcript, setTranscript] = useState("");  // also the content user writes
    const [isListening, setIsListening] = useState(false);
    const [sageMesages, setSageMessages] = useState([]);

    const getSageMessages = () => {
        return "aad";
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
            //
        })
        .then((resp) => {
            setSageMessages([...sageMesages, {role:"assistant", content:resp.data}]);
        })
        .catch((e) => console.log(e));
        setIsCloudVisible(true); // show cloud
    }

    const handleSendInput = () => {
        // TBD
        axios.post(storyRouter, {
            // ask for suggestions
        })
        .then((resp) => {
            dispatch(storyActions.updateStoryPlayData({
                suggestion: resp.data,
            }));
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

        })
        .then((resp) => {
            dispatch(storyActions.addStoryPlayData({
                story: transcript ,
                path_1: resp.data.path_1,
                path_2: resp.data.path_2,
                path_3: resp.data.path_3,
                suggestion: "",
                is_suggestion_accepted: "",
                path_selected: "",
            }));
            dispatch(storyActions.setCurrentTask("STORY"));
        })
        .catch((e) => console.log(e));
    }

    const declineChanges = () => {
        dispatch(storyActions.updateStoryPlayData({is_suggestion_accepted: false}));
        
        // TBD
        axios.post(storyRouter, {
            // ask for paths

        })
        .then((resp) => {
            dispatch(storyActions.addStoryPlayData({
                story: sageSuggestion ,
                path_1: resp.data.path_1,
                path_2: resp.data.path_2,
                path_3: resp.data.path_3,
                suggestion: "",
                is_suggestion_accepted: "",
                path_selected: "",
            }));
            dispatch(storyActions.setCurrentTask("STORY"));
        })
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
            <SageAgent sageMessages={sageMesages} dispatchUserSageMessage={setSageMessages} getSageMessage={getSageMessages}/>

            <ToastContainer/>
        </div>
     );
}

export default Main;