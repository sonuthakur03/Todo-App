// getting all required elements
const userInput = document.querySelector('.input-field input');
const addBtn = document.querySelector('.input-field button');
const todoList = document.querySelector('.todolist');
const deleteAllBtn = document.querySelector('footer button');


// making add button active and inactive
userInput.onkeyup = () => {
    let userData = userInput.value.trim();
    if (!userData) {
        addBtn.classList.remove('active');
    } else {
        addBtn.classList.add('active');
    }
}

// when add button is clicked todo is added
addBtn.onclick = () => {
    let userData = userInput.value.trim();
    if (userData) { // Ensure there's user input before proceeding
        let getLocalStorage = localStorage.getItem("New Todo"); // getting localStorage
        let listArr;
        if (getLocalStorage === null) {
            listArr = [];   // if localStorage is null it will create a array
        } else { // parsing localStorage data into json 
            listArr = JSON.parse(getLocalStorage);
        }
        listArr.push(userData);
        localStorage.setItem("New Todo", JSON.stringify(listArr)); // parsing json object into js object
        showTask(); //calling showtask to show data in page
    }
}

const showTask = () => {
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localStorage
    let listArr;
    if (getLocalStorage === null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let pendingNumb = document.querySelector('.pendingNumb');
    pendingNumb.textContent = listArr.length; // adding pending task in page
    let newLitag = ``;
    listArr.forEach((element, index) => {
        newLitag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`; // creating new li with user data and assinging delete function to span 
    });
    todoList.innerHTML = newLitag;  //adding li to ul
    userInput.value = ""; // making input area blank after one input
}


//function  to delete tasks
const deleteTask = (index) =>{
    let getLocalStorage = localStorage.getItem("New Todo"); // getting localStorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // to remove data in given index 
    
    // reseting localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
        showTask();
}

deleteAllBtn.onclick = () =>{
    listArr = []; //making localStorage empty
    // reseting localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
        showTask();
}
