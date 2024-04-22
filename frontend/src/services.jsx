const BASE_URL = 'http://localhost:3000/api'; // Adjust this as per your API URL

// Fetch learning goals
const fetchLearningGoals = async () => {
    try {
        const response = await fetch(`${BASE_URL}/learningGoals`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching learning goals:', error);
        throw error;
    }
};

//fetch Genre
const fetchGenre = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genre`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching genre:', error);
        throw error;
    }
};

// Fetch story text
const fetchStoryText = async () => {
    try {
        const response = await fetch(`${BASE_URL}/storyText`);
        const text = await response.text();
        try{
            const data = JSON.parse(text);
            return data.story;
        }catch(error){
            console.error('Error parsing story text:', error);
            throw error;
        }
    } catch (error) {
        console.error('Error fetching story text:', error);
        throw error;
    }
};

// fetch game
const fetchGame = async () => {
    try {
        const response = await fetch(`${BASE_URL}/game`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error;
    }
};

export { fetchLearningGoals, fetchGenre, fetchStoryText, fetchGame };