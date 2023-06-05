

// // // // Firebase Provided Code

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDz18iIpiK07vAX5dE-YytG1s23tsg7CVY",
    authDomain: "meettheteam-we.firebaseapp.com",
    projectId: "meettheteam-we",
    storageBucket: "meettheteam-we.appspot.com",
    messagingSenderId: "1036791610775",
    appId: "1:1036791610775:web:ba76ec19445611d36a18d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// // // // Firebase Authentication Starts
import { getAuth , GoogleAuthProvider , signInWithPopup , getRedirectResult , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
// import { getAuth } from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// // // // Google Auth Provider
// import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

// // // // Auth with Button
const checkAndPerformAuthentication = () => {
    performAuthentication();
}

const setInformationLocally = (user) => {

    if(localStorage.getItem('userData') === null){
        localStorage.setItem("userData" , JSON.stringify({
            "name": user.displayName,
            "email": user.email,
            "photoURL": user.photoURL
        }))
    }
    // console.log(user)
    // localStorage.clear();

    // console.log("Stored in Localstorage");
    // console.log(JSON.parse(localStorage.getItem("userData")))
}

const updateProfilePicture = (user) => {
        var name = user.displayName;
        var email = user.email;
        var profilePicture = user.photoURL;

        const imageTag = `<img src=${profilePicture} width='40%' height = '40%' class='rounded mx-auto d-block' alt=${name + "(" + email + ")"}></img>`
        const editImageTag = `<img src=${profilePicture} class='rounded mx-auto d-block' alt=${name + "(" + email + ")"}></img>`
        // console.log(profilePicture);
        document.getElementById('user').innerHTML = imageTag;
        document.getElementById('editProfilePicture').innerHTML = editImageTag;
        document.getElementById("googleAuth").href = 'EditDetails.html';
    
}

const performAuthentication = () => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
            // alert("User already present")
            // console.log(user);
            
            // Setting information locally
            setInformationLocally(user);
            updateProfilePicture(user);
        } else {
            // User is signed out
            // ...
            // alert("Logged out");
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                
                // console.log(user)

                // Setting information locally
                setInformationLocally(user);
                updateProfilePicture(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorMessage)
                // ...
              });    
          }
      });
}

window.onload = checkAndPerformAuthentication;
googleAuth.addEventListener('click' , performAuthentication);