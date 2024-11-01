const modal = document.getElementById("modal");
const submit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const openModal = document.getElementById("add");
const submitModal = document.getElementById("submitModal")
let all = JSON.parse(localStorage.getItem("info")) || []; // j ajoute se ligne pour eviter le delete de data quand je refresh la page 
var id  = all.length ? all[all.length - 1].id + 1 : 1 ; // pour eviter quand je refresh la page id et debuter par 1 alors ici je prend l id de la dernier indice et additionner par 1 mais si l array all et vide il doit debuter par 1
//this function update the array with the updated localstorage that i delete from it some task (bug fixed)
function getFromLS(){
    let data  = localStorage.getItem("info")
    if(data){
        all = JSON.parse(data)
    }
}
openModal.addEventListener("click", function () {
    modal.classList.remove("hidden");
})
function deleteTask(id){
    const storeData = localStorage.getItem("info");
    const data = JSON.parse(storeData)
    const result = data.findIndex(obj => obj.id === id);
    console.log("id deleted : ", result);
        data.splice(result,1)
        localStorage.setItem("info",JSON.stringify(data))
        show()
}

function openEditModal(id){
    const EditModal = document.getElementById("editModal")
    EditModal.classList.toggle("hidden");
    const input = document.getElementById("editStatus")
    console.log('test'); //debug
    
    const storeData = localStorage.getItem("info");            
    if(storeData){
        console.log("first condition in showById"); //debug
         
        const data = JSON.parse(storeData);
        console.log("this is the parsed daTA inside the showByID functin ", data);  //debug
        
        let result = data.find(obj=> obj.id === id);
        console.log(result.id , id);
        if(result){
            submitModal.onclick = function(event) { 
                event.preventDefault(); 
                result.status = input.value; // to change the old status with a new one
                 console.log("this should be the new status value", result.status); // Save the updated data back to localStorage 
                 localStorage.setItem("info", JSON.stringify(data)); 
                 EditModal.classList.add("hidden");
                  show(); };
        }
    }
}



function show (){
    
    console.log("test");
    const storeData = localStorage.getItem("info");
    const cards = {
        TodoCard : document.getElementById("TodoCard"),
        DoingCard : document.getElementById("DoingCard"),
        DoneCard : document.getElementById("DoneCard")
    }
    //empty all the divs to avoid duplicate the data inside the div with the data come from the localStorage
    Object.values(cards).forEach(card => card.innerHTML = "")
    // const TodoCard = 
    // const DoingCard = document.getElementById("DoingCard");
    // const DoneCard = document.getElementById("DoneCard");
    if(storeData){
        console.log("condition");
        console.log("store data " + storeData);
        
        const data = JSON.parse(storeData);
        console.log("this is data ",data);
        data.forEach((item) => {  
            console.log(item)
            console.log("data.status = ",item.status) 
            console.log("second condition");
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `
            <div class="flex justify-between ">                        
            <h2 class="text-BigTitle font-semibold ${item.priority == 'p1' ? 'text-red-600' : item.priority == 'p2' ? ' text-orange-700' : item.priority == 'p3' ? 'text-green-600' : ''} ">${item.titre}</h2>
            <svg  class=" w-4" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px"
            fill="#5f6368">
            <path
            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
            </div>
                <div class="flex justify-between">
                <p class="date">${item.date}</p>
                <p class="pri">${item.priority}</p>
                </div>
                
                <button  class="bg-red-600 text-white w-16">delete</button>
                
                
                `
                // assign a function to svg 
                newDiv.querySelector('svg').onclick = function(){
                    openEditModal(item.id) //to open the edit modal
                };
                newDiv.querySelector("button").onclick = function(){
                    deleteTask(item.id)
                }
                newDiv.classList.add('flex','justify-between','flex-col','mt-2')
                if(item.status == "to do"){          
                    TodoCard.append(newDiv);
                    // console.log("true");
                }
                if (item.status == "doing"){
                    DoingCard.append(newDiv)
                    // console.log("doing true");
                }
                if(item.status == "done"){
                    DoneCard.append(newDiv);
                    // console.log("done true")
                }
            });
            counter();
        }
        else{
        console.log("user todos not found in local storage")
    }
}
function counter(){
    const todoCount = document.getElementById("todoCount")
    const doingCount = document.getElementById("doingCount")
    const doneCount = document.getElementById("doneCount")
    const storeData = localStorage.getItem("info");
    const data = JSON.parse(storeData)
    let TodoCountSomme = 0 , DoingCountSomme = 0 , DoneCountSomme = 0;
    data.forEach(item => {
        console.log("counter test");
        
        if(item.status == 'to do'){
            TodoCountSomme++;
            console.log("TodoCount condition");
            
        }
        else if(item.status == 'doing'){
            DoingCountSomme++
        }
        else if(item.status == 'done'){
            DoneCountSomme++
        }
    });
    todoCount.textContent=TodoCountSomme
    doingCount.textContent = DoingCountSomme
    doneCount.textContent = DoneCountSomme
}
// open the modal and get the data from input and pass the data to localStorage
document.getElementById("submit").addEventListener("click", function(event){
event.preventDefault()
});
function validation(title , desc , status , date , prio){
    const nameError = document.getElementById("name-error");
    const descError = document.getElementById("description-error")
    const statuError = document.getElementById("status-error")
    const dateError = document.getElementById("date-error")
    const priorityError = document.getElementById("priority-error")
    let isValid = true;
    // Reset error messages on each validation
    nameError.textContent = ""
    descError.textContent = ""
    statuError.textContent = ""
    dateError.textContent = ""
    priorityError.textContent = ""
    // when found an empty field it shows an error message 
    if(title == ""){
        nameError.innerText = "le nom is required"
        isValid = false;
    }
    if(desc == ""){
        descError.innerText = "la description et requird"
        isValid = false;
    }
    if(status == null){
        statuError.innerText = "le status et required"
        isValid = false;
    }
    if(date == ""){
        dateError.innerText = "la date et required"
        isValid = false;
    }
    if(prio == null){
        priorityError.innerText = "la priority et required"
        isValid = false;
    }
    return isValid;
}
function Add (){
getFromLS()
    const titre = document.getElementById("titre").value;
    const description = document.getElementById("description").value;
    const status = document.querySelector('input[name="status"]:checked');
    const date = document.getElementById("date").value;
    const Priorite = document.querySelector('input[name="Priorite"]:checked');
    // if all the field are not empty you can push the data to array
    const isValid = validation(titre,description,status,date,Priorite);
    if(isValid){
        all.push({ "id": id, "titre": titre, "descrip": description, "status": status ? status.value : '', "date": date, "priority": Priorite ? Priorite.value : '' })
        modal.classList.add("hidden");
        id++
        localStorage.setItem("info",JSON.stringify(all))
        show();
        counter(); //pour counte l element ajouter (important pourquoi il travaille mieux ici et n est pas travaille bien hors de cette function d ajoute)
        // pour reseter le modal inputs apres la submission de model 
        document.getElementById("titre").value = "";
        document.getElementById("description").value = "";
        status.checked = false;
        document.getElementById("date").value = "";
        Priorite.checked = false;
    }
}
submit.addEventListener("click", Add)



// to close the modal
cancel.addEventListener("click", function (event) {
    event.preventDefault()
    modal.classList.add("hidden");
})

//intiall the page with the previous data
document.addEventListener("DOMContentLoaded",show);