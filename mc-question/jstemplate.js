// Edit your question here.
const db_question = {
  text: "What makes people laugh?",
  option_a: "drugs",
  option_b: "a fart",
  option_c: "a joke",
  option_d: "a ryhme",
}

document.addEventListener("DOMContentLoaded", (event) => {
  Object.keys(db_question).forEach((key) => {
    if (key === 'text') {
      document.querySelector('.question').innerHTML = db_question.text;
    } else {
      document.querySelector(`.${key}`).innerHTML = db_question[key];
    }
  });
});