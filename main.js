
document.getElementById("annuler-formulaire").addEventListener("click", resetForme);
function resetForme() {
    document.forms["ajouter"].reset();
    let intp = document.querySelectorAll('input');
    intp.forEach(inpt => {
        inpt.style.background = "";
    }
    )
    photos.style.backgroundImage = `url('')`;
    spaceEX.innerHTML="";
};



let urlpicture = document.getElementById("urlphoto");
let photos = document.getElementById("iimg-staff");
urlpicture.addEventListener("input", function () {
    photos.classList.add(`bg-[url(${urlpicture.value})]`);
})



let btnAjouterEX = document.getElementById("ajouter-exp");
    let spaceEX = document.getElementById("pluus-experiences");

btnAjouterEX.addEventListener("click", function () {
    let  cardExperience= `<div class="grid experience-count gap-2 bg-white border p-2 rounded-md mt-3">
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
document.forms["ajouter"].addEventListener("submit", (event)=> {


    event.preventDefault();
    let form=event.target;
     let staff = {
        urlphotos: form.urlphoto.value,
        firstname: form.nomworker.value,
        role: form.roleworker.value,
        emilstaff: form.emailworker.value,
        telephone: form.teleworker.value,
        experiencetab: []
    } 
       
       
       for(let i=0;i<form.skillsname.length;i++){ 
        staff.experiencetab.push({
            name :form.skillsname[i].value,
            role: form.skiilsrole[i].value
        })
       }
   
   

    saveStaffList(staff);
    resetForme();
   } )


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

    affichageunassigned(listUnassigneds);

}

checkLocaleStorege();


function affichageunassigned(membres) {
     let mombers=membres;
    let cardUnassigned = document.getElementById("card-staff-unassigned");
    cardUnassigned.innerHTML = ""
    mombers.forEach(elemt => {
        cardUnassigned.innerHTML += ` <div id="info-profile" class="flex justify-between border-2 rounded-xl border-gray-300 p-1">
                             <button emil="${elemt.emilstaff}" class"des-button" command="show-modal" commandfor="dialog-profile">
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












































































