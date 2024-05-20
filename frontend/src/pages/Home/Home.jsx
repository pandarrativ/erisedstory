import React from 'react';
import "./home.css";
import HomeBG from "../../assets/imgs/home_bg.png";
// import { useNavigate } from 'react-router-dom';
import { storyList } from '../config/scriptinfo';
import StoryCard from '../../components/StoryCard';

function Home(props) {
    // const navigate = useNavigate();
    // const newStory = () => {
    //     navigate("/story-page")
    // }


    return (
        <div className='main'>
            <div className='home'>
                <div className='home-top img-box'>
                    <img src={HomeBG} alt="home bg" className='box-img'></img>
                </div>

                <div className='home-bottom'>
                    <div className='home-bottom-1'>
                        <div className='home-bottom-title font-c2'>Fundamental</div>

                        {/* <div className='home-bottom-container'>
                            <div className='home-bottom-block' onClick={newStory}>
                                story
                            </div>
                        </div> */}
                        <div className="scripts">
                            {storyList.map((item, i) => {
                                return <StoryCard key={i} title={item.title}  scriptName={item.script_name}  keys={item.keys} role={item.role} profile={item.profile} bg={item.bg}></StoryCard>;
                            })}
                        </div>
                    </div>

                    <div className='home-bottom-2'>
                        <div className='home-bottom-title font-c2'>Guidlines</div>

                        <div className='home-bottom-container'>
                            <div className='home-bottom-block'>
                                Guildline
                            </div>

                            <div className='home-bottom-block'>
                                Agents
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default Home;