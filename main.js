const notesWrapperElement = document.getElementById("notes-wrapper");
const addButtonElement = document.getElementById("add-button");
const searchElement = document.getElementById("search");
let nextNoteId;

// gets called when page first loads or when user filters notes by title
const display = (searchTerm) => {
  // clear all notes
  while (notesWrapperElement.firstChild) {
    notesWrapperElement.removeChild(notesWrapperElement.firstChild);
  }
  // filter out only sticky notes (sn) related key-value pairs
  // sort by order of creation (i.e. ascending index)
  const keysArr = Object.keys(localStorage)
                        .filter((key) => {
                           return key.slice(0,3) == ("sn-")
                         })
                        .sort((e1, e2) => { 
                           const first = parseInt(e1.slice(3));
                           const second = parseInt(e2.slice(3));
                           return first - second;
                         });
  
  if (keysArr.length == 0) {
    nextNoteId = 1;
  } else {
    const lastId = parseInt(keysArr[keysArr.length - 1].slice(3));
    nextNoteId = lastId + 1;
    keysArr.map(function(key) {
                  const objValue = JSON.parse(localStorage.getItem(key));
                  // display all notes if searchTerm is undefined
                  if (searchTerm == undefined || objValue.noteTitle == searchTerm) {
                    append(key.slice(3), objValue.noteTitle, objValue.notes)
                  }
                }, localStorage);
  }
}

const search = () => {
  const searchTerm = searchElement.value.trim();
  display(searchTerm);
}

const save = (id) => {
  const noteTitle = document.getElementById('title-' + id).value.trim();
  const notes = document.getElementById('notes-' + id).value.trim();
  if (!(noteTitle == '' && notes == '')) {
    localStorage.setItem("sn-" + id, JSON.stringify({noteTitle: noteTitle, notes: notes}));
    // hide save button to cue users that note has been saved
    const saveButtonElement = document.getElementById("save-button-" + id);
    saveButtonElement.style.display = "none";
  }
}

const saveAll = () => {
  // loop through all notesWrapper elements currently in DOM to get id
  const notesWrapperElements = document.getElementsByClassName("notes-wrapper");
  for (let i = 0; i < notesWrapperElements.length; i++) {
    const id = parseInt(notesWrapperElements[i].id.slice(14));
    save(id);
    // hide save button to cue users that note has been saved
    const saveButtonElement = document.getElementById("save-button-" + id);
    saveButtonElement.style.display = "none";
  };
}

const showSave = (id) => {
  // shows save button upon input to cue users that there are unsaved changes
  const saveButtonElement = document.getElementById("save-button-" + id);
  saveButtonElement.style.display = "block";
}

const add = () => {
  nextNoteId++;
  append(nextNoteId, '', '')
}

const remove = (id) => {
  const noteElement = document.getElementById("notes-wrapper-" + id);
  noteElement.parentNode.removeChild(noteElement);
  localStorage.removeItem("sn-" + id);
}

// gets called when page first loads or when user adds new notes
const append = (id, noteTitle, notes) => {
  // noteWrapper template
  const notesWrapper = `<div id="notes-wrapper-${id}" class="notes-wrapper">
                         <div class="content-wrapper">
                          <input id="title-${id}" class="notes-title" value="${noteTitle}" oninput="showSave(${id})" placeholder="title..."></br>
                          <textarea autofocus id="notes-${id}" class="notes" rows="5" oninput="showSave(${id})" placeholder="notes...">${notes}</textarea>
                         </div>
                         <div class="controls-wrapper">
                          <button id="save-button-${id}" class="save-button" onclick="save(${id})">Save</button>
                          <button id="remove-button-${id}" class="remove-button" onclick="remove(${id})">Delete</button>
                         </div>
                        </div>
                       `
  const divWrapperElement = document.createElement('div');
  divWrapperElement.innerHTML = notesWrapper;                            
  notesWrapperElement.append(divWrapperElement);
}

display();