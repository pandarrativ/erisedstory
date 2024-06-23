import React, { useEffect } from "react";
import "./story.css";


function Story({showPathPage, storyText}) {

    /* Params
    storyText: String  content to be shown
    showPathPage: switch to show different paths
    
    */



    useEffect(() => {
        const sentences = storyText.match(/[^\.!\?]+[\.!\?]+/g) || [];
        
        const readSentence = (sentence, isLast) => {

            const utterance = new SpeechSynthesisUtterance(sentence);
        
            if (isLast) {
                utterance.onend = () => {

                    setTimeout(() => {
                        showPathPage();
                    }, 500);
                };
            }
            
            window.speechSynthesis.speak(utterance);
        };

        sentences.forEach((sentence, index) => {
            const isLast = index === sentences.length - 1;
            readSentence(sentence, isLast);
        });


        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const finishTalking = () => {
        showPathPage();
    }


    return(
        <div className="story">

            <div className="story-contain">

                <div className="story-box">
                    <button onClick={finishTalking}><div className="story-text">{storyText}</div></button>

                </div>
            </div>
        </div>
    )

}

export default Story;