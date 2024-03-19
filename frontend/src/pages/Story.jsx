import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/story.css";

function Story() {

    const navigate = useNavigate();
    // const [storyText, setStoryText] = useState("");
    // const [stroyReady, setStoryReady] = useState(false);

    const storyText = "In a small, cozy village where everyone knew each other's names,there was a young boy named Alex who had a special pair of glasses that allowed him to see the world through the eyes of others. One sunny day, he stumbled upon a sad, lonely cat stuck in a tall tree, feeling scared and wishing for a friend to understand its fear."

    // todo: fetch story from backend

    // useEffect(() => {
    //     // Delay the display of the story after the user lands on the page
    //     const storyDisplayTimeout = setTimeout(() => {
    //       generateStory();
    //       setStoryReady(true);
    //     }, 3000); // 3 seconds delay before showing the story
    
    //     return () => clearTimeout(storyDisplayTimeout);
    //   }, []);


    useEffect(() => {

        const sentences = storyText.match(/[^\.!\?]+[\.!\?]+/g) || [];

        const readSentence = (sentence, isLast) => {
            const utterance = new SpeechSynthesisUtterance(sentence);
        
            if (isLast) {
                utterance.onend = () => {

                    setTimeout(() => {
                        navigate("/Game");
                    }, 1000);
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
        }, [navigate]);


    return(
        <div className="story">

            <div className="story-contain">

                <div className="story-box">
                    <div className="story-text">{storyText}</div>

                </div>
            </div>
        </div>
    )

}

export default Story;