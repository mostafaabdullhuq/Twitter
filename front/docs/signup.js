const toggleButton = document.getElementById("toggle-popup");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-popup");


toggleButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});



