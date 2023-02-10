const toggleButton = document.getElementById("toggle-popup");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-popup");
// const nextButton = document.getElementById("next");
// const popup2 = document.getElementById("popup2");

toggleButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});

// nextButton.addEventListener("click", () => {
//   popup2.style.display = "block";
// });


