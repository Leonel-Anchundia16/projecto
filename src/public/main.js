import { appendNote, renderNotes, fillForm, onHandleSubmit } from "./ui.js";
import { loadNotes, onNewNote, onSelected } from "./sockets.js";

// Verificar token al cargar una ruta
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Si no se encuentra un token, redirigir al login
  if (!token && window.location.pathname !== "/views/login.html") {
    window.location.href = "/views/login.html";
  } else {
    loadNotes(renderNotes);
    onNewNote(appendNote);
    onSelected(fillForm);
  }
});

// Save a new Note
const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);
