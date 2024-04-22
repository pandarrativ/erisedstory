import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/story.css";
import { fetchStoryText } from "../services";

function Story() {

    const navigate = useNavigate();
    const [storyText, setStoryText] = useState("");

    // const storyText = "In a small, cozy village where everyone knew each other's names,there was a young boy named Alex who had a special pair of glasses that allowed him to see the world through the eyes of others. One sunny day, he stumbled upon a sad, lonely cat stuck in a tall tree, feeling scared and wishing for a friend to understand its fear."

    useEffect(() => {
        fetchStoryText()
            .then((story) => setStoryText(story))
            .catch((error) => console.error("Error fetching story text:", error));
      }, []);


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