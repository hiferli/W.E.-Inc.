if(JSON.parse(localStorage.getItem('userData')) !== null){
    const name = JSON.parse(localStorage.getItem('userData')).name;
    const email = JSON.parse(localStorage.getItem('userData')).email;
    const profilePicture = JSON.parse(localStorage.getItem('userData')).photoURL;

    const personalInformation = ` <div class="flex-grow-1 ms-3"><h2>${name}</h2><h3>${email}</h3></div>`
    const profilePictureTag = `<div class="flex-shrink-0"><img src=${profilePicture} alt = '${name}'/></div>`

    document.getElementById("userInformation").innerHTML += profilePictureTag;
    document.getElementById("userInformation").innerHTML += personalInformation;
} else {
    console.log("Some Heavy Error Going On!");
}