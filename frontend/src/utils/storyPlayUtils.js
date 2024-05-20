export function formatHistoryDate(dateString) {
    const date = new Date(dateString);

    // Extract components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // months are zero-indexed in JS
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${seconds}`;
};


// export const getNextTask = (currentTask) => {
//     switch (currentTask){
//         case "TASK_DECISION":
//             return "CONTINUE_DECISION";
//         case "TASK_SINGLE_CONVERSATION":
//             return "CONTINUE_SINGLE_CONVERSATION";
//         default:
//             return pickWeightedItem(["TASK_STORY", "TASK_DECISION", "TASK_SINGLE_CONVERSATION"], [10, 50, 40]);
//     };
// };

// function pickWeightedItem(items, percentages) {
//     // Ensure that the total percentage adds up to 100
//     const totalPercentage = percentages.reduce((total, percent) => total + percent, 0);
//     if (totalPercentage !== 100) {
//         throw new Error("Total of percentages does not add up to 100.");
//     };

//     let random = Math.random() * 100;
//     for (let i = 0; i < items.length; i++) {
//         random -= percentages[i];
        
//         if (random <= 0) {
//             return items[i];
//         };
//     };
// };

export const getNextTask = (currentTask) => {
    switch (currentTask){
        case "TASK_STORY":
            return "TASK_DECISION";
        case "TASK_DECISION":
            return "CONTINUE_DECISION";
        case "CONTINUE_DECISION":
            return "TASK_SINGLE_CONVERSATION"
        case "TASK_SINGLE_CONVERSATION":
            return "CONTINUE_SINGLE_CONVERSATION";
        case "CONTINUE_SINGLE_CONVERSATION":
            return "TASK_DECISION";
        default:
            return "N/A";
    };
};



export const combineStoryPlay = (playData) => {
    let story = "";
    for(let i=0; i<playData.length; i++){
        story += playData[i].story;
    }
    return story;
};


