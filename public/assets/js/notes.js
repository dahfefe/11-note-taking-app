
// const uuid = require('./helpers/uuid');

/*

let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}

*/

const noteForm = document.querySelector('.note-form');
const noteTitle = document.querySelector('.note-title');
const noteText = document.querySelector('.note-textarea');
const saveNoteBtn = document.querySelector('.save-note');
const newNoteBtn = document.querySelector('.new-note');
const clearBtn = document.querySelector('.clear-btn');
const noteList = document.querySelectorAll('.list-container .list-group');

console.log("Javascript is working!!!")

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// // Get the value of the note and save it to a variable
// const noteTitleInput = document.querySelector('.note-title').value;

// // get the value of the title and save it to a variable
// const noteTextContent = document.querySelector('.note-textarea').value.trim();

// activeNote is used to keep track of the note in the textarea
const activeNote = {
  // title: noteTitleInput,
  // text: noteTextContent,
  // id: uuid(),
};

const createLi = (text) => {  // delBtn = true
  const liEl = document.createElement('li');
  liEl.classList.add('list-group-item');

  const spanEl = document.createElement('span');
  spanEl.classList.add('list-item-title');
  spanEl.innerText = text;
  // spanEl.addEventListener('click', handleNoteView);

  liEl.append(spanEl);

  // if (delBtn) {
  //   const delBtnEl = document.createElement('i');
  //   delBtnEl.classList.add(
  //     'fas',
  //     'fa-trash-alt',
  //     'float-right',
  //     'text-danger',
  //     'delete-note'
  //   );
  //   delBtnEl.addEventListener('click', handleNoteDelete);

  //   liEl.append(delBtnEl);
  // }

  return liEl;
};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);

    console.log(response);
    console.log(data);
}); 

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createLi(note);
    })
    .catch((error) => {
      console.error('Error:', error);
});

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// const renderActiveNote = () => {
//   hide(saveNoteBtn);
//   hide(clearBtn);

//   if (activeNote.id) {
//     show(newNoteBtn);
//     noteTitle.setAttribute('readonly', true);
//     noteText.setAttribute('readonly', true);
//     noteTitle.value = activeNote.title;
//     noteText.value = activeNote.text;
//   } else {     // in what scenario will the activeNote not have an id??
//     hide(newNoteBtn);   
//     noteTitle.removeAttribute('readonly');
//     noteText.removeAttribute('readonly');
//     noteTitle.value = '';
//     noteText.value = '';
//   }
// };

getNotes().then((data) => data.forEach((note) => createLi(note)));

// Function to validate the notes that were submitted
const validateNote = (newNote) => {
  const { title, text } = newNote;

  // Object to hold our error messages until we are ready to return
  const errorState = {
    title: '',
    text: '',
  };

  // Bool value if the title is valid
  const utest = title.length >= 0;
  if (!utest) {
    errorState.title = 'Invalid title!';    
  }

  // Bool value to see if the note being added is at least 2 characters long
  const textContentCheck = text.length > 2;
  if (!textContentCheck) {
    errorState.text = 'Note must be at least 2 characters';
  }

  const result = {
    isValid: !!(utest && tipContentCheck),  // This "!!" is syntax sugar, somewhat refers to "not not"
    errors: errorState,                                   // main point: we want to ensure their text within each variable
  };

  // Return result object with a isValid boolean and an errors object for any errors that may exist
  return result;
};

// Helper function to deal with errors that exist in the result

const showErrors = (errorObj) => {
  const errors = Object.values(errorObj);
  errors.forEach((error) => {
    if (error.length > 0) {     // shouldn't it be "">=0" since one error will result in i=0
      alert(error);
    }
  });
};

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

  // Get the value of the note title and save it to a variable
  noteTitle = document.querySelector('.note-title').value.trim();

  // Get the value of the note text and save it to a variable
  noteText = document.querySelector('.note-textarea').value.trim();

  // Create an object with the title and text
  const newNote = {
    title: noteTitle,
    text: noteText,
  };

  // Run the tip object through our validator function
  const submission = validateNote(newNote);

  // If the submission is valid, post the tip. Otherwise, handle the errors.
  return submission.isValid ? saveNote(newNote) : alert(submission);
};

// Listen for when the form is submitted
noteForm.addEventListener('submit', handleFormSubmit);


// ORIGINAL CODE BELOW

/*

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
    // id: uuid()
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json;  // notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // // Returns HTML element with or without a delete button
  // const createLi = (text, delBtn = true) => {
  //   const liEl = document.createElement('li');
  //   liEl.classList.add('list-group-item');

  //   const spanEl = document.createElement('span');
  //   spanEl.classList.add('list-item-title');
  //   spanEl.innerText = text;
  //   spanEl.addEventListener('click', handleNoteView);

  //   liEl.append(spanEl);

  //   if (delBtn) {
  //     const delBtnEl = document.createElement('i');
  //     delBtnEl.classList.add(
  //       'fas',
  //       'fa-trash-alt',
  //       'float-right',
  //       'text-danger',
  //       'delete-note'
  //     );
  //     delBtnEl.addEventListener('click', handleNoteDelete);

  //     liEl.append(delBtnEl);
  //   }

  //   return liEl;
  // };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);
// const getAndRenderNotes = () => getNotes().then((data) => data.forEach((note) => renderNoteList(note)));

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();

*/