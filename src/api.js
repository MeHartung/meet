import mockData from './mock-data';

/**
 * This function extracts locations from the events array.
 * It will also remove all duplicates by creating a new array using the spread operator
 * and a Set, which removes duplicates from the array.
 */
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

/**
 * This function fetches events from the API or returns mock data when running locally.
 */
export const getEvents = async () => {
    if (window.location.href.startsWith("http://localhost")) {
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = `https://7drqjeimn8.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result) {
                return result.events;
            } else {
                console.error('No events found in the response.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            return null;
        }
    } else {
        console.error('No valid token found.');
        return null;
    }
};

/**
 * This function checks if the access token is valid by sending a request to the Google tokeninfo endpoint.
 */
const checkToken = async (accessToken) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error checking token:', error);
        return null;
    }
};

/**
 * This function retrieves the access token from localStorage or the URL,
 * or redirects the user to the Google authorization page.
 */
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (!code) {
            try {
                const response = await fetch(
                    "https://7drqjeimn8.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url",
                    {
                        method: 'GET',
                        mode: 'cors' // 'no-cors' removed to allow CORS
                    }
                );
                const result = await response.json();
                const { authUrl } = result;
                return (window.location.href = authUrl);
            } catch (error) {
                console.error('Error fetching auth URL:', error);
                return null;
            }
        }
        return code && getToken(code);
    }
    return accessToken;
};

/**
 * This function removes any query parameters from the URL after the token is obtained.
 */
const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

/**
 * This function exchanges an authorization code for an access token.
 */
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    try {
        const response = await fetch(
            `https://7drqjeimn8.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
        );
        const { access_token } = await response.json();
        if (access_token) {
            localStorage.setItem("access_token", access_token);
        }
        return access_token;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};