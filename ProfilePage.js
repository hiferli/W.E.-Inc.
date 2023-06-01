const addUserDetails = () => {
    const name = JSON.parse(localStorage.getItem('userData')).name;
    const email = JSON.parse(localStorage.getItem('userData')).email;
    const profilePicture = JSON.parse(localStorage.getItem('userData')).photoURL;

    const personalInformation = ` <div class="flex-grow-1 ms-3"><h2>${name}</h2><h3>${email}</h3></div>`
    const profilePictureTag = `<div class="flex-shrink-0"><img src=${profilePicture} alt = '${name}'/></div>`

    document.getElementById("userInformation").innerHTML += profilePictureTag;
    document.getElementById("userInformation").innerHTML += personalInformation;
}

const addExistingDetails = () => {
    const designation = JSON.parse(localStorage.getItem('userData')).designation;
    const linkedin = JSON.parse(localStorage.getItem('userData')).linkedin;
    const github = JSON.parse(localStorage.getItem('userData')).github;
    const instagram = JSON.parse(localStorage.getItem('userData')).instagram;
    
    if(designation){
        document.getElementById('designation').value = designation;
    }

    if(linkedin){
        document.getElementById('linkedin').value = linkedin;
    }

    if(github){
        document.getElementById('github').value = github;
    }

    if(instagram){
        document.getElementById('instagram').value = instagram;
    }
}

if(JSON.parse(localStorage.getItem('userData')) !== null){
    addUserDetails();
    addExistingDetails();
} else {
    console.log("Some Heavy Error Going On!");
}