import React, { useState } from 'react';
import SampleAgentLeft from "../assets/imgs/sample-agent-l.svg"
import { useNavigate } from 'react-router-dom';
import SampleImg from "../assets/imgs/sample_fear.png";
import StoryExtractCard from '../components/StoryExtractCard';
import IconLeft from "../assets/icons/icon_left.svg";
import IconRight from "../assets/icons/icon_right.svg";

function StoryExtraction(props) {
    const navigate = useNavigate();
    const [cardInfo, setCardInfo] = useState([
        {image:SampleImg, fearName:"Frog1", fearDescription:"A frog looks disgusting"},
        {image:SampleImg, fearName:"Frog2", fearDescription:"A frog looks disgusting"}
    ]);
    const [fearList, setFearList] = useState([true, false]);
    const nextPage = (e) => {
        e.preventDefault();
        navigate("/story-modify")
    }
    const addFearToList = (fearId) => {
        const newFearList = [...fearList];
        newFearList[fearId] = !newFearList[fearId];
        setFearList([...newFearList]);
    }


    // carousel
    const [carouselIndex, setCarouselIndex] = useState(0);
    const pre = () => {
        const n = cardInfo.length;
        setCarouselIndex(  (carouselIndex - 1 + n )%n );
    }
    const next = () => {
        const n = cardInfo.length;
        setCarouselIndex(  (carouselIndex + 1)%n );
    }
    const getCarousel = () => {


        for(let i=0; i<cardInfo.length; i++){
            if(i === carouselIndex){
                // let isChecked = fearList.includes(cardInfo[i].fearName);
                return <StoryExtractCard cardInfo={cardInfo[i]} key={i} fearId={i} isChecked={fearList[i]} addFearToList={addFearToList}></StoryExtractCard>
            }
        }
    }


    return (
        <div className='main'>
            <div className='story-extract'>
                <div className='newstory-header font-h2'>Step 2: Check Your Bravery Analysis</div>
                
                <div className='story-dashbord'>
                    <div className='story-extract-carousel'>
                        {getCarousel()}
                        <div className="story-extract-icon story-extract-icon-left">
                            <img src={IconLeft} alt="icon to go left" onClick={pre}></img>
                        </div>
                        <div className="story-extract-icon-right story-extract-icon">
                            <img src={IconRight} alt="icon to go right" onClick={next}></img>
                        </div>
                        {/* This part lists the dots for each carousel */}
                        {/* <div className='story-extract-icon-lists'>
                            
                        </div> */}
                    </div>

                </div>

                <div className='story-bottom'>
                    <div className='story-agent-block'>
                        <img src={SampleAgentLeft} alt="a sample agent" className='box-img'></img>
                    </div>

                    <div className='story-content-block'>
                        <div className='story-content-block-top'>
                            <div className='primary-border agent-input'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error molestias dolor provident repellat ut porro impedit cupiditate quam. Provident, error nostrum dolorem deserunt ea doloribus nesciunt nihil qui doloremque ad?</div>
                        </div>

                        <div className='story-content-block-btns'>
                            <button className='story-btn' onClick={nextPage}>Continue</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StoryExtraction;