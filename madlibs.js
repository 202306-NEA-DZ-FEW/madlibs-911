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
  function loadStory() {
    getRawStory()
      .then(function (rawStory) {
        const processedStory = parseStory(rawStory);
        renderStory(processedStory);
        contentContainer.style.display = "block";
      })
      .catch(function (error) {
        console.error("Error fetching or processing the story:", error);
      });
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
/*function parseStory(rawStory) {
  const wordArray = rawStory.split(/\s+/);
  const processedStory = [];
  wordArray.forEach((word) => {
    const wordObj = {};
    const match = word.match(/\[(.*?)\]/);
    if (match) {
      let x = document.createElement('input');
      x.type = 'text';
      x.innerHTML = 'laid';
      wordObj.word = word.replace(match[0], "");
      wordObj.input = x;
      wordObj.pos = match[1];
    } else {
      wordObj.word = word;
    }
    console.log(wordObj)
    processedStory.push(wordObj);
  });

  return processedStory;
}*/
function parseStory(rawStory) {
  // Your code here.
  const processedStory = [];
  const splittedText = rawStory.split(" ");
  const nounPattern = /^[a-z]*$/;
  for (const word of splittedText) {
    if (nounPattern.test(word) === true) {
      processedStory.push({
        word: word.replace("[n]", ""),
        pos: "n"
      })
    } else if ((/[a]/).test(word) === true) {
      processedStory.push({
        word: word.replace("[a]", ""),
        pos: "a"
      })
    } else if ((/[v]/).test(word) === true) {
      processedStory.push({
        word: word.replace("[v]", ""),
        pos: "v"
      })
    } else {
      processedStory.push({
        word: word
      })
      console.log(array)
    }
  }

  return processedStory // This line is currently wrong 🙂
}
