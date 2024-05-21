import Story from "../Story/Story";
import Game from "../Game/Game";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';


function Main() {
    const navigate = useNavigate();

    const learning_goal = useSelector((state) => state.story.learning_goal);
    const personality_trait = useSelector((state) => state.story.personality_trait);
    const current_task = useSelector((state) => state.story.current_task);


    const renderPage = () => {
        if(current_task === "STORY"){
            return  <Story></Story>;
        }else if(current_task === "PATH"){
            return  <Game></Game>
        }
    }


    return ( 
        <div className="main">
            {renderPage()}
        </div>
     );
}

export default Main;