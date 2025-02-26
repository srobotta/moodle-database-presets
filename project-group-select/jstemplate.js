const choices = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
  "Project 6",
  "Project 7",
  "Project 8",
  "Project 9",
  "Project 10",
  "Project 11",
  "Project 12",
  "Project 13",
  "Project 14",
  "Project 15",
  "Project 16",
  "Project 17",
  "Project 18",
  "Project 19",
  "Project 20",
  "Project 21",
  "Project 22",
  "Project 23",
  "Project 24",
  "Project 25",
  "Project 26"
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
  </div>
</div>
`;

function displayChoices() {
  let html = '';
  let num = 0;
  for (const choice of choices) {
    let snippet = TMPL_INPUT_ENTRY;
    snippet = snippet.replace('{name}', choice);
    html += snippet.replace('{num}', num);
    num++;
  }
  return html;
};
function getChoiceName(val) {
  return choices[val] ? choices[val] : val;
}
async function hasGroupEntry() {
    const m = window.location.href.match(/id=(\d+)/);
    if (m) {
      fetch('/mod/data/view.php?id=' + id).then(function (response) {
        if (response.ok) {
          const res = response.text();
          const s = res.indexOf('<table class="plain-results hidden"');
          if (s > -1) {
            const t = res.indexOf('</table>', s);
            if (t > -1) {
              const snippet = res.substring(s, t - s);
              if (snippet.indexOf('<tr>') > -1) {
                return true;
              }
            }
          }
          return false;
        }
        throw response;
      }).then(function (text) {
        console.log(text);
      });
    }
    return false;
  }