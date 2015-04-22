
var face = { currentUser: null };

face.userScope = function user_scope_fnc(response) {
    if (response)
        return {
            scopeId     : response.id,
            email       : response.email,
            userName    : response.name,
            firstName   : response.first_name,
            lastName    : response.last_name
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
    FB.login(function(response) {
        face.loginHandler(response);
    }, {
        scope: 'email'
    });
};

//Handle user login
face.loginHandler = function loginHanlder_fnc(response){    
    //console.log(response);
    if (response.status === 'connected') {
        face.getUserDetails(response);
    } else if (response.status === 'not_authorized') {
        face.getUserDetails(response);
    } else {
        face.currentUser = null;
        face.send();
        face.setUserDetails();
        face.displayLoginButton();
    };
};

//Call API to get user logged details
face.getUserDetails = function getUserDetails_fnc(response){
    FB.api('/me', function(res) {            
        face.currentUser = face.userScope(res);
        face.setUserDetails();
        face.send();
    });
};


//Set user Details
face.setUserDetails = function setUserDetails_fnc(){
    var url = '<img src="/img/venueGreen48.png">';
    var greeting = 'Hi foreigner';
    if (face.currentUser && face.currentUser !== null) {
        url = '<img class="userPic" src="https://graph.facebook.com/' + face.currentUser.scopeId + '/picture">';
        greeting = "Hi " + face.currentUser.firstName + ' ' + face.currentUser.lastName;
    }

    var userPic = document.getElementById('userPic');
    var userName = document.getElementById('userName');
    if (userPic) userPic.innerHTML = url;
    if (userName) userName.innerHTML = greeting;
};

//Send log
face.send = function send_fnc(){
    $.ajax({
        method: "POST"
        , url: "/api/usr/vtSr" //+ new Date().getTime()
        , cache: false
        , data: face.currentUser ? face.currentUser : {}
    })
    .done(function( msg ) {
        console.log('Markup set');
    })
    .fail(function( error ) {
//        FB.logout(function(response) {
//            alert('Error has occured and the current User was logout');
//            window.location = "\Index";
//        });
    });
};

//Set user Details
face.displayLoginButton = function displayLoginButton_fnc(){
    var loginButton = document.getElementById('fbLogin');        
    if(!loginButton) return;
    loginButton.style.display = 'inline-block';
};
