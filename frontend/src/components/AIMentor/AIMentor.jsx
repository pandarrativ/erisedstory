import InactiveImage from "../../assets/imgs/saga_agent.png";
import ActiveImage from "../../assets/imgs/ai_mentor_activate.png";
import "./ai-mentor.css"


function AIMentor({isActivate,handleClickMentorBubble, showMessage,  message, handleUserClickSuggestions}) {


    return ( 
        <div className="ai-mentor">
            
            {showMessage ?
                <img src={ActiveImage} alt="ai-mentor" className="ai-mentor-active"></img>
                :
                <img src={InactiveImage} alt="ai-mentor" className="ai-mentor-inactive"  onClick={handleUserClickSuggestions}></img>
            }
            {showMessage &&  <div className="ai-mentor-bubble" onClick={handleClickMentorBubble}>{message}</div>}

        </div>
     );
}

export default AIMentor;