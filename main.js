
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
                                    <input type="text" name="skillsname" id="skillsname" class="bg-gray-200 h-7 border rounded-sm skillsname">
                                </div>
                                <div class="grid ">
                                    <label for="">role:</label>
                                    <input type="text" id="skiilsrole" name="skiilsrole" class="bg-gray-200 h-7 border rounded-sm skiilsrole">
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
        emailStaff: form.emailworker.value,
        telephone: form.teleworker.value,
        experiencetab: []
    }
     
    let skillsname = document.querySelectorAll('.skillsname')
    let skiilsrole = document.querySelectorAll('.skiilsrole')
    for (let i = 0; i < skillsname.length; i++) {
        staff.experiencetab.push({
            name: skillsname[i].value,
            role: skiilsrole[i].value
        })
    }


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
    if (listUnassigneds != null) {
        affichageunassigned(listUnassigneds);
        eventprofiles()
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
        // console.log(elemt.emailStaff);
        
        cardUnassigned.innerHTML += ` <div id="info-profile" class=" border-2 rounded-xl border-gray-300 p-1">
                                           <div class="flex justify-between " >
                                             <button email="${elemt.emailStaff}"  class="flex showProfile">
                                                  <div id="imag-staff-unassined" class="rounded-[50%] bg-[url(${elemt.urlphotos})] bg-cover h-14 w-14"></div>
                                                  <div class="grid">
                                                      <strong>${elemt.firstname}</strong>
                                                      <small>${elemt.role}</small>
                                                  </div>
                                             <button> 
                                            <button><i class="far fa-edit fa-lg"></i></button>
                                         </div>
                            
                                         </div>`
    })

}


let modalProfile = document.getElementById("dialog-profile");

document.getElementById("btn-profile-X").addEventListener("click", () => {
    modalProfile.classList.replace("block", "hidden");


})
eventprofiles()
function eventprofiles() {


    let allbtn = document.querySelectorAll(".showProfile");
    allbtn.forEach(element => {

        element.addEventListener("click", (event) => {
            // console.log(event.target);
            detaillProfile(event.target.getAttribute("email"));

            modalProfile.classList.replace("hidden", "block");
        })
    })
}


function detaillProfile(email) {
    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let addinfos = document.getElementById("contenaire-infospro");
    let staff = listUnassigneds.find(s => s.emailStaff === email);
   
    
    addinfos.innerHTML = `<div class="grid gap-2 w-full border-t ">
                    <div class="grid justify-center items-center gap-2">
                        <div id="id-imagprofile" class="rounded-[50%] bg-cover bg-[url(${staff.urlphotos})]  w-24 h-24"></div>
                        <div class="grid">
                            <h2 id="name-profile">${staff.firstname}</h2>
                            <span id="speciality-profile">${staff.role}</span>
                        </div>
                    </div>
                    <div class="grid gap-1">
                        <div class="flex items-center"><i class="fa-regular fa-envelope" style="color: #4d74d7;">${staff.emailStaff}</i>
                            <h3 id="email-profile"></h3>
                        </div>
                        <div class="flex items-center"><i class="fa-solid fa-phone" style="color: #16871e;"></i>+${staff.telephone}<h3
                                id="mumder-profile"></h3>
                        </div>
                        <div class="flex items-center"><i class="fa-solid fa-location-pin fa-lg"
                                style="color: #f83062;"></i>Unassigned
                        </div>
                    </div>

                    <div class="grid gap-1">

                        <div>
                            <h2>Work Experience</h2>
                        </div>
                        <div id="add-more-exper" class="grid gap-1">
                             ${cardexper(staff)}
                        </div>

                    </div>

                </div>`
  
}
function cardexper(staffs) {
   let card="";
    if (staffs.experiencetab.length != 0) {
        for (let i = 0; i < staffs.experiencetab.length; i++) {
            card+=` <div class="ml-5 border-l-3 border-t-3 border-gray-200">
                                <div class="grid ml-3">
                                    <h3>${staffs.experiencetab[i].name}</h3>
                                    <small>${staffs.experiencetab[i].role}</small>

                                </div>
                            </div>`
        }
    }return card;
}


let modallistZones = document.getElementById("dialog-list");

eventdesbuttonzones()
function eventdesbuttonzones() {

   let zones = document.querySelectorAll(".zones");
// console.log(zones);
    zones.forEach((zone)=>{ 
    //   console.log(zone.getAttribute("id"));
    zone.addEventListener("click",(event)=>{

        let zoneName = event.currentTarget.getAttribute("id");

        afficheListZone(zoneName);
        
        modallistZones.classList.replace("hidden", "block");

  })
})
}


function afficheListZone(id){
    
        if("conference"===id){
            zoneConferance();
        }
         if("archives"===id){
            zoneArchives();
        }
         if("staff"===id){
            zoneStaff();
        }
         if("security"===id){
            zoneSecurety();
        }
         if("server"===id){
            zoneServer();
        }
         if("reception"===id){
            zoneReception();
        } 
}

function zoneConferance(){
    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    affichageUnassignedZone(listUnassigneds);
    
}

document.getElementById("btn-list-X").addEventListener("click",()=>{
    modallistZones.classList.replace("block","hidden" );
})
function affichageUnassignedZone(membres) {
    console.log(2222222);
    
    let cardUnassignedZone=document.getElementById("espace-card-ajoute");
    let mombers = membres;
    cardUnassignedZone.innerHTML = ""
    mombers.forEach(elemt => {
        
        
        cardUnassignedZone.innerHTML += `<div class="  flex justify-around items-center border-2 mt-3 rounded-xl bg-black/10 border-gray-300 p-1">
                                <div id="imag-staff-unassined" class="rounded-[50%] bg-[url(${elemt.urlphotos})] bg-cover h-14 w-14"></div>
                                <div class="grid items-center">
                                    <strong>${elemt.firstname}</strong>
                                    <small>${elemt.role}</small>
                                </div>
                                 <button email="${elemt.emailStaff}" class="buttonAssigned bg-slate-500"><i class="fa-solid fa-square-plus fa-2xl" style="color: #39c337;"></i></button>
                            </div>`
    })

}
eventBtnAssined()
function eventBtnAssined(){
  let AllBtnAssigned=document.querySelectorAll(".buttonAssigned");
  console.log(AllBtnAssigned);
  
  AllBtnAssigned.forEach(assigne=>{
    assigne.addEventListener("click",(event)=>{
        let mombreAssigned = event.currentTarget.getAttribute("email");
        console.log(event.Target);
        console.log(mombreAssigned);
        
    })
  
})
}















