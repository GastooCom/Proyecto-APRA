import React from "react";
import "../css/PaginaRegistroGA.css";
const loginDiv = document.createElement("div");
loginDiv.className = "Cuadrado-login";

// título
const title = document.createElement("h1");
title.textContent = "Iniciar con Google";
loginDiv.appendChild(title);

// Div del Google
const googleDiv = document.createElement("div");
googleDiv.className = "Google";

const googleImg = document.createElement("img");
googleImg.src = "src/Imagenes/Google.jpeg";
googleImg.alt = "Google";

const googleSpan = document.createElement("span");
googleSpan.textContent = "Continuar con Google";

googleDiv.appendChild(googleImg);
googleDiv.appendChild(googleSpan);
loginDiv.appendChild(googleDiv);

// Div del Apple
const appleDiv = document.createElement("div");
appleDiv.className = "Apple";

const appleImg = document.createElement("img");
appleImg.src = "src/Imagenes/b531b3cd-f41c-4628-9e4a-141d0275ab16.jpeg";
appleImg.alt = "Apple";

const appleSpan = document.createElement("span");
appleSpan.textContent = "Registrarse con Apple";

appleDiv.appendChild(appleImg);
appleDiv.appendChild(appleSpan);
loginDiv.appendChild(appleDiv);

// Agregar todo al body
document.body.appendChild(loginDiv);