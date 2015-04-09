
var face = { currentUser: null };

face.userScope = function user_scope_fnc(response){
    return {
        scopeId     : response.id,
        email       : response.email,
        userName    : response.name,
        firstName   : response.first_name,
        lastName    : response.last_name
    };
};

//Get login status if needed
face.getUserStatus = function getLoginStatus_fnc(){
    if(face.currentUser){
        face.setUserDetails();
    }else{        
        //Check login when page loads
        FB.getLoginStatus(function(response) {
            face.loginHandler(response);
        });
    }
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
        face.send();
        face.displayLoginButton();
        //console.log('Please log into Facebook.');
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
    // Logged into your app and Facebook.
    var userPic = document.getElementById('userPic');
    var userName = document.getElementById('userName');
    if(userPic) userPic.innerHTML = '<img class="userPic" src="https://graph.facebook.com/' + face.currentUser.scopeId + '/picture">';
    if(userName) userName.innerHTML = "Hi " + face.currentUser.firstName + ' ' + face.currentUser.lastName;    
};

//Send log
face.send = function send_fnc(){
    $.ajax({
        method: "POST"
        , url: "/api/usr/logUsr" //+ new Date().getTime()
        , cache: false
        , data: face.currentUser
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
