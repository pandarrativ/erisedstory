// give a random int from a range[0, n): randomly set next step after an event
export const randomInt = (range) => {
    return Math.floor(Math.random()*range);
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
}


export const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
        
    return `${hours}:${minutes}`;
}

export const formatTime = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    // Create an array of month names
    const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sept", "Oct", "Nov", "Dec"
    ];

    // Extract the month, day, and year from the Date object
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const month = monthNames[inputDate.getMonth()];
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();

    // Format the date in the desired output format
    return `${hours}:${minutes} ${month} ${day} ${year}`;
}

export const timeDiff = (dateTimeString1, dateTimeString2) => {
    const date1 = new Date(dateTimeString1);
    const date2 = new Date(dateTimeString2);

    // Calculate the time difference in milliseconds
    const timeDifference = date2 - date1;

    // Convert milliseconds to minutes
    const minutesDifference = Math.ceil(timeDifference / (1000 * 60));

    return `${minutesDifference} min`;
}


export const parseScriptPlay= (data) => {
    let res = []
    for(let i=0; i<data.playdata.length; i++){
        if(data.playdata[i].type === "story-description") res.push(data.playdata[i]);
    }
    console.log(res);
    return res;
}
      

// randomly pick options between inital probability. Not 2 consecutive options i given
export function createSelectionFunction(options, initialProbabilities) {
    let lastTwoSelections = [null, null];
    let probabilities = initialProbabilities.slice();

    function selectOption() {
        // Update probabilities to prevent three consecutive selections
        if (lastTwoSelections[0] === lastTwoSelections[1]) {
            probabilities = initialProbabilities.map((p, i) => 
                i === lastTwoSelections[1] ? p * 0.1 : p
            );
        } else {
            probabilities = initialProbabilities.slice();
        }

        // Calculate cumulative distribution
        let cumulative = probabilities.map((sum => value => sum += value)(0));
        let random = Math.random() * cumulative[cumulative.length - 1];

        // Select option based on random number
        let selectedOption = cumulative.findIndex(cum => random <= cum);

        // Update history
        lastTwoSelections.shift();
        lastTwoSelections.push(selectedOption);

        // Return the selected option
        return options[selectedOption];
    }

    return selectOption;
}


export function getCharacterInfoByName(charcterList, name){
    for(let i=0; i < charcterList.length; i++){
        if(charcterList[i].character_name === name){
            return charcterList[i].avatar;
        }
    }
}