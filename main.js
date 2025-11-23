let nameZone;
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
                                    <label>nom :</label>
                                    <input type="text" name="skillsname" class="bg-gray-200 h-7 border-2 rounded-sm skillsname">
                                </div>
                                <div class="grid ">
                                    <label>role:</label>
                                    <input type="text"  name="skiilsrole" class="bg-gray-200 h-7 border-2 rounded-sm skiilsrole">
                                </div>
                            </div>`;
    spaceEX.insertAdjacentHTML('beforeend', cardExperience)


}) 
document.forms["ajouter"].addEventListener("submit", (event) => {

    event.preventDefault();
    let form = event.target;
    if (!validationFormulaire(form)) {
        console.log("if enter");
        return;
    }
        console.log("*****entrer ajouter***********");

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
    for (let i = 0; i <skillsname.length; i++) {
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
        listUnassigned = [];
    }
    if (staff != null) {
        listUnassigned.push(staff);
        setLocatleStorege(listUnassigned);
    }

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
    let nameregex = /^[a-zA-Z-\(éçàè)\s?]+$/;
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

    for (let i = 0; i <form.skillsname.length; i++) {
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
    let cardUnassigned = document.getElementById("card-staff-unassigned");
    cardUnassigned.innerHTML = ""
    membres.forEach(elemt => {
        cardUnassigned.innerHTML += ` <div id="info-profile" class=" border-2 hover:shadow-xl/40 rounded-xl bg-black/5 border-gray-300 p-1">
                                           <div class="flex justify-between " >
                                             <button email="${elemt.emailStaff}" class="flex showProfile">
                                                <div id="imag-staff-unassined" class="rounded-[50%] bg-[url(${elemt.urlphotos})] bg-cover h-14 w-14"></div>
                                                  <div class="grid">
                                                      <strong>${elemt.firstname}</strong>
                                                      <small>${elemt.role}</small>
                                                  </div>
                                             </button> 
                                            <button><i class="far fa-edit fa-lg"></i></button>
                                         </div>
                                         
                                         </div>`
    })

}


let modalProfile = document.getElementById("dialog-profile");

document.getElementById("btn-profile-X").addEventListener("click", () => {
    modalProfile.classList.replace("flex", "hidden");


})
eventprofiles()
function eventprofiles() {


    let allbtn = document.querySelectorAll(".showProfile");
    allbtn.forEach(element => {

        element.addEventListener("click", (event) => {
            // console.log(event.target);
            detaillProfile(event.currentTarget.getAttribute("email"));

            modalProfile.classList.replace("hidden", "flex");
        })
    })
}


function detaillProfile(email) {
    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let addinfos = document.getElementById("contenaire-infospro");
    let staff = listUnassigneds.find(s => s.emailStaff === email);


    addinfos.innerHTML = `<div class="grid gap-2 bg-black/5 p-2 rounded-sm w-full border-t ">
    <div class="grid justify-center items-center gap-2">
        <div id="id-imagprofile" class="rounded-[50%] bg-cover bg-[url(${staff.urlphotos})]  w-24 h-24"></div>
        <div class="grid justify-center items-center">
            <h2 id="name-profile" class="font-bold">${staff.firstname}</h2>
            <span id="speciality-profile" class="font-serif">${staff.role}</span>
        </div>
    </div>
    <div class="grid bg-slate-300 rounded-sm p-3 gap-2">
        <div class="flex items-center"><i class="fa-regular fa-envelope" style="color: #4d74d7;"></i>
            <h3 id="email-profile" class="font-mono">${staff.emailStaff}</h3>
        </div>
        <div class="flex items-center"><i class="fa-solid fa-phone" style="color: #16871e;"></i>+<h3 id="mumder-profile" class="font-serif">${staff.telephone}</h3>
        </div>
        <div class="flex items-center"><i class="fa-solid fa-location-pin fa-lg" style="color: #d12b54;"></i>Unassigned
        </div>
    </div>

    <div class="grid bg-slate-300 p-7 rounded-sm  gap-1">

        <div>
            <h2 class="font-serif text-xl">Work Experience:</h2>
        </div>
        <div id="add-more-exper" class="grid gap-1">
            ${cardexper(staff)}
        </div>

    </div>

</div>`

}
function cardexper(staffs) {
    let card = "";
    if (staffs.experiencetab.length != 0) {
        for (let i = 0; i <staffs.experiencetab.length; i++) {
            card += ` <div class="ml-5 border-l-3  bg-slate-100 border-gray-200">
                                <div class="grid ml-3">
                                <h3 class="font-semibold">${staffs.experiencetab[i].name}</h3>
                                <small>${staffs.experiencetab[i].role}</small>
                                
                                </div>
                                </div>`
        }
    } return card;
}


let modallistZones = document.getElementById("dialog-list");

eventdesbuttonzones()
function eventdesbuttonzones() {

    let zones = document.querySelectorAll(".zones");
    // console.log(zones);
    zones.forEach((zone) => {
        //   console.log(zone.getAttribute("id"));
        zone.addEventListener("click", (event) => {

            let zoneName = event.currentTarget.getAttribute("id");
            console.log(zoneName);

            afficheListZone(zoneName);

            modallistZones.classList.replace("hidden", "flex");

        })
    })
}


function afficheListZone(id) {

    if ("conference" === id) {
        nameZone = "conference";
        zoneConferance();
    }
    if ("archives" === id) {
        nameZone = "archives";
        zoneArchives();
    }
    if ("staff" === id) {
        nameZone = "staff";
        zoneStaff();
    }
    if ("security" === id) {
        nameZone = "security";
        zoneSecurety();
    }
    if ("server" === id) {
        nameZone = "server";
        zoneServer();
    }
    if ("reception" === id) {
        nameZone = "reception";
        zoneReception();
    }
}

document.getElementById("btn-list-X").addEventListener("click", () => {
    modallistZones.classList.replace("flex", "hidden");
})

function zoneArchives() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let listArchive = Unassigneds.filter(o => o.role != "Nettoyage")
    affichageUnassignedZone(listArchive);
}

function zoneStaff() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    affichageUnassignedZone(Unassigneds);
}

function zoneSecurety() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let listrSecurety = Unassigneds.filter(o => o.role === "Agents de sécurité" || o.role === "Manager" || o.role === "Nettoyage")
    affichageUnassignedZone(listrSecurety);
}

function zoneConferance() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    affichageUnassignedZone(Unassigneds);
}

function zoneServer() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let listServer = Unassigneds.filter(o => o.role === "Techniciens IT" || o.role === "Manager" || o.role === "Nettoyage");
    affichageUnassignedZone(listServer);
}

function zoneReception() {
    let Unassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));
    let listrReceptions = Unassigneds.filter(o => o.role === "Réceptionnistes" || o.role === "Manager" || o.role === "Nettoyage");
    affichageUnassignedZone(listrReceptions);
}


function affichageUnassignedZone(membres) {
    console.log(2222222);
    let cardUnassignedZone = document.getElementById("espace-card-ajoute");
    cardUnassignedZone.innerHTML = ""
    membres.forEach(elemt => {

        cardUnassignedZone.innerHTML += `<div class="  flex justify-around items-center border-2 mt-3 rounded-xl bg-black/10 border-gray-300 p-1">
        <div class="rounded-[50%] bg-[url(${elemt.urlphotos})] bg-cover h-14 w-14"></div>
        <div class="grid items-center">
        <strong>${elemt.firstname}</strong>
        <small>${elemt.role}</small>
        </div>
        <button email="${elemt.emailStaff}" class="buttonAssigned bg-slate-500"><i class="fa-solid fa-square-plus fa-2xl" style="color: #39c337;"></i></button>
        </div>`
    })
    eventBtnAssined(membres);
    eventBTNsuppritionDansZone();

}

function eventBtnAssined(ArrayKey) {
    let AllBtnAssigned = document.querySelectorAll(".buttonAssigned");
    //   console.log(AllBtnAssigned);

    AllBtnAssigned.forEach(assigne => {
        assigne.addEventListener("click", (event) => {
            let mombreAssigned = event.currentTarget.getAttribute("email");
            // console.log(mombreAssigned);

            assignedInZone(mombreAssigned, ArrayKey);

        })
    })
}

function assignedInZone(mombreZone, listkey) {
    // console.log(listkey);  
    let staff = listkey.find(o => o.emailStaff === mombreZone);
    let indexStaff = listkey.indexOf(staff);
    let getLOcalstoregeList = JSON.parse(localStorage.getItem(nameZone));

    if (!verifiertailleZone(getLOcalstoregeList)) {
        return;
    }

    ajouteAlisteZone(staff, getLOcalstoregeList)
    console.log(indexStaff);

    listkey.splice(indexStaff, 1);
    console.log(listkey);


    setLocatleStorege(listkey);
    affichageUnassignedZone(listkey)
}

function ajouteAlisteZone(staff, list) {
    console.log(list);

    if (list == null) {
        list = [];
    }
    list.push(staff);
    setLocatleStoregeZone(list);

}

function verifiertailleZone(liste) {
    console.log("******** marche bien******");
    let errorReturn = true;
    if (liste != null) {
        if (nameZone === "reception") {
            if (liste.length >= 3) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
        if (nameZone === "archives") {
            if (liste.length >= 4) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
        if (nameZone === "server") {
            if (liste.length >= 4) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
        if (nameZone === "security") {
            if (liste.length >= 5) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
        if (nameZone === "conference") {
            if (liste.length >= 10) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
        if (nameZone === "staff") {
            if (liste.length >= 7) {
                alert("zone est pleins !!");
                errorReturn = false;
            }
        }
    }
    return errorReturn;
}


function setLocatleStoregeZone(lists) {
    console.log("11111111111111111");
    localStorage.setItem(nameZone, JSON.stringify(lists));
    checkLocaleStoregeZONE();
}

function cardVide() {
    return `<div class="h-30 mt-3 text-sm w-full flex justify-center items-center border-2 border-dashed rounded-xl "> No employees assigned</div>`;
}
let zone1 = document.getElementById("zone1-contenue");
let zone2 = document.getElementById("zone2-contenue");
let zone3 = document.getElementById("zone3-contenue");
let zone4 = document.getElementById("zone4-contenue");

function checkLocaleStoregeZONE() {
    let tabZone = ["archives", "conference", "reception", "server", "security", "staff"];
    for (let i = 0; i <6; i++) {
        let listEassigneds = JSON.parse(localStorage.getItem(tabZone[i]));
        console.log(listEassigneds);
        if (listEassigneds != null) {
            if (i == 2) {
                zone1.style.background = "none";
                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }

            };
            if (i == 0) {
                zone2.style.background = "none";
                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }
            };
            if (i == 3) {
                zone3.style.background = "none";
                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }
            };
            if (i == 4) {
               zone4.style.background = "none";
                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }
            };
            if (i == 1) {
                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }
            };
            if (i == 5) {

                if (listEassigneds.length == 0) {
                    localStorage.removeItem(tabZone[i]);
                    return checkLocaleStoregeZONE();
                }
            };


            afficheAssignedZONE(listEassigneds, tabZone[i]);
        } else {
            if (listEassigneds == null)
                if (i == 2) {
                    zone1.style.background = "PeachPuff";
                    document.querySelector(".zoneRAddition").innerHTML = cardVide();
                };
            if (i == 0) {
                zone2.style.background = "PeachPuff";
                document.querySelector(".zoneArAddition").innerHTML = cardVide();
            };
            if (i == 3) {
                zone3.style.background = "PeachPuff";
                document.querySelector(".zoneSvAddition").innerHTML = cardVide();

            };
            if (i == 4) {
                zone4.style.background = "PeachPuff";
                document.querySelector(".zoneSecAddition").innerHTML = cardVide();

            };
            if (i == 1) {
                zone4.style.background = "PeachPuff";
                document.querySelector(".zoneCAddition").innerHTML = cardVide();

            };
            if (i == 5) {
                
                document.querySelector(".zoneStfAddition").innerHTML = cardVide();

            };

        };
    }
}
checkLocaleStoregeZONE()

function afficheAssignedZONE(listes, nameZones) {
    let ZONE = document.querySelector("." + nameZones);
    ZONE.innerHTML = "";
    listes.forEach(staff => {
        ZONE.innerHTML += `<div class="flex justify-between items-center p-1 border-2 bg-black/30 mt-2 border-gray-400 rounded-xl">
                                <div class="flex gap-2">
                                    <div class="rounded-[50%] bg-[url(${staff.urlphotos})] bg-cover h-14 w-14"></div>
                                    <div class="grid">
                                        <strong>${staff.firstname}</strong>
                                        <small>${staff.role}</small>
                                    </div>
                                </div>
                                <button email="${staff.emailStaff}" class="rounded-[50%] bg-red-500 h-8 w-8 closeAssigned"><i class="fa-solid fa-x"></i></button>

                            </div>`
    })
}
eventBTNsuppritionDansZone();
function eventBTNsuppritionDansZone() {
    console.log("good");
    let AllBTNSupprimer = document.querySelectorAll(".closeAssigned");
    AllBTNSupprimer.forEach(suppremer => {
        suppremer.addEventListener("click", (event) => {
            let eventsup = event.currentTarget.getAttribute("email");
            console.log(eventsup);
            suppremerDansZone(eventsup);
        })
    })
}
function suppremerDansZone(eventsupr) {
    let AllZone = ["archives", "conference", "reception", "server", "security", "staff"];
    for (let i = 0; i <6; i++) {
        let list = JSON.parse(localStorage.getItem(AllZone[i]));
        if (list != null) {
            console.log(list);
            let staff = list.find(o => o.emailStaff === eventsupr);
            let indexStf = list.indexOf(staff);
            saveStaffList(staff);
            list.splice(indexStf, 1);
            console.log(list);
            localStorage.setItem(AllZone[i], JSON.stringify(list));
            checkLocaleStoregeZONE();
            eventBTNsuppritionDansZone();
        }
    }
}







