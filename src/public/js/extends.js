// Verificar token al cargar una ruta
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const username = document.getElementById("userDropdown");

  if (token) {
    username.textContent = name;
  }
});

const cerrarSesion = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");

  window.location.href = "/views/login.html";
};
