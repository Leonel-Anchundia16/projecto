// Verificar token al cargar una ruta
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Si no se encuentra un token, redirigir al login
  if (token) {
    window.location.href = "/";
  }
});

const login = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Validar formato de correo electrónico
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("name", data.username);

    window.location.href = "/";
  } else {
    const error = data.error;
    alert(error);
    console.log("Error de inicio de sesión:", error);
    // Mostrar mensaje de error o realizar acciones necesarias en caso de error
  }
};

const register = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Validar formato de correo electrónico
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Registro exitoso");
    window.location.href = "/views/login.html";
    // Guardar el token en el almacenamiento local o en una cookie, etc.
    // Redirigir a otra página o realizar otras acciones necesarias
  } else {
    const error = data.error;
    alert(error);

    // Mostrar mensaje de error o realizar acciones necesarias en caso de error
  }
};
