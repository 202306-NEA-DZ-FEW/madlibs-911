//overlay for content to be loaded
window.addEventListener("load", function () {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none"; // Hide the overlay
});

let clicked = false;

document.getElementById("overlayButton").addEventListener("click", function() {
  if (!clicked) {
    // Change the ID of the overlayButton
    this.id = "newOverlayButton";
    // Change the text content of the button
    this.textContent = "Not there, HERE!!";
    clicked = true;
  } else {
    // Navigate to a new page
    window.location.href = "./Page.html";
  }
});

document.getElementById("membersButton").addEventListener("click", function() {
    window.location.href = "./index1.html";
  });