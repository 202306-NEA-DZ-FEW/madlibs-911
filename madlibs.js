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
      getRawStory().then(parseStory).then((processedStory));
    } else if (leftButtonClicks > 2 || rightButtonClicks > 1) {
      // Refresh the page if wrong clicks
      location.reload();
    }
  }

  // Function to fetch and display story


  // Function to render the processed story on the page

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


  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  /*getRawStory().then(parseStory).then((processedStory) => {
    console.log(processedStory);
  }); */

  // Get a reference to the edit view and preview view elements
  const madLibsEdit = document.querySelector('.madLibsEdit');
  const madLibsPreview = document.querySelector('.madLibsPreview');

  // Get the processed story
  getRawStory().then(parseStory).then((processedStory) => {
    // Create an array to store input values
    const inputValues = new Array(processedStory.length);

    // Function to render the edit view and the preview view
    function renderStory() {
      madLibsEdit.innerHTML = ''; // Clear previous content
      madLibsPreview.innerHTML = ''; // Clear previous content

      for (let i = 0; i < processedStory.length; i++) {
        const wordObj = processedStory[i];
        if (wordObj.pos === 'break') {
          madLibsEdit.appendChild(document.createElement("br")); // Add space

        } else if (wordObj.pos) {
          // Create an input element for edit view
          const input = document.createElement('input');
          input.type = 'text';
          input.maxLength = 20; // Maximum of 20 characters
          input.placeholder = wordObj.pos

          // Listen for input changes
          input.addEventListener('input', (event) => {
            // Update the input value array
            inputValues[i] = event.target.value;

            // Render the preview view
            renderPreview();
          });

          // Wrap the input in a span
          const inputSpan = document.createElement('span');
          inputSpan.appendChild(input);

          // Append the input span to the edit view
          madLibsEdit.appendChild(inputSpan);
        } else {
          // Wrap the word in a span
          const wordSpan = document.createElement('span');
          wordSpan.textContent = wordObj.word + ' ';

          // Append the word span to the edit view
          madLibsEdit.appendChild(wordSpan);
        }

        // Render the preview view
        renderPreview();
      }
    }

    // Function to render the preview view
    function renderPreview() {
      madLibsPreview.innerHTML = ''; // Clear previous content

      for (let i = 0; i < processedStory.length; i++) {
        const wordObj = processedStory[i];

        // Wrap each word in a span
        const wordSpan = document.createElement('span');
        if (wordObj.pos === 'break') {
          madLibsPreview.appendChild(document.createElement("br"));
        } else if (wordObj.pos) {
          wordSpan.textContent = inputValues[i] || '_________' + ' ';
        } else wordSpan.textContent = wordObj.word + ' ';
        // Append the word span to the preview view
        madLibsPreview.appendChild(wordSpan);
        madLibsPreview.appendChild(document.createTextNode(" ")); // Add space
      }
    }

    // Initial rendering
    renderStory();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.madLibsEdit'); // Select the container div

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const inputFields = container.querySelectorAll('input');
        const currentInput = event.target;
        const currentIndex = Array.from(inputFields).indexOf(currentInput);

        if (currentIndex > -1) {
          event.preventDefault(); // Prevent default form submission behavior
          const nextIndex = currentIndex + 1;

          if (nextIndex < inputFields.length) {
            inputFields[nextIndex].focus(); // Move focus to the next input field
          } else {
            inputFields[0].focus(); // If at the last input, move focus to the first input
          }
        }
      }
    });
  });
});
