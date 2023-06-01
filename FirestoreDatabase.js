import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, collection, getDocs , doc, setDoc , addDoc  } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDz18iIpiK07vAX5dE-YytG1s23tsg7CVY",
    authDomain: "meettheteam-we.firebaseapp.com",
    projectId: "meettheteam-we",
    storageBucket: "meettheteam-we.appspot.com",
    messagingSenderId: "1036791610775",
    appId: "1:1036791610775:web:ba76ec19445611d36a18d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const handleValidation = () => {
    var designation = document.getElementById('designation').value;
    if(designation === ""){
        alert("Please enter a designation.");
        return false;
    }

    return true;
}


submitData.addEventListener('click', async (e) => {
    e.preventDefault();

    if(handleValidation()){
        const email = JSON.parse(localStorage.getItem('userData')).email;
        
        const designation = document.getElementById('designation').value;
        const instagram = document.getElementById('instagram').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;
    
        // // // Use this for main
        // await setDoc(db , 'users' , #id)
        
        // await addDoc(collection(db, "users"), {
        await setDoc(doc(db , 'users' , email) , {
            designation: designation,
            instagram: instagram,
            linkedin: linkedin,
            github: github
        });
        
        alert("User Added");

        // // // IMPORTANT: TODO:
        // Make sure that this updated information reaches the localstorage too
    }

})


// getData.addEventListener('click' , async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));

//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", (doc.data()));
        
//     });

// })