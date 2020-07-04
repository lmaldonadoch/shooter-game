import API from '../Objects/api';

const Dom = (() => {
  function createForm() {
    const div = document.createElement('div');
    div.setAttribute('id', 'div');
    div.innerHTML = `<input type='search' id = 'input' placeholder='Write your name!' aria-label='Search' required/></br><button type='submit' id = 'button'> Submit Score</button>`;
    return div;
  }

  function addButtonFunctionality(score) {
    let button = document.getElementById('button');
    let input = document.getElementById('input');
    let div = document.getElementById('div');
    button.onclick = () => {
      if (input.value !== '') {
        div.classList.add('empty');
        div.innerHTML = `<p>Please wait... </p>`;
        API.postScores(input.value, score).then((response) => {
          console.log(response);
          div.innerHTML = `<p>${response.result} </p>`;
        });
      } else {
        if (document.getElementsByTagName('p').length == 0) {
          const p = document.createElement('p');
          p.innerHTML = 'Name can not be blank';
          div.appendChild(p);
        }
      }
    };
  }
  return { createForm, addButtonFunctionality };
})();

export default Dom;
