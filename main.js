
document.getElementById("annuler-formulaire").addEventListener("click", resetForme);
function resetForme() {
    document.forms["ajouter"].reset();
    let intp = document.querySelectorAll('input');
    intp.forEach(inpt => {
        inpt.style.background = "";
    }
    )
    photos.style.backgroundImage = `url('')`;
    spaceEX.innerHTML = "";
};



let urlpicture = document.getElementById("urlphoto");
let photos = document.getElementById("iimg-staff");
urlpicture.addEventListener("input", function () {
    photos.classList.add(`bg-[url(${urlpicture.value})]`);
})



let btnAjouterEX = document.getElementById("ajouter-exp");
let spaceEX = document.getElementById("pluus-experiences");

btnAjouterEX.addEventListener("click", function () {
    let cardExperience = `<div class="grid experience-count gap-2 bg-white border p-2 rounded-md mt-3">
                                <div class="grid ">
                                    <label for="">nom :</label>
                                    <input type="text" name="skillsname" id="skillsname" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                                <div class="grid ">
                                    <label for="">role:</label>
                                    <input type="text" id="skiilsrole" name="skiilsrole" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                            </div>`;
    spaceEX.insertAdjacentHTML('beforeend', cardExperience)


})

// ::::::::::::::::: validation formulaire ::::::::::::::
// let form = document.getElementById("form");
document.forms["ajouter"].addEventListener("submit", (event) => {

    event.preventDefault();
    let form = event.target;
    if (!validationFormulaire(form)) {
        return;
    }

    let staff = {
        urlphotos: form.urlphoto.value,
        firstname: form.nomworker.value,
        role: form.roleworker.value,
        emilstaff: form.emailworker.value,
        telephone: form.teleworker.value,
        experiencetab: []
    }


    for (let i = 0; i < form.skillsname.length; i++) {
        staff.experiencetab.push({
            name: form.skillsname[i].value,
            role: form.skiilsrole[i].value
        })
    }
    console.log(22222222);



    saveStaffList(staff);
    resetForme();
})


function saveStaffList(staff) {

    let listUnassigned = JSON.parse(localStorage.getItem('infolistunassigned'));
    if (listUnassigned == null) {
        listUnassigned = []
    }
    listUnassigned.push(staff);
    setLocatleStorege(listUnassigned);
}

function setLocatleStorege(listUnassigned) {

    localStorage.setItem('infolistunassigned', JSON.stringify(listUnassigned));
    checkLocaleStorege();
}


function checkLocaleStorege() {
    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    if(listUnassigneds!=null){
         affichageunassigned(listUnassigneds);
    }
   
}
checkLocaleStorege();


function validationFormulaire(form) {

    let nonvalide = true;
    let urlregex = /https?:\/\/[a-z^\s]+/;
    let nameregex = /^[a-zA-Z\s?]+$/;
    let emilregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let teleregex = /^[0-9]{10}$/;

    if (!urlregex.test(form.urlphoto.value)) {
        form.urlphoto.style.borderColor = "red";
        nonvalide = false;
    } else {
        form.urlphoto.style.borderColor = "green";
    }

    if (!nameregex.test(form.nomworker.value)) {
        form.nomworker.style.borderColor = "red";
        nonvalide = false;
    } else {
        form.nomworker.style.borderColor = "green";
    }
    if (!nameregex.test(form.roleworker.value)) {
        form.roleworker.style.borderColor = "red";
        nonvalide = false;
    } else {
        form.roleworker.style.borderColor = "green";
    }
    if (!emilregex.test(form.emailworker.value)) {
        form.emailworker.style.borderColor = "red";
        nonvalide = false;
    } else {
        form.emailworker.style.borderColor = "green";
    }
    if (!teleregex.test(form.teleworker.value)) {
        form.teleworker.style.borderColor = "red";
        nonvalide = false;
    } else {
        form.teleworker.style.borderColor = "green";
    }

    for (let i = 0; i < form.skillsname; i++) {
        if (!nameregex.test(form.skillsname[i].value)) {
            form.skillsname[i].style.borderColor = "red";
            nonvalide = false;
        } else {
            form.skillsname[i].style.borderColor = "green";
        }
        if (!nameregex.test(form.skiilsrole[i].value)) {
            form.skiilsrole[i].style.borderColor = "red";
            nonvalide = false;
        } else {
            form.skiilsrole[i].style.borderColor = "green";
        }
    }


    return nonvalide;
}

function affichageunassigned(membres) {
    let mombers = membres;
    let cardUnassigned = document.getElementById("card-staff-unassigned");
    cardUnassigned.innerHTML = ""
    mombers.forEach(elemt => {
        cardUnassigned.innerHTML += ` <div id="info-profile" class=" border-2 rounded-xl border-gray-300 p-1">
                                           <div emil="${elemt.emilstaff}" class="flex justify-between " >
                                             <div class="flex showProfile">
                                                  <div id="imag-staff-unassined" class="rounded-[50%] bg-[url(${elemt.urlphotos})] bg-cover h-14 w-14"></div>
                                                  <div class="grid">
                                                      <strong>${elemt.firstname}</strong>
                                                      <small>${elemt.role}</small>
                                                  </div>
                                             </div> 
                                            <button><i class="far fa-edit fa-lg"></i></button>
                                         </div>
                            
                                         </div>`
    })
   
}
let modalProfile=document.getElementById("dialog-profile");
modalProfile.style.display="none";

// document.getElementById("showProfile").addEventListener("click",()=>{
// modalProfile.style.display="block";
// })
document.getElementById("btn-profile-X").addEventListener("click",()=>{
modalProfile.classList.remove("flex");

})
 eventbtn()
function eventbtn(){
            

    let allbtn=document.getElementsByClassName(".showProfile");
allbtn.forEach(element=>{

    element.addEventListener("click", (event) => {
        
        console.log("event applique");
        
    detaillProfile(event.target.getAttribute("email"));
    modalProfile.classList.add("flex");
})})
}


function detaillProfile(email) {
    console.log(11111111);

    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let addmoreexper= document.getElementById("add-more-exper");
    let staffs = listUnassigneds.find(s => s.emilstaff == email);

    document.getElementById("id-imagprofile").style.backgroundImage=`url(${staffs.urlphotos})`;
    document.getElementById("email-profile").textContent="rtrhrt";
    document.getElementById("mumder-profile").textContent="trhhhtht";
    if(staffs.experiencetab.skillsname!=0){
        staffs.experiencetab.forEach(skils=>{

            addmoreexper.innerHTML+=` <div class="ml-5 border-l-3 border-t-3 border-gray-200">
                                        <div class="grid ml-3">
                                            <h3>${skils.name}</h3>
                                            <small>${skils.role}</small> 
                                        </div>
                                    </div>`
 
        })
     }     

}





























