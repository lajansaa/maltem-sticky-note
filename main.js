const notesWrapperElement = document.getElementById("notes-wrapper");

const addNotes = () => {
  const notesElement = document.createElement("textarea");
  notesElement.className = "notes";
  notesWrapperElement.appendChild(notesElement);
}