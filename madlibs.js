document.addEventListener("DOMContentLoaded", () => {
  // Get references to DOM elements
  const welcomeButtonLeft = document.getElementById("welcomeLeft");
  const welcomeButtonRight = document.getElementById("welcomeRight");
  const contentContainer = document.getElementById("contentContainer");
  const entranceDiv = document.getElementById('entrance');

  // Initialize click counters
  let leftButtonClicks = 0;
  let rightButtonClicks = 0;

  // Left button click event
  welcomeButtonLeft.addEventListener("click", () => {
    leftButtonClicks++;
    checkClicks();
  });

  // Right button click event
  welcomeButtonRight.addEventListener("click", () => {
    rightButtonClicks++;
    checkClicks();
  });

  // Function to check click conditions
  function checkClicks() {
    if (leftButtonClicks === 2 && rightButtonClicks === 1) {
      entranceDiv.remove();
      loadStory();
    } else if (leftButtonClicks > 2 || rightButtonClicks > 1) {
      // Refresh the page if wrong clicks
      location.reload();
    }
  }

  // Function to fetch and display story
  async function loadStory() {
    try {
      const rawStory = await getRawStory();
      const processedStory = parseStory(rawStory);
      renderStory(processedStory);
      contentContainer.style.display = "block";
    } catch (error) {
      console.error("Error fetching or processing the story:", error);
    }
  }
});

// Function to render the processed story on the page
function renderStory(processedStory) {
  const madLibsEdit = document.querySelector(".madLibsEdit");
  let currentLine = [];
  processedStory.forEach((wordObj) => {
    currentLine.push(wordObj.word);
    if (wordObj.word.endsWith(".")) {
      const paragraph = document.createElement("p");
      paragraph.textContent = currentLine.join(" ");
      madLibsEdit.appendChild(paragraph);
      currentLine = [];
    }
  });
}

// Function to parse the raw story text and return an array of word objects
function parseStory(rawStory) {
  const wordArray = rawStory.split(/\s+/);
  const processedStory = [];
  wordArray.forEach((word) => {
    const wordObj = {};
    const match = word.match(/\[(.*?)\]/);
    if (match) {
      wordObj.word = word.replace(match[0], "");
      wordObj.pos = match[1];
    } else {
      wordObj.word = word;
    }
    processedStory.push(wordObj);
  });
  return processedStory;
}
