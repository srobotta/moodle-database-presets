## Wordcloud list

The use case for this preset is to present a list of words. The users may enter
single terms or groups of words. These are taken as they are and a wordcloud
is build from them.

Only the list view template has been modified to display the word cloud.

<div style="margin: 0 25%;">

![Wordcloud from a bunch of words in the list view](screenshot.png "Wordcloud from a bunch of words in the list view")

</div>

For more details on how the word cloud works, please check [Wordcloud text](../wordcloud-text/README.md).

### Troubleshooting

Using this wordcloud in a real scenario, I realized that if the enties contain a sentence or a phrase, the
strings are longer than a simple word. That causes many enties not being displayed because the
algorithm can't fit them in the canvas anymore and thus simply omits that particular entry. I ended up with a
canvas quite blank.

Sorting the items by length may seem to solve the problem a little (I didn't try that). What I tried though,
was to lower the fontsize (by setting `value: 14`) and not rotating the words (`rotate: 0` ). This is done in
the object inside the `wordlist.map(function(d) {}`.

Anyway, this still left a few entries behind. At the end I created a "wordcloud for the poor" by simply
placing each entry in a `<div>` adding these as children inside the main div container and positioning the
inside div elements by a random margin and aligning them left or right.
This doesn't look that nice like a real cloud but at least contains all entries.

In order to achieve this you can change the file `lisstemplateheader.html` and replace the existing
content with this:

```
<!-- Create a div where the graph will take place -->
<div style="width: 100%" id="wordcloud"></div>

<script>
var wordlist = [
```

The difference is not to include the d3.js library and the cloud plugin and setting the div container to a
100% width.

The file `listtemplatefooter.html` can be changed to contain this content:

```
];

// Traverse the wordlist and creat a div for each word with some styling:
const wordsmapped = wordlist.map(function(d) {
  const wordNode = document.createElement('div');
  const textNode = document.createTextNode(d);
  wordNode.appendChild(textNode);
  let style = 'white-space: wrap;'
    + 'color: #' + Math.floor(Math.random()*16777215).toString(16) + ';'
    + 'font-size: ' + (Math.floor(Math.random() * 20) + 10).toString() +'px;';
  const offset = Math.random() * 100;
  // When the offset is >50% the right align with a margin 100 - x% from the right.
  // For lower values use the margin from the left in %.
  if (offset > 50) {
    style += 'text-align: right; margin-right:' + (100 - offset).toString() + '%;';
  } else {
    style += `margin-left: ${offset}%;`;
  }
  wordNode.setAttribute('style', style);
  document.getElementById('wordcloud').appendChild(wordNode);
  return 0; 
});
</script>
```

Each entry is displayed on a separate line. Because of the offset unnecessary line breaks may
occur because the text doesn't fit into the div container. However,
at least all entries are displayed and it looks kind of random.
