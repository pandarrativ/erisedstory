import ShantaramProfile from "../assets/imgs/shantaram/Shantaram.png";
import HarryPotterProfile from "../assets/imgs/harrypotter/HarryPotter.png"
import WitcherProfile from "../assets/imgs/witcher/Witcher.png"
import ThreeBodyProfile from "../assets/imgs/threebody/WenjieYe.png"

import ShantaramBG from "../assets/imgs/shantaram/shantaram_bg.png";
import HarryPotterBG from "../assets/imgs/harrypotter/harrypotter_bg.png";
import WitcherBG from "../assets/imgs/witcher/witcher_bg.png";
import ThreeBodyBG from "../assets/imgs/threebody/threebody_bg.png";



export const scripts = [
    {
        title:"Shantaram",
        script_name:"Shantaram",
        keys: "Criminal, Life",
        role:"Prisoner",
        profile:ShantaramProfile,
        bg:ShantaramBG,
    },
    {
        title:"HarryPotter",
        script_name:"Harry Potter",
        keys: "Magic",
        role:"Wizard",
        profile:HarryPotterProfile,
        bg:HarryPotterBG,
    },
    {
        title:"Witcher",
        script_name:"The Witcher",
        keys: "Adventure",
        role:"Monster hunter",
        profile:WitcherProfile,
        bg:WitcherBG,
    },
    // {
    //     title:"ThreeBody",
    //     script_name:"The Three-Body Problem",
    //     keys: "Science Fiction",
    //     role:"Astrophysicist",
    //     profile:ThreeBodyProfile,
    //     bg:ThreeBodyBG,
    // },
]

export const getBackground = (script) => {
    if(script === "Shantaram"){
        return ShantaramBG;
    }else if(script === "HarryPotter"){
        return HarryPotterBG;
    }else if(script === "Witcher"){
        return WitcherBG;
    }else if(script === "ThreeBody"){
        return ThreeBodyBG;
    }
}
