export const combineStoryPlay = (playData) => {
    let story = "";
    for(let i=0; i<playData.length; i++){
        story = story+ " " + playData[i].story;
    }
    return story;
};


