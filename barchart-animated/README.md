## Animated barchart

This idea was originally derived from 
[Tipps und Tricks zu Moodle in mebis - Datenbankvorlage: Balkendiagramm](https://fdagner.notion.site/Datenbankvorlage-Balkendiagramm-50070ca4c56747be834781286122509b).
When I use the code it had some other code leftovers. I reused it, changed
the animal icons for instruments and cleared out all code that didn't make sense
in the current setup.

The bars are animated, counting each selection from tbe possible options and
creates a barchart based on the percentage how many times a single option has
been chosen.

There's a nice reload option that when you check the checkbox, the chart is reloaded
every 15 seconds. This makes it quite useful if you have an ongoing event and
want to display the progress.

<div style="margin: 0 25%">

![Screenshot list viee](list_view.png "Screenshot list view")

![Sceeenshot dropdown list](dropdown_list_instruments.png "Sceeenshot dropdown list")

</div>

 
## Installation

Note: there seems to be a bug when importing the preset. Each option has to be on a separate
line, via a line break. When creating this preset I had some trouble to do so. The
final solution that worked was to use the unicode sequence (you will see the icon in the file
when opening in the text editor). Using the html entities or having no windows line breaks
in it caused problems and all options where at one line, resulting in a single option value.

## Multilanguage

The content of the templates is not passed via the output filters, so multi language
tags don not work here. I used them anyway but had to write some Javascript in the
`jstemplate.js` that handles these elements similar as the multilang filter. The selection
values itself use icons which are language independent. If you have text labels as options,
these must be translated. In this case, the *Add entry template* must have the `<select>`
element manually created. Instead of using:

```
[[instrument]]
```

which automatically builds the html, it must be created like this:

```
<td class="template-token cell c1 lastcol">
  <select name="[[instrument#id]]">
    <option value="violin">
      <span class="multilang" lang="de">Geige</span>
      <span class="multilang" lang="en">Violin</span>
      <span class="multilang" lang="fr">Violon</span>
    </option>
    ...
```

Here the first element is shown only. The possible values must be defined in the
field definition and used in the `value` attributes.

Also, when the values are displayed in the *Single view template* and the *List view
template* the plain value must be replaced with the translated label. The easiest way
to do is defining a custom javascript function like:

```
const instrumentLabel = (val) => {
  const labels = {
    violin: {
      de: 'Geige',
      en: 'Violin',
      fr: 'Violon'
    },
    ...
  };
  const languages = ['de', 'en', 'fr'];
  let currentLang = M.cfg.language ?? 'de';
  if (!languages.includes(currentLang)) {
    currentLang = 'de';
  }
  if (labels.hasOwnProperty(val)) {
    return labels[val][currentLang];
  }
  return val;
}
```

This function must be placed in the *Custom Javascript*. Also, in this template the
function for the `DOMContentLoaded` event must be extended with this snippet:

```
document.querySelectorAll('.translate-instrument').forEach((e) => {
  e.innerHTML = instrumentLabel(e.textContent.trim());
});
```

In the list view the new function is called directly when creating the bar chart.
In the single view the `[[instrument]]` placeholder must be wrapped into an html element
with a class named `translate-instrument`. In this preset the placeholder is inside
a table cell. Therefore, the snippet in the template would look like this:

```
<td class="translate-instrument">[[instrument]]</td>
``` 
