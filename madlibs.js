/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  const array = [];
  const splittedText = rawStory.split(" ");

  for (const word of splittedText) {
    if ((/\[n\]/).test(word) === true) {
      array.push({
        word: word.replace("[n]", ""),
        pos: "n"
      })
    } else if ((/\[a\]/).test(word) === true) {
      array.push({
        word: word.replace("[a]", ""),
        pos: "a"
      })
    } else if ((/\[v\]/).test(word) === true) {
      array.push({
        word: word.replace("[v]", ""),
        pos: "v"
      })
    } else if ((/\[break\]/).test(word) === true) {
      array.push({
        word: word.replace("[break]", ""),
        pos: "break"
      })} else {
      array.push({
        word: word
      })
    }
  }
  return array // This line is currently wrong :)
}

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
        
      }else if (wordObj.pos) {
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
      }else if (wordObj.pos) {
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
