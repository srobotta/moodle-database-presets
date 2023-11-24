## Wordcloud text

The use case for this preset is to build a wordcloud from a text. The user may enter
a long text (to classify it a bit, a headline can be entered as well, but is not
used for the wordcloud itself).

Texts may be long, therefore before building the wordcloud the text must be processed.
This is done in the following steps:
* Eliminate HTML (which is automatically saved when using the TinyMCE/atto editor).
* Keep normal letters only that would appear in a word, eliminate all other characters. 
* Split the text at the spaces.
* Count the words to use as a weight for the font size.
* Eliminate all words, that are on a stop list.

Only the single view template has been modified to display the word cloud of the
text. The algorithm that create the cloud tries to place every word at a free
position. If there is no free space found where the word would fit, the word is
skipped. So there probably will be fewer words in the cloud than are in the text.

<div style="margin: 0 25%;">

![Wordcloud from a bunch of words in the list view](screenshot.png "Wordcloud from a bunch of words in the list view")

</div>