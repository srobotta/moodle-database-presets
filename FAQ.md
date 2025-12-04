## FAQ to implementation details in the database activity

This is a collection of posts from the
[english database forum](https://moodle.org/mod/forum/view.php?id=3505) and
other resources. The questions
deal with some custom requirement that in most cases can be achieved easily with some
code or configuration. 

### Delete all entries at once

To delete all entries at once is not possible by default. However, in the *List view template*
in the middle section that is displayed for each item, you may add `##delcheck##` somewhere in
the html. That code displays a checkbox for an item. Also, when this checkbox is displayed the
sticky footer contains two new button "Select all" and "Delete selected". With the help
of these buttons you may select all displayed enties and delete them at once.
You may need to increase the "Entries per page" property at the top to display
all items of your database activity.

### Hide the footer area

The footer area might be empty in some setups ands therefore should not appear. In every
template where the footer should not appear add the following snippet:

```
<script>
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".stickyfooter").style.visibility="hidden";
});
</script>
```

Link: https://moodle.org/mod/forum/discuss.php?d=454005

### Hide entries from other students

When the database activity is used th collect information from students, e.g.
some work they need to present, and each student must not see the work of others
but only his own.

In this case do the following:
* In the database settings, in the section *Entries* set *Approval required* to "yes".
* Never approve any entry as a teacher.

Link: https://moodle.org/mod/forum/discuss.php?d=443555

### Student does not see the add entry button

If a student does not see the "Add entry" button at the bottom then check the following:
1. The activity is set up in group mode but the student is not in a group.
1. The student did already add an entry and the limit of allowed entries has been reached.
1. The user has not the capability to add entries (`mod/data:writeentry`). Change
this in the Database navigation > More > Permissions and also in the Course navigation > Participants > Permissions.

Link: https://moodle.org/mod/forum/discuss.php?d=468041

### Rating should also be possible for students

By default, the rating (if enabled) for database entries can be done by the teacher
only. To allow student rating as well permissions have to be changed.

In the database activity go to the tab *More* and select *Permissions* from the
drop-down menu. On the left side search for the "Activity: Database" section.
There is a *Rate entries* permission (`mod/data:rate`). To the existing roles add
the "Student" role.

### Show the advanced search by default and predefine settings

When the database activity is called, the default view is the list template
with the simple search enabled.

To enable the advanced search by default, use the appropriate link e.g.
`http://your.moodle/mod/data/view.php?d=XX&advanced=1&perpage=100` which
shows the advanced search and extends the entries per page to 100.

If you are not able to share the correct link, then you may use a Javascript
snippet in your *List view template* in the footer section:

```
<script>
    document.addEventListener('DOMContentLoaded', () => {
        showHideAdvSearch(true);
    });
</script>
```

This snippet only opens the advanced search without any other changes.
To automatically set the results to a certain limit (like in the direct link to 100)
then the Javascript looks a bit different:

```
<script>
    document.addEventListener('DOMContentLoaded', () => {
        if (document.referrer.includes('/mod/data/view.php?')) return;
        let url = window.location.href;
        if (url.includes('advanced=')) {
            url = url.replace(/advanced=\d/, 'advanced=1');
        } else {
            url += '&advanced=1';
        }
        if (url.includes('perpage=')) {
            url = url.replace(/perpage=\d+/, 'perpage=100');
        } else {
            url += '&perpage=100';
        }
        window.location.href = url;
    });
</script>
```

The trick is here to modify the url so that the result is the same as
in the first example with the direct url. However, this should be done
once only, when loading the page. Therefore, we check the referer, if that
contains the path to the view script of the database activity then we are
already on the page and do not execute this Javascript. In Javascript there is no
change to recognize the request type and distinguish between get and post.

To extend and prefill other fields of the form with other values, open
the advanced search hit save and after reaload of the page, check the
parameter names in the url to find out.

Link: https://moodle.org/mod/forum/discuss.php?d=452335

### Do not automatically download files of the field type file

By default, if you use the field type file and display the
uploaded file with `[[my_field_field]]` the *List view template* and
*Single view template* an anchor tag with a link to the file is shown.
When the link is clicked, the file is downloaded by the browser. To
prevent the download the following code can be placed either in one
of the view templates or, for having the functionality in both
templates, in the *Custom JavaScript template*.

```
document.addEventListener("DOMContentLoaded", event => {
  document.querySelectorAll('a.data-field-link').forEach(a => {
    a.addEventListener('click', ev => {
      const url = ev.target.getAttribute('href');
      ev.preventDefault();
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const urlCreator = window.URL || window.webkitURL;
          const blobData = urlCreator.createObjectURL(blob);
          const ifTab = window.open('');
          ifTab.document.write('<iframe width="100%" height="100%" style="border: none" src="' + blobData + '"></iframe>');
       });
    });
  });
});
```

At each `data-field-link` anchor, a function for the click event is attached.
When the link is clicked, the default behaviour is suppressed, the file content
is fetched by the Javascript and the downloaded data is put as a inline source
into an iframe which is opened in a new browser window. The downloaded `Blob` object
contains information of the content type, and the `urlCreator` creates
the correct encoded string for the `src` attribute.

File types that cannot be displayed by the browser will still be downloaded.

If you want to exclude some file types from the behaviour, then check the
link e.g. by inserting the following line after the `querySelectorAll` line
like `if (a.getAttribute('href').match(/.*zip$/i)) return;` and do not
attach the custom function to the click event.

Link: https://moodle.org/mod/forum/discuss.php?d=455247

See also: [Embed PDF directly in webpage](FAQ.md#embed-pdf-directly-in-webpage)

### New entry is not saved

It may happen that a new entry is not saved when you hit the save
or save and add another button. In such cases it's very likely that the
field list contains a field that is mandatory but the field is not
used in the *Add new entry* template. The error message about the missing
field is not displayed because the entire field is not visible.

There is a [change request in the Moodle tracker](https://tracker.moodle.org/browse/MDL-80112)
to report such an error.

### Convert timestamps to readable dates

When datasets are exported and one of the field types is a DateTime object,
the export contains the timestamps of that entry, which is not really
readable.

There is a long outstanding tracker issue [MDL-32637](https://tracker.moodle.org/browse/MDL-32637)
that refers to this problem. The main issue is, that it must be ensured that
a date object gets not broken when exporting the datasets, and later reimporting
them again without any hazzle. Therefore the solution is not that easy as it seems.

Meanwhile after exporting a data set, you may add a new column next to the timestamp
column and add a formula like:

```
= CELL_WITH_TIMESTAMP / 86400 + 25569
```

This fills the new column with another number. Reformat the cell and pick *Category*
"Date" and then a date format that you wish. After changing one cell, click at the
marker at the right bottom of that cell to copy format and formula accordingly to
other cells.

Note that you are not able to modifiy dates here and that you can reimport them
again. To do that you need to manipulate the timestamp directly.

### Hide alert, you must add X entries before viewing the results

In some cases, you want the students never see any other entries of other students but
still want to show a cumulated result (e.g. in the [First, second and third choice](choice)). In this case the following snippet can be placed into the *List view template*
and the *Single view template*:

```
const alert = document.querySelector('div[role="main"] > div.alert-danger');
if (alert) alert.remove();
```

This checks for the red container with the warning message and, incase it's found, it
will remove it. Because of the limiting `div[role="main"]` the correct container should
be found and any other container of the same type should remain unchanged.

### Link to entry

In the list view, you might want a link to the single view of an entry. This is especially
useful when you display a few field values in the list view, and have all the
field values displayed in the single view only.

In the list view template in the Repeated entry block you may use:

1. Generic link: `##more##`
2. Custom build link `<a href="/mod/data/view.php?d=XXX&rid=##id##">Entry</a>`

The first variant is the easiest way. That gives you a lense icon with a + in it.

The second variant lets you define the link more detailed. The `d` parameter with XXX
stands for the database activity id. You can derive the number from an existing link
e.g. the list view. Whenever you copy the preset/import the preset in another database
activity, this ID needs to be adjusted.

You may also build the custom link dynamically by using:

```
<a class="db-link-entry" href="/mod/data/view.php?d=~~__D__~~&rid=##id##">Entry</a></li>
```

In the Footer of the List view template the following Javascript snippet  must be added
that replaces the pattern with the correct database id.

```
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const p = /(\?|&)d=(\d+)/;
        let m = window.location.href.match(p);
        if (!m) {
           const i = document.querySelector('input[name="d"]')
           if (i) {
               m = [0, 0, i.getAttribute('value')];
           }
        }
        if (m) {
            document.querySelectorAll('.db-link-entry')
            .forEach((e) => {
                e.setAttribute('href', e.getAttribute('href').replace('~~__D__~~', m[2]));
            });
        }
    });
</script>
```

### Embed PDF directly in webpage

With the field type `file` the user can upload files. Normally the field content is
replaced by an icon with the file type and the link to the file directly. When the user
clicks on it, the file is downloaded.

Assuming that the file type field is named *pdf*, then the *Single view template* can be
extended with the following code block at the bottom:

```
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const a = document.querySelector("#defaulttemplate-single a.data-field-link");
    if (a) {
      const href = a.getAttribute('href');
      if (href && href.substr(-4).toLowerCase() === '.pdf' ) {
        const embed = document.createElement('embed');
        embed.setAttribute('width', '500');
        embed.setAttribute('height', '375');
        embed.setAttribute('src', href);
        embed.setAttribute('type', 'application/pdf');
        a.replaceWith(embed);
      }
    }
  });
</script>
```

This checks for the anchor element in the single view template and replaces it with an embed
element that displays the PDF directly embedded into the page. With and height can be adjusted
to your needs.

Link: https://moodle.org/mod/forum/discuss.php?d=468906

See also: [Do not automatically download files of the field type file](FAQ.md#do-not-automatically-download-files-of-the-field-type-file)

### Use dates in a database field set

While there is a special date field type in the database activity, the support is not optimal.
One of the issues is that when the field is optional and you don't select a date, it uses the
preselect values. Also, it doesn't come with a nice datepicker.

Therefore, I recommend using a short text field for date strings or even a number field when
storing timestamps. The following approach makes use of the short text field to store a date
string in the form of YYYY-MM-DD and optional with the time. The advantage is also that the
sort order can be easily done by this field.

#### Date input

In the *Add entry template* wrap the date field placeholder with an html element that
makes it easy to select the input field later. I have choosen something like this:

```
<div class="date-field">[[date]]</div>
```

assuming that my field is called `date`.

At the bottom of the *Add entry template* add the following code:

```
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script>
window.document.addEventListener("DOMContentLoaded", (event) => {
  // Add the flatpickr stylesheet if it is not already there.
  if(!document.getElementById('flatpickr_css')) {
    var link = document.createElement('link');
    link.id = 'flatpickr_css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
    document.head.appendChild(link);
  }
  flatpickr('.date-field input');
});
</script>
```

This snippet makes use of the [flatpickr library](https://flatpickr.js.org/) that adds a nice
date picker element when focusing the date field, and also puts the correct string in it.

If you also need the time, the last line can be adjusted to `flatpickr('.date-field input', {enableTime: true});`.
See the website for all options you can set there. Also, here you note why we needed the little
change about wrapping the input field. That makes it a lot easier to select that input field only.

#### Date output

Without changing anything on the output templates, the dates are displayed as they are
stored in the system. This is in the form of `YYYY-MM-DD` a partial ISO string.

In case you want a nice output instead of the ISO string like `2025-09-25`, you must add some
changes to the *Single view template* and the *List view template*.

Whereever the `[[date]]` placeholder is, wrap it with an HTML element, so that inside that
element the field value is contained only (e.g. the plain date iso string). By default the
placeholder is already inside a html element. Therefore, I just added a class `date-field-out`
to let it look like the following in the *Single view template*:

```
<p class="mt-2 date-field-out">[[date]]</p>
```

The *List view template* looks like this:

```
 <div class="col-8 col-lg-9 ms-n3 date-field-out">[[date]]</div>
```

At the bottom of the *Single view template* and in the Footer box of the *List view template* the
following code can be placed:

```
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>
window.document.addEventListener('DOMContentLoaded', (event) => {
  const nodes = document.querySelectorAll('.date-field-out');
  for (let i = 0; i < nodes.length; i++) {
    const value = nodes[i].innerHTML;
    if (value.trim().length > 0) {
      nodes[i].innerHTML = dayjs(value).format('MMMM D, YYYY');
    }
  }
});
</script>
```

The javascript loads the [day.js](https://day.js.org/) library, reads the YYYY-MM-DD date content
(which is inside the elements that contain the `date-field-out` class) and reformats the value
to the given format.

If you need the time information as well, add it to the format string, e.g. like this `MMMM D, YYYY h:mm A [hrs]`.
The string in the sqare brackets is escaped. A value `2025-08-12 15:30` would be transformed into
`August 12, 2025 3:30 PM hrs`.
 
One thing to watch out when using dates, is the timezone and daylight savings time. For this proof of concept I
didn't check any of these issues, but you should be aware of it and may change the code a bit. The mentioned
libraries support timezones etc., while the plain Date object within javascript treats everything as UTC
and you would have to calculate the correct hour on your own.

Link: https://moodle.org/mod/forum/discuss.php?d=469483

### Extend the amount of entries automatically

Many of the presets work only, when all entries are displayed on the *List view*. When the page is visited
the first time, usually 10 entries are displayed only. This cannot be changed, however if there was no
specific search, the `perpage` can be automatically adjusted and the page reloaded to see more entries
at once.

The following snippet should go in the footer block of the *List view template*:

```
document.addEventListener('DOMContentLoaded', () => {
  // This is the minimum entries to load.
  const minToLoad = 50;
  // If there are parameters in the addressbar assume the user wanted a different search.
  const m = window.location.href.match(/&/g);
  const noQuery = !m || m.length < 2;
  // Check whether we have a pagination in the sticky footer.
  const pagination = document.querySelector('#sticky-footer nav.pagination');
  // When there is a pagination we have more entries to show. Also, if there is noQuery
  // then the user has *not* specified a search (no query params). Then we can reload the page.
  if (noQuery && pagination) {
     window.location.href += '&perpage=' + minToLoad;
  }
});
```

Whenever you specifiy a specific search, either via the standard elements like by
a search term, the sort order or the entries per page, or if you are on advanced search and
specify parameters. In both cases, when the form is set, the parameters are sent as GET parameters
and show up in the query part of the url.

Also when there are few entries only and all are displayed, then there is no pagination element
in the sticky footer.

If there is a pagination and there are no query params except for the database id, then we can
add the `perpage` param to the url and so let the browser reload the result list view.
