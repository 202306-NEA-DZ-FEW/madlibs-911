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

  // Get references to the edit view and preview view elements
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
        // input.maxLength = 20;
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

  // Keyboard navigation
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

  // Auto-adjust input width
  const inputFields = container.querySelectorAll('input');
  inputFields.forEach((input, i) => {
    input.addEventListener('input', (event) => {
      inputValues[i] = event.target.value;

      // Set the width of the input element based on the input value's length
      event.target.style.width = ((event.target.value.length + 1) * 10) + 'px'; // Adjust the multiplier as needed

      // Render the preview view
      renderPreview();
    });
  });
});
const toggleOverlay = () => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
};