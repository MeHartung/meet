'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://mehartung.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // Лог запроса

  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request'); // Лог обработки OPTIONS запроса
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        /*  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token'*/
      },
    };
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log('Generated auth URL:', authUrl); // Лог сгенерированного URL для аутентификации

  return {
    statusCode: 200,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      /*'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token'*/
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  console.log('Received event for getAccessToken:', JSON.stringify(event, null, 2)); // Лог запроса

  const code = decodeURIComponent(`${event.pathParameters.code}`);
  console.log('Decoded code:', code); // Лог декодированного кода

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        console.error('Error retrieving access token:', error); // Лог ошибки
        return reject(error);
      }
      console.log('Received access token:', response); // Лог полученного access token
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error)
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  console.log('Received event for getCalendarEvents:', JSON.stringify(event, null, 2)); // Лог запроса

  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  console.log('Decoded access_token:', access_token); // Лог декодированного access_token

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          console.error('Error fetching calendar events:', error); // Лог ошибки
          reject(error);
        } else {
          console.log('Fetched calendar events:', response.data.items); // Лог полученных событий
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(error),
      };
    });
};