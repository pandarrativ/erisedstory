import React, { useEffect } from "react";
import "./Game.css";

import BGClear from "../../assets/imgs/Game_bg.png";
import bubble from "../../assets/imgs/agent-bubble.png";
import BGFilled from "../../assets/imgs/Selection_bg.png";
import Arrow from "../../assets/imgs/Arrow.png";




function Game({options, handleClickPath, handleSendInput, transcript, setTranscript, selected_option, is_writting}) {


    return (
        <div className="game" >
            {is_writting ?
                <img src={BGClear} alt="train windows" className="game-bg"></img>
                :
                <img src={BGFilled} alt="train windows" className="game-bg"></img>
            }
            {/* <img src={BGFilled} alt="train windows" className="game-bg"></img> */}
    
            <div className="options">
                {options.map((item, index) => (
                    <button key={index} className="word-container" onClick={() => handleClickPath(item)}>
                    
                        <div className="word font-semibold">{item}</div>
                    </button>
                ))}


                {is_writting &&
                    <div className="conversation">
                        <div className="game-respond">
                            <p className="conversation-title">{`Let continue your story with "${selected_option}"`}</p>
                    
                            <textarea
                                className="game-textarea"
                                placeholder="Type your story here..."
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                            />
                            <button onClick={handleSendInput} className="game-arrow" > <img src={Arrow} alt="Game Arrow"/></button>
                        </div>
                    </div>
                }
            </div>
 

            {!is_writting && 
            <div className="agent-bubble">
                <img src={bubble} alt="agent bubble"></img>
                <div className="placeholder">Let select one branch and tell your story!</div>
                <span>Let select one branch and tell your story!</span>
            </div>
}


        </div>
    );
}

export default Game;