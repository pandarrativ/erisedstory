import HarryPotterBG from "../assets/imgs/harrypotter/harrypotter_bg.png";
import ThreeBodyBG from "../assets/imgs/threebody/threebody_bg.png";

import HarryPotterProfile from "../assets/imgs/harrypotter/HarryPotter.png"
import ThreeBodyProfile from "../assets/imgs/threebody/WenjieYe.png"



export const storyList = [
    {
        title:"HarryPotter",
        script_name:"Harry Potter",
        keys: "Magic",
        role:"Wizard",
        profile:HarryPotterProfile,
        bg:HarryPotterBG,
    },
    {
        title:"ThreeBody",
        script_name:"The Three-Body Problem",
        keys: "Science Fiction",
        role:"Astrophysicist",
        profile:ThreeBodyProfile,
        bg:ThreeBodyBG,
    },
]

export const getBackground = (story) => {
    if(story === "HarryPotter"){
        return HarryPotterBG;
    }else if(story === "ThreeBody"){
        return ThreeBodyBG;
    }
}
