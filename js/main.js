const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = popupBox.querySelector('header p');
const closeIcon = popupBox.querySelector('header i');
const titleTag = popupBox.querySelector('input');
const decsTag = popupBox.querySelector('textarea');
const addButton = popupBox.querySelector('button');
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]" );

let isUpdate = false, updateId;

addBox.addEventListener('click',()=>{
    titleTag.focus();
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click',()=>{
    isUpdate = false;
    titleTag.value = '';
    decsTag.value  = '';
    addButton.innerText = "Add  Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove('show');
})

let showNotes =()=>{
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((notes, index) =>{
        let liTag = `
        <li class="note">
            <div class="details">
                <p>${notes.title}</p>
                <span>${notes.description}</span>
            </div>
            <div class="botton-content">
                <span>${notes.date}</span>
                <div class="setting">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                    <li onclick="updateNote(${index},'${notes.title}','${notes.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        `;
        addBox.insertAdjacentHTML('afterend',liTag);
    })
}

showNotes()

let showMenu=(elem)=>{
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e =>{
        if(e.target.tagName != 'I' || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    })
}

let deleteNote=(noteId)=>{
    let confirmDel = confirm('Are you Sure You Want to Delate??');
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes()
}

let updateNote=(noteId, title,decs)=>{
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    decsTag.value  = decs;
    addButton.innerText = "update Note";
    popupTitle.innerText = "update a Note";
    console.log(noteId,title,decs)
}

addButton.addEventListener('click',(e)=>{
    e.preventDefault()
    let noteTitle = titleTag.value,
    noteDecs = decsTag.value;
    if(noteTitle || noteDecs){
        let dateobj = new Date(),
        month = months[dateobj.getMonth()],
        day = dateobj.getDay(),
        year = dateobj.getFullYear();

        let noteInfo = {
            title:noteTitle,
            description:noteDecs,
            date:`${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }else{
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click()
        showNotes()
    }
})