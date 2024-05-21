export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function concateStory(storyData){
    let story = "";
    for(let i=0; i<storyData.length; i++){
        story = story + " " + storyData[i].story;
    }
    return story;
}