const choices = [
{
  name: 'Connect6',
  user: 'Ben',
},
{
  name: 'Chinese whispers',
  user: 'John',
},
{
  name: 'The Resistance',
  user: 'Thomas',
},
{
  name: 'Geoguessr',
  user: 'Jeanette',
},
{
  name: 'Trivial Pursuit',
  user: 'Andrew',
},
{
  name: 'Categories',
  user: 'Fiona',
},
{
  name: 'Word chain',
  user: 'Denise',
},
{
  name: 'Kubb',
  user: 'Laura',
},
{
  name: 'Marshmallow-Challenge',
  user: 'Evelyn',
},
{
  name: 'Texas hold \'em',
  user: 'Victoria',
},
{
  name: 'Pictionary',
  user: 'Bill',
}
];
const TMPL_INPUT_ENTRY = `
<div class="row align-items-center h-100">
  <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 mx-auto">
    <select name="choices[{num}]" class="custom-select">
      <option value="">Please choose</option>
      <option value="choice_first">1st choice</option>
      <option value="choice_second">2nd choice</option>
      <option value="choice_third">3rd choice</option>
    </select>
  </div>
  <div class="col-lg-10 col-md-9 col-sm-8 col-xs-6 mx-auto">
    <h3>{name}</h3>
    <small>Proposed by {user}</small>
  </div>
</div>
`;
const TMPL_LIST_ENTRY = `
<div class="row">
  <div class="col-6">{name}</div>
  <div class="col-6">{votes}</div>
</div>
`;

function displayChoices() {
  let html = '';
  let num = 0;
  for (const choice of choices) {
    let snippet = TMPL_INPUT_ENTRY;
    ['name', 'user'].forEach((n) => {
      snippet = snippet.replace('{' + n + '}', choice[n]);
    })
    html += snippet.replace('{num}', num);
    num++;
  }
  return html;
};
function getChoiceName(val) {
  return choices[val] ? choices[val].name : val;
}
function displayVotes(votes) {
  let sortable = [];
  for (var vote in votes) {
    sortable.push([vote, votes[vote]]);
  }
  sortable.sort((a, b) => b[1] - a[1]);
  let choicesVoted = [];
  let html = TMPL_LIST_ENTRY.replace('{votes}', '<h3>Votes</h3>').replace('{name}', '<h3>Game</h3>');
  for (const item of sortable) {
     html += TMPL_LIST_ENTRY.replace('{votes}', item[1]).replace('{name}', getChoiceName(item[0]));
     choicesVoted.push(parseInt(item[0]));
  }
  for (let i = 0; i < choices.length; i++) {
    if (choicesVoted.includes(i)) continue;
    html += TMPL_LIST_ENTRY.replace('{votes}', 0).replace('{name}', getChoiceName(i));
  }
  return html;
}