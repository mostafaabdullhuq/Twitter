const toggleButton = document.getElementById("toggle-popup");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-popup");
const popupEdit = document.getElementById("popupEdit");
const toggleButton1 = document.getElementById("toggle-popup1");

toggleButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});



toggleButton1.addEventListener("click", () => {
  popupEdit.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popupEdit.style.display = "none";
});



