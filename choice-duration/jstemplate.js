const maxDuration = 180;
const listOfChoices = [
{
  name: 'Workshop 1',
  user: 'John Doe',
  duration: 180
},
{
  name: 'Workshop 2',
  user: 'Willem deSantos',
  duration: 90
},
{
  name: 'Workshop 3',
  user: 'Viola Zerbst',
  duration: 90
},
{
  name: 'Workshop 4',
  user: 'Loretta Norris',
  duration: 90
},
{
  name: 'Talk 5',
  user: 'André Grienz',
  duration: 45
},
{
  name: 'Talk 6',
  user: 'Meredith Winter',
  duration: 45
},
{
  name: 'Talk 7',
  user: 'Enid Tobler',
  duration: 45
},
{
  name: 'Demo 8',
  user: 'Roland Romain',
  duration: 30
},
{
  name: 'Demo 9',
  user: 'Werner Molder',
  duration: 30
},
{
  name: 'Demo 10',
  user: 'Lara Bloom',
  duration: 30
},
];
const TMPL_INPUT_ENTRY = `
<div class="row align-items-center h-100">
  <div class="col-1 mx-auto text-right">
    <input name="choices[{num}]" type="checkbox" class="custom-choice">
  </div>
  <div class="col-11 mx-auto">
    <span class="choice-name">{name}</span>
    <span class="choice-user">{user}</span>
    <span class="choice-duration">{duration}</span>
  </div>
</div>
`;
const TMPL_LIST_ENTRY = `
<div class="row">
  <div class="col-sm-10 col-md-9 col-lg-8">{name}</div>
  <div class="col-sm-2 col-md-3 col-lg-4">{votes}</div>
</div>
`;
const TMPL_ITEM_ENTRY = `
  <div class="mt-4">
    <span class="choice-name">{name}</span>
    <span class="choice-user">{user}</span>
    <span class="choice-duration">{duration}</span>
  </div>
`;

function displayChoices() {
  let html = '';
  let num = 0;
  for (const choice of listOfChoices) {
    let snippet = TMPL_INPUT_ENTRY;
    ['name', 'user', 'duration'].forEach((n) => {
      snippet = snippet.replace('{' + n + '}', choice[n]);
    })
    html += snippet.replace('{num}', num);
    num++;
  }
  return html;
};
function getChoiceName(val) {
  return listOfChoices[val] ? listOfChoices[val].name : val;
}
function getChoiceDuration(val) {
  return listOfChoices[val] ? listOfChoices[val].duration : 0;
}
function getSelectedChoices() {
  const vals = Array.from(
    document.getElementById('defaulttemplate-addentry').querySelectorAll('input:checked')
  ).map(o => o.name.replace('choices[', '').replace(']', ''));
  const duration = vals.reduce((sum, i) => {
    return sum + getChoiceDuration(i);
  }, 0);
  return { items: vals, duration: duration };
}
function displaySelectedChoices(val) {
  let a;
  try {
    a = JSON.parse(val.replaceAll('"', ''));
  } catch (e) {
    console.log('Could not parse: ' + val);
    return 'Error decoding value';
  }
  if (!Array.isArray(a)) {
    console.log('Parsed value is not an array: ' + a);
    return 'Error decoding value';
  }
  let html = '';
  for (const i of a) {
    if (typeof listOfChoices[i] === 'undefined') {
      console.log(`Item ${i} not found in choices`);
      continue;
    }
    let snippet = TMPL_ITEM_ENTRY;
    ['name', 'user', 'duration'].forEach((n) => {
      snippet = snippet.replace('{' + n + '}', listOfChoices[i][n]);
    })
    html += snippet;
  }
  return html;
}
function displayVotes(votes) {
  let html = TMPL_LIST_ENTRY.replace('{votes}', '<h3>Participants</h3>')
    .replace('{name}', '<h3>Name</h3>');
  for (let i = 0; i < listOfChoices.length; i++) {
    html += TMPL_LIST_ENTRY.replace('{votes}', votes[i] ?? 0).replace('{name}', getChoiceName(i));
  }
  return html;
}