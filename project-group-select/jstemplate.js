// List of project names. Once you have entries, do not change the sequence of the values.
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
// Strings that are used at the templates.
const STR = {
  "reason_1": "Most preferred",
  "reason_2": "Second preferred",
  "reason_3": "Least preferred",
  "reason_random": "Randomly assigned",
  "select_1": "1st choice",
  "select_2": "2nd choice",
  "select_3": "3rd choice",
  "selected_by_group": "Selected by your group",
  "th_project": "Project",
  "th_group": "Group",
  "th_reason": "Reason",
};
// Template for the Add new entry template.
const TMPL_INPUT_ENTRY = `
<div class="row align-items-center h-100">
  <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 mx-auto">
    <select name="choices[{num}]" class="custom-select">
      <option value="">Please choose</option>
      <option value="choice_first">${STR.select_1}</option>
      <option value="choice_second">${STR.select_2}</option>
      <option value="choice_third">${STR.select_3}</option>
    </select>
  </div>
  <div class="col-lg-10 col-md-9 col-sm-8 col-xs-6 mx-auto">
    <h3>{name}</h3>
  </div>
</div>
`;

/**
 * Display the list of all projects with a selection in front of the project name.
 * @return {String}
 */
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
/**
 * Display the name of a project, based on the index.
 * @param {Number} val
 * @return {String}
 */
function getChoiceName(val) {
  return choices[val] ? choices[val] : val;
}