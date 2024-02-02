import React, { useState } from 'react';
import FearIconTrue from "../assets/icons/icon_like_false.svg";
import FearIconFalse from "../assets/icons/icon_like_true.svg";

function StoryExtractCard(props) {
    const toggleIsCheck = (e) =>{
        e.preventDefault();
        props.addFearToList(props.fearId);
    }
    return (
        <div className='story-extract-card primary-border'>
            <div className='extract-card-left'>
                <div className='extract-card-left-img-box img-box'>
                    <img src={props.cardInfo.image} alt="a sample image" className='box-img'></img>
                </div>
            </div>
            <div className='extract-card-mid'>
                <div className='extract-card-mid-top font-c2'>
                    {props.cardInfo.fearName}
                </div>
                <div className='extract-card-mid-bottom'>
                    <div className='extract-card-mid-bottom-left'>
                        <div className='font-c2'>Description</div>
                        <div className='font-c3'>
                            {props.cardInfo.fearDescription}
                        </div>
                    </div>
                    <div className='extract-card-mid-right'>
                        <button className='extract-card-like-btn' onClick={toggleIsCheck}>
                            {props.isChecked ? 
                            <img src={FearIconTrue} alt="a icon for confirm button"></img>
                            :
                            <img src={FearIconFalse} alt="a icon for confirm button"></img>}
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className='extract-card-right'>
                right
            </div>         */}
        </div>
    );
}

export default StoryExtractCard;