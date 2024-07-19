import React, { useEffect } from "react";
import "./story.css";


function Story({showPathPage, storyText}) {

    /* Params
    storyText: String  content to be shown
    showPathPage: switch to show different paths
    
    */

  

    return(
        <div className="story">

            <div className="story-contain">

                <div className="story-box">
                    <button onClick={showPathPage}><div className="story-text">{storyText}</div></button>

                </div>
            </div>
        </div>
    )

}

export default Story;