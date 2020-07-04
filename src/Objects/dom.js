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

  function createStory() {
    const div = document.createElement('div');
    div.classList.add('story');
    div.innerHTML = `<p>HP: Hold on! Can you hear that?</br>RW: It seems like somebody is coming. Take out your wands! Get ready!</br>HG: Remember what AD said about the Dementors, they are everywhere! We will come across one or two for sure in our way.</br>HP: Yes, think about a good memory and get ready to use your Patronum anytime now.</br>HP: Guys...</br>HP: Guys, where are you?</br>DE: It seems like it is only you and us now, we have placed your friends out of the scene so that we can settle the score right now. Oh, I almost forgot, we brought friends with us!</br></br></br> <strong>Use a/w/d/s to move, 'j' to launch your Confundus spell, and 'i' to conjure your Patronus.</br>Confundus won't work on Dementors and the Patronum will have no effect on the dark wizards. Good luck!</strong></p>`;
    return div;
  }
  return { createForm, addButtonFunctionality, createStory };
})();

export default Dom;
