$(document).ready(function() 
{

	console.log('ready!');



//  Initialize Firebase

var config = {
    apiKey: "AIzaSyANWR--tfWEwyTZbsaV4z-ZVYKNSKrbrXM",
    authDomain: "pickup-90235.firebaseapp.com",
    databaseURL: "https://pickup-90235.firebaseio.com",
    projectId: "pickup-90235",
    storageBucket: "pickup-90235.appspot.com",
    messagingSenderId: "932897445300"
  };
  firebase.initializeApp(config);


var userHtml = $("#username");


var database = firebase.database();
var ref = database.ref("user");
var signedIn;


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1499488353455170',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



// LOGIN SECTION==================================================================================
 //instance of the goggle provider object
var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();

// Create an Account with email and pass 
function createAccountWithEmailandPassword() {
	var displayName = $("#nameInput").val().trim();
	var email = $("#emailInput").val().trim();
	var password = $("#createPasswordInput").val().trim();
	console.log(email, password)
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(user) {
			user.updateProfile({displayName: displayName})
			console.log(displayName)
			loadMainPage()
		})

}

//Sign in with email and pass
function signInWithEmailAndPassword() {
	var email = $("#emailInput").val();
	var password = $("#PasswordInput").val();
	console.log("hello")
	console.log(email, password)
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(user) {
		// user.updateProfile({displayName: displayName})
		loadMainPage()
	})			 
}

//Sign in With Google
function googleSignIn() {
	firebase.auth().signInWithPopup(google).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;

		}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});


	

  }
//Sign in With FB
function facebookSignIn() {

	console.log('here we go facebook!')

	firebase.auth().signInWithPopup(facebook).then(function(result) {

		console.log("literally anything");
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.userID;
		
      console.log('should be the user: '+user)
		
        }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});







  }

//Button click when new user signs up with email and pass
$("#newUser").on("click", function(event) {
	  event.preventDefault()
	  createAccountWithEmailandPassword()
})

//Button click when user signs in with email and pass
$("#loginin").on("click", function(event){
	event.preventDefault()
	signInWithEmailAndPassword()
})

// SIGNUP ON CLICK via Google or FB
$(".signin").on("click", function(event) {
    event.preventDefault()
	var method = $(this).attr("data")
	
	console.log("hello"+method)
        if (method === "google") {
		googleSignIn();
		
        }
	else if(method === "facebook") {
		facebookSignIn();
		
    } 
})
// Button click to sign out
$("#logout").on("click", function() {
	firebase.auth().signOut().then(function() {
  	// Sign-out successful.
  	loadLoginPage();
	}).catch(function(error) {
  // An error happened.
	});
})
// Firebase on auth change. Saves user name
var name;
firebase.auth().onAuthStateChanged(function(firebaseUser){
	if(firebaseUser) {
       //USer is signed in
		console.log(firebaseUser)
		
		var name = firebaseUser.displayName

		localStorage.setItem("name", name);
		
		userHtml.html("Welcome "+ firebaseUser.displayName)
		$("#userNameLoginName").text(firebaseUser.displayName)
		$("#usernameSuggestions").html(firebaseUser.displayName+"'s Suggestions" )
		$("#userNameLogin").html("<h3 class='text-center'>Welcome Back "+firebaseUser.displayName+"!</h3>")
		signedIn = ref.child(firebaseUser.displayName) 
        
		signedIn.update({
            name: firebaseUser.displayName,
            email: firebaseUser.email
	})
		// $(".name").html("<h2>Hi "+firebaseUser+"!</h2>")
	} else {

		console.log("not lgged In")
	}
})

//Loading different pages
function loadMainPage() {
     window.location.href = 'menu.html';
	 
 }

  function loadLoginPage() {
     window.location.href = 'login.html';
	
 }

  function loadReturnUser() {
     window.location.href = 'index.html';

	 
 }
   function loadSuggestionPage() {
     window.location.href = 'messages.html';	 
 }





});