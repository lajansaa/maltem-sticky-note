const mainWrapperElement = document.getElementById("main-wrapper");
const addButtonElement = document.getElementById("add-button");
let nextNoteId;

const save = (id) => {
  const noteTitle = document.getElementById('title-' + id).value;
  const notes = document.getElementById('notes-' + id).value;
  if (!(noteTitle == '' && notes == '')) {
    localStorage.setItem("sn-" + id, JSON.stringify({noteTitle: noteTitle, notes: notes}));
  }
}

const add = () => {
  append(nextNoteId, '', '')
}


const append = (id, noteTitle, notes) => {
  const notesWrapper = `<div id="notes-wrapper-${id}" class="notes-wrapper">
                         <div class="content-wrapper">
                          <input id="title-${id}" class="notes-title" value="${noteTitle}"></br>
                          <textarea autofocus id="notes-${id}" class="notes" rows="5">${notes}</textarea>
                         </div>
                         <div class="controls-wrapper">
                          <button id="save-button" onclick="save(${id})">Save</button>
                          <button id="close-button" onclick="close()">Close</button>
                          <button id="remove-button" onclick="remove(${id})">Delete</button>
                         </div>
                        </div>
                       `
  const divWrapperElement = document.createElement('div');
  divWrapperElement.innerHTML = notesWrapper;                            
  mainWrapperElement.insertBefore(divWrapperElement, addButtonElement);
}

