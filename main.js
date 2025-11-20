
document.getElementById("annuler-formulaire").addEventListener("click", resetForme);
function resetForme() {
    document.forms["ajouter"].reset();
    let intp = document.querySelectorAll('input');
    intp.forEach(inpt => {
        inpt.style.background = "";
    }
    )
    photos.style.backgroundImage = `url('')`;

};



let urlpicture = document.getElementById("urlphoto");
let photos = document.getElementById("iimg-staff");
urlpicture.addEventListener("input", function () {
    photos.classList.add(`bg-[url(${urlpicture.value})]`);
})

let btnAjouterEX = document.getElementById("ajouter-exp");
btnAjouterEX.addEventListener("click", function () {
    let spaceEX = document.getElementById("pluus-experiences");
    spaceEX.innerHTML += `<div class="grid experience-count gap-2 bg-white border p-2 rounded-md mt-3">
                                <div class="grid ">
                                    <label for="">nom :</label>
                                    <input type="text" name="nameexper" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                                <div class="grid ">
                                    <label for="">role:</label>
                                    <input type="text" name="roles" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                            </div>`;
})

// ::::::::::::::::: validation formulaire ::::::::::::::
// let form = document.getElementById("form");
document.forms["ajouter"].addEventListener("submit", validationForm);

function validationForm(e) {


    e.preventDefault();
   
    let nom = document.getElementById("nomworker");
    let role = document.getElementById("roleworker");
    let emil = document.getElementById("emailworker");
    let telephon = document.getElementById("teleworker");
    let expercount = document.querySelectorAll(".experience-count");


    let urlregex = /https?:\/\/[a-z^\s]+/;
    if (urlpicture.value == "") {
        urlpicture.style.borderColor = "red"
        return
    } else {
        if (!urlregex.test(urlpicture.value)) {
            urlpicture.style.borderColor = "red";
            return;
        } else { urlpicture.style.borderColor = "green"; }
    }
    let nameregex = /^[a-zA-Z\s?]+$/;
    if (nom.value == "") {
        nom.style.borderColor = "red";
        return;
    } else {
        if (!nameregex.test(nom.value)) {
            nom.style.borderColor = "red";
            return;
        } else {
            nom.style.borderColor = "green";
        }
    };

    if (role.value == "") {
        role.style.borderColor = "red";
        return;
    } else {
        if (!nameregex.test(role.value)) {
            role.style.borderColor = "red";
            return;
        } else {
            role.style.borderColor = "green";
        }
    };
    let emilregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emil.value == "") {
        emil.style.borderColor = "red";
        return;
    } else {
        if (!emilregex.test(emil.value)) {
            emil.style.borderColor = "red";
            return;
        } else {
            emil.style.borderColor = "green";
        }
    };
    let phoneregex = /^\d+$/;
    if (telephon.value == "") {
        telephon.style.borderColor = "red";
        return;
    } else {
        if (!phoneregex.test(telephon.value)) {
            telephon.style.borderColor = "red";
            return;
        } else {
            telephon.style.borderColor = "green";
        }
    };
   
    let staff = {
        urlphotos: urlpicture.value,
        firstname: nom.value,
        role: role.value,
        emilstaff: emil.value,
        telephone: telephon.value,
        experiencetab: []
    }
    expercount.forEach(exper => {
        let nameexp = document.getElementById("nameexper");
        let rolexp = document.getElementById("roles");

        if (nameexp.value == "") {
            nameexp.style.borderColor = "red";
            return;
        } else {
            if (!nameregex.test(nameexp.value)) {
                nameexp.style.borderColor = "red";
                return;
            } else {
                nameexp.style.borderColor = "green";
            }
        };

        if (rolexp.value == "") {
            rolexp.style.borderColor = "red";
            return;
        } else {
            if (!nameregex.test(rolexp.value)) {
                rolexp.style.borderColor = "red";
                return;
            } else { rolexp.style.borderColor = "green"; }
        };
    
        let expobj = {
            nameExp: nameexp.value,
            roleExp: rolexp.value
        };
        
        staff.experiencetab.push(expobj)
    })

    saveStaffList(staff);
    resetForme();
}


function saveStaffList(staff) {

    let listUnassigned = JSON.parse(localStorage.getItem('infolistunassigned'));
    if (listUnassigned == null) {
        listUnassigned = []
    }
    let count = 0;
    count++;
    console.log(count);


    listUnassigned.push(staff);

    setLocatleStorege(listUnassigned);

}



function setLocatleStorege(listUnassigned) {

    localStorage.setItem('infolistunassigned', JSON.stringify(listUnassigned));
    checkLocaleStorege();

}


function checkLocaleStorege() {
    let listUnassigneds = JSON.parse(localStorage.getItem('infolistunassigned'));

    affichageunassigned(listUnassigneds);

}



function affichageunassigned(membres) {

    let cardUnassigned = document.getElementById("card-staff-unassigned");
    cardUnassigned.innerHTML = ""
    membres.forEach((elemt, index) => {
        cardUnassigned.innerHTML += ` <div id="info-profile" class="flex justify-between border-2 rounded-xl border-gray-300 p-1">
                             <button onclick="afficheProfile${index})" command="show-modal" commandfor="dialog-profile">
                            <div class="flex">
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

//  function afficheProfile(index){


//     }
checkLocaleStorege()