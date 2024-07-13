import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import cloud from "../../assets/imgs/cloud.png";
import dialog_bg from "../../assets/imgs/dialog_bg.png";
import Arrow from "../../assets/imgs/Arrow.png";
import word_bg from "../../assets/imgs/word_bg.png";



import { showMessageDialog } from "../../utils/modalUtils";

function Game({paths, handleClickPath, handleSendInput , acceptChanges, declineChanges,
    isCloudVisible, setIsCloudVisible,
    transcript, setTranscript,
    isListening, setIsListening,
    sageSuggestion,
 }) {

    /* Params
    paths: list of Strings,   the paths shown on the screen
    handleClickPaht:  event handler on mouse click on path
    handleSendInput: event hander for finish writing/transcripting and send. AI agent will pop up a modal with suggestions
    acceptChanges: event hander for click on accept
    declineChanges: event handlder for decline suggestions

    
    */



    // const words = [
    //     storyPlayData[storyPlayData.length - 1].path_1,
    //     storyPlayData[storyPlayData.length - 1].path_2,
    //     storyPlayData[storyPlayData.length - 1].path_3,
    // ]

    // const [isCloudVisible, setIsCloudVisible] = useState(false);
    // // const [showInstructions, setShowInstructions] = useState(false);
    // const [showRespond, setShowRespond] = useState(false);
    // const [transcript, setTranscript] = useState("");
    // const [isListening, setIsListening] = useState(false);

    let recognition = null;
    //todo:fetch conversition with saga

    //speech recognition API
    // useEffect(() => {

    //     if ('webkitSpeechRecognition' in window) {
    //       recognition = new window.webkitSpeechRecognition();
    //       recognition.continuous = true;
    //       recognition.interimResults = true;

    
    //       recognition.onresult = (event) => {
    //         const lastResult = event.results[event.resultIndex];
    //         if (lastResult.isFinal) {
    //             setTranscript(lastResult[0].transcript);
    //         }
    //       };
    
    //       recognition.onend = () => {
    //         setIsListening(false);
    //       };
    //     }
    // }, []);

    // const handleClickAnywhere = () => {
    //     if (!isCloudVisible) {
    //         setIsCloudVisible(true);
    //         setTimeout(() => {
    //             setShowInstructions(true);
    //         }, 500);

    //         setTimeout(() => {
    //             setShowInstructions(false);
    //             setShowRespond(true);
    //         }, 3000);
            
    //     }
    // };


    const handleListenClick = () => {
        showMessageDialog("Oops!", "We are still working on it...")
        // if (isListening) {
        //   recognition.stop();
        // } else {
        //   recognition.start();
        // }
        // setIsListening(!isListening);
      };

    //   const handleClickPath = (path) => {
    //     dispatch(storyActions.updateStoryPlayData({path_selected:path}));
    //     dispatchUserSageMessage([...sageMessages, {role:"assistant", content:"To be open, you need to keep the following things in mind: asd, asd !"}])
    //     setIsCloudVisible(true);
    //   }

    //   const handleConfirmChanges = () => {
    //     document.getElementById('sage_confirm_modal').showModal();
    //     document.getElementById("sage_confirm_modal_content").innerText = "How about adding more friends for Sammy? They can be from different places in the forest and have cool skills. They can all help Sammy together and learn from each other!";
    //   }

    //   const acceptChanges = () => {
    //     // temporily use it
    //     dispatch(storyActions.initStoryPlay());
    //     dispatch(storyActions.setCurrentTask("STORY"));
    //   }

    //   const declineChanges = () => {
    //     dispatch(storyActions.setCurrentTask("STORY"));
    //   } 

    return (
        // <div className="game" onClick={handleClickAnywhere}>
        <div className="game" >
            {isCloudVisible &&(
                <img src={cloud} alt="cloud" className={`cloud ${isListening ? 'cloud-speaking' : ''}`} />
            )}

           {paths.map((item, index) => (
                <button key={index} className="word-container" onClick={() => handleClickPath(item)}>
                    <img src={word_bg} alt="word_bg" className="word-bg" />
                    <div className="word font-semibold">{item}</div>
                </button>
            ))}


            
            {isCloudVisible && (
                <div className="conversation">
                    {/* {showInstructions && (
                        <div className="game-instructions">
                            <p>Would you read the word...</p>
                            <p>The cloud can here you</p>
                            <img src={dialog_bg} alt="dialog_bg" className="dialog-bg" />
                        </div>
                    )} */}
                    
                    {/* {showRespond && ( 
                        <div className="game-respond">
                            <p>speak your story with the word you choose!</p>
                            <button onClick={handleListenClick}>{isListening ? "Stop Listening" : "Start Listening"}</button>
                            <textarea
                                className="game-textarea"
                                placeholder="Type your story here..."
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                            />
                            <img src={Arrow} alt="Game Arrow" className="game-arrow" />
                        </div>
                    )} */}

                        <div className="game-respond">
                            <p className="text-h3 font-bold">Speak your story with the word you choose!</p>
                            {/* <button onClick={handleListenClick} className="btn">
                                {isListening ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                                    <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                                </svg> 
                                }
                            </button> */}
                            <textarea
                                className="game-textarea"
                                placeholder="Type your story here..."
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                            />
                            <button onClick={handleSendInput} className="game-arrow" > <img src={Arrow} alt="Game Arrow"/></button>
                        </div>
                </div>
            )}


            <dialog id="sage_confirm_modal" className="modal">
                <div className="modal-box sage_modal-box" >
                    <h3 className="font-bold sage_modal-title">What do you think of this opinion?</h3>
                    <p className="py-4" id="sage_confirm_modal_content">{sageSuggestion}</p>
                    <div className="modal-action">
                    <form method="dialog" className="flex flex-row justify-around w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className=" sage_modal-btn" onClick={acceptChanges}>Accept Changes</button>
                        <button className=" sage_modal-btn" onClick={declineChanges}>Continue My Own</button>
                    </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
}

export default Game;