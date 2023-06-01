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


submitData.addEventListener('click', async (e) => {
    console.log(document.getElementById('name').value); 

    // Add a new document in collection "cities"
    
    // // // Use this for main
    // await setDoc(db , 'users' , #id)
    
    await addDoc(collection(db, "users"), {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
    });
    
    alert("User Added")
})


getData.addEventListener('click' , async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", (doc.data()));
        
    });

})