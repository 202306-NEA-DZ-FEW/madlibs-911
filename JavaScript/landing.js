window.addEventListener("load", function () {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none"; // Hide the overlay
});

let clicked = false;
let hoverCount = 0; // Initialize hover count

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

// Define the hover event handler function
function handleHover() {
  if (hoverCount < 15) {
    moveButtonRandomly();
    hoverCount++;
  } else {
    // Remove the event listener after 12 hovers
    overlayButton.removeEventListener("mouseover", handleHover);
  }
}

document.getElementById("membersButton").addEventListener("click", function() {
  window.location.href = "./index1.html";
});

let overlayButton = document.getElementById("overlayButton");

// Add the hover event listener using the defined function
overlayButton.addEventListener("mouseover", handleHover);

function moveButtonRandomly() {
  let buttonWidth = overlayButton.offsetWidth;
  let buttonHeight = overlayButton.offsetHeight;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let maxLeft = windowWidth - buttonWidth;
  let maxTop = windowHeight - buttonHeight;

  let randomLeft = Math.floor(Math.random() * maxLeft);
  let randomTop = Math.floor(Math.random() * maxTop);

  overlayButton.style.left = randomLeft + "px";
  overlayButton.style.top = randomTop + "px";
}