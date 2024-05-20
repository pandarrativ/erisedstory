import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import cloud from "../../assets/imgs/cloud.png";
import dialog_bg from "../../assets/imgs/dialog_bg.png";
import Arrow from "../../assets/imgs/Arrow.png";
import word_bg from "../../assets/imgs/word_bg.png";

function Game() {

    const navigate = useNavigate();
    const words = ["Apple", "Tree", "Pear"]

    const [isCloudVisible, setIsCloudVisible] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showRespond, setShowRespond] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);

    let recognition = null;
    //todo:fetch conversition with saga

    //speech recognition API
    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
          recognition = new window.webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
    
          recognition.onresult = (event) => {
            const lastResult = event.results[event.resultIndex];
            if (lastResult.isFinal) {
                setTranscript(lastResult[0].transcript);
            }
          };
    
          recognition.onend = () => {
            setIsListening(false);
          };
        }
    }, []);

    const handleClickAnywhere = () => {
        if (!isCloudVisible) {
            setIsCloudVisible(true);
            setTimeout(() => {
                setShowInstructions(true);
            }, 500);

            setTimeout(() => {
                setShowInstructions(false);
                setShowRespond(true);
            }, 3000);
            
        }
    };


    const handleListenClick = () => {
        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
        setIsListening(!isListening);
      };

    return (
        <div className="game" onClick={handleClickAnywhere}>
            {isCloudVisible &&(
                <img src={cloud} alt="cloud" className={`cloud ${isListening ? 'cloud-speaking' : ''}`} />
            )}

           {words.map((word, index) => (
                <div key={index} className="word-container">
                    <img src={word_bg} alt="word_bg" className="word-bg" />
                    <div className="word">{word}</div>
                </div>
            ))}

            
            {isCloudVisible && (
                <div className="conversation">
                    {showInstructions && (
                        <div className="game-instructions">
                            <p>Would you read the word...</p>
                            <p>The cloud can here you</p>
                            <img src={dialog_bg} alt="dialog_bg" className="dialog-bg" />
                        </div>
                    )}
                    
                    {showRespond && ( 
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
                    )}
                </div>
            )}

        </div>
    );
}

export default Game;