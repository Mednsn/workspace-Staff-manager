// ::::::::::::::::::: appel modal1::::::::::::::::::
document.getElementById("annuler-formulaire").addEventListener("click", function () {
    document.forms["ajouter"].reset();
    let intp = document.querySelectorAll('input');
    intp.forEach(inpt => {
        inpt.style.background = "";
    }
    )
    photos.style.backgroundImage = `url('')`;

})

// :::::::::::::::: appel modal 3::::::::::::::

let form = document.getElementById("form");
form.addEventListener("submit", validationForm);
let urlpicture = document.getElementById("urlphoto");
let photos = document.getElementById("iimg-staff");
urlpicture.addEventListener("input", function () {
    photos.classList.add(`bg-[url(${urlpicture.value})]`);
})

let btnAjouterEX=document.getElementById("ajouter-exp");
btnAjouterEX.addEventListener("click",function(){
    let spaceEX= document.getElementById("pluus-experiences");
    spaceEX.innerHTML+=`<div class="grid experience-count gap-2 bg-white border p-2 rounded-md mt-3">
                                <div class="grid ">
                                    <label for="">nom :</label>
                                    <input type="text" id="nameexper" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                                <div class="grid ">
                                    <label for="">role:</label>
                                    <input type="text" id="roles" class="bg-gray-200 h-7 border rounded-sm ">
                                </div>
                            </div>`;
})

// ::::::::::::::::: validation formulaire ::::::::::::::

function validationForm(e) {
    e.preventDefault();
    let nom = document.getElementById("nomworker");
    let role = document.getElementById("roleworker");
    let emil = document.getElementById("emailworker");
    let telephon = document.getElementById("teleworker");
    let expercount = document.querySelectorAll(".experience-count");


    let urlregex = /https?:\/\/[a-z^\s]+/;
    if (urlpicture.value == "") {
        urlpicture.style.background = "Coral"
        return
    } else {
        if (!urlregex.test(urlpicture.value)) {
            urlpicture.style.background = "Coral";
            return;
        } else {
            urlpicture.style.background = "LightGreen";
        }
    }
    let nameregex = /^[a-zA-Z\s?]+$/;
    if (nom.value == "") {
        nom.style.background = "Coral";
        return;
    } else {
        if (!nameregex.test(nom.value)) {
            nom.style.background = "Coral";
            return;
        } else {
            nom.style.background = "LightGreen";
        }
    }
    if (role.value == "") {
        role.style.background = "Coral";
        return;
    } else {
        if (!nameregex.test(role.value)) {
            role.style.background = "Coral";
            return;
        } else {
            role.style.background = "LightGreen";
        }
    }
    let emilregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emil.value == "") {
        emil.style.background = "Coral";
        return;
    } else {
        if (!emilregex.test(emil.value)) {
            emil.style.background = "Coral";
            return;
        } else {
            emil.style.background = "LightGreen";
        }
    }
    let phoneregex = /^\d+$/;
    if (telephon.value == "") {
        telephon.style.background = "Coral";
        return;
    } else {
        if (!phoneregex.test(telephon.value)) {
            telephon.style.background = "Coral";
            return;
        } else {
            telephon.style.background = "LightGreen";
        }
    };
    let staff ={};

    expercount.forEach(exper => {
        let nameexp = document.getElementById("nameexper");
        let rolexp = document.getElementById("roles");

        if (nameexp.value == "") {
            nameexp.style.background = "Coral";
            return;
        } else {
            if (!nameregex.test(nameexp.value)) {
                nameexp.style.background = "Coral";
                return;
            } else {
                nameexp.style.background = "LightGreen";
            }
        };

        if (rolexp.value == "") {
            rolexp.style.background = "Coral";
            return;
        } else {
            if (!nameregex.test(rolexp.value)) {
                rolexp.style.background = "Coral";
                return;
            } else { rolexp.style.background = "LightGreen"; }
        };
         staff = {
        urlphotos: urlpicture.value,
        firstname: nom.value,
        lastname: role.value,
        emilstaff: emil.value,
        telephone: telephon.value,
        experiencetab: []
    }
    staff.experiencetab.push(
            {
                nameExp: exper.nameexp,
                roleExp: exper.rolexp
            }
        );
    })

    
    console.log(111111111111);
    setLocatleStorege(staff);
}

function setLocatleStorege(staff) {
    let listUnassigned=[];
    listUnassigned.push(staff);
    localStorage.setItem('infolistunassigned',JSON.stringify(listUnassigned));
}