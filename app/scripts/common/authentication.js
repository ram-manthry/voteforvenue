
var face = { currentUser: null };

face.userScope = function user_scope_fnc(dt) {
    if (dt)
        return {
            scopeId     : dt.scopeId,
            email       : dt.email,
            userName    : dt.userName,
            firstName   : dt.firstName,
            lastName    : dt.lastName,
            url         : dt.url
        };
    else return {};
};

//Get login status if needed
face.getUserStatus = function getLoginStatus_fnc(){     
    //Check login when page loads
    FB.getLoginStatus(function(response) {
        face.loginHandler(response);
    });
};


//Login 
face.fbLogin = function fb_Login_fnc() {
    //Remove any previous login
    FB.login(function(response) {
        face.loginHandler(response);
    }, {
        scope: 'email'
    });
};


//Handle user login
face.loginHandler = function loginHanlder_fnc(response) {    
    if (response.status === 'connected') {
        face.getUserDetails(response);
    } else if (response.status === 'not_authorized') {
        face.getUserDetails(response);
    } else {        
        face.setError();
    };
};

//Call API to get user logged details
face.getUserDetails = function getUserDetails_fnc(response){
    FB.api('/me', function (res) {
        if (res.error) { face.currentUser = null; face.setError(); return false; }

        var data = {
            url         : 'https://graph.facebook.com/' + res.id + '/picture',
            scopeId     : res.id,
            email       : res.email,
            userName    : res.name,
            firstName   : res.first_name,
            lastName    : res.last_name
        };
        face.currentUser = face.userScope(data);
        face.isLoginButtonVisible();
        face.setUserDetails();
        face.send();
    });
};


//Set user Details
face.setUserDetails = function setUserDetails_fnc(){
    var url = '<img src="/img/venueGreen48.png">';
    var greeting = 'Hi foreigner';
    if (face.currentUser && face.currentUser !== null) {
        url = '<img class="userPic" src="' + face.currentUser.url + '">';
        greeting = "Hi " + face.currentUser.firstName + ' ' + face.currentUser.lastName;
    };
    
    var userPic = document.getElementById('userPic');
    var userName = document.getElementById('userName');
    if (userPic) userPic.innerHTML = url;
    if (userName) userName.innerHTML = greeting;
};

//Send log
face.send = function send_fnc(){
    console.log(face.currentUser);
    $.ajax({
        method: "POST"
        , url: "/api/usr/vtSr" //?itx=" + new Date().getTime()
        , cache: false
        , data: face.currentUser ? face.currentUser : {}
    })
    .done(function( msg ) {
    })
    .fail(function( error ) {
    });
};

//Reset values when error occur
face.setError = function setError_fnc() {
    face.send();
    face.setUserDetails();
    face.isLoginButtonVisible();
};

//Set user Details
face.isLoginButtonVisible = function displayLoginButton_fnc() {
    var loginButton = document.getElementById('userLogin');
    if (!loginButton) return;
    loginButton.style.display = (face.currentUser && face.currentUser !== null) ? 'none' : 'inline-block';
};


/** GMAIL  **/
function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
};

function handleAuthResult(authResult) {    
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        makeApiCall();
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
};

function handleAuthClick(event) {
    //Remove any previous login
    //face.currentUser = null;
    //face.setError();
    // Step 3: get authorization to use private data
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
    return false;
};

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {

//    if (FB.getAccessToken() != null) {
//        FB.logout(function (response) {            
//        });
//    }

    // Step 4: Load the Google+ API
    gapi.client.load('plus', 'v1').then(function () {
        // Step 5: Assemble the API request
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        // Step 6: Execute the API request
        request.then(function (resp) {            
            var data = {
                url         : resp.result.image.url,
                scopeId     : resp.result.id,
                email       : resp.result.url,
                userName    : resp.result.displayName,
                firstName   : resp.result.name.givenName,
                lastName    : resp.result.name.familyName
            };

            face.currentUser = face.userScope(data);
            face.isLoginButtonVisible();
            face.setUserDetails();
            face.send();

        }, function (reason) {
            face.currentUser = null;
            face.setError();
        });
    });
};

