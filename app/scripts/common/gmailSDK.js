
var clientId = '578542616567-un8q76km5u61nemtb1pq67vuq9jhppqg.apps.googleusercontent.com';

var apiKey = 'AIzaSyCq9Q1_fGpKLyF3lFtAcSo8B3tlJdgCcKQ';

var scopes = 'https://www.googleapis.com/auth/plus.me';

function handleClientLoad() {
    // Step 2: Reference the API key
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
};