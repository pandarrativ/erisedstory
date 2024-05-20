type RedirectLocations = {
    [key: string]: string;
};



// for dev
const redirectLocations: RedirectLocations = {
    "main": '/', 
    "pdtalk": '/pdtalk', 
    "card": '/card', 
};



export function getRedirectLocation (locationURI: string) :string  {
    return "http://pandarrativ.com/credential?location=" + locationURI;
}


export function getRedirectURI (locationURI: string) :string  {
    return "/credential?location=" + locationURI;
}



export default function validateRedirectUri(redirectKey: string): string | false {
    if (redirectLocations.hasOwnProperty(redirectKey)) {
        return redirectLocations[redirectKey];
    } else {
        return false;
    }
}