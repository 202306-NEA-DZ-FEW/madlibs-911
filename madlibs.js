// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
  const welcomeButtonLeft = document.getElementById("welcomeLeft");
  const welcomeButtonRight = document.getElementById("welcomeRight");
  const contentContainer = document.getElementById("contentContainer");
  const entranceDiv = document.getElementById('entrance');

  let leftButtonClicks = 0;
  let rightButtonClicks = 0;

  welcomeButtonLeft.addEventListener("click", async () => {
    leftButtonClicks++;

    if (leftButtonClicks === 2 && rightButtonClicks === 1) {
      entranceDiv.remove();
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

  welcomeButtonRight.addEventListener("click", async () => {
    rightButtonClicks++;

    if (leftButtonClicks === 2 && rightButtonClicks === 1) {
      entranceDiv.remove();
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
});

// Function to render the processed story on the page
function renderStory(processedStory) {
  // Get the element where the story will be displayed
  const madLibsEdit = document.querySelector(".madLibsEdit");

  // Initialize variables to track the current line of text
  let currentLine = [];

  // Loop through each word object in the processed story
  processedStory.forEach((wordObj) => {
    // Add the current word to the current line
    currentLine.push(wordObj.word);

    // Check if the current word ends with a period (end of a sentence)
    if (wordObj.word.endsWith(".")) {
      // Create a new paragraph element
      const paragraph = document.createElement("p");

      // Set the content of the paragraph to the current line
      paragraph.textContent = currentLine.join(" ");

      // Append the paragraph to the madLibsEdit element
      madLibsEdit.appendChild(paragraph);

      // Reset the current line
      currentLine = [];
    }
  });
}

// Function to parse the raw story text and return an array of word objects
function parseStory(rawStory) {
  // Split the raw story text into an array of words
  const wordArray = rawStory.split(/\s+/);

  // Initialize an array to store the processed story
  const processedStory = [];

  // Loop through each word in the word array
  wordArray.forEach((word) => {
    const wordObj = {}; // Create an object to store the word and its part of speech (if any)
    const match = word.match(/\[(.*?)\]/); // Use a regular expression to match [part-of-speech] pattern

    // Check if the word matches the [part-of-speech] pattern
    if (match) {
      wordObj.word = word.replace(match[0], ""); // Remove the [part-of-speech] from the word
      wordObj.pos = match[1]; // Store the part of speech in the object
    } else {
      wordObj.word = word; // If no part of speech, store the word as is
    }

    // Add the word object to the processed story array
    processedStory.push(wordObj);
  });

  // Return the processed story array
  return processedStory;
}