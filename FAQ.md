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

The footer area might be empty in some setups ands therefore should not appear.

Link: https://moodle.org/mod/forum/discuss.php?d=454005

### Hide entries from other students

When the database activity is used th collect information from students, e.g.
some work they need to present, and each student must not see the work of others
but only his own.

In this case do the following:
* In the database settings, in the section *Entries* set *Approval required* to "no".
* Never approve any entry as a teacher.

Link: https://moodle.org/mod/forum/discuss.php?d=443555

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
            url = url.replace(/perpage=\d/, 'perpage=100');
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

