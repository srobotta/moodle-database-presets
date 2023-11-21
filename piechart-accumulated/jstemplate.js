function checkNewInput() {
  const div = document.getElementById('defaulttemplate-addentry');
  div.closest('form').onsubmit = function(event) {
    div.querySelector('p.alert').classList.add('hidden');
    let cnt = 0;
    div.querySelectorAll('input[type="number"]').forEach((input) => {
      let val = parseInt(input.value);
      if (!isNaN(val)) { 
        cnt += val;
      }
    });
    if (cnt > 0 && cnt < 4) {
      return true;
    }
    event.preventDefault();
    if (cnt === 0) {
       div.querySelector('p.alert.notselected').classList.remove('hidden');
    } else {
       div.querySelector('p.alert.toomany').classList.remove('hidden');
    }
    return false;
  };
};
function getImageHtml(name, title) {
  const prefix = 'https://github.com/srobotta/moodle-database-presets/blob/master/piechart-accumulated/%s?raw=true'
  const img = {
    opt_a: 'aelplermagronen.jpg',
    opt_b: 'chuegelipastetli.jpg', 
    opt_c: 'cordon-bleu.jpg', 
    opt_d: 'fondue.jpg',
    opt_e: 'polenta.jpg',
    opt_f: 'raclette.jpg',
    opt_g: 'roesti.jpg',
    opt_h: 'saucisson.jpg',
    opt_i: 'zuercher_geschnetzeltes.jpg',
  };
  return `<img title="${title}" class="resourceimage" src="https://github.com/srobotta/moodle-database-presets/blob/master/piechart-accumulated/${img[name]}?raw=true" alt="{$title}">`
};
function insertImages() {
  let div = document.getElementById('defaulttemplate-addentry');
  if (!div) return;
  for (let i = 97; i < 106; i++) {
    const o = 'opt_' + String.fromCharCode(i);
    const d = div.querySelector('.' + o);
    if (!d) continue;
    d.innerHTML =  getImageHtml(o, d.innerHTML) + d.innerHTML;
  }
};