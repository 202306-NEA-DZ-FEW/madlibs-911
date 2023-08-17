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
// Function to parse the raw story text
function parseStory(rawStory) {
  const array = [];
  const splittedText = rawStory.split(" ");

  for (const word of splittedText) {
    if ((/\[n\]/).test(word) === true) {
      array.push({
        word: word.replace("[n]", ""),
        pos: "n"
      });
    } else if ((/\[a\]/).test(word) === true) {
      array.push({
        word: word.replace("[a]", ""),
        pos: "a"
      });
    } else if ((/\[v\]/).test(word) === true) {
      array.push({
        word: word.replace("[v]", ""),
        pos: "v"
      });
    } else if ((/\[break\]/).test(word) === true) {
      array.push({
        word: word.replace("[break]", ""),
        pos: "break"
      });
    } else {
      array.push({
        word: word
      });
    }
  }
  return array;
}

// Get the processed story
getRawStory().then(parseStory).then((processedStory) => {
  // Create an array to store input values
  const inputValues = new Array(processedStory.length).fill('');

  // Get a reference to the edit view and preview view elements
  const madLibsEdit = document.querySelector('.madLibsEdit');
  const madLibsPreview = document.querySelector('.madLibsPreview');

  // Function to render the edit view and the preview view
  function renderStory() {
    madLibsEdit.innerHTML = ''; // Clear previous content
    madLibsPreview.innerHTML = ''; // Clear previous content

    for (let i = 0; i < processedStory.length; i++) {
      const wordObj = processedStory[i];

      if (wordObj.pos === 'break') {
        madLibsEdit.appendChild(document.createElement("br"));
      } else if (wordObj.pos) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 20;
        input.placeholder = wordObj.pos;

        input.value = inputValues[i] || '';

        input.addEventListener('input', (event) => {
          inputValues[i] = event.target.value;
          renderPreview();
        });

        const inputSpan = document.createElement('span');
        inputSpan.appendChild(input);

        madLibsEdit.appendChild(inputSpan);
      } else {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = wordObj.word + ' ';
        madLibsEdit.appendChild(wordSpan);
      }

      renderPreview();
    }
  }

  function renderPreview() {
    madLibsPreview.innerHTML = '';

    for (let i = 0; i < processedStory.length; i++) {
      const wordObj = processedStory[i];

      const wordSpan = document.createElement('span');
      if (wordObj.pos === 'break') {
        madLibsPreview.appendChild(document.createElement("br"));
      } else if (wordObj.pos) {
        wordSpan.textContent = inputValues[i] || '_____' + ' ';
      } else wordSpan.textContent = wordObj.word + ' ';
      madLibsPreview.appendChild(wordSpan);
      madLibsPreview.appendChild(document.createTextNode(" "));
    }
  }

  renderStory();

  // Reset button event listener
  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', () => {
    inputValues.fill('');
    renderStory();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.madLibsEdit');

  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const inputFields = container.querySelectorAll('input');
      const currentInput = event.target;
      const currentIndex = Array.from(inputFields).indexOf(currentInput);

      if (currentIndex > -1) {
        event.preventDefault();
        const nextIndex = currentIndex + 1;

        if (nextIndex < inputFields.length) {
          inputFields[nextIndex].focus();
        } else {
          inputFields[0].focus();
        }
      }
    }
  });
});