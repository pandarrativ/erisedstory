import React from "react";
import IconBookMark from "../assets/icons/script_bookmark.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/storycard.css";
import { newStoryPlayRouter } from "../config/routeConfig";
import { useDispatch, useSelector } from 'react-redux';
import {storyActions} from "../redux/StorySlice";


const StoryCard = (props) => {
    // temporaly used, better stored in cookie/localstorage
    const user_id = useSelector((state) => state.user.user_id);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const nextPage = (e) => {
        e.preventDefault();
        
        axios.post(newStoryPlayRouter, {
            script:props.title,
            user_id:user_id,
        })
        .then((resp) => {
            // console.log(resp.data);

            dispatch(storyActions.initStoryPlay({
                scriptplay_id:resp.data.scriptplay_id,
                story:resp.data.script,
                atagonist:resp.data.user_name,
                nextTask: "ASK_STORY",
                pages:resp.data.pages,
                data:resp.data.data,
            }))
            navigate("/story-page");
        })
        .catch((e) => {
            alert(e);
        })
    }



    return (
        <div className="script">
            <div className="script-img-section">
                <div className="script-background-container">
                    <img src={props.bg} alt="script background" className="script-background"></img>
                </div>
                
                <img src={IconBookMark} alt="bookmark icon" className="script-bookmark"></img>
                <div className="script-type">
                    <img src={props.profile} alt="person profile" className="script-profile"></img>
                    <div className="script-username font-size-1">{props.role}</div>
                </div>
            </div>
            <div className="script-name font-size-1">{props.scriptName}</div>
            <button className="script-button font-size-1 font-bold" onClick={nextPage}>Try Now</button>
        </div>
    );
};

export default StoryCard;