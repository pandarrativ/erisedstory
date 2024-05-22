import axios from "axios";
import React, { useEffect } from "react";
import "./story.css";
import { storyRouter } from "../../configs/URL";

import { useSelector, useDispatch } from 'react-redux';
import { storyActions } from "../../reducers/StorySlice";
import { concateStory } from "../../utils/utils";

function Story() {
    const dispatch = useDispatch();
    // const current_task = useSelector((state) => state.story.current_task);
    const storyPlayData = useSelector((state) => state.story.storyPlayData);
    const storyText = storyPlayData[storyPlayData.length - 1].story;


    useEffect(() => {
        const sentences = storyText.match(/[^\.!\?]+[\.!\?]+/g) || [];
        
        const readSentence = (sentence, isLast) => {

            const utterance = new SpeechSynthesisUtterance(sentence);
        
            if (isLast) {
                utterance.onend = () => {

                    setTimeout(() => {
                        loadAndShowPaths();
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

    const loadAndShowPaths = () => {
        // temporily disable it
        // axios.post(storyRouter, {
        //     story: concateStory(storyPlayData)
        // })
        // .then((resp) => {
        //     console.log(resp.data);
        //     dispatch(storyActions.updateStoryPlayData({
        //         path_1: resp.data.path1,
        //         path_2: resp.data.path2,
        //         path_3: resp.data.path3,

        //     }))
        // })
        // .then(() => {
        //     dispatch(storyActions.setCurrentTask("PATH"));
        // })
        // .catch((e) => console.log(e));

        dispatch(storyActions.setCurrentTask("PATH"));
        // setCurrentTask("PATH");
    }


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