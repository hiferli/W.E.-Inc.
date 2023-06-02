import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

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
    if (designation === "") {
        alert("Please enter a designation.");
        return false;
    }

    return true;
}

const submitForm = async (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem('userData')).email;

    if (handleValidation()) {
        const designation = document.getElementById('designation').value;
        const instagram = document.getElementById('instagram').value;
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;

        const userDataJSON = {
            name: JSON.parse(localStorage.getItem('userData')).name,
            email: JSON.parse(localStorage.getItem('userData')).email,
            profilePicture: JSON.parse(localStorage.getItem('userData')).photoURL,
            designation: designation,
            instagram: instagram,
            linkedin: linkedin,
            github: github
        };
        
        console.log(userDataJSON)
        // // // Use this for main
        // await setDoc(db , 'users' , #id)

        // await addDoc(collection(db, "users"), {
        await setDoc(doc(db, 'users', email), userDataJSON);

        alert("User Added");

        // // // IMPORTANT: TODO:
        // Make sure that this updated information reaches the localstorage too
   
        localStorage.setItem("userData", JSON.stringify(userDataJSON))
        alert("localStorage updated")
    }

}

submitData.addEventListener('click', submitForm)

const returnDOM = (profilePicture, name, designation, email, instagram, linkedin, github) => {
    var employeeCard = `
    <div class='col'>
        <div class="card h-100">

            <div class="card-body p-2">
                <div class="d-flex align-items-center">
                    <div class="d-inline-block mb-4 flex-shrink-0">
                        <img src=${profilePicture === undefined ? "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png" : profilePicture}
                            class="rounded-circle img-fluid" style="width: 100px;" />
                    </div>

                    <div class="d-inline-block flex-grow-1 ms-3"'>
                        <h3>${name}</h3>
                        <p class="text-muted hstack gap-3 text-break" style="color: #2b2a2a; font-size: 90%">${designation}<span class="vr"></span>${email}</p>
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <a href="${email}" class="px-2 ${email === undefined || email === "" ? 'disabled' : ''}">
                        <i class="bi bi-envelope-at-fill fs-2"></i>
                    </a>
                    <a href="${instagram}" class="px-2 ${instagram === undefined || instagram === "" ? 'disabled' : ''}">
                        <i class="bi bi-instagram lg fs-2"></i>
                    </a>
                    <a href="${linkedin}" class="px-2 ${linkedin === undefined || linkedin === "" ? 'disabled' : ''}">
                        <i class="bi bi-linkedin fs-2"></i>
                    </a>
                    <a href="${github}" class="px-2 ${github === undefined || github === "" ? 'disabled' : ''}">
                        <i class="bi bi-github fs-2"></i>
                    </a>
                </div>

            </div>

            <div class="card-footer">
                <small class="text-body-secondary">Last updated 3 mins ago</small>
            </div>

        </div>

    </div>
    `

    return employeeCard;
}

const loadEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));


    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const name = doc.data().name;
        const email = doc.data().email;
        const profilePicture = doc.data().profilePicture;
        const designation = doc.data().designation;
        const linkedin = doc.data().linkedin;
        const github = doc.data().github;
        const instagram = doc.data().instagram;

        // console.log(name + " " + email + " " + profilePicture + " " + designation + " " + linkedin + " " + github + " " + instagram);
        document.getElementById("allEmployees").innerHTML += returnDOM(profilePicture, name, designation, email, instagram, linkedin, github);
    });

}

// getData.addEventListener('click', loadEmployees)
window.addEventListener("DOMContentLoaded", loadEmployees)

/*

Card Structure:

<div class="card h-100">

                <div class="card-body p-2">
                    <div class="d-flex align-items-center">
                        <div class="d-inline-block mb-4 flex-shrink-0">
                            <img src="https://lh3.googleusercontent.com/a/AAcHTtcUGoXAJNrQ_A5FoCclR0zAHhapdTUWTslZ-z7r=s96-c"
                                class="rounded-circle img-fluid" style="width: 100px;" />
                        </div>

                        <div class="d-inline-block flex-grow-1 ms-3">
                            <h3>Ishaan Joshi</h3>
                            <p class="text-muted hstack gap-3" style="color: #2b2a2a;">CEO <span class="vr"></span>
                                joshi.ishaan.2001@gmail.com</p>
                        </div>
                    </div>



                    <div class="d-flex justify-content-end">
                        <a href="#!" class="px-2">
                            <i class="bi bi-envelope-at-fill fs-2"></i>
                        </a>
                        <a href="#!" class="px-2">
                            <i class="bi bi-instagram lg fs-2"></i>
                        </a>
                        <a href="#!" class="px-2">
                            <i class="bi bi-linkedin fs-2"></i>
                        </a>
                        <a href="#!" class="px-2">
                            <i class="bi bi-github fs-2"></i>
                        </a>
                    </div>


                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">Last updated 3 mins ago</small>
                </div>
            </div>
*/