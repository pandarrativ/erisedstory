import React, { useRef, useState, useEffect } from 'react';
import SageChatMessage from './SageChatMessage';
import "./sage-agent.css";

import { useSelector } from 'react-redux';




function SageAgent({sageMessages, dispatchUserSageMessage, getSageMessage}) {
    const sage = useSelector((state) => state.userSettings.sage);

    const [userInput, setUserInput] = useState("");
    const [showChat, setShowChat] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowChat(!showChat);
    }

    // scroll to bottom
    const messagesEndRef = useRef();
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [sageMessages]);


    const sendUserMessage = (e) => {
        e.preventDefault();
        dispatchUserSageMessage(userInput);
        setUserInput("");
    }

    useEffect(() => {
        if(sageMessages && sageMessages.length > 0 && sageMessages[sageMessages.length - 1].role === "user"){
            getSageMessage();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sageMessages]);



    return (
        <div className='chat-widget font-content text-h5'>
            <div className='widget'>
                <div className='widget-img-box img-box ' onClick={toggleShow}>
                    <img src={sage.sageImage} className='box-img shadow-card' alt="a chat widget img"></img>
                </div>
            </div>
        
            {/* chat panel */}
            <div className={`shadow-card widget-chat widget-chat-${showChat}`}>
                <div className='widget-chat-header bg-dec1-full'>
                    <div className='widget-chat-icon-box img-box'>
                        <img src={sage.sageImage} alt="a chat widget img" className='box-img'></img>
                    </div>

                    <div className='widget-chat-heading font-title font-semibold'>{sage.sageName}</div>
                    <button className='widget-close-btn' onClick={toggleShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='widget-chat-body bg-dec2-1'>
                    <div className='widget-chat-top'>
                        <div className='widget-chat-top-box img-box'>
                            <img src={sage.sageImage} alt="a chat widget img" className='box-img'></img>
                        </div>
                        <div className='widget-chat-subtitle text-h6'>I am here with you!</div>
                    </div>

                    {sageMessages.map((item, i) => {
                        return (
                            <div className='widget-message-box' key={i}>
                                <SageChatMessage fromMe={item.role === "user"} profile={sage.sageImage} content={item.content} ></SageChatMessage>
                            </div>

                        );
                    })}
                    
                    <div ref={messagesEndRef} />
                </div>

                <form className='widget-chat-bottom bg-dec1-full'>
                    <input className='widget-chat-message-input' placeholder='Message...' type='text' onChange={(e) => setUserInput(e.target.value)} value={userInput}></input>
                    <button onClick={sendUserMessage} type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SageAgent;